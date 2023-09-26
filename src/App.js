import React from 'react';
import {
  Route, Routes, Outlet,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WelcomePage from './pages/WelcomePage';
import Loader from './components/loader/Loader';
import NavigationPanel from './components/NavigationPanel';

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
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<WelcomePage />} />
        <Route path="/SignUP" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route path="/Loader" element={<Loader />} />
      </Route>
    </Routes>
  );
}

export default App;
