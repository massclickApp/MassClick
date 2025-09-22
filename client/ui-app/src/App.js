import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Internals/Login/login.js';
import User from './Internals/user/Users.js';
import Clients from './Internals/clients/Client.js';
import Business from './Internals/business/Business.js';
import Category from './Internals/categories/Category.js';
import Roles from './Internals/Roles/Roles.js';
import Location from './Internals/location/Location.js';
import MainGrid from './components/MainGrid.js';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<MainGrid />} />
          <Route path="home" element={<MainGrid />} />
          <Route path="user" element={<User />} />
          <Route path="clients" element={<Clients />} />
          <Route path="business" element={<Business />} />
          <Route path="category" element={<Category />} />
          <Route path="location" element={<Location />} />
          <Route path="roles" element={<Roles />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
