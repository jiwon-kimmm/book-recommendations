from flask import Flask, request, jsonify, make_response
import jwt
import datetime
from flask_cors import CORS, cross_origin
from functools import wraps

from surprise import KNNBasic
from surprise import Dataset
from surprise import Reader
from surprise import Trainset

from collections import defaultdict
from operator import itemgetter
import heapq
import numpy as np

import os
import csv
import sqlite3

from bs4 import BeautifulSoup
import requests
import lxml

import json

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADER'] = 'Content-Type'
app.config['SECRET_KEY'] = b'\xb5ek9Q\x82\xea:I\x08\x1cF'

def token_required(func):
    @wraps(func)
    def decorated(*args, **kwargs):
        token = request.args.get('token')

        if not token: 
            return jsonify({'message': 'Token is missing'}), 403
        
        try: 
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
        except:
            return jsonify({'message': 'Token is invalid', 'token': token}), 403
        
        return func(*args, **kwargs)
    
    return decorated
        

def ratings_db_connection():
    conn = None
    try: 
        conn = sqlite3.connect("ratings.db")
    except sqlite3.error as e:
        print(e)
    return conn

# User sign up
@app.route('/sign-up', methods=['POST'])
@cross_origin()
def sign_up():
    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()

    username = request.form['username']
    password = request.form['password']

    print("Username: {username}")
    print("Password: {password}")
    
    sql = """INSERT INTO users (username, password)
             VALUES (?, ?)"""
    
    cur = cursor.execute(sql, (username, password))
    connection.commit()
    cursor.close()

    return f"User with the id: {cur.lastrowid} created successfully"

# User log in
@app.route('/log-in', methods=['POST'])
@cross_origin()
def log_in():
    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()

    username = request.form['username']
    password = request.form['password']

    statement = f"SELECT * FROM users WHERE username='{username}' AND password='{password}';"
    cursor.execute(statement)
    data = cursor.fetchone()
    cursor.close()
    
    if data:
        # session['logged_in'] = True
        token = jwt.encode({
            'user': request.form['username'],
            'exp': datetime.datetime.now(datetime.UTC) + datetime.timedelta(minutes=30)
        },
            app.config['SECRET_KEY'])
        print(data[0]) # data is a tuple (user_id, username, password)
        return jsonify({'token': token, 'message': "user is in db", 'user_id': data[0]})
    else: 
        print("huh")
        return make_response('Unable to verify', 401, {'WWW.Authenticate': 'Basic realm:"Authentication Failed!"'})


# Test protected route
@app.route('/protected', methods=['GET'])
@cross_origin()
@token_required
def protected():
    return jsonify({'message': 'This is only available for people with valid tokens.'})

def load_dataset():
    reader = Reader(line_format="user item rating", sep=',', skip_lines=1)
    ratings_dataset = Dataset.load_from_file("data/ratings.csv", reader=reader)

    # Create dictionary to lookup a book's name with its book_id as key
    # book_id_to_name[book_id] = book_name
    book_id_to_name = {}
    with open('data/books.csv', newline='', encoding='ISO-8859-1') as csvfile:
        book_reader = csv.reader(csvfile)
        next(book_reader)
        for row in book_reader:
            book_id = int(row[0])
            book_name = row[9]
            book_id_to_name[book_id] = book_name
    
    print("YAYYYYYY")
    return (ratings_dataset, book_id_to_name)

# book_id is raw id, not inner id
def getBookName(book_id, book_id_to_name):
  if int(book_id) in book_id_to_name:
    return book_id_to_name[int(book_id)]
  else:
    return ""
  
@app.route('/recommendations', methods=['POST'])
@cross_origin()
def recommendations():

    # Create similarity matrix from dataset
    ratings_dataset, book_id_to_name = load_dataset()
    trainset = ratings_dataset.build_full_trainset()
    similarity_matrix = KNNBasic(sim_options = {
         'name': 'cosine',
         'user_based': False # Don't want to find similarity between users, we want item-based collaborative filtering
         })\
         .fit(trainset)\
         .compute_similarities()

    # Get user id from request
    user_id = request.form['user_id']

    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()
    statement = f"SELECT * FROM ratings WHERE user_id='{user_id}';"
    cursor.execute(statement)
    user_ratings = cursor.fetchall()  # user_ratings is a list of tuples 

    cleaned_user_ratings = []

    for rating in user_ratings:
        cleaned_user_ratings.append((trainset.to_inner_iid(str(rating[2])), rating[3])) # append tuple of (book_id, rating)

    # k_neighbours is in descending order
    # k_neighbours has 20 most similar items - items for which users have given similar ratings
    k_neighbours = heapq.nlargest(20, cleaned_user_ratings, key=lambda t: t[1])

    # candidates[item_inner_id] = score_sum
    candidates = defaultdict(float)

    for item_id, rating in k_neighbours:
        try:
            # Find most similar items to each item_id in k_neighbours
            # Contains item_inner_id and similarity score
            similarities = similarity_matrix[item_id]
            for item_inner_id, score in enumerate(similarities):
                # For each similar item, add it to candidates dictionary
                # If the similar item is already in candidates, add to the existing score
                candidates[item_inner_id] += score * (rating / 5.0)
        except:
            continue

    # Build a dictionary of books the user has already read
    has_read = {}
    for item_inner_id, rating in cleaned_user_ratings:
        has_read[item_inner_id] = 1

    # Add items to list of user's recommendations if they are similar AND has not already been read
    recommendations = []

    position = 0
    # candidates.items() contains the key-value pairs of the dictionary, as tuples in a list
    # each tuple is (item_inner_id, rating_sum)
    for item_inner_id, rating_sum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
        # Add book to recommendations if user has not read it
        if not item_inner_id in has_read:
            raw_book_id = trainset.to_raw_iid(item_inner_id)

            statement = f"SELECT * FROM books WHERE book_id='{raw_book_id}';"
            cursor.execute(statement)
            book = cursor.fetchone()  # book is a list of tuples

            title = book[10]
            goodreads_book_id = book[2]
            authors = book[8]
            average_rating = book[13]
            image_url = book[22]

            html_text = requests.get(f"https://www.goodreads.com/book/show/{goodreads_book_id}.{title}").text
            soup = BeautifulSoup(html_text, 'lxml')
            general_summary = soup.find('div', class_ = 'BookPageMetadataSection__description')
            summary = general_summary.find('span', class_ = 'Formatted').text

            recommendations.append((getBookName(raw_book_id, book_id_to_name), raw_book_id, goodreads_book_id, authors, average_rating, summary, image_url))
            position += 1
            if (position > 10): break  # We only want top 10

    cursor.close()

    for rec in recommendations:
        print("Book: ", rec)

    

    # recommendations is a list of tuples (title, raw item id)
    return jsonify(recommendations)


@app.route('/get-summary', methods=['POST'])
@cross_origin()
def get_summary():
    # Get goodreads book id from request
    goodreads_book_id = request.form['goodreads_book_id']
    title = request.form['title']

    html_text = requests.get(f"https://www.goodreads.com/book/show/{goodreads_book_id}.{title}").text
    soup = BeautifulSoup(html_text, 'lxml')
    general_summary = soup.find('div', class_ = 'BookPageMetadataSection__description')
    summary = general_summary.find('span', class_ = 'Formatted').text
    print(summary)

    return summary

@app.route('/create-review', methods=['POST'])
@cross_origin()
def create_review():
    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()

    user_id = request.form['user_id']
    book_id = request.form['book_id']
    rating = request.form['rating']
    headline = request.form['headline']
    review = request.form['review']

    sql = """INSERT INTO reviews (user_id, book_id, rating, headline, review)
         VALUES (?, ?, ?, ?, ?)"""
    cur = cursor.execute(sql, (user_id, book_id, rating, headline, review))
    connection.commit()

    sql = """INSERT INTO ratings (user_id, book_id, rating)
          VALUES (?, ?, ?)"""
    cur = cursor.execute(sql, (user_id, book_id, rating))
    connection.commit()

    cursor.close()

    return jsonify({'user_id': user_id, 'book_id': book_id, 'rating': rating, 'headline': headline, 'review': review})


@app.route('/get-books', methods=['GET'])
@cross_origin()
def get_books():
    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()

    sql = """SELECT title FROM books;"""
    cursor.execute(sql)
    data = cursor.fetchall()
    connection.commit()
    cursor.close()

    json_data = json.dumps([{"title": row[0]} for row in data])

    return json_data


@app.route('/get-user-reviews', methods=['POST'])
@cross_origin()
def get_user_reviews():
    user_id = request.form['user_id']

    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()

    sql = f"SELECT * FROM reviews WHERE user_id='{user_id}';"
    cursor.execute(sql)
    data = cursor.fetchall() 
    connection.commit()
    cursor.close()

    return jsonify(data)

@app.route('/get-specific-review', methods=['POST'])
@cross_origin()
def get_specific_review():
    user_id = request.form['user_id']
    book_id = request.form['book_id']

    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()

    sql = f"SELECT * FROM reviews WHERE user_id='{user_id}' AND book_id='{book_id}';"
    cursor.execute(sql)
    data = cursor.fetchone() 
    connection.commit()
    cursor.close()

    return jsonify(data)


if __name__ == '__main__':
    
    # np.save("similarity-matrix", similarity_matrix)
    app.run(host='0.0.0.0', port=105)
