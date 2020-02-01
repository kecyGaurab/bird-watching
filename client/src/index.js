import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import theme from "./theme";
import { ThemeProvider as StyledThemeProvider } from "styled-components";
import StylesProvider from "@material-ui/styles/StylesProvider";
import { MuiThemeProvider } from "@material-ui/core/styles";

// import { CssBaseline } from '@material-ui/core';
// import React, { ReactNode } from 'react';
// import { ThemeProvider as StyledThemeProvider } from 'styled-components';

// import GlobalStyles from './global-styles';
// import { theme } from './theme';

// export interface ThemeProviderProps {
//   children: ReactNode;
// }

// export function ThemeProvider({ children }: ThemeProviderProps) {
//   return (
//     <>
//       <CssBaseline />

//       <StylesProvider injectFirst>
//         <StyledThemeProvider theme={theme}>
//           <MuiThemeProvider theme={theme}>
//             <GlobalStyles />
//             {children}
//           </MuiThemeProvider>
//         </StyledThemeProvider>
//       </StylesProvider>
//     </>
//   );
// }

ReactDOM.render(
  <StylesProvider injectFirst>
    <StyledThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </StyledThemeProvider>
  </StylesProvider>,
  document.getElementById("root")
);
