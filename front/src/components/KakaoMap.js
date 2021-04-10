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
  const [hoverInfo, setHoverInfo] = useState()

  const container = useRef();

  useEffect(() => {
    if (mainValue === "target") {
      getApi();
    }
  }, [mainValue]);

  useEffect(() => {
    console.log(mainValue);
    console.log(subValue);
  }, [mainValue, subValue]);

  useEffect(() => {
    console.log(target);
  }, [target]);

  useEffect(() => {
    setMap();
  }, []);

  useEffect(() => {
    setPath();
    setIsloaded(true);
  }, [locations]);

  useEffect(() => {
    if (isloaded) {
      if (target) {
        locations.forEach((location) => displayArea(location, subValue));
        return;
      }
      locations.forEach((location) => displayArea(location));
    }
  }, [isloaded, subValue]);

  useEffect(() => {
    zoomChange();
    test();
  }, [kakaoMap]);

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

  //줌 변경때마다 실행
  const zoomChange = useCallback(() => {
    if (kakaoMap === null) {
      return;
    }
    kakao.maps.event.addListener(kakaoMap, "zoom_changed", function () {
      // 지도의 현재 레벨을 얻어옵니다
      let level = kakaoMap.getLevel();

      console.log(level);
    });
  }, [kakaoMap]);

  //테스트함수
  const test = useCallback(() => {
    if (kakaoMap === null) {
      return;
    }
    kakao.maps.event.addListener(kakaoMap, "dblclick", function (mouseEvent) {
      console.log("더블클릭");
    });
  }, [kakaoMap]);

  //다각형 생성함수
  const displayArea = useCallback(
    (area) => {
      // 다각형을 생성합니다
      if (target) {
        console.log(
          target[subValue].filter((data) => data.name === area.name)[0]
        );
      }
      var polygon = new kakao.maps.Polygon({
        map: kakaoMap, // 다각형을 표시할 지도 객체
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
            0: '의사 수',
            1: '의료 수급권자 수',
            2: '대학병원 수',
            3: '구급차 수'
          }

          console.log(
            target[subValue].filter((data) => data.name === area.name)[0]
          );

          customOverlay.setContent(`
        <div class="area">
          \"${target[subValue].filter((data) => data.name === area.name)[0].name}\"의 
          \"${indications[subValue]}\" 지표는
          전국 평균 점수(0점) 대비 ${target[subValue].filter((data) => data.name === area.name)[0].hover}점 입니다.
        </div>`);
          customOverlay.setPosition(mouseEvent.latLng);
          customOverlay.setMap(kakaoMap);
        } else {
          polygon.setOptions({ fillColor: "rgba(100,200,38, 0.7)" });
          customOverlay.setContent(`<div class="area">${area.name}</div>`);
          customOverlay.setPosition(mouseEvent.latLng);
          customOverlay.setMap(kakaoMap);
        }
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

      // 다각형에 click 이벤트를 등록하고 이벤트가 발생하면 다각형의 이름과 면적을 인포윈도우에 표시합니다
      kakao.maps.event.addListener(polygon, "click", function (mouseEvent) {
        // let content = `
        // <div class="info">
        //   <div class="title">
        //   ${area.name}</div><div class="size">총 면적 : 약 ${Math.floor(
        //   polygon.getArea()
        // )}m<sup>2</sup>
        //   </div>`;

        // infowindow.setContent(content);
        // infowindow.setPosition(mouseEvent.latLng);
        // infowindow.setMap(kakaoMap);

        kakaoMap.setLevel(9);
      });
    },
    [kakaoMap, customOverlay, infowindow, subValue]
  );

  return <div ref={container} style={{ width: "100%", height: "70vh" }} />;
};

export default KakaoMap;
