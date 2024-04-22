import React from 'react';
import { Heading1 } from '../constants/Text';
import { MainPanel } from '../components/MainPanel';
import { WelcomeModal } from '../components/WelcomeModal';

export default function MyProfile() {
    return (
        <MainPanel>
            <WelcomeModal />
        </MainPanel>
    );
}
