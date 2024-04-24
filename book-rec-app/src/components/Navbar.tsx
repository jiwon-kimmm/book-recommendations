import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { GRAY } from '../constants/Colours';
import { SearchBar } from './SearchBar';
import { dummyRecommendations } from '../data/books';
import axios from 'axios';

const NavbarContainer = styled.nav`
    width: 100%;
    height: 80px;
    background-color: ${GRAY};
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
`
const LeftContainer = styled.div`
    flex: 33%;
    display: flex;
    align-items: center;
    padding-left: 5%;
`

const MiddleContainer = styled.div`
    display: flex;
    flex: 33%;
`

const RightContainer = styled.div`
    flex: 34%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;
`

const SearchBarDiv = styled.div`
    margin-top: 22px;
`

const NavbarInnerContainer = styled.div`
    width: 100%;
    height: 80px;
    display: flex;
`
const NavbarLinkContainer = styled.div`
    display: flex;
`
const NavbarLink = styled(Link)`
    color: black;
    text-decoration: none;
    font-size: large;
    margin: 20px;
`
const NavbarExtendedContainer = styled.div`
    
`

type BookDataProps = {
    title: string;
}

export default function Navbar() {
    const [bookData, setBookData] = useState<BookDataProps[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:105/get-books')
            .then(res => {
                setBookData(res.data); 
                // setBookData(dummyRecommendations);
                console.log(res.data.slice(0, 99));
            })
        console.log(dummyRecommendations);
    }, [])

    return (
        <NavbarContainer>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/">Home</NavbarLink>
                    </NavbarLinkContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/bestsellers">Best Sellers</NavbarLink>
                    </NavbarLinkContainer>
                </LeftContainer>
                <MiddleContainer>
                    <SearchBarDiv>
                        <SearchBar placeholder="Search" data={bookData} />
                    </SearchBarDiv>
                </MiddleContainer>
                <RightContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/my-profile">My Profile</NavbarLink>
                    </NavbarLinkContainer>
                </RightContainer>
            </NavbarInnerContainer>
            <NavbarExtendedContainer></NavbarExtendedContainer>
        </NavbarContainer>
    );
}