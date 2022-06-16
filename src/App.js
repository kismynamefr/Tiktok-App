import React, { Fragment } from 'react';
import { BrowserRouter as Router } from "react-router-dom";
import { Switch, Route, Routes } from "react-router-dom";
import Nav from './components/Navbar/Nav';
import styled from 'styled-components';
import './App.css';
import Sidebar from './components/Sidebar/Sidebar';
import Home from './components/Homepage/Home';

function App() {

  return (
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
