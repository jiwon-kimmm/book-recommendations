import { Heading1, Heading2Bold, ParagraphTextBold } from '../constants/Text';
import { MiddlePane, RightPane } from '../components/MainPanel';
import { WelcomeModal } from '../components/WelcomeModal';
import { useCookies } from 'react-cookie';
import styled from 'styled-components';
import { dummyRecommendations } from '../data/books';
import { useState, useEffect } from 'react';


const MainPane = styled.div`
    display: flex; 
    padding: 10px;
    margin-top: 20px;
    flex-direction: column;
`

const BookCarouselWrapper = styled.div`
    height: fit-content;
    margin-bottom: 50px;
`

const BookCarousel = styled.div`
    display: flex;
    gap: 100px;
`

const ListItem = styled.li`
    width: 50%;
    padding: 0;
    display: flex;
    flex-direction: column;
`

const ImageContainer = styled.div`
    width: 200px;
    height: auto;
`

const StyledImage = styled.img`
    object-fit: cover;
    width: 100%;
`

const LogoutButton = styled.button`
    border-radius: 30px;
    background-color: #B99785;
    border: none;
    width: 100px;
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

export default function MyProfile() {
    const [cookies, setCookies] = useCookies(["access_token"]);
    // const [topBooks, setTopBooks] = useState([]);
    const [topBooks, setTopBooks] = useState<{ title: string; author: string; rating: string; summary: string; isbn: string; image_url: string; book_id: number }[]>([]);

    useEffect(() => {
        setTopBooks(dummyRecommendations);
    }, [])

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
    }
    return (
        <>
            {!cookies.access_token ?
                <>
                    <MiddlePane>
                        <WelcomeModal />
                    </MiddlePane>
                    <RightPane />
                </>
            :
            <MainPane>
                <Heading1>My Profile</Heading1>
                <BookCarouselWrapper>
                    <Heading2Bold>
                        My Top Books
                    </Heading2Bold>
                    <BookCarousel>
                        {topBooks.length != 0 ?
                            topBooks.map((book) => (
                                <ListItem key={book.book_id}>
                                    {/* {book.title} */}
                                    <ImageContainer>
                                        <StyledImage src={book.image_url} />
                                    </ImageContainer>
                                    {/* <img src={book.image_url} /> */}
                                </ListItem>
                            )):
                            <Heading1>none here</Heading1>
                        }
                    </BookCarousel> 
                </BookCarouselWrapper>
                <BookCarouselWrapper>
                    <Heading2Bold>
                        My Top Books
                    </Heading2Bold>
                    <BookCarousel>
                        {topBooks.length != 0 ?
                            topBooks.map((book) => (
                                <ListItem key={book.book_id}>
                                    {/* {book.title} */}
                                    <ImageContainer>
                                        <StyledImage src={book.image_url} />
                                    </ImageContainer>
                                    {/* <img src={book.image_url} /> */}
                                </ListItem>
                            )):
                            <Heading1>none here</Heading1>
                        }
                    </BookCarousel> 
                </BookCarouselWrapper>
                <LogoutButton onClick={logout}>
                    <ParagraphTextBold>
                        Log out
                    </ParagraphTextBold>
                </LogoutButton>
            </MainPane>
            }
        </>
    );
}
