import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import '../styles/style.css';
import Slider from '../components/Slider';

function WelcomePage() {
  return (
    <>
      <section>
        <div className=" welcome flex flex-col items-center min-h-screen text-white">
          <div className="mt-14">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 font-sans text-center">
              Welcome to Car Rental
            </h1>
            <p className="text-sm sm:text-lg mb-32 text-center text-black">
              Find the perfect car for your next adventure
            </p>
          </div>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button
              type="button"
              className="bg-primary px-3 py-1 rounded hover:bg-lime-400"
            >
              <Link to="/LogIn" className="whitespace-nowrap ">
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Sign In
              </Link>
            </button>
            <button
              type="button"
              className="bg-primary px-3 py-1 rounded hover:bg-lime-400"
            >
              <Link to="/SignUp" className="whitespace-nowrap">
                <FontAwesomeIcon icon={faUserPlus} className="mr-2" />
                Sign Up
              </Link>
            </button>
          </div>
        </div>
      </section>
      <section className="mt-32">
        <div className="container mx-auto">
          <div className="flex flex-col items-center">
            <h2 className="text-3xl font-bold mb-8">Our Cars</h2>
            <Slider />
          </div>
        </div>
      </section>
    </>
  );
}

export default WelcomePage;
