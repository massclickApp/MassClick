import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Dashboard from './Dashboard';
import Login from './Internals/Login/login.js';
  import User from './Internals/user/Users.js';
  import Clients from './Internals/clients/Client.js';
  import Business from './Internals/business/Business.js';
  import Category from './Internals/categories/Category.js';
  import Tasks from './Internals/Task/Tasks.js';
  import Home from './Internals/home/home.js';
  import Location from './Internals/location/Location.js'

function App() {
  return (
      <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="home" element={<Home />} />
          <Route path="user" element={<User />} />
          <Route path="clients" element={<Clients />} />
          <Route path="business" element={<Business />} />
          <Route path="category" element={<Category />} />
          <Route path="location" element={<Location />} />
          <Route path="tasks" element={<Tasks />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
