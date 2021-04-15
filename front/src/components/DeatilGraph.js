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
        <Bar dataKey="metro" barSize={20} fill="#413ea0" />
        <Bar dataKey="suburb" barSize={20} fill="#07a281" />
        <Line type="monotone" dataKey="metro_avg" stroke="#ff7300" />
        <Line type="monotone" dataKey="suburb_avg" stroke="#ff7300" />
        <Line type="monotone" dataKey="total_avg" stroke="#ff7300" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default Deatil_Graph;
