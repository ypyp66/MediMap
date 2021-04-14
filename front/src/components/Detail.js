import React, { PureComponent } from "react";
import styled from "styled-components";
import { Button, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ButtonContainer = styled.div`
  display: flex;
`;

const MainContainer = styled.div`
  display: flex;
  margin-top: 2rem;
  width: 100%;
  height: 100%;
`;

const MainContent = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  height: 50vw;
`;

const SubContainer = styled.div`
  display: flex;
  margin-top: 2rem;
`;

const SubContent = styled.div`
  flex: 1;
  border: 1px solid lightgray;
  margin-bottom: 2rem;
`;

function Detail({ name, data }) {
  const history = useHistory();
  return (
    <div style={{ padding: "2rem", width: "100%", height: "100%" }}>
      <Typography variant="h3">{name}</Typography>
      <MainContainer>
        <MainContent>
          {data && (
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
              {console.log(data)}
              <CartesianGrid stroke="#f5f5f5" />
              <XAxis dataKey="name" scale="band" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="metro" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="metro_avg" stroke="#ff7300" />
              <Bar dataKey="suburb" barSize={20} fill="#413ea0" />
              <Line type="monotone" dataKey="suburb_avg" stroke="#ff7300" />
            </ComposedChart>
          )}
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
