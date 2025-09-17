import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './redux/store.js';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { CssVarsProvider, extendTheme } from '@mui/joy/styles';

const theme = extendTheme({
  defaultColorScheme: 'light',
  typography: {
    fontFamily: `'Inter', sans-serif`,
    body1: { fontSize: '1rem' },   
    h1: { fontSize: '2rem' },      
    h2: { fontSize: '1.75rem' },
    h3: { fontSize: '1.5rem' },
  },
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <CssVarsProvider theme={theme}>
      <App />
    </CssVarsProvider>
  </Provider>
);

reportWebVitals();
