import React, { useState } from "react";
import MainMenu from "../components/MainMenu";
import { connect } from "react-redux";
import { mainChange, subChange } from "../modules/change";

function MainMenuContainer({ mainValue, subValue, mainChange, subChange }) {
  return (
    <MainMenu
      mainValue={mainValue}
      subValue={subValue}
      mainChange={mainChange}
      subChange={subChange}
    />
  );
}

const mapStateToProps = (state) => ({
  //state는 현재 스토어가 지니고 있는 상태
  mainValue: state.change.mainValue,
  subValue: state.change.subValue,
});
const mapDispathToProps = (dispatch) => ({
  mainChange: (mainValue) => {
    dispatch(mainChange(mainValue));
  },
  subChange: (subValue) => {
    dispatch(subChange(subValue));
  },
});

export default connect(mapStateToProps, mapDispathToProps)(MainMenuContainer);
