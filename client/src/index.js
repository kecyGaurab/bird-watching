import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import theme from './theme';
import {ThemeProvider as StyledThemeProvider} from 'styled-components';
import StylesProvider from '@material-ui/styles/StylesProvider';
import {MuiThemeProvider} from '@material-ui/core/styles';

ReactDOM.render (
  <StylesProvider injectFirst>
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </StyledThemeProvider>
  </StylesProvider>,
  document.getElementById ('root')
);
