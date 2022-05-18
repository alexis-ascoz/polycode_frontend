import { render } from "react-dom";
import { Box, CssBaseline } from '@mui/material';
import Footer from './components/Footer';
import Router from "./router";
import Header from "./components/Header";
import UserProvider from "./contexts/user-context";
import { BrowserRouter } from "react-router-dom";
import "ace-builds/src-noconflict/theme-github";
import "ace-builds/src-noconflict/ext-language_tools"
import 'ace-builds/webpack-resolver'

const rootElement = document.getElementById("root");
render(
  <Box
    sx={{
      display: 'flex',
      flexDirection: 'column',
      minHeight: '100vh',
    }}
  >
    <CssBaseline />

    <BrowserRouter>
      <UserProvider>
        <Header />

        <Router />
      </UserProvider>
    </BrowserRouter>

    <Footer />
  </Box>,
  rootElement
);
