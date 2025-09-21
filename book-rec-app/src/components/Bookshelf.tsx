import styled from "styled-components";
import { Heading2Bold } from "../constants/Text";
import { GRAY } from "../constants/Colours";
import { useState, useEffect } from "react";
import axios from 'axios';


const BookshelfContainer = styled.div`
    height: 100vh;
    width: 20%;
    position: fixed;
    background-color: white;
    box-sizing: border-box;
    padding: 30px;
    margin-right: 20px;
    border-style: solid;
    border-color: #D9D9D9;
    gap: 10px;
`

const BookshelfDivider = styled.hr`
    background: #D9D9D9;
`

const BookContainer = styled.div`
    background-color: #b9978540;
    padding: 10px;
    margin-bottom: 10px;
    border-radius: 8px;
`

export default function Bookshelf () {
    const [userId, setUserId] = useState(() => window.localStorage.getItem("userID") || null);
    const [likedBooks, setLikedBooks] = useState<{ title: string; book_id: number }[]>([]);

    const fetchLikedBooks = () => {
        if (!userId) return;

        const url = 'http://127.0.0.1:105/get-liked-books';
        const formData = new FormData();
        formData.append('user_id', String(userId));

        axios.post(url, formData)
            .then((response) => setLikedBooks(response.data))
            .catch(err => console.error(err));
    };


    useEffect(() => {
        fetchLikedBooks(); // initial fetch

        // Listen for "book-like-action" events
        const listener = () => fetchLikedBooks();
        window.addEventListener('book-like-action', listener);

        return () => window.removeEventListener('book-like-action', listener);
    }, [userId]);

    return (
        <BookshelfContainer>
            <Heading2Bold>My Bookshelf</Heading2Bold>
            <BookshelfDivider />
            {likedBooks.map((book) => (
                <BookContainer key={book.book_id}>
                    {book.title}
                </BookContainer>       
             ))}
        </BookshelfContainer>
    );
}