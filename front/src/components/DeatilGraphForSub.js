import React from "react";

import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Deatil_Graph_For_Sub({ data, domain }) {
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
        {console.log(data[0])}
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="type" scale="auto" />
        <YAxis scale="log" domain={[0.1, "auto"]} allowDataOverflow />
        <Tooltip />
        <Legend />
        {data[0].도 && <Bar dataKey="도" barSize={20} fill="#413ea0" />}
        {data[0].시 && <Bar dataKey="시" barSize={20} fill="#07a281" />}
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default Deatil_Graph_For_Sub;
