import React from 'react';
import styled from 'styled-components';
import { MainPanel } from '../components/MainPanel';
import BookCard from '../components/BookCard';
import { dummyRecommendations } from '../data/books';
import { WelcomeModal } from '../components/WelcomeModal';

export default function Home() {
    return (
        <MainPanel>
            <WelcomeModal />
            {/* {dummyRecommendations.map((bookRec) => (
                <BookCard 
                    title={bookRec.title}
                    author={bookRec.author}
                    rating={bookRec.rating}
                    summary={bookRec.summary}
                />
            ))} */}
        </MainPanel>
    );
}