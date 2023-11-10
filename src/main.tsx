import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'

import "@fontsource/open-sans";
import "@fontsource/open-sans/400.css";
import "@fontsource/open-sans/600.css";
import './index.css'

import { ThemeProvider } from 'styled-components'

import theme from './theme.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>   
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
