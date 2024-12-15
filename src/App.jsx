import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeEventPage from './Pages/LandingPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeEventPage />} />
      </Routes>
    </Router>
  );
}

export default App;
