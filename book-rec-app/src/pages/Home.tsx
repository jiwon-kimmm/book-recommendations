import styled from 'styled-components';
import { MainPanel, MiddlePane, RightPane } from '../components/MainPanel';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Heading1 } from '../constants/Text';
import { ReviewModal } from '../components/ReviewModal';
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

export default function Home() {

    const [loading, setLoading] = useState<boolean>(false);
    const [formData, setFormData] = useState({user_id: "100"});
    const [recommendations, setRecommendations] = useState([]);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

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
        
        // setFormData({user_id: window.localStorage.getItem("userID") || '{}'});
        fetchRecommendations();
    }, []);

    return (
        <>
                { loading ? 
                    <Heading1>
                        Loading...
                    </Heading1> : 
                    <List>
                        {recommendations.map((bookRec) => (
                            <ListItem key={bookRec[2]}>
                                    <MiddlePane>
                                        <BookCard 
                                            title={bookRec[0]}
                                            author={bookRec[3]}
                                            rating={bookRec[4]}
                                            summary={bookRec[5]}
                                            image_url={bookRec[6]}
                                        />
                                    </MiddlePane>
                                    <RightPane>
                                        <ReviewModal current_book_id={bookRec[2]}></ReviewModal>
                                    </RightPane>
                            </ListItem>
                        ))}
                    </List>
                }
        </>
    );
}