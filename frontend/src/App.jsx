// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mangalam from './Mangalam';
import Register from './pages/Register';
import Login from './pages/UserLogin';
import ProfilePage from './pages/ProfilePage';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mangalam />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<ProfilePage />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
