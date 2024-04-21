import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import { createGlobalStyle, styled } from 'styled-components';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Navbar from './components/Navbar';
import Bookshelf from './components/Bookshelf';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
}
`;

const PageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: white;
  margin-top: 80px;
`
const LeftPane = styled.div`
  flex: 25%;
  display: flex;
  background-color: white;
  margin-top: 20px;
`
const MiddlePane = styled.div`
  flex: 50%;
  display: flex;
  justify-content: center;
`
const RightPane = styled.div`
  flex: 25%;
  display: flex;
  background-color: white;
  margin-top: 20px;
`

function App() {
  
  return (
    <Router>
      <GlobalStyle />

      <Navbar />

      <PageBody>

        <LeftPane>
          <Bookshelf />
        </LeftPane>

        <MiddlePane>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-profile" element={<MyProfile />} />
          </Routes>
        </MiddlePane>

        <RightPane />

      </PageBody>
      
    </Router>
  );
}

export default App
