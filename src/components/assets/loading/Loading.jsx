import React from "react";
import styled from "styled-components";

const Loading = () => {
  return <LoadingSearch />;
};

const LoadingSearch = styled.div`
  height: 16px;
  width: 16px;
  color: rgba(22, 24, 35, 0.34);
  position: relative;
  display: inline-block;
  border: 5px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: rotate 1s linear infinite;

  @keyframes rotate {
    0% {
      transform: rotate(0);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Loading;
