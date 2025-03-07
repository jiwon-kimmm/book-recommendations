import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createGlobalStyle, styled } from 'styled-components';
import Home from './pages/Home';
import MyProfile from './pages/MyProfile';
import Navbar from './components/Navbar';
import Bookshelf from './components/Bookshelf';
import Bestsellers from './pages/Bestsellers';
import BookView from './pages/BookView';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: 'Inter', sans-serif;
    margin: 0;
    padding: 0;
    background-color: #F4F3F2;
}
`;

const PageBody = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: #F4F3F2;
  margin-top: 80px;
`
const LeftPane = styled.div`
  flex: 25%;
  display: flex;
  background-color: #F4F3F2;
  margin-top: 20px;
`

const TestPane = styled.div`
  flex: 75%;
  display: flex;
  background-color: #F4F3F2;
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
        
        <TestPane>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/my-profile" element={<MyProfile />} />
            <Route path="/bestsellers" element={<Bestsellers />} />
            <Route path="/:bookId" element={<BookView />} />
          </Routes>
        </TestPane>

      </PageBody>
    </Router>
  );
}

export default App
