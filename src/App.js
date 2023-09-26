import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WelcomePage from './pages/WelcomePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
      </Routes>
    </Router>
  );
}

export default App;
