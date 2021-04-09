import { Layout, Typography } from "antd";
import Container from "@material-ui/core/Container";
import MapContainer from "./containers/MapContainer";
import MainMenuContainer from "./containers/MainMenuContainer";
import axios from "axios";

import "antd/dist/antd.css";
import { useEffect } from "react";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  return (
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
  );
}

export default App;
