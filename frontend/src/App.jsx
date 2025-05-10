import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mangalam from './Mangalam';
import PlanningDashboard from './pages/PlanningDashboard'
import WeddingThemes from './pages/WeddingThemes';
import ThemeDetails from './pages/ThemeDetails';
import CreateWeddingProject from './pages/CreateWeddingProject';
import WeddingSchedule from './pages/WeddingSchedule';
import SeatingChart from './pages/SeatingPage';
import GuestList from './pages/GuestList';



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mangalam />} />
        <Route path="/dashboard" element={<PlanningDashboard />} />
        <Route path="/themes" element={<WeddingThemes />} />
        <Route path="/themes/:id" element={<ThemeDetails />} />
        <Route path="/create-wedding-project" element={<CreateWeddingProject />} />
        <Route path="/create-schedule/:projectId" element={<WeddingSchedule />} />
        <Route path="/seating" element={<SeatingChart/>} />
        <Route path="/guest-list/:projectId" element={<GuestList />} />
      </Routes>
    </Router>
  );
}

export default App;
