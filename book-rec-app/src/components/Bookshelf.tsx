import styled from "styled-components";
import { Heading2Bold } from "../constants/Text";
import { GRAY } from "../constants/Colours";


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
`

const BookshelfDivider = styled.hr`
    background: #D9D9D9;
`

export default function Bookshelf () {
    return (
        <BookshelfContainer>
            <Heading2Bold>My Bookshelf</Heading2Bold>
            <BookshelfDivider />
        </BookshelfContainer>
    );
}