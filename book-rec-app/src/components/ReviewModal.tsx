import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GRAY } from "../constants/Colours";
import axios from "axios";
import { ParagraphTextBold, Heading3 } from "../constants/Text";

const ReviewModalContainer = styled.div`
    width: 75%;
    background-color: white;
    padding: 10px;
    height: fit-content;
    border-style: solid;
    border-color: #D9D9D9;
    border-radius: 30px;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 80%;
    margin: auto;
    margin-top: 50px;
`

const ModalHeading = styled.h3`
    margin: 0;
    padding: 0;
`;

const StyledInput = styled.input`
    border-style: solid;
    border-color: #D9D9D9;
    border-radius: 20px;
    padding: 12px;
    width: 100%;
    outline: none;
    &:focus {
        outline: none;
    }
`

const StyledReviewTextArea = styled.textarea`
    border-color: #D9D9D9;
    border-radius: 20px;
    padding: 12px;
    width: 100%;
    resize: none;
    height: 200px;
    font-family: "Inter", "sans-serif";
    &:focus {
        outline: none;
    }
`

const AddButton = styled.button`
    border-radius: 30px;
    background-color: #B99785;
    border: none;
    width: 80px;
    display: block;
    margin-right: 0;
    margin-left: auto;
    cursor: pointer;
    color: white;
    margin-bottom: 10px;
    opacity: 0.8;
    transition: 0.3s;
    &:hover {
        opacity: 1;
    }
`

const defaultFormData = {
    user_id: 0,
    book_id: 0,
    rating: 0,
    headline: "",
    review: "",
}

type ReviewModalProps = {
    current_book_id: number;
    onSubmit: () => void;
}

export function ReviewModal(props: ReviewModalProps) {
    const { current_book_id, onSubmit } = props;
    const [formData, setFormData] = useState(defaultFormData);
    const { user_id, book_id, rating, headline, review } = formData;

    const convertUserID = (userID: string) => {
        if (userID) return parseInt(userID, 10)
        else return 0
    }

    useEffect(() => {
        setFormData((prevState) => ({
            ...prevState,
            user_id: convertUserID(window.localStorage.getItem("userID") || ""),
            book_id: current_book_id
        }));
    }, [])

    const onRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            // [event.target.id]: parseInt(event.target.value, 10)
            [event.target.id]: event.target.value
        }));
    };

    const onHeadlineChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const onTextAreaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        // setFormData(defaultFormData);

        // (book_id, rating, headline, review)
        const url = 'http://127.0.0.1:105/create-review';
        axios.post(url, formData, {
            headers: { 
                "Content-Type": "multipart/form-data" 
            },
        })
            .then((response) => {
                console.log(response.data);
                onSubmit();
        });
    }


    return (
        <ReviewModalContainer>
            <Form onSubmit={handleSubmit}>
                <ModalHeading>Write a Review</ModalHeading>
                <StyledInput
                    type="number"
                    id="rating"
                    value={rating}
                    placeholder={"Enter rating..."}
                    onChange={onRatingChange}
                />
                <StyledInput 
                    id="headline"
                    value={headline}
                    placeholder={ "Write a headline..."}
                    onChange={onHeadlineChange}
                />
                <StyledReviewTextArea 
                    id="review"
                    value={review}
                    placeholder={ "Add a review..."}
                    onChange={onTextAreaChange}
                />
                <AddButton>
                    <ParagraphTextBold>Add</ParagraphTextBold>
                </AddButton>
            </Form>
        </ReviewModalContainer>
    )
}