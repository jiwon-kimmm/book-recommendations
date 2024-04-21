import styled from "styled-components";
import { Heading1, Heading2, Heading3, ParagraphText } from "../constants/Text";
import { GRAY } from "../constants/Colours";


const Card = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    overflow: hidden;
    margin-top: 20px;
`
const CardSubcontainer = styled.div`
    width: 50%;
    background-color: ${GRAY};
    padding: 50px;
    float: left;
`

const RightCardSubcontainer = styled(CardSubcontainer)`
    text-align: left;
    border-radius: 0px 30px 30px 0px;
`
const LeftCardSubcontainer = styled(CardSubcontainer)`
    border-radius: 30px 0px 0px 30px;
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