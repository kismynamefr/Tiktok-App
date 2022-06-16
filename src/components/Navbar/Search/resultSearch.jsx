import React from "react";
import styled from "styled-components";
import Loading from "../../assets/loading/Loading";
import Circle from "../../assets/images/circle";

const ResultSearch = ({ searchResult, isPending }) => {
  if (searchResult.length === 0) {
    return (
      <Container>
        <Title>No Result</Title>
      </Container>
    );
  }

  return (
    <Container>
      {isPending ? (
        <Loading />
      ) : (
        <>
          <Title>Tài Khoản</Title>
          {searchResult &&
            searchResult.map((res, index) => (
              <ResultAccount key={index}>
                <span style={{ width: "40px", height: "40px" }}>
                  <img src={res.avatar} alt="" />
                </span>
                <TitleAccount>
                  <h4>
                    {res.username} {res.tick ? <Circle /> : null}
                  </h4>
                  <p>{res.fullname}</p>
                </TitleAccount>
              </ResultAccount>
            ))}
        </>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  width: 100%;
  z-index: 99999;
  margin-top: 8px;
  background: rgb(255, 255, 255);
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 12px;
  border-radius: 8px;
  padding-top: 8px;
  box-sizing: border-box;
  max-height: min((100vh - 96px) - 60px, 734px);
  bottom: -300px;
  right: 0;
  overflow: hidden auto;
  inset: 0px auto auto 0px;
  transform: translate3d(0, 50px, 0px);
`;
const Title = styled.div`
  height: 30px;
  padding: 5px 12px;
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: rgba(22, 24, 35, 0.5);
`;
const ResultAccount = styled.div`
  padding: 9px 16px;
  cursor: pointer;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  span {
    display: inline-block;
    box-sizing: border-box;
    margin: 0px 12px 0px 0px;
    padding: 0px;
    font-feature-settings: "tnum";
    position: relative;
    overflow: hidden;
    color: rgb(255, 255, 255);
    white-space: nowrap;
    text-align: center;
    vertical-align: middle;
    line-height: 32px;
    border-radius: 50%;
    background-color: rgba(136, 136, 136, 0.5);
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  &:hover {
    background: #d0cece75;
  }
`;
const TitleAccount = styled.div`
  flex: 0 1 auto;
  min-width: 0px;
  h4 {
    font-size: 16px;
    line-height: 22px;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: flex;
    gap: 0.3rem;
  }
  p {
    font-size: 14px;
    line-height: 20px;
    color: rgba(22, 24, 35, 0.5);
    font-weight: 400;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

export default ResultSearch;
