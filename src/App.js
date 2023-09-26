import React from 'react';
import {
  BrowserRouter as Router, Route, Routes, Outlet,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WelcomePage from './pages/WelcomePage';
import Loader from './components/loader/Loader';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
        </Route>
        <Route path="/Loader" element={<Loader />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/SignUp" element={<SignUp />} />
        <Route path="/WelcomePage" element={<WelcomePage />} />
        <Route path="/Layout" element={<Layout />} />
        <Route path="/Outlet" element={<Outlet />} />
      </Routes>
    </Router>
  );
}

export default App;
