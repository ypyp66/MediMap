import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Button, Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import DeatilGraph from "./DeatilGraph";
import DeatilGraphForSub from "./DeatilGraphForSub";

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const MainContainer = styled.div`
  padding: 1rem;
  border: 1px solid lightgray;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  margin-top: 2rem;
  width: inherit;
  background-color: #dcdcdc;
  font-family: "Nanum Gothic Coding";
`;

const MainContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
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
  const [mainData, setMainData] = useState([]);
  const [btnIdx, setBtnIdx] = useState(0); //버튼인덱스
  const [dataForShowInSub, setDataForShowInSub] = useState();
  const history = useHistory();

  const indicator = {
    0: "의사 1인당 인구수",
    1: "병원 1개당 인구수",
    2: "응급시설(구급차, 의료인력)당 인구수",
    3: "진료받는 인구 비율",
  };

  useEffect(() => {
    //그래프 갯수 설정
    let arr = [];
    for (let i = 0; i < data[btnIdx].length; i += 17) {
      arr.push(data[btnIdx].slice(i, i + 17));
    }
    setMainData(arr);
  }, [btnIdx, data]);

  useEffect(() => {
    console.log(mainData);
  }, [mainData]);

  const handleClick = (e) => {
    console.log(e.currentTarget.value);
    setBtnIdx(parseInt(e.currentTarget.value));
  };

  console.log(data);

  useEffect(() => {
    const dataOrderByType = [];

    data[btnIdx]
      .filter((data) => data.name === name)
      .forEach((data) => {
        if (!(data.type in dataOrderByType)) {
          dataOrderByType.push({
            name: data.type,
            metro: data.metro,
            suburb: data.suburb,
          });
        }
      });
    setDataForShowInSub(dataOrderByType);
  }, [data, name, btnIdx]);

  return (
    <div style={{ padding: "2rem" }}>
      <Typography variant="h3">{name}</Typography>
      <MainContainer>
        <MainContent>
          <Typography variant="h6">{indicator[btnIdx]}</Typography>
          <ButtonContainer>
            <Button
              color="primary"
              variant="contained"
              value="0"
              style={{ marginRight: "5px" }}
              onClick={handleClick}
            >
              의사 수
            </Button>
            <Button
              color="primary"
              variant="contained"
              value="1"
              style={{ marginRight: "5px" }}
              onClick={handleClick}
            >
              병원 수
            </Button>
            <Button
              color="primary"
              variant="contained"
              value="2"
              style={{ marginRight: "5px" }}
              onClick={handleClick}
            >
              응급시설 수
            </Button>
            <Button
              color="primary"
              variant="contained"
              value="3"
              style={{ marginRight: "5px" }}
              onClick={handleClick}
            >
              진료횟수
            </Button>
          </ButtonContainer>
        </MainContent>
        <Grid container spacing={3}>
          {mainData.map((location, index) => (
            <Grid
              item
              xs
              style={{
                height: "30vh",
                background: "white",
                paddingBottom: "3rem",
                margin: "1rem",
              }}
            >
              <Typography variant="h6">
                {location[0].type && location[0].type}
              </Typography>
              <DeatilGraph key={btnIdx + index} data={location} />
            </Grid>
          ))}
        </Grid>
      </MainContainer>

      <SubContainer>
        <SubContent>
          sub
          <DeatilGraphForSub data={dataForShowInSub} />
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
