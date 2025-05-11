import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import DashboardLayout from './layouts/DashboardLayout'; // Ensure this is the correct path
import HomeNew from './pages/dashboard/HomeNew';
import IncomeForm from './pages/dashboard/IncomeForm';
import IncomeNew from './IncomeNew';
import Budgetsheet from './Budgetsheet';
import MyIncome from './MyIncome';
import { IncomeProvider } from "./IncomeContext";

function App() {
  return (
    <IncomeProvider>
      <Router>
        <Routes>
          {/* The root path renders the DashboardLayout with the Home component inside it */}
          <Route path="/dashboard" element={<HomeNew />} />
          <Route path="/IncomeForm" element={<IncomeForm />} />
          <Route path="/income" element={<IncomeNew />} />
          <Route path="/budget" element={<Budgetsheet />} />
          <Route path="/budgetdash" element={<MyIncome />} />
        </Routes>
      </Router>
    </IncomeProvider>
  );
}

export default App;

