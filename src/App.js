import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WelcomePage from './pages/WelcomePage';
import Loader from './components/loader/Loader';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Loader" element={<Loader />} />
      </Routes>
    </Router>
  );
}

export default App;
