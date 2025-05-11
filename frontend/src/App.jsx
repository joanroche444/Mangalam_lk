import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout'; // Ensure this is the correct path
import HomeNew from './pages/dashboard/HomeNew';
import IncomeForm from './pages/dashboard/IncomeForm';

import Mangalam from './Mangalam';

import PlanningDashboard from './pages/PlanningDashboard'
import WeddingThemes from './pages/WeddingThemes';
import ThemeDetails from './pages/ThemeDetails';
import CreateWeddingProject from './pages/CreateWeddingProject';
import WeddingSchedule from './pages/WeddingSchedule';
import SeatingChart from './pages/SeatingPage';
import GuestList from './pages/GuestList';


import Register from './pages/Register';
import Login from './pages/UserLogin';
import ProfilePage from './pages/ProfilePage';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';



function App() {
  return (
    <Router>
      <Routes>

        {/* The root path renders the DashboardLayout with the Home component inside it */}
        <Route path="/" element={<Mangalam />} />

        <Route path="/dashboard" element={<PlanningDashboard />} />
        <Route path="/themes" element={<WeddingThemes />} />
        <Route path="/themes/:id" element={<ThemeDetails />} />
        <Route path="/create-wedding-project" element={<CreateWeddingProject />} />
        <Route path="/create-schedule/:projectId" element={<WeddingSchedule />} />
        <Route path="/seating" element={<SeatingChart/>} />
        <Route path="/guest-list/:projectId" element={<GuestList />} />

    
          <Route path="/dashboard" element={<HomeNew/>} />
          <Route path="/IncomeForm" element={<IncomeForm/>} />
  
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />

        {/* Admin */}

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        {/* Add more routes as needed */}


      </Routes>
    </Router>
  );
}

export default App;
