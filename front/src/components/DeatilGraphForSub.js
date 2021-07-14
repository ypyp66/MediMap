import React, { useEffect, useState } from "react";
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

function DeatilGraphForSub({ data }) {
  return (
    <ResponsiveContainer>
      <ComposedChart data={data}>
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis dataKey="type" scale="auto" />
        <YAxis scale="log" domain={[1, "auto"]} allowDataOverflow />
        <Tooltip />
        <Legend />
        <Bar
          name="인구 50만 이상 지역"
          dataKey="시"
          barSize={20}
          fill="#07a281"
        />
        <Bar
          name="인구 50만 미만 지역"
          dataKey="도"
          barSize={20}
          fill="#413ea0"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}

export default DeatilGraphForSub;
