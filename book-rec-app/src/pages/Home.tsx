import React from 'react';
import styled from 'styled-components';
import { MainPanel } from '../components/MainPanel';
import BookCard from '../components/BookCard';

const HomeContainer = styled.div`
`

export default function Home() {
    return (
        <>
            <MainPanel>
                <BookCard 
                    title="Title of a Book" 
                    author="Author Name" 
                    rating="5.0"
                    summary="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer fringilla dui sem, vel convallis nunc semper a. Aliquam suscipit porttitor orci ut molestie. Donec faucibus pharetra congue. Phasellus condimentum, nulla at pellentesque semper, lectus libero rutrum augue, vitae varius neque magna sit amet magna. In id mattis libero, eu lobortis erat. Vivamus hendrerit neque et vulputate condimentum. Nulla nisi dolor, fermentum eu elit vel, condimentum aliquet ex. Donec nec lacus ipsum."
                />
            </MainPanel>
        </>
    );
}