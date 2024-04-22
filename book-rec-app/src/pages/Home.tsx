import styled from 'styled-components';
import { MainPanel } from '../components/MainPanel';
import BookCard from '../components/BookCard';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Heading1 } from '../constants/Text';


const List = styled.ul`
    list-style-type: none;
`


export default function Home() {

    const [loading, setLoading] = useState<boolean>(true);
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
            
        fetchRecommendations();
    }, []);

    

    return (
        <MainPanel>
            { loading ? 
                <Heading1>
                    Loading...
                </Heading1> : 
                <List>
                    {recommendations.map((bookRec) => (
                        <li key={bookRec[1]}>
                            <BookCard 
                            title={bookRec[0]}
                            author={bookRec[3]}
                            rating={bookRec[4]}
                            summary={bookRec[5]}
                            image_url={bookRec[6]}
                            // goodreads_book_id is bookRec[2]
                            // fetchSummary(bookRec[2], bookRec[0])
                            />
                        </li>
                        
                    ))}
                </List>
            }
        </MainPanel>
    );
}