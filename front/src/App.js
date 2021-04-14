import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import { Route } from "react-router-dom";
import Home from "./components/Home";
import DetailContainer from "./containers/DetailContainer";

const store = createStore(rootReducer, composeWithDevTools()); //스토어 생성

function App() {
  return (
    <Provider store={store}>
      <Route exact path="/" component={Home} />
      <Route path="/details" component={DetailContainer} />
    </Provider>
  );
}

export default App;
