import React from 'react';
import styled from 'styled-components';
import { Heading3 } from '../constants/Text';
import { Link } from 'react-router-dom';
import { GRAY } from '../constants/Colours';

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
    flex: 70%;
    display: flex;
    align-items: center;
    padding-left: 5%;
`

const RightContainer = styled.div`
    flex: 30%;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding-right: 50px;
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

export default function Navbar() {
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