import React from 'react';
import { Heading1 } from '../constants/Text';
import { MainPanel, MiddlePane, RightPane } from '../components/MainPanel';
import { WelcomeModal } from '../components/WelcomeModal';
import styled from 'styled-components';
import { useCookies } from 'react-cookie';
import { SearchBar } from '../components/SearchBar';

export default function MyProfile() {
    const [cookies, setCookies] = useCookies(["access_token"]);

    const logout = () => {
        setCookies("access_token", "")
        window.localStorage.removeItem("userID");
    }
    return (
        <>
            <MiddlePane>
                {!cookies.access_token ?
                    (<WelcomeModal />):
                    <div>
                        <Heading1>Cookies present</Heading1>
                        <button onClick={logout}>Logout</button>
                    </div>
                    
                }
            </MiddlePane>
            <RightPane></RightPane>
        </>
    );
}
