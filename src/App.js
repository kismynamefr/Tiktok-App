
import { Fragment } from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import styled from 'styled-components';
import './App.css';
import Home from './components/Homepage/Home';
import Nav from './components/Navbar/Nav';
import Sidebar from './components/Sidebar/Sidebar';
import AuthContextProvider from "./Hooks/AuthContextProvider";

function App() {

  return (
    <AuthContextProvider>
      <Router>
        <Fragment>
          <Nav />
          <Body>
            <OnBody>
              <Sidebar />
              <Routes>
                <Route exact path="/" element={<Home />} />
              </Routes>
            </OnBody>
          </Body>
        </Fragment>
      </Router>
    </AuthContextProvider>
  );
}

const Body = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`
const OnBody = styled.div`
  margin-top: 60px;
  display: flex;
  width: 100vw;
  max-width: 1150px;
  justify-content: space-between;
  align-self: center;
  flex: 1 1 auto;
`

export default App;
