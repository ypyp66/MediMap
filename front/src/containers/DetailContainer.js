import React from "react";
import Detail from "../components/Detail";
import data from "../data/detail_all_combined.json";

function DetailContainer({ location }) {
  const { name } = location.state;

  return <Detail name={name} data={data} />;
}

export default DetailContainer;
