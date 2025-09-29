import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { relogin } from './redux/actions/authAction.js';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline'; // Optional: for consistent baseline styles
import theme from './Internals/clientComponent/theme.js'

import Dashboard from './Dashboard';
import Login from './Internals/Login/login.js';
import User from './Internals/user/Users.js';
import Clients from './Internals/clients/Client.js';
import Business from './Internals/business/Business.js';
import Category from './Internals/categories/Category.js';
import Roles from './Internals/Roles/Roles.js';
import Location from './Internals/location/Location.js';
import MainGrid from './components/MainGrid.js';
import PrivateRoute from './PrivateRoute';
import BusinessListing from './Internals/clientComponent/home.js';
import { featuredServices } from './Internals/clientComponent/featureService.js';
import { SnackbarProvider } from 'notistack';
import SearchResults from './Internals/clientComponent/SearchResult/SearchResult.js';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authChecked, setAuthChecked] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = localStorage.getItem("accessToken");
      const refreshToken = localStorage.getItem("refreshToken");

      if (!accessToken || !refreshToken) {
        setIsAuthenticated(false);
        setAuthChecked(true);
        return;
      }

      try {
        const result = await dispatch(relogin());
        if (result && result.accessToken) {
          setIsAuthenticated(true);
        } else {
          throw new Error("Token refresh failed");
        }
      } catch (err) {
        console.warn("Invalid refresh token, clearing storage");
        localStorage.clear();
        setIsAuthenticated(false);
      } finally {
        setAuthChecked(true);
      }
    };

    initAuth();
  }, [dispatch]);

  if (!authChecked) {
    return (
      <div style={{ textAlign: 'center', marginTop: '20%' }}>
        Loading...
      </div>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <SnackbarProvider
        maxSnack={3}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        autoHideDuration={5000}
        preventDuplicate
      >
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <Login
                  setIsAuthenticated={setIsAuthenticated}
                  isAuthenticated={isAuthenticated}
                />
              }
            />
            <Route path="home" element={<BusinessListing />} />
            <Route
              path="/:location/:category/:searchTerm"
              element={<SearchResults />}
            />
            {featuredServices.map((service, index) => (
              <Route key={index} path={service.path} element={<service.component />} />
            ))}            <Route element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
              <Route path="/dashboard" element={<Dashboard />}>
                <Route index element={<MainGrid />} />
                <Route path="user" element={<User />} />
                <Route path="clients" element={<Clients />} />
                <Route path="business" element={<Business />} />
                <Route path="category" element={<Category />} />
                <Route path="location" element={<Location />} />
                <Route path="roles" element={<Roles />} />
              </Route>
            </Route>
          </Routes>
        </Router>
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;