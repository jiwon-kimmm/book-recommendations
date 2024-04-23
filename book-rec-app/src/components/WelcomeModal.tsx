import styled from "styled-components";
import { useState, useEffect } from "react";
import { GRAY } from "../constants/Colours";
import { Heading2Bold, Heading3, ParagraphText } from "../constants/Text";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'

const ModalWrapper = styled.div`
    background-color: ${GRAY};
    width: 400px;
    height: auto;
    padding: 6px;
    margin: 0 auto;
    margin-top: 120px;
    text-align: center;
    border-radius: 10px;
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

const SubmitButton = styled.button`
    width: 100%;
    background-color: black;
    color: white;
    border-radius: 20px;
    padding: 12px;
    cursor: pointer;
    border: none;
`

const ChangeLoginButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin: 40px;
`

const defaultFormData = {
    username: "",
    password: "",
}

export function WelcomeModal() {
    const [formData, setFormData] = useState(defaultFormData);
    const { username, password } = formData;
    const [login, setLogin] = useState<boolean>(true);
    const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate();

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prevState) => ({
            ...prevState,
            [event.target.id]: event.target.value,
        }));
    };

    const handleNotMember = async () => {
        setLogin(!login);
    };

    const handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault();
        
        setFormData(defaultFormData);

        if (login) {
            console.log(formData);

            const url = 'http://127.0.0.1:105/log-in';
            axios.post(url, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
            })
                .then((response) => {
                    console.log(response.data);
                    setCookies("access_token", response.data.token);
                    window.localStorage.setItem("userID", response.data.user_id);
                    // navigate("/")
                    navigate("/bestsellers")
                });
        } else {
            const url = 'http://127.0.0.1:105/sign-up';
            axios.post(url, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
            })
                .then((response) => {
                    console.log(response.data);
                    setLogin(!login);
                    navigate("/my-profile");
                });
        }
    };

    return (
        <ModalWrapper>
            <Heading2Bold>{ login ? "Welcome back" : "Welcome" }</Heading2Bold>
            <Heading3>Here is a blurb</Heading3>
            <Form onSubmit={handleSubmit}>
                <StyledInput 
                    type="text"
                    id="username"
                    value={username}
                    placeholder={ login ? "Enter your username" : "Create a username"}
                    onChange={onChange} // shorthand for onChange={(e) => onChange(e)}
                />
                <StyledInput 
                    type="password"
                    id="password"
                    value={password}
                    placeholder={ login ? "Enter your password" : "Create a password"}
                    onChange={onChange}
                /> 
                { login ? 
                    <SubmitButton>Log in</SubmitButton> : 
                    <SubmitButton>Create account</SubmitButton>
                }
            </Form>
            <ChangeLoginButton onClick={handleNotMember}>{ login ? "Not a member? Sign up" : "Already a member? Log in" }</ChangeLoginButton>
        </ModalWrapper>
    );
}
