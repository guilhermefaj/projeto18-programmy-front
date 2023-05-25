import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import ResetStyle from './style/ResetStyle';
import GlobalStyle from './style/GlobalStyle';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ResetStyle />
    <GlobalStyle />
    <App />
  </React.StrictMode>
);
