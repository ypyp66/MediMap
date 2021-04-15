import React from "react";
import Detail from "../components/Detail";
import axios from "axios";

const data = axios.get("/detail").then(response => response.data)

function DetailContainer({ location }) {
  const { name } = location.state;
  const { indication } = location.state;

  return <Detail name={name} data={data} indication = {indication} />;
}

export default DetailContainer;
