import React from "react";
import styled from "styled-components";
import { Button } from "@material-ui/core";

const ButtonContainer = styled.div`
  display: flex;
`;

const MainDetail = styled.div`
  display: flex;
  border: 1px solid lightgray;
`;

const SubDetail = styled.div`
  display: flex;
  border: 1px solid lightgray;
`;

function Detail() {
  const dummyData = [
    {
      name: "서울특별시",
    },
  ];
  return (
    <div>
      <MainDetail>main</MainDetail>
      <SubDetail>sub</SubDetail>
    </div>
  );
}

export default Detail;
