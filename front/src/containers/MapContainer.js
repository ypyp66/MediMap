import React, { useEffect, useState } from "react";
import KakaoMap from "../components/KakaoMap";
import sido from "../data/sido.json";

function MapContainer() {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const newLocation = sido.features.map((arr) => {
      const name = arr.properties.CTP_KOR_NM;
      const path = arr.geometry.coordinates;
      return { name, path };
    });

    setLocations(newLocation);
  }, []);
  return <KakaoMap locations={locations} />;
}

export default MapContainer;
