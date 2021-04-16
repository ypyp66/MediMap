import React from "react";
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

function Deatil_Graph({ data }) {
  return (
    <ResponsiveContainer>
      <ComposedChart
        data={data}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="name" scale="auto" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="시" barSize={20} fill="#07a281" />
        <Bar dataKey="도" barSize={20} fill="#413ea0" />
        <Line type="monotone" dataKey="시 평균" stroke="#ff7300" />
        <Line type="monotone" dataKey="도 평균" stroke="#ff7300" />
        <Line type="monotone" dataKey="전체 평균" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default Deatil_Graph;
