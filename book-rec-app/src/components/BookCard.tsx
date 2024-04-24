import styled from "styled-components";
import { Heading1, Heading2, Heading3, ParagraphText } from "../constants/Text";
import { GRAY } from "../constants/Colours";
import Heart from "../assets/heart.svg"
import Checkmark from "../assets/checkmark.svg";
import { MiddlePane, RightPane } from "./MainPanel";
import { ReviewModal } from "./ReviewModal";
import { useState } from "react";

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
}

export default function BookCard(props: BookCardProps) {
    const { title, author, rating, summary, image_url, book_id } = props;
    const [review, setReview] = useState<boolean>(false);

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
                                <ReactionIcon src={Checkmark} onClick={createReview}/>
                        </ReactionContainer>
                    </RightCardSubcontainer>
                </Card>
            </MiddlePane>
            <RightPane>
                {review && 
                    (<ReviewModal current_book_id={book_id}></ReviewModal>)
                }
            </RightPane>
        </>
    );
}