import React, { useEffect, useState } from "react";
import Detail from "../components/Detail";
import * as api from "../api/index";

function DetailContainer({ location }) {
  const { name } = location.state;
  const { indication } = location.state;
  const [subPageData, setSubPageData] = useState();

  function getSubDatas() {
    api.getAllSubDatas().then((res) => setSubPageData(res.data));
  }
  useEffect(() => {
    getSubDatas();
  }, []);

  return (
    <>
      {subPageData && (
        <Detail name={name} data={subPageData} indication={indication} />
      )}
    </>
  );
}

export default DetailContainer;
