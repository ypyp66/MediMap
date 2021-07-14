import React, { useEffect, useState } from "react";
import Detail from "../components/Detail";
import * as api from "../api/index";

function DetailContainer({ location }) {
  const { name } = location.state;
  const { indication } = location.state;
  const [detailPageData, setDetailPageData] = useState([]);
  const [isloading, setIsloading] = useState(false);

  function getDetailDatas() {
    api.getAllSubDatas().then((res) => {
      setDetailPageData(res.data);
      setIsloading(true);
    });
  }
  useEffect(() => {
    getDetailDatas();
  }, []);

  return (
    <>
      {isloading && (
        <Detail name={name} data={detailPageData} indication={indication} />
      )}
    </>
  );
}

export default DetailContainer;
