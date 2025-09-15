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
import { WelcomeModal } from '../components/WelcomeModal';

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
    display: flex;
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
    const [recommendations, setRecommendations] = useState([]);
    const [cookies, setCookies] = useCookies(["access_token"]);
    const [userId, setUserId] = useState(() => window.localStorage.getItem("userID") || "");
    
    useEffect(() => {
        if (!cookies?.access_token) return;

        const fetchRecommendations = async () => {
            setLoading(true);
                    
            const recommendationsUrl = 'http://127.0.0.1:105/recommendations'
            const formData = new FormData();
            const id = window.localStorage.getItem("userID") || "";
            formData.append("user_id", id);

            // formData.append('user_id', userId);

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
        
        setUserId(window.localStorage.getItem("userID") || '{}');
        fetchRecommendations();
    }, [cookies?.access_token]);

    return (
        <>
            { !cookies?.access_token ? (
                <>
                    <MiddlePane>
                        <WelcomeModal />
                    </MiddlePane>
                    <RightPane />
                </>
            ) : loading ? (
                // If logged in and loading
                <>
                    <MiddlePane>
                        <LoadingScreen>
                            <ParagraphText>
                                {LoadingMessages[Math.floor(Math.random() * LoadingMessages.length)]}
                            </ParagraphText>
                            <StyledRingLoader 
                                loading={loading}
                                size={200}
                                color="#b9978540"
                            />
                        </LoadingScreen>
                    </MiddlePane>
                    <RightPane />
                </>
            ) : (
                <List>
                    {recommendations.length !== 0 ? (
                        recommendations.map((bookRec) => (
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
                    ) : (
                        <Heading1>None here</Heading1>
                    )}
                </List>
            )}
        </>
    );
}