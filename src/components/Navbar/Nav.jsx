import React from "react";
import styled from "styled-components";
import Tiktoklogo from "../assets/images/tiktoklogo";
import SearchNav from "./Search/searchNav";
import Button from "./Button/Button";
import SeeMorebtn from "./Button/SeeMorebtn";

const Nav = () => {
  return (
    <Container>
      <Body>
        <Tiktoklogo typeLogo={"PC"} />
        <SearchNav />
        <ButtonPlace>
          <Button typeButton={"outline"} />
          <Button typeButton={"primary"} />
          <SeeMorebtn />
        </ButtonPlace>
      </Body>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  justify-content: space-around;
  box-shadow: 0px 1px 1px rgb(0 0 0 / 12%);
  height: 60px;
  width: 100%;
  top: 0;
  position: fixed;
  align-items: center;
  background: rgba(255, 255, 255, 1);
  z-index: 1000;
`;
const Body = styled.div`
  width: 100%;
  display: flex;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  max-width: 1150px;
  padding-right: 24px;
  padding-left: 20px;
`;
const ButtonPlace = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;
`;
export default Nav;
