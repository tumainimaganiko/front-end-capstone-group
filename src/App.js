import React from 'react';
import {
  BrowserRouter as Router, Route, Routes,
} from 'react-router-dom';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';
import WelcomePage from './pages/WelcomePage';
import Loader from './components/loader/Loader';
import Layout from './components/Layout';
import Cars from './pages/Cars';
import CarDetails from './components/CarDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<WelcomePage />} />
          <Route path="/SignUp" element={<SignUp />} />
          <Route path="/LogIn" element={<LogIn />} />
          <Route path="/Loader" element={<Loader />} />
          <Route path="/Cars" element={<Cars />} />
          <Route path="/Cars/:id" element={<CarDetails />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
