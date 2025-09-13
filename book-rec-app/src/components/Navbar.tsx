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
    background-color: white;
    display: flex;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    border-bottom-style: solid;
    border-bottom-color: #D9D9D9;
    z-index: 2;
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
    cursor: pointer;
`

type BookDataProps = {
    title: string;
    book_id: string;
}

export default function Navbar() {
    const [bookData, setBookData] = useState<BookDataProps[]>([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:105/get-books')
            .then(res => {
                setBookData(res.data); 
                console.log(res.data);
                // setBookData(dummyRecommendations);
            })
    }, [])

    return (
        <NavbarContainer>
            <NavbarInnerContainer>
                <LeftContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/">Home</NavbarLink>
                    </NavbarLinkContainer>
                    {/* <NavbarLinkContainer>
                        <NavbarLink to="/bestsellers">Best Sellers</NavbarLink>
                    </NavbarLinkContainer> */}
                </LeftContainer>
                <MiddleContainer>
                    <SearchBarDiv>
                        <SearchBar placeholder="Search for a book..." data={bookData} />
                    </SearchBarDiv>
                </MiddleContainer>
                <RightContainer>
                    <NavbarLinkContainer>
                        <NavbarLink to="/my-profile">My Profile</NavbarLink>
                    </NavbarLinkContainer>
                </RightContainer>
            </NavbarInnerContainer>
        </NavbarContainer>
    );
}