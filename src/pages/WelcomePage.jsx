import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus, faCar } from '@fortawesome/free-solid-svg-icons';
import { TOKENKEY } from '../util/auth';
import '../styles/style.css';

function WelcomePage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    if (!localStorage.getItem(TOKENKEY) || localStorage.getItem(TOKENKEY) === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => checkUserToken(), []);
  return (
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
          { isLoggedIn ? (
            <Link
              to="/cars"
              className="bg-primary hover:bg-lime-400 hover:text-white text-black px-6 rounded-full p-1 text-sm items-end"
            >
              <FontAwesomeIcon icon={faCar} />
              {' '}
              See Available Cars
            </Link>
          ) : (
            <>
              <Link
                to="/LogIn"
                className="bg-primary hover:bg-lime-400 hover:text-gray-500 text-white px-2 rounded-e-full p-1 md:ps-6 text-sm items-end"
              >
                <FontAwesomeIcon icon={faSignInAlt} />
                {' '}
                Log In
              </Link>
              <Link
                to="/SignUp"
                className="bg-primary hover:bg-lime-400 hover:text-gray-500 text-white px-2 rounded-e-full p-1 md:ps-6 text-sm items-end"
              >
                <FontAwesomeIcon icon={faUserPlus} />
                {' '}
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default WelcomePage;
