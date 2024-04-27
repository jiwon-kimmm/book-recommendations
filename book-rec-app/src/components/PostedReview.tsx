import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GRAY } from "../constants/Colours";
import axios from "axios";
import { ParagraphTextBold } from "../constants/Text";

const ReviewModalContainer = styled.div`
    width: 75%;
    background-color: #b9978540;
    padding: 10px;
    height: fit-content;
    border-radius: 30px;
    border-style: solid;
    border-color: #D9D9D9;
`

const InnerReviewContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 80%;
    margin: auto;
`

const StyledHeadline = styled.div`
    border: none;
    border-radius: 2px;
    padding: 12px;
    width: 100%;
`

const StyledReviewTextArea = styled.textarea`
    border: none;
    border-radius: 2px;
    padding: 12px;
    width: 100%;
    resize: none;
    height: 200px;
    font-family: "Inter", "sans-serif";
    background-color: transparent;
`

type ReviewModalProps = {
    current_book_id: number;
    user_id: string;
}

export function PostedReview(props: ReviewModalProps) {
    const { current_book_id, user_id } = props;
    // const [formData, setFormData] = useState(defaultFormData);
    // const { user_id, book_id, rating, headline, review } = formData;
    const [rating, setRating] = useState(0);
    const [headline, setHeadline] = useState("");
    const [reviewBody, setReviewBody] = useState("");

    const convertUserID = (userID: string) => {
        if (userID) return parseInt(userID, 10)
        else return 0
    }

    useEffect(() => {
        const url = 'http://127.0.0.1:105/get-specific-review';
        axios.post(url, {user_id: user_id, book_id: current_book_id}, {
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
        })
            .then((response) => {
                setRating(response.data[2]);
                setHeadline(response.data[3]);
                setReviewBody(response.data[4]);
        });
    }, [])


    return (
        <ReviewModalContainer>
            <InnerReviewContainer>
                <StyledHeadline>
                    {rating}
                </StyledHeadline>
                <StyledHeadline>
                    <ParagraphTextBold>
                        {headline}
                    </ParagraphTextBold>
                </StyledHeadline>
                <StyledReviewTextArea 
                    readOnly={true}
                    value={reviewBody}
                />
            </InnerReviewContainer>
        </ReviewModalContainer>
    )
}