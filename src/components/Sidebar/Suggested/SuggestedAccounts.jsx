import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import Circle from "../../assets/images/circle";
import axios from "axios";

const SuggestedAccounts = () => {
  const [dataUser, setDataUser] = useState([]);
  const [seeAll, setSeeAll] = useState(false);

  const fetchUser = async () => {
    await axios.get(`http://localhost:5506/users/`).then((data) => {
      setDataUser(data.data);
    });
  };

  const handleSeeAll = () => {
    return !seeAll ? setSeeAll(true) : setSeeAll(false);
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <UserContainer>
      <p>Suggested accounts</p>
      {dataUser.map((res, index) => {
        return (
          <UserLinkContainer key={index} dis={seeAll ? "flex" : (index > 4 ? "none" : "flex")}>
            <UserAvatar href="">
              <div>
                <span>
                  <img src={res.avatar} alt="" />
                </span>
              </div>
            </UserAvatar>
            <UserContentLink href="">
              <UserTitleWrapper>
                <h4>{res.username}</h4>
                {res.tick ? <Circle /> : null}
              </UserTitleWrapper>
              <p>{res.fullname}</p>
            </UserContentLink>
          </UserLinkContainer>
        );
      })}
      <ShowMoreTextContainer onClick={handleSeeAll}>
        {seeAll ? <p>See Less</p> : <p>See All</p>}
      </ShowMoreTextContainer>
    </UserContainer>
  );
};

const UserContainer = styled.div`
  padding: 16px 0;
  color: rgba(22, 24, 35, 0.75);
  font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
  font-weight: 600;
  font-size: 14px;
  line-height: 20px;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 8px;
    right: 8px;
    top: 0;
    height: 1px;
    background: rgba(22, 24, 35, 0.12);
    transform: scaleY(0.5);
  }
  p {
    margin-bottom: 8px;
    font-size: 14px;
    line-height: 20px;
  }
`;
const UserAvatar = styled.div`
  div {
    width: 32px;
    height: 32px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 12px;
    flex: 0 0 48px;
    span {
      width: 32px;
      height: 32px;
      display: inline-block;
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-feature-settings: "tnum";
      position: relative;
      overflow: hidden;
      color: #fff;
      white-space: nowrap;
      text-align: center;
      vertical-align: middle;
      line-height: 32px;
      border-radius: 50%;
      background-color: rgba(136, 136, 136, 0.5);
      border-color: rgba(22, 24, 35, 0.12);
      border-width: 0.5px;
      cursor: pointer;
      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }
  }
`;
const UserLinkContainer = styled.div`
  padding: 8px;
  display: ${(props) => props.dis};
  flex-direction: row;
  align-items: center;
  position: relative;
  border-radius: 4px;
  transition: background 200ms ease-in-out 0s;
  &:hover {
    background: rgba(22, 24, 35, 0.03);
  }
`;
const UserContentLink = styled.a`
  flex-grow: 1;
  height: 32px;
  text-decoration: none;
  p {
    color: rgba(22, 24, 35, 0.75);
    font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
    font-weight: 400;
    font-size: 12px;
    line-height: 15px;
    max-width: 260px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const UserTitleWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  h4 {
    color: rgb(22, 24, 35);
    font-family: SofiaPro, Arial, Tahoma, PingFangSC, sans-serif;
    font-weight: 700;
    font-size: 16px;
    line-height: 22px;
    margin-top: -2px;
    max-width: 260px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const ShowMoreTextContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px 8px;
  margin-top: 8px;
  cursor: pointer;
  p {
    color: rgb(254, 44, 85);
    font-family: ProximaNova, Arial, Tahoma, PingFangSC, sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 20px;
  }
`;
export default memo(SuggestedAccounts);
