import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { BrowserRouter } from "react-router-dom";

const theme = createMuiTheme({
  typography: {
    fontFamily: 'Nanum Gothic Coding,"Recursive","Noto Sans KR", sans-serif',
  },
  palette: {
    primary: {
      light: "#ffffff",
      main: "#ffe9db",
      dark: "#ccb7a9",
      contrastText: "#000000",
    },
    secondary: {
      light: "#fbfffc",
      main: "#c8e6c9",
      dark: "#97b498",
      contrastText: "#000",
    },
  },
});

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ThemeProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
