import { Container, Typography, Toolbar } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import MapContainer from "./containers/MapContainer";
import MainMenuContainer from "./containers/MainMenuContainer";
import { composeWithDevTools } from "redux-devtools-extension";
import { createStore } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import styled from "styled-components";

import "./styles/app.css";

const store = createStore(rootReducer, composeWithDevTools()); //스토어 생성

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #e0e0e0;
  padding: 1rem;
  margin-bottom: 2rem;
`;

function App() {
  return (
    <Provider store={store}>
      <Container maxWidth="md" className="content">
        <NavBar>
          <Toolbar>
            <Typography variant="h3">
              <LocalHospitalIcon fontSize="large" color="error" />
              MediMap
            </Typography>
          </Toolbar>
        </NavBar>
        <Container maxWidth="sm" className="content">
          <MainMenuContainer />
          <MapContainer />
        </Container>
      </Container>
    </Provider>
  );
}

export default App;
