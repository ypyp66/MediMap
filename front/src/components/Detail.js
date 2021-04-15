import React, { PureComponent, useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeatilGraph from "./DeatilGraph";
import DeatilGraphForSub from "./DeatilGraphForSub";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 1rem;
`;

const MainContainer = styled.div`
  padding: 1rem;
  border: 1px solid lightgray;
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
  width: 100%;
  height: 50vh;
  background-color: aliceblue;
  border: 1px solid lightgray;
  margin-bottom: 2rem;
`;

function Detail({ name, data, indication }) {
  const history = useHistory();
  const [mainIndication, setMainIndication] = useState(indication);
  const [dataForShowInSub, setDataForShowInSub] = useState();
  console.log(data);

  useEffect(() => {
    const dataOrderByType = []
  
    data[mainIndication]
    .filter(data => data.name === name)
    .map((data => {
      if (!(data.type in dataOrderByType)) {
        dataOrderByType.push({
          'name': data.type,
          'metro': data.metro,
          'suburb': data.suburb
        })}
    }));

    setDataForShowInSub(dataOrderByType)
  }, [mainIndication])

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h3">{name}</Typography>
      <MainContainer>
        <ButtonContainer>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
            onClick = {() => setMainIndication(0)}
          >
            의사 수
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
            onClick = {() => setMainIndication(1)}
          >
            병원 수
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
            onClick = {() => setMainIndication(2)}
          >
            응급시설 수
          </Button>
          <Button
            color="primary"
            variant="contained"
            style={{ marginRight: "5px" }}
            onClick = {() => setMainIndication(3)}
          >
            진료횟수
          </Button>
        </ButtonContainer>
        <MainContent>
          <DeatilGraph data={data[mainIndication]} />
        </MainContent>
      </MainContainer>

      <SubContainer>
        <SubContent>sub
          <DeatilGraphForSub data = {dataForShowInSub} />
        
        </SubContent>
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
