import React, { PureComponent } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import { useLocation, useHistory } from "react-router-dom";
import {
  ComposedChart,
  Line,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const Outer = styled.div`
  padding: 2rem;
`;

const ButtonContainer = styled.div`
  display: flex;
`;
const MainContainer = styled.div`
  display: flex;
  margin-bottom: 2rem;
  margin-top: 2rem;
`;

const MainContent = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  width: 50vw;
  height: 50vh;
  margin-right: 1rem;
`;

const SubDetail = styled.div`
  display: flex;
  border: 1px solid lightgray;
  margin-bottom: 2rem;
`;

function Detail({ data }) {
  const location = useLocation();
  const history = useHistory();

  console.log(location, data);
  return (
    <Outer>
      <Typography variant="h3">{location.state.name}</Typography>
      <MainContainer>
        <MainContent>
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="metro" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </MainContent>
        <MainContent>
          <ResponsiveContainer>
            <ComposedChart
              width={500}
              height={400}
              data={data}
              margin={{
                top: 20,
                right: 20,
                bottom: 20,
                left: 20,
              }}
            >
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="uv" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="uv" stroke="#ff7300" />
            </ComposedChart>
          </ResponsiveContainer>
        </MainContent>
      </MainContainer>
      <SubDetail>sub</SubDetail>
      <Button
        fullWidth
        variant="contained"
        color="secondary"
        onClick={() => {
          history.push({ pathname: "/" });
        }}
      >
        뒤로가기
      </Button>
    </Outer>
  );
}

export default Detail;
