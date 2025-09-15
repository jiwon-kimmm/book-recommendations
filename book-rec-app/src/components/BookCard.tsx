import styled from "styled-components";
import { Heading1, Heading2, Heading3, ParagraphText } from "../constants/Text";
import { GRAY } from "../constants/Colours";
import HeartUnliked from "../assets/heart-unliked.svg"
import HeartLiked from "../assets/heart-liked.svg"
import CheckmarkChecked from "../assets/checkmark-checked.svg";
import CheckmarkUnchecked from "../assets/checkmark-unchecked.svg"
import { MiddlePane, RightPane } from "./MainPanel";
import { ReviewModal } from "./ReviewModal";
import { useState, useEffect } from "react";
import axios from 'axios';
import { PostedReview } from "./PostedReview";

const Card = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
    margin-top: 20px;
`
const CardSubcontainer = styled.div`
    background-color: #FFFFFF;
    padding: 0;
    float: left;
    border-style: solid;
    border-color: #D9D9D9;
`

const RightCardSubcontainer = styled(CardSubcontainer)`
    width: 60%;
    text-align: left;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: row;
    border-left: none;
`
const LeftCardSubcontainer = styled(CardSubcontainer)`
    border-radius: 30px 0px 0px 30px;
    padding: 20px;
    border-right: none;
`

const ImageContainer = styled.div`
    width: 300px;
    height: auto;
`

const StyledImage = styled.img`
    object-fit: cover;
    width:100%;
`
const ReactionIcon = styled.img`
    width: 40px;
    opacity: 0.8;
    cursor: pointer;
    &:hover {
        cursor: pointer;
        opacity: 1;
    };
`

const ReactionContainer = styled.div`
    text-align: right;
    margin-left: auto; 
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    z-index: 1;
`

const BookInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`

interface Review {
    user_id: number;
    book_id: number;
    rating: number;
    headline: string;
    review: string;
}

interface BookCardProps {
    title: string;
    author: string;
    rating: string;
    summary: string;
    image_url: string;
    book_id: number;
    user_id: string;
}

interface Book {
    book_id: number;
    title: string;
}

export default function BookCard(props: BookCardProps) {
    const { title, author, rating, summary, image_url, book_id, user_id } = props;
    const [review, setReview] = useState<boolean>(false);
    const [reviewPresent, setReviewPresent] = useState<boolean>(false);
    const [userReviews, setUserReviews] = useState<Review[]>([]);
    const [isLiked, setIsLiked] = useState<boolean>(false);

    useEffect(() => {
        const url = 'http://127.0.0.1:105/get-user-reviews';
        const formData = new FormData();
        formData.append('user_id', user_id);

        axios.post(url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
            setUserReviews(response.data);
        })
        .catch(err => console.error(err));
    }, [user_id]);

    useEffect(() => {
        const hasReviewed = userReviews.some(r => r.book_id === book_id);
        setReviewPresent(hasReviewed);
    }, [userReviews, book_id]);

    useEffect(() => {
        const fetchLikedBooks = async () => {
            try {
                const url = 'http://127.0.0.1:105/get-liked-books';
                const formData = new FormData();
                formData.append('user_id', user_id);

                const res = await axios.post(url, formData);
                const likedBooks: Book[]= res.data;
                
                const isLiked = likedBooks.some(book => book.book_id === book_id);
                setIsLiked(isLiked);
            } catch (err) {
                console.error(err);
            }
        };

        fetchLikedBooks();
    }, [user_id, book_id]); // dependencies


    const handleReviewSubmit = () => {
        setReviewPresent(true);
        setReview(false);
    };

    const createReview = () => {
        setReview(!review);
    }

    const handleHeartClick = async () => {
    try {
        const url = 'http://127.0.0.1:105/like-book';
        const formData = new FormData();
        formData.append('user_id', user_id);
        formData.append('book_id', String(book_id));
        formData.append('title', title);

        await axios.post(url, formData);
        setIsLiked(true);
        window.dispatchEvent(new Event('book-liked'));
    } catch (err) {
        console.error("Error adding favorite:", err);
    }

};


    return (
        <>
            <MiddlePane>
                <Card>
                    <LeftCardSubcontainer>
                        <ImageContainer>
                            <StyledImage src={image_url} />
                        </ImageContainer>
                    </LeftCardSubcontainer> 
                    <RightCardSubcontainer>
                        <BookInfoContainer>
                            <Heading1>{title}</Heading1>
                            <Heading2>{author}</Heading2>
                            <Heading3>{rating}</Heading3>
                            <ParagraphText>{summary}</ParagraphText>
                        </BookInfoContainer>
                        <ReactionContainer>
                                <ReactionIcon 
                                    src={isLiked ? HeartLiked : HeartUnliked}
                                    onClick={handleHeartClick} 
                                />
                                {
                                    reviewPresent ? 
                                    <ReactionIcon src={CheckmarkChecked}/> : 
                                    <ReactionIcon src={CheckmarkUnchecked} onClick={createReview}/>
                                }
                        </ReactionContainer>
                    </RightCardSubcontainer>
                </Card>
            </MiddlePane>
            <RightPane>
                {review && !reviewPresent &&
                    (<ReviewModal 
                        current_book_id={book_id}
                        onSubmit={handleReviewSubmit}></ReviewModal>)
                }
                {reviewPresent &&
                    (
                        <PostedReview 
                            current_book_id={book_id}
                            user_id={user_id} />
                    )
                }
            </RightPane>
        </>
    );
}