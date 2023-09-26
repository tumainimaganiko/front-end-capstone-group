import React from 'react';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WelcomePage from './pages/WelcomePage';
import Loader from './components/loader/Loader';

function Layout() {
  return (
    <>
      <NavigationPanel />
      <Outlet />
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Loader" element={<Loader />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<div className="text-center">Welcome Car Rentals</div>} />
        </Route>
       
      </Routes>
    </Router>

