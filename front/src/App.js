import MainMenuContainer from "./containers/MainMenuContainer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import { Provider } from "react-redux";
import { Route, Link } from "react-router-dom";
import rootReducer from "./modules";
import Home from "./components/Home";
import DetailConatiner from "./containers/DetailContainer";

const store = createStore(rootReducer, composeWithDevTools()); //스토어 생성

function App() {
  return (
    <Provider store={store}>
      <Route path="/" component={Home} exact={true} />
      <Route path="/details" component={DetailConatiner} />
    </Provider>
  );
}

export default App;
