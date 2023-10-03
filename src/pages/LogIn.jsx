/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { storeSession, TOKENKEY } from '../util/auth';
import axios from '../api/axios';
import WelcomePage from './WelcomePage';

import '../styles/style.css';

const LOGIN_URL = 'https://car-rental-api-91yl.onrender.com/users/tokens/sign_in';

function Login() {
  const emailref = useRef();
  const errRef = useRef();

  const [email, setemail] = useState('');
  const [pwd, setPwd] = useState('');
  const [showPwd, setShowPwd] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    emailref.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        formData,
      );
      storeSession(response?.data.resource_owner, response?.data.token);
      setemail('');
      setPwd('');
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing emailname or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    if (!localStorage.getItem(TOKENKEY) || localStorage.getItem(TOKENKEY) === undefined) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => checkUserToken(), []);

  if (isLoggedIn) {
    return (
      <WelcomePage />
    );
  }

  return (
    success ? (
      <WelcomePage />
    ) : (
      <section className="log-section">
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1 className="text-xl">Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="flex justify-start items-center mt-2">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => {
                handleChange(e);
                setemail(e.target.value);
              }}
              value={formData.email}
              required
              ref={emailref}
              name="email"
              className="text-lg rounded-md m-1 w-full"
            />
          </div>

          <label htmlFor="pwd" className="flex justify-start items-center mt-2">Password:</label>
          <div className="password-input">
            <input
              type={showPwd ? 'text' : 'password'}
              id="pwd"
              onChange={(e) => {
                handleChange(e);
                setPwd(e.target.value);
              }}
              value={formData.password}
              name="password"
              className="text-lg rounded-md m-1 w-full"
              required
            />
            <div
              className="password-toggle"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setShowPwd(showPwd);
                }
              }}
              onClick={() => setShowPwd(!showPwd)}
            >
              {showPwd ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          <button type="submit" className={`${email && pwd ? 'bg-primary text-yellow-50 mt-3 rounded-lg mx-1' : 'bg-innactiveBtn mt-3 text-yellow-50  rounded-lg mx-1'}`}>Sign In</button>

        </form>
        <p>
          Need an Account?
          <br />
          <span className="line bg-secondary px-2 rounded-lg">
            {/* put router link here */}
            <a href="/SignUp">Sign Up</a>
          </span>
        </p>
      </section>
    )
  );
}
export default Login;
