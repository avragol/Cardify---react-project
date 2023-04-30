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
import NavbarComp from "./components/Navbar/NavbarComp";
import FooterComp from "./components/FooterComp";
import Router from "./routes/Router";
import useLoggedIn from "./hooks/useLoggedIn";

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
  const loggedIn = useLoggedIn();
  useEffect(() => {
    loggedIn();
  }, [loggedIn]);


  const isDarkTheme = useSelector(
    (bigPie) => bigPie.darkModeSlice.isDarkMode
  );
  return (
    <ThemeProvider theme={isDarkTheme ? createTheme(dark) : createTheme(light)}>
      <CssBaseline />
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <Container sx={{
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh',
      }}>
        <header><NavbarComp /></header>
        <main><Router /></main>
        <FooterComp />
      </Container>
    </ThemeProvider>
  );
}

export default App;