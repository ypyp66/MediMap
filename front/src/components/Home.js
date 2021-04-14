import React from "react";
import { Container, Typography, Toolbar } from "@material-ui/core";
import LocalHospitalIcon from "@material-ui/icons/LocalHospital";
import MapContainer from "../containers/MapContainer";
import MainMenuContainer from "../containers/MainMenuContainer";
import styled from "styled-components";
import "../styles/app.css";

const NavBar = styled.div`
  display: flex;
  justify-content: center;
  border-bottom: 3px solid #e0e0e0;
  padding: 1rem;
  margin-bottom: 2rem;
`;

function Home() {
  return (
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
  );
}

export default Home;
