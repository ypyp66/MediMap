/* global kakao */
import React, { useCallback, useEffect, useRef, useState } from "react";
import "../styles/polygon.scss";
import * as api from "../api";

const KakaoMap = ({ locations, mainValue, subValue }) => {
  const [isloaded, setIsloaded] = useState(false);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [customOverlay, setCustomOverlay] = useState();
  const [infowindow, setInfowindow] = useState();
  const [zoom, setZoom] = useState(13);
  const [target, setTarget] = useState();
  const [polygons, setPolygons] = useState([]);

  const container = useRef();

  useEffect(() => {
    if (mainValue === "target") {
      getApi();
    }
  }, [mainValue]);

  useEffect(() => {
    console.log(mainValue, subValue);
  }, [mainValue, subValue]);

  useEffect(() => {
    console.log(target, polygons);
  }, [target, polygons]);

  useEffect(() => {
    setMap();
  }, []);

  useEffect(() => {
    setPath();
    setIsloaded(true);
  }, [locations]);

  useEffect(() => {
    if (isloaded) {
      polygons.map((polygon) => polygon.setMap(null));
      setPolygons([]);
      const newPolygons = locations.map((location) => displayArea(location));
      setPolygons((prevPolygons) => prevPolygons.concat(newPolygons));
    }
  }, [isloaded, mainValue, subValue]);

  async function getApi() {
    const result = await api.getTargets();
    setTarget(result);
  }

  const setPath = useCallback(() => {
    locations.forEach((location) => {
      location.path = location.path.map((loc) =>
        loc.map((pos) => {
          return new kakao.maps.LatLng(pos[1], pos[0]);
        })
      );
    });
  }, [locations]);

  //맵그리기
  const setMap = useCallback(() => {
    const center = new kakao.maps.LatLng(35.70470854748703, 128.31587736025025);
    const options = {
      center,
      level: zoom,
    };
    const map = new kakao.maps.Map(container.current, options);
    setCustomOverlay(new kakao.maps.CustomOverlay({}));
    setInfowindow(new kakao.maps.InfoWindow({ removable: true }));

    setKakaoMap(map);
  }, []);

  //다각형 생성함수
  const displayArea = useCallback(
    (area) => {
      // 다각형을 생성합니다
      let polygon = new kakao.maps.Polygon({
        map: kakaoMap,
        path: area.path,
        strokeWeight: 2,
        strokeColor: "#004c80",
        strokeOpacity: 0.8,
        fillColor: "#fff",
        fillOpacity: 0.7,
      });

      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
      // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
      kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
        if (target) {
          const indications = {
            0: "의사 수",
            1: "의료 수급권자 수",
            2: "대학병원 수",
            3: "구급차 수",
          };

          const { name, hover } = target[subValue].filter(
            (data) => data.name === area.name
          )[0];

          customOverlay.setContent(`
        <div class="area">
          "${name}"의 
          "${indications[subValue]}" 지표는<br/>
          전국 평균 점수(0점) 대비 ${hover}점 입니다.
        </div>`);
        } else {
          customOverlay.setContent(`<div class="area">${area.name}</div>`);
        }
        polygon.setOptions({ fillColor: "rgba(100,200,38, 0.7)" });
        customOverlay.setPosition(mouseEvent.latLng);
        customOverlay.setMap(kakaoMap);
      });

      // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
      kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
        customOverlay.setPosition(mouseEvent.latLng);
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
      // 커스텀 오버레이를 지도에서 제거합니다
      kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({ fillColor: "#fff" });
        customOverlay.setMap(null);
      });

      return polygon;
    },
    [kakaoMap, customOverlay, infowindow, subValue, mainValue]
  );

  return <div ref={container} style={{ width: "100%", height: "70vh" }} />;
};

export default KakaoMap;
