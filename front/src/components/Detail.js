import React, { PureComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeatilGraph from "./DeatilGraph";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const MainContainer = styled.div`
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: inherit;
  height: inherit;
  background-color: #dcdcdc;
`;

const MainContent = styled.div`
  width: 100%;
  height: 50vh;
  background-color: white;
`;

const SubContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const SubContent = styled.div`
  border: 1px solid lightgray;
  margin-bottom: 2rem;
`;

function Detail({ name, data }) {
  const history = useHistory();
  console.log(data);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h3">{name}</Typography>
      <MainContainer>
        <ButtonContainer>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
          >
            의사 수
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
          >
            병원 수
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
          >
            응급시설 수
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
          >
            진료횟수
          </Button>
        </ButtonContainer>
        <MainContent>
          <DeatilGraph data={data} />
        </MainContent>
      </MainContainer>
      <SubContainer>
        <SubContent>sub</SubContent>
      </SubContainer>
      <Button
        fullWidth
        color="secondary"
        variant="contained"
        onClick={() => {
          history.push({ pathname: "/" });
        }}
      >
        뒤로가기
      </Button>
    </div>
  );
}

export default Detail;
