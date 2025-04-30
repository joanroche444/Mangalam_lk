import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout'; // Ensure this is the correct path
import HomeNew from './pages/dashboard/HomeNew';
import IncomeForm from './pages/dashboard/IncomeForm';

import Mangalam from './Mangalam';
import Register from './pages/Register';
import Login from './pages/UserLogin';
import ProfilePage from './pages/ProfilePage';



function App() {
  return (
    <Router>
      <Routes>

        {/* The root path renders the DashboardLayout with the Home component inside it */}
        <Route path="/" element={<Mangalam />} />
    
          <Route path="/dashboard" element={<HomeNew/>} />
          <Route path="/IncomeForm" element={<IncomeForm/>} />
  
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Add more routes as needed */}

      </Routes>
    </Router>
  );
}

export default App;
