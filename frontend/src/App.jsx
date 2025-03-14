// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mangalam from './Mangalam';
import ChatHome from './ChatHome';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ChatHome />} />
      </Routes>
    </Router>
  );
}

export default App;
