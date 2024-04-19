import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react'
import { createGlobalStyle } from 'styled-components';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Navbar from './components/Navbar';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
}
`;

function App() {

  return (
    <Router>
      <GlobalStyle />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/my-profile" element={<MyProfile />}/>
      </Routes>
    </Router>
  );
}

export default App
