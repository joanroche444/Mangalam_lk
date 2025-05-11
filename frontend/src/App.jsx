import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout'; // Ensure this is the correct path
import HomeNew from './pages/dashboard/HomeNew';
import IncomeForm from './pages/dashboard/IncomeForm';
function App() {
  return (
    <Router>
      <Routes>
        {/* The root path renders the DashboardLayout with the Home component inside it */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/dashboard" element={<HomeNew/>} />
          <Route path="/IncomeForm" element={<IncomeForm/>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
