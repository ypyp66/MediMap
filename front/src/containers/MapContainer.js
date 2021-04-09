import React, { useEffect, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import sido from "../data/sido.json";
import { connect } from "react-redux";

function MapContainer({ mainburb, suburb }) {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const newLocation = sido.features.map((arr) => {
      const name = arr.properties.CTP_KOR_NM;
      const path = arr.geometry.coordinates;
      return { name, path };
    });

    setLocations(newLocation);
  }, []);
  return <KakaoMap locations={locations} mainburb={mainburb} suburb={suburb} />;
}

const mapStateToProps = (state) => ({
  //state는 현재 스토어가 지니고 있는 상태
  mainburb: state.change.mainburb,
  suburb: state.change.suburb,
});
export default connect(mapStateToProps)(MapContainer);
