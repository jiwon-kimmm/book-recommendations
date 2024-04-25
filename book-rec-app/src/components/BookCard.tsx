import styled from "styled-components";
import { Heading1, Heading2, Heading3, ParagraphText } from "../constants/Text";
import { GRAY } from "../constants/Colours";
import Heart from "../assets/heart.svg"
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
    background-color: ${GRAY};
    padding: 0;
    float: left;
`

const RightCardSubcontainer = styled(CardSubcontainer)`
    width: 60%;
    text-align: left;
    border-radius: 0px 30px 30px 0px;
    display: flex;
    flex-direction: row;
`
const LeftCardSubcontainer = styled(CardSubcontainer)`
    border-radius: 30px 0px 0px 30px;
    padding: 20px;
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
    cursor: pointer;
`

const ReactionContainer = styled.div`
    text-align: right;
    margin-left: auto; 
    padding: 10px;
    display: flex;
    flex-direction: column;
    gap: 6px;
`

const BookInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
`
interface BookCardProps {
    title: string;
    author: string;
    rating: string;
    summary: string;
    image_url: string;
    book_id: number;
    user_id: string;
}

export default function BookCard(props: BookCardProps) {
    const { title, author, rating, summary, image_url, book_id, user_id } = props;
    const [review, setReview] = useState<boolean>(false);
    const [reviewPresent, setReviewPresent] = useState<boolean>(false);
    const [userReviews, setUserReviews] = useState([]);

    useEffect(() => {
        const url = 'http://127.0.0.1:105/get-user-reviews';
        axios.post(url, {user_id: user_id}, {
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
        })
            .then((response) => {
                setUserReviews(response.data);
        });
    }, [review])

    useEffect(() => {
        for (let i = 0; i < userReviews.length; ++i) {
            if (+userReviews[i][1] == book_id) {
               setReviewPresent(true);
               break; 
            }
        }
    }, [userReviews])

    const createReview = () => {
        setReview(!review);
    }

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
                                <ReactionIcon src={Heart} />
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
                    (<ReviewModal current_book_id={book_id}></ReviewModal>)
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