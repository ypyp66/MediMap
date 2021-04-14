import React from "react";
import Detail from "../components/Detail";
import ambul_medic_detail from "../data/ambul_medic_detail.json";
import { useLocation } from "react-router-dom";

function DetailContainer() {
  const location = useLocation();

  console.log(location);
  return <Detail data={ambul_medic_detail} />;
}

export default DetailContainer;
