import styled from "styled-components";
import { Heading1, Heading2, Heading3, ParagraphText } from "../constants/Text";
import { GRAY } from "../constants/Colours";


const Card = styled.div`
    width: 100%;
    height: auto;
    background-color: ${GRAY};
    border-radius: 6px;
    box-shadow: 4px 4px;
    display: flex;
`
const CardSubcontainer = styled.div`
    width: 50%;
    background-color: pink;
    padding: 50px;
    border: 1px solid black;
    float: left;
`

const RightCardSubcontainer = styled(CardSubcontainer)`
    text-align: left;
`
const LeftCardSubcontainer = styled(CardSubcontainer)`
    text-align: center;
    align-items: center;
`

const Image = styled.div`
    width: 300px;
    height: 400px;
    background-color: white;
`

interface BookCardProps {
    title: string;
    author: string;
    rating: string;
    summary: string;
}

export default function BookCard(props: BookCardProps) {
    const { title, author, rating, summary } = props;
    return (
        <Card>
            <LeftCardSubcontainer>
                <Image />
            </LeftCardSubcontainer>
            <RightCardSubcontainer>
                <Heading1>{title}</Heading1>
                <Heading2>{author}</Heading2>
                <Heading3>{rating}</Heading3>
                <ParagraphText>{summary}</ParagraphText>
            </RightCardSubcontainer>
        </Card>
    );
}