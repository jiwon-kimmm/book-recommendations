import { useEffect, useState } from "react"
import BookCard from "../components/BookCard";
import {useParams} from "react-router-dom";
import axios from "axios";


export default function BookView () {
    const params = useParams();
    const [bookInfo, setBookInfo] = useState<any | null>(null);

    useEffect(() => {
        const url = 'http://127.0.0.1:105/get-book';
        const formData = new FormData();
        formData.append('book_id', params.bookId || '');

        axios.post(url, formData)
            .then((response) => setBookInfo(response.data))
            .catch(err => console.error(err));
    }, [params.bookId]);


    return (
        <>
            {bookInfo && (
                <BookCard
                    title={bookInfo.title}
                    author={bookInfo.author}
                    rating={bookInfo.average_rating}
                    summary={bookInfo.summary}
                    image_url={bookInfo.image_url}
                    book_id={bookInfo.book_id}
                    user_id={window.localStorage.getItem("userID") || ""}
                />
            )}
        </>
    );
} 
