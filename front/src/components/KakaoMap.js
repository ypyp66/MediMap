/* global kakao */
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import * as api from "../api";
import { connect } from "react-redux";

import "../styles/polygon.css";
import "../styles/overlay.scss";

const KakaoMap = ({ locations, mainValue, subValue }) => {
  const [isloaded, setIsloaded] = useState(false);
  const [kakaoMap, setKakaoMap] = useState(null);
  const [customOverlay, setCustomOverlay] = useState();
  const [infowindow, setInfowindow] = useState();
  const [target, setTarget] = useState();
  const [polygons, setPolygons] = useState([]);

  const container = useRef();
  const history = useHistory();
  console.log("kakaoMap");

  useEffect(() => {
    if (mainValue === "target") {
      getApi();
    }
  }, [mainValue]);

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
    const center = new kakao.maps.LatLng(35.70470854748703, 128.49987736025025);
    const options = {
      center,
      level: 13,
    };
    const map = new kakao.maps.Map(container.current, options);
    setCustomOverlay(new kakao.maps.CustomOverlay({}));
    setInfowindow(new kakao.maps.InfoWindow({ removable: true }));

    setKakaoMap(map);
  }, []);

  //다각형 생성함수
  const displayArea = useCallback(
    (area) => {
      //get함수 정의
      function getName() {
        if (!target) return area.name;
        const { name } = target[subValue].filter(
          (data) => data.name === area.name
        )[0];

        return name;
      }
      function getHover() {
        const { hover } = target[subValue].filter(
          (data) => data.name === area.name
        )[0];

        return hover;
      }
      function getScore() {
        if (!target) return 0.7;
        let { score } = target[subValue].filter(
          (data) => data.name === area.name
        )[0];
        if (score < 50) {
          score = 50 - score;
        }

        return score;
      }

      function getColor(score) {
        if (score > 50) {
          return "#00A500";
        } else {
          return "#FF2424";
        }
      }

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

      //target에 데이터를 받아오면
      if (target) {
        polygon.setOptions({
          fillOpacity: getScore() / 100,
          fillColor: getColor(getScore()),
        });
      }

      // 다각형에 mouseover 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 변경합니다
      // 지역명을 표시하는 커스텀오버레이를 지도위에 표시합니다
      kakao.maps.event.addListener(polygon, "mouseover", function (mouseEvent) {
        let content = `<div class="area">${getName()}</div>`;

        if (target) {
          const indications = {
            0: "의사 수",
            1: "진료건 수",
            2: "병원 수",
            3: "구급차 수",
          };
          const orderByHoverDesc = target[subValue]
            .sort((a, b) => b.hover - a.hover)
            .slice(0, 4);

          content = `
          <div class="overlaybox">
            <div class="boxtitle">${indications[subValue]}</div>
            <div class="score">${getName()} (${getHover()}점)</div>
            <ul class="rankList">
              <h4 class="rankTitle">순위</h4>
              ${orderByHoverDesc.map(
                (i, index) =>
                  `<li class="rankItem">
                  <h5 class="item_number">${index + 1}.</h5>
                  <div class="item_title">${i.name}</div>
                  <div class="item_score">${i.hover}</div>
                </li>`
              )}
            </ul>
           </div>`;
        }
        customOverlay.setContent(content);
        polygon.setOptions({ fillOpacity: 1 });
        customOverlay.setPosition(
          target
            ? new kakao.maps.LatLng(38.7083852, 129.6650533)
            : mouseEvent.latLng
        );
        customOverlay.setMap(kakaoMap);
      });

      // 다각형에 mousemove 이벤트를 등록하고 이벤트가 발생하면 커스텀 오버레이의 위치를 변경합니다
      kakao.maps.event.addListener(polygon, "mousemove", function (mouseEvent) {
        customOverlay.setPosition(
          target
            ? new kakao.maps.LatLng(38.7083852, 129.6650533)
            : mouseEvent.latLng
        );
      });

      // 다각형에 mouseout 이벤트를 등록하고 이벤트가 발생하면 폴리곤의 채움색을 원래색으로 변경합니다
      // 커스텀 오버레이를 지도에서 제거합니다
      kakao.maps.event.addListener(polygon, "mouseout", function () {
        polygon.setOptions({
          fillOpacity: getScore() === 0.7 ? 0.7 : getScore() / 100,
        });
        customOverlay.setMap(null);
      });

      kakao.maps.event.addListener(polygon, "click", function () {
        history.push({
          pathname: "/details",
          state: { name: area.name },
        });
      });

      return polygon;
    },
    [kakaoMap, customOverlay, infowindow, subValue, mainValue, target]
  );

  return <div ref={container} style={{ width: "100%", height: "70vh" }} />;
};

const mapStateToProps = (state) => ({
  //state는 현재 스토어가 지니고 있는 상태
  mainValue: state.change.mainValue,
  subValue: state.change.subValue,
});
export default connect(mapStateToProps)(KakaoMap);
