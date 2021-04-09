//액션 타입 정의
const MAINCHANGE = "change/MAINCHANGE";
const SUBCHANGE = "change/SUBCHANGE";

//액션 생성 함수
export const mainChange = (mainValue) => ({
  type: MAINCHANGE,
  mainValue,
});
export const subChange = (subValue) => ({
  type: SUBCHANGE,
  subValue,
});

//초기 상태
const initialState = {
  mainValue: null,
  subValue: null,
};

//reducer함수
function change(state = initialState, action) {
  console.log(action);
  switch (action.type) {
    case MAINCHANGE:
      return {
        ...state,
        mainValue: action.mainValue,
      };
    case SUBCHANGE:
      return {
        ...state,
        subValue: action.subValue,
      };
    default:
      return state;
  }
}

export default change;
