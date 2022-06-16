import React, { useEffect } from "react";
import styled from "styled-components";
import Plus from "../../assets/images/plus";

const Button = ({ typeButton }) => {
  const checkButton = () => {
    switch (typeButton) {
      case "outline":
        return (
          <Outline>
            <InsideOutline>
              <Plus />
              <span>Upload</span>
            </InsideOutline>
          </Outline>
        );
      case "primary":
        return <Primary>Login</Primary>;
      case "outline large":
        return <OutlineLarge>Login</OutlineLarge>;
      case "outline small":
        return <OutLineSmall>Follow</OutLineSmall>;
      default:
        break;
    }
  };
  useEffect(() => {
    checkButton();
  }, []);

  return checkButton();
};

const Outline = styled.a`
  font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  display: block;
  cursor: pointer;
  span {
    font-style: normal;
    font-weight: 600;
    font-size: 16px;
    line-height: 24px;
    color: #161823;
  }
  &:hover {
    background-color: rgba(22, 24, 35, 0.03);
  }
`;
const InsideOutline = styled.div`
  min-width: 110px;
  padding: 0 16px;
  height: 36px;
  border: 1px solid rgba(22, 24, 35, 0.12);
  border-radius: 2px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Primary = styled.div`
  border-radius: 4px;
  border: none;
  color: rgba(255, 255, 255, 1);
  background-color: rgba(254, 44, 85, 1);
  min-width: 164px;
  min-height: 36px;
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  font-family: SofiaPro, PingFangSC, sans-serif;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 700;
  font-size: 16px;
  line-height: 22px;
  margin-left: 16px;
  min-width: 100px;
  &:hover {
    background: linear-gradient(0deg, rgba(0, 0, 0, 0.06), rgba(0, 0, 0, 0.06)),
      #fe2c55;
  }
`;
const OutlineLarge = styled.button`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  color: rgba(254, 44, 85, 1);
  border-color: rgba(254, 44, 85, 1);
  background-color: rgba(255, 255, 255, 1);
  min-width: 168px;
  min-height: 48px;
  font-size: 18px;
  line-height: 25px;
  font-weight: 600;
  font-family: SofiaPro, PingFangSC, sans-serif;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  margin-top: 20px;
  width: 100%;
  &:hover {
    background-color: rgba(254, 44, 85, 0.06);
  }
`;
const OutLineSmall = styled.div`
  border-width: 1px;
  border-style: solid;
  border-radius: 4px;
  color: rgba(254, 44, 85, 1);
  border-color: rgba(254, 44, 85, 1);
  background-color: rgba(255, 255, 255, 1);
  min-width: 106px;
  min-height: 28px;
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  font-family: ProximaNova, PingFangSC, sans-serif;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  position: relative;
  align-items: center;
  justify-content: center;
  padding: 6px 8px;
  user-select: none;
  cursor: pointer;
  box-sizing: border-box;
  right: 0;
  position: absolute;
  top: 28px;
  min-width: 88px;
  padding: 0 10px;
  &:hover {
    background-color: rgba(254, 44, 85, 0.06);
  }
`;

export default Button;
