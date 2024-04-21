import sqlite3
import pandas as pd

conn = sqlite3.connect("book-recommendations.db")

ratings_df = pd.read_csv("data/ratings.csv")
ratings_df.to_sql('ratings', conn, if_exists='replace')

books_df = pd.read_csv("data/books.csv")
books_df.to_sql('books', conn, if_exists='replace')

delete_user_table_query = ('''DROP TABLE users;
                           ''')
conn.execute(delete_user_table_query)

create_user_table_query = (''' CREATE TABLE IF NOT EXISTS users
                                (user_id        INTEGER       PRIMARY KEY,
                                 username       STRING        NOT NULL,
                                 password       TEXT          NOT NULL
                           );''')
conn.execute(create_user_table_query)

sql = """INSERT INTO users (user_id, username, password)
         VALUES (?, ?, ?)"""
cursor = conn.cursor()
cur = cursor.execute(sql, (53424, "testuser", "testpass"))
conn.commit()

