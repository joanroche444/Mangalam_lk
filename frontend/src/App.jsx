// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mangalam from './Mangalam';
import ChatHome from './ChatHome';
import VendorHome from './VendorHome';
import AddService from './AddService';
import AllServices from './AllServices';
import ServiceDash from './ServiceDash';
import IncomeNew from './IncomeNew'
import Budgetsheet from './Budgetsheet'
import MyIncome from './MyIncome'
function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Mangalam />} />
        <Route path="/chatbot" element={<ChatHome />} />
        <Route path="/home2" element={<VendorHome />} />
        <Route path="/AddService" element={<AddService />} />
        <Route path="/AllService" element={<AllServices />} />
        <Route path="/servdash" element={<ServiceDash />} />
        <Route path="/income" element={<IncomeNew />} />
        <Route path="/budget" element={<Budgetsheet />} />
        <Route path="/budgetdash" element={<MyIncome />} />
      </Routes>
    </Router>
  );
}

export default App;
