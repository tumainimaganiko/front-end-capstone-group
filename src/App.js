import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WelcomePage from './pages/WelcomePage';
import Loader from './components/loader/Loader';
import Layout from './components/Layout';
import AddReservations from './components/AddReservations';
import Cars from './pages/Cars';
import Reservations from './components/Reservations';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<AddReservations />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/WelcomePage" element={<WelcomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Loader" element={<Loader />} />
          <Route path="/Cars" element={<Cars />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
