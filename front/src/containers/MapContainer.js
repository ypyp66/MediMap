import React, { useEffect, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import sido from "../data/sido.json";
import { connect } from "react-redux";
import * as api from "../api";

function MapContainer({ mainValue, subValue }) {
  const [locations, setLocations] = useState([]);
  const [target, setTarget] = useState([]);

  useEffect(() => {
    setTarget(target.concat(api.getDoctors()));
  }, []);

  useEffect(() => {
    console.log(target);
  }, [target]);

  useEffect(() => {
    const newLocation = sido.features.map((arr) => {
      const name = arr.properties.CTP_KOR_NM;
      const path = arr.geometry.coordinates;
      return { name, path };
    });

    setLocations(newLocation);
  }, []);
  return (
    <KakaoMap locations={locations} mainValue={mainValue} subValue={subValue} />
  );
}

const mapStateToProps = (state) => ({
  //state는 현재 스토어가 지니고 있는 상태
  mainValue: state.change.mainValue,
  subValue: state.change.subValue,
});
export default connect(mapStateToProps)(MapContainer);
