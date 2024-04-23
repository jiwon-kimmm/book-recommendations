import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { GRAY } from "../constants/Colours";
import axios from "axios";

const ReviewModalContainer = styled.div`
    width: 75%;
    background-color: ${GRAY};
    padding: 10px;
    height: fit-content;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 16px;
    align-items: center;
    width: 70%;
    margin: auto;
    margin-top: 50px;
`

const StyledInput = styled.input`
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
`

const AddButton = styled.button`
    border-radius: 16px;
    background-color: white;
    border: none;
    padding: 10px;
    width: 80px;
    display: block;
    margin-right: 0;
    margin-left: auto;
    cursor: pointer;
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
}

export function ReviewModal(props: ReviewModalProps) {
    const { current_book_id } = props;
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
        });
    }

    return (
        <ReviewModalContainer>
            <Form onSubmit={handleSubmit}>
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
                    onChange={onHeadlineChange} // shorthand for onChange={(e) => onChange(e)}
                />
                <StyledReviewTextArea 
                    id="review"
                    value={review}
                    placeholder={ "Add a review..."}
                    onChange={onTextAreaChange}
                />
                <AddButton onClick={()=>{}}>
                    Add
                </AddButton>
            </Form>
        </ReviewModalContainer>
    )
}