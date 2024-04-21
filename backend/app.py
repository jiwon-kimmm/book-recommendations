from flask import Flask, request

from surprise import KNNBasic
from surprise import Dataset
from surprise import Reader

from collections import defaultdict
from operator import itemgetter
import heapq
import numpy as np

import os
import csv
import sqlite3

app = Flask(__name__)

def ratings_db_connection():
    conn = None
    try: 
        conn = sqlite3.connect("ratings.db")
    except sqlite3.error as e:
        print(e)
    return conn

# User sign up
@app.route('/sign-up', methods=['POST'])
def sign_up():
    connection = sqlite3.connect('book-recommendations.db')
    cursor = connection.cursor()

    username = request.form['username']
    password = request.form['password']
    
    sql = """INSERT INTO users (username, password)
             VALUES (?, ?)"""
    
    cur = cursor.execute(sql, (username, password))
    connection.commit()

    return f"User with the id: {cur.lastrowid} created successfully"




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
  

@app.route('/', methods=['GET'])
def recommend():
    ratings_dataset, book_id_to_name = load_dataset()
    # Build full Surprise training set from dataset
    trainset = ratings_dataset.build_full_trainset()
    similarity_matrix = KNNBasic(sim_options = {
         'name': 'cosine',
         'user_based': False # Don't want to find similarity between users, we want item-based collaborative filtering
         })\
         .fit(trainset)\
         .compute_similarities()
    
    new_test_subject_ratings = []
    new_test_subject_ratings.append((52, 4.0))
    new_test_subject_ratings.append((159, 5.0))
    new_test_subject_ratings.append((260, 5.0))

    # k_neighbours is in descending order
    # k_neighbours has 20 most similar items - items for which users have given similar ratings
    k_neighbours = heapq.nlargest(20, new_test_subject_ratings, key=lambda t: t[1])

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
    for item_inner_id, rating in new_test_subject_ratings:
        has_read[item_inner_id] = 1

    # Add items to list of user's recommendations if they are similar AND has not already been read
    recommendations = []

    position = 0
    # candidates.items() contains the key-value pairs of the dictionary, as tuples in a list
    # each tuple is (item_inner_id, rating_sum)
    for item_inner_id, rating_sum in sorted(candidates.items(), key=itemgetter(1), reverse=True):
        if not item_inner_id in has_read:
            recommendations.append(getBookName(trainset.to_raw_iid(item_inner_id), book_id_to_name))
            position += 1
            if (position > 10): break  # We only want top 10

    for rec in recommendations:
        print("Book: ", rec)

    return {'a': 'b'}, 201


if __name__ == '__main__':
    
    # np.save("similarity-matrix", similarity_matrix)
    app.run(host='0.0.0.0', port=105)
