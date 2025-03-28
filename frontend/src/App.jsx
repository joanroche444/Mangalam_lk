// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Mangalam from './Mangalam';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Mangalam />} />

      </Routes>
    </Router>
  );
}

export default App;
