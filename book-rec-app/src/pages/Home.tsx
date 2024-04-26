import styled from 'styled-components';
import { MainPanel, MiddlePane, RightPane } from '../components/MainPanel';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Heading1, Heading3, ParagraphText } from '../constants/Text';
import { ReviewModal } from '../components/ReviewModal';
import RingLoader from 'react-spinners/RingLoader'
import { LoadingMessages } from '../constants/LoadingMessages';
import { useCookies } from 'react-cookie';
import { dummyRecommendations } from '../data/books';

const List = styled.ul`
    list-style-type: none;
    margin: 0;
    padding: 0;
    width: 100%;
`
const ListItem = styled.li`
    width: 100%;
    margin: 0;
    padding: 0;
    display:flex;
    flex-direction: row;
`
const StyledRingLoader = styled(RingLoader)`
    margin-top: 10px;
`

const LoadingScreen = styled.div`
    margin-top: 20px;
    display: flex;
    flex-direction: column;
    height: auto;
    width: 67%;
    align-items: center;
    gap: 80px;
`


export default function Home() {

    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({user_id: "101"});
    const [recommendations, setRecommendations] = useState([]);
    // const [recommendations, setRecommendations] = useState<{ title: string; author: string; rating: string; summary: string; isbn: string; image_url: string; book_id: number }[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [userId, setUserId] = useState("");

    useEffect(() => {
        const fetchRecommendations = async () => {
            setLoading(true);
                    
            const recommendationsUrl = 'http://127.0.0.1:105/recommendations'
            axios.post(recommendationsUrl, formData, {
                headers: { 
                    "Content-Type": "multipart/form-data" 
                },
            })
            .then((response) => {
                setRecommendations(response.data);
                setLoading(false);
            });
        }
        
        // setUserId(window.localStorage.getItem("userID") || '{}');
        // setFormData({user_id: window.localStorage.getItem("userID") || '{}'});
        setUserId("53425");
        fetchRecommendations();
        // setRecommendations(dummyRecommendations);
    }, []);

    return (
        <>
                { loading ? 
                <>
                    <MiddlePane>
                        <LoadingScreen>
                            <ParagraphText>
                                {LoadingMessages[Math.floor(Math.random() * LoadingMessages.length)]}
                            </ParagraphText>
                            <StyledRingLoader 
                                loading={loading}
                                size={200}
                                color="silver"
                            />
                        </LoadingScreen>
                    </MiddlePane>
                    <RightPane />
                </>: 
                    <List>
                        {
                            recommendations.length != 0 ?
                            recommendations.map((bookRec) => (
                                // <ListItem key={bookRec.isbn}>
                                //             <BookCard 
                                //                 title={bookRec.title}
                                //                 author={bookRec.author}
                                //                 rating={bookRec.rating}
                                //                 summary={bookRec.summary}
                                //                 image_url={bookRec.image_url}
                                //                 book_id={bookRec.book_id}
                                //                 user_id={userId}
                                //             />
                                // </ListItem>
                                <ListItem key={bookRec[1]}>
                                            <BookCard 
                                                title={bookRec[0]}
                                                author={bookRec[3]}
                                                rating={bookRec[4]}
                                                summary={bookRec[5]}
                                                image_url={bookRec[6]}
                                                book_id={bookRec[1]}
                                                user_id={userId}
                                            />
                                        
                                </ListItem>
                            )) 
                            :
                            <Heading1>None here</Heading1>
                        }           
                    </List>
                }
        </>
    );
}