import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store.js';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({ defaultColorScheme: 'light' });

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </Provider>
);

reportWebVitals();
