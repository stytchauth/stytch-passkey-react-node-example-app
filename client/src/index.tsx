import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { StytchProvider } from '@stytch/react';
import { StytchUIClient } from '@stytch/vanilla-js';
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "./utils/theme";
import { StytchClientOptions } from "@stytch/vanilla-js";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const stytchClientOptions = {
    cookieOptions: {
        jwtCookieName: `stytch_session_react_passkey_demo_jwt`,
        opaqueTokenCookieName: `stytch_session_react_passkey_demo`,
    },
} as StytchClientOptions;

const stytch = new StytchUIClient(process.env.REACT_APP_STYTCH_PUBLIC_TOKEN, stytchClientOptions);

root.render(
  <React.StrictMode>
      <ThemeProvider theme={theme}>
          <StytchProvider stytch={stytch}>
                <App />
          </StytchProvider>
      </ThemeProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
