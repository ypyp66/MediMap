import React from "react";
import Detail from "../components/Detail";
import data from "../data/detail_all_combined.json";

function DetailContainer({ location }) {
  const { name } = location.state;
  const { indication } = location.state;

  return <Detail name={name} data={data} indication = {indication} />;
}

export default DetailContainer;
