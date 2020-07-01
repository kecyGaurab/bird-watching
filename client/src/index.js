import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { StylesProvider } from '@material-ui/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import App from './App';
import theme from './theme';

ReactDOM.render(
  <StylesProvider injectFirst>
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </MuiThemeProvider>
    </StyledThemeProvider>
  </StylesProvider>,
  document.getElementById('root'),
);
