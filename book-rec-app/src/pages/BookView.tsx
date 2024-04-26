import { useEffect, useState } from "react"
import BookCard from "../components/BookCard";
import {useParams} from "react-router-dom";
import axios from "axios";


export default function BookView () {
    const params = useParams();
    const [bookInfo, setBookInfo] = useState([]);

    useEffect(() => {
        const url = 'http://127.0.0.1:105/get-book';

        axios.post(url, {book_id: params.bookId}, {
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
        })
            .then((response) => {
                setBookInfo(response.data);
        });
    }, [])

    

    return (
        <>
            <BookCard
                title={bookInfo[11]}
                author={bookInfo[8]}
                rating={bookInfo[13]}
                summary={"Summary"}
                image_url={bookInfo[22]}
                book_id={bookInfo[1]}
                user_id={window.localStorage.getItem("userID") || ""}
            />
        </>
    );
} 
