/* eslint-disable jsx-a11y/label-has-associated-control */
import { useRef, useState, useEffect } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { storeSession } from '../util/auth';
import axios from '../api/axios';

const LOGIN_URL = '/auth';

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, pwd }),
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
          accept: 'application/json',
        },
      );
      // console.log(JSON.stringify(response?.data));
      // console.log(JSON.stringify(response));
      storeSession(response?.data.email, response?.data.token);
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

  return (
    success ? (
      <section>
        <h1>You are logged in!</h1>
        <br />
        <p>
          <a href="/">Go to Home</a>
        </p>
      </section>
    ) : (
      <section>
        <p
          ref={errRef}
          className={errMsg ? 'errmsg' : 'offscreen'}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setemail(e.target.value)}
              value={email}
              required
              ref={emailref}
            />
          </div>

          <label htmlFor="pwd">Password:</label>
          <div className="password-input">
            <input
              type={showPwd ? 'text' : 'password'}
              id="pwd"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
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
          <button type="submit" className={`${email && pwd ? 'active' : 'innactive'}`}>Sign In</button>

        </form>
        <p>
          Need an Account?
          <br />
          <span className="line">
            {/* put router link here */}
            <a href="/">Sign Up</a>
          </span>
        </p>
      </section>
    )
  );
}
export default Login;
