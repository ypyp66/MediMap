import { useEffect } from "react";
import { Layout, Typography } from "antd";
import Container from "@material-ui/core/Container";
import MapContainer from "./containers/MapContainer";
import MainMenuContainer from "./containers/MainMenuContainer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import "antd/dist/antd.css";

const store = createStore(rootReducer, composeWithDevTools()); //스토어 생성
const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Provider store={store}>
      <Layout className="layout">
        <Header>
          <Title
            style={{
              color: "white",
              textAlign: "center",
              lineHeight: "4rem",
            }}
          >
            메디맵
          </Title>
        </Header>
        <Content className="content">
          <Container maxWidth="sm">
            <MainMenuContainer />
            <MapContainer />
          </Container>
        </Content>
      </Layout>
    </Provider>
  );
}

export default App;
