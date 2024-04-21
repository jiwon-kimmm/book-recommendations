import styled from "styled-components";
import { useState } from "react";
import { GRAY } from "../constants/Colours";
import { Heading2Bold, Heading3, ParagraphText } from "../constants/Text";

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

const Form = styled.div`
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

const LoginButton = styled.button`
    width: 100%;
    background-color: black;
    color: white;
    border-radius: 20px;
    padding: 12px;
    cursor: pointer;
`

const NotMemberButton = styled.button`
    border: none;
    background: none;
    cursor: pointer;
    margin: 40px;
`

export function WelcomeModal() {
    const [login, setLogin] = useState<boolean>(true);

    const handleNotMember = async () => {
        setLogin(true);
    }

    return (
        <ModalWrapper>
            <Heading2Bold>Welcome</Heading2Bold>
            <Heading3>Here is a blurb</Heading3>
            <Form>
                <StyledInput placeholder="Create a username"/>
                <StyledInput placeholder="Create a password" /> 
                <LoginButton>Log in</LoginButton>
            </Form>
            <NotMemberButton onClick={handleNotMember}>Not a member? Sign up</NotMemberButton>
        </ModalWrapper>
    );
}
