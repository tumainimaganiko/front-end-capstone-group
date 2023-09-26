import '../styles/welcome.css';
import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';

function WelcomePage() {
  return (
    <div className="welcome flex flex-col items-center ">
      <h1 className="text-5xl font-bold mt-14  font-sans text-white uppercase "> Welcome to Car Rental</h1>
      <p className="mb-25">Find the perfect car for your next adventure</p>
      <div className="flex my-36 space-x-6">
        <button type="button" className="bg-primary text-white rounded  hover:bg-lime-400 ">
          <Link to="/LogIn" className="p-10 whitespace-nowrap ">
            <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
            Sign In
          </Link>
        </button>
        <button type="button" className=" bg-primary text-white rounded hover:bg-lime-400 ">
          <Link to="/SignUp" className="p-10 whitespace-nowrap">
            <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
            Sign Up
          </Link>
        </button>
      </div>
    </div>
  );
}

export default WelcomePage;
