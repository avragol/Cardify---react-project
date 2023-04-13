import { useEffect, useState } from "react";
import {
  Container,
  ThemeProvider,
  createTheme,
  CssBaseline,
  CircularProgress,
} from "@mui/material";
import { useSelector } from "react-redux";

/* toast */
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import NavbarComp from "./components/navbar/NavbarComp"

const light = {
  palette: {
    mode: "light",
  },
};

const dark = {
  palette: {
    mode: "dark",
  },
};

const App = () => {

  //toast.info("Welcome! (only test)", { autoClose: 2000 })

  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkModeSlice.isDarkMode
  );
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container>
        <header><NavbarComp /></header>
        <main><h1>Main</h1></main>
        <footer><h1>Footer</h1></footer>
      </Container>
    </ThemeProvider>
  );
}

export default App;