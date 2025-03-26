// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mangalam from './Mangalam';
import ChatHome from './ChatHome';
import VendorHome from './VendorHome';
import AddService from './AddService';
import AllServices from './AllServices';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatHome />} />
        <Route path="/home2" element={<VendorHome />} />
        <Route path="/AddService" element={<AddService />} />
        <Route path="/AllService" element={<AllServices />} />
      </Routes>
    </Router>
  );
}

export default App;
