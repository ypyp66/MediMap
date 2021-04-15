import React, { useState, useEffect } from "react";

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
  BarChart,
} from "recharts";

function Deatil_Graph_For_Sub({ data, domain}) {

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
        <YAxis scale="log" domain={[0.1, 'auto']} allowDataOverflow />
        <Tooltip />
        <Legend />
        <Bar dataKey="metro" barSize={20} fill="#413ea0" />
        <Bar dataKey="subrub" barSize={20} fill="#07a281" />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default Deatil_Graph_For_Sub;
