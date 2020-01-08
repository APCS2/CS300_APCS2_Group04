import React from 'react';
import logo from './logo.svg';
import './App.css';
import Router from './router/index'
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Router/>
    </ThemeProvider>
  );
}

export default App;
