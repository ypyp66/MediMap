import React from "react";
import Detail from "../components/Detail";
import * as data from "../data/ambul_medic_detail";

function DetailContainer({ location }) {
  const { name } = location.state;

  console.log(data.ambul);
  return <Detail name={name} data={data.ambul} />;
}

export default DetailContainer;
