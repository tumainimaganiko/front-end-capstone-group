import '../styles/welcome.css';
import React from 'react';
import { Link } from 'react-router-dom';

function WelcomePage() {
  return (
    <div className="welcome flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Welcome to Car Rental</h1>
      <div className="flex space-x-4">
        <button type="button" className=" bg-blue-500 text-white rounded hover:bg-blue-600">
          <Link to="/LogIn" className="outline_btn px-14">Login</Link>
        </button>
        <button type="button" className=" bg-gray-500 text-white rounded hover:bg-gray-600">
          <Link to="/SignUp" className="outline_btn px-10">Sign Up</Link>
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
