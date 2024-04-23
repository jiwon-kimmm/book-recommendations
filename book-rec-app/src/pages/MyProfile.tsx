import React from 'react';
import { Heading1 } from '../constants/Text';
import { MainPanel, MiddlePane, RightPane } from '../components/MainPanel';
import { WelcomeModal } from '../components/WelcomeModal';
import styled from 'styled-components';

export default function MyProfile() {
    return (
        <>
            <MiddlePane>
                <WelcomeModal />
            </MiddlePane>
            <RightPane></RightPane>
        </>
    );
}
