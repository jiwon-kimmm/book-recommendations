import styled from "styled-components";
import { Heading2Bold } from "../constants/Text";
import { GRAY } from "../constants/Colours";


const BookshelfContainer = styled.div`
    height: 100vh;
    width: 20%;
    position: fixed;
    background-color: ${GRAY};
    box-sizing: border-box;
    padding: 30px;
    margin-right: 20px;
`

export default function Bookshelf () {
    return (
        <BookshelfContainer>
            <Heading2Bold>My Bookshelf</Heading2Bold>
        </BookshelfContainer>
    );
}