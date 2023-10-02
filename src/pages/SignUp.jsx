import { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  faCheck,
  faTimes,
  faInfoCircle,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from '../api/axios';
import { storeSession } from '../util/auth';
import '../styles/style.css';

const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const EMAIL_REGEX = /^[A-z0-9-_]+@[A-z0-9-_]+\.[A-z0-9-_]+$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const PHONE_REGEX = /^(\+\d{1,3}\s?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
const REGISTER_URL = 'https://car-rental-api-91yl.onrender.com/api/v1/users';

function SignUp() {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setEmailFocus] = useState(false);

  const [phone, setPhone] = useState('');
  const [validPhone, setValidPhone] = useState(false);
  const [phoneFocus, setPhoneFocus] = useState(false);

  const [pwd, setPwd] = useState('');
  const [ShowPwd, setShowPwd] = useState(false);
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState('');
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setValidName(USER_REGEX.test(user));
  }, [user]);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    setValidPwd(PWD_REGEX.test(pwd));
    setValidMatch(pwd === matchPwd);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd, matchPwd]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
  });

  useEffect(() => {
    setFormData({
      name: user,
      phone_number: phone,
      email,
      password: pwd,
    });
  }, [user, email, pwd, phone]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if button enabled with JS hack
    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);
    const v3 = EMAIL_REGEX.test(email);
    const v4 = PHONE_REGEX.test(phone);
    if (!v1 || !v2 || !v3 || !v4) {
      setErrMsg('Invalid Entry');
      return;
    }
    try {
      const response = await axios.post(REGISTER_URL, formData);
      // console.log(response?.data);
      // console.log(response?.accessToken);
      // console.log(JSON.stringify(response));
      setSuccess(true);
      // clear state and controlled inputs
      // need value attrib on inputs for this
      setUser('');
      setEmail('');
      setPhone('');
      setPwd('');
      setMatchPwd('');
      // store session
      storeSession(response?.data.resource_owner, response?.data.token);
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 409) {
        setErrMsg('Username Taken');
      } else {
        setErrMsg('Registration Failed');
      }
      errRef.current.focus();
    }
  };

  return success ? (
    <section>
      <h1>You are registered!</h1>
      <Link to="/LogIn">Sign In</Link>
    </section>
  ) : (
    <section className="log-section">
      <p
        ref={errRef}
        className={errMsg ? 'errmsg' : 'offscreen'}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 className="text-xl">Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          {validName && <FontAwesomeIcon icon={faCheck} className="valid" />}
          {!validName && user && (
            <FontAwesomeIcon icon={faTimes} className="invalid" />
          )}
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          value={user}
          required
          aria-invalid={validName ? 'false' : 'true'}
          aria-describedby="uidnote"
          onFocus={() => setUserFocus(true)}
          onBlur={() => setUserFocus(false)}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter.
          <br />
          Letters, numbers, underscores, hyphens allowed.
        </p>

        <label htmlFor="email">
          Email:
          {validEmail && <FontAwesomeIcon icon={faCheck} className="valid" />}
          {!validEmail && email && (
            <FontAwesomeIcon icon={faTimes} className="invalid" />
          )}
        </label>
        <input
          type="email"
          id="email"
          autoComplete="off"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          required
          aria-invalid={validEmail ? 'false' : 'true'}
          aria-describedby="emailnote"
          onFocus={() => setEmailFocus(true)}
          onBlur={() => setEmailFocus(false)}
        />
        <p
          id="emailnote"
          className={
            emailFocus && email && !validEmail ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must be a valid email address.
        </p>

        <label htmlFor="phone">
          Phone:
          {validPhone && <FontAwesomeIcon icon={faCheck} className="valid" />}
          {!validPhone && phone && (
            <FontAwesomeIcon icon={faTimes} className="invalid" />
          )}
        </label>
        <input
          type="tel"
          id="phone"
          autoComplete="off"
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
          required
          aria-invalid={validPhone ? 'false' : 'true'}
          aria-describedby="phonenote"
          onFocus={() => setPhoneFocus(true)}
          onBlur={() => setPhoneFocus(false)}
        />
        <p
          id="phonenote"
          className={
            phoneFocus && phone && !validPhone ? 'instructions' : 'offscreen'
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must be a valid phone number.
        </p>

        <label htmlFor="password">
          Password:
          {validPwd && <FontAwesomeIcon icon={faCheck} className="valid" />}
          {!validPwd && pwd && (
            <FontAwesomeIcon icon={faTimes} className="invalid" />
          )}
        </label>
        <div className="password-input">
          <input
            type={ShowPwd ? 'text' : 'password'}
            id="password"
            onChange={(e) => setPwd(e.target.value)}
            value={pwd}
            required
            aria-invalid={validPwd ? 'false' : 'true'}
            aria-describedby="pwdnote"
            onFocus={() => setPwdFocus(true)}
            onBlur={() => setPwdFocus(false)}
          />
          <div
            className="password-toggle"
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setShowPwd(ShowPwd);
              }
            }}
            onClick={() => setShowPwd(!ShowPwd)}
          >
            {ShowPwd ? (
              <FontAwesomeIcon icon={faEye} />
            ) : (
              <FontAwesomeIcon icon={faEyeSlash} />
            )}
          </div>
        </div>
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character.
          <br />
          Allowed special characters:
          {' '}
          <span aria-label="exclamation mark">!</span>
          {' '}
          <span aria-label="at symbol">@</span>
          {' '}
          <span aria-label="hashtag">#</span>
          {' '}
          <span aria-label="dollar sign">$</span>
          {' '}
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">
          Confirm Password:
          {validMatch && <FontAwesomeIcon icon={faCheck} className="valid" />}
          {!validMatch && matchPwd && (
            <FontAwesomeIcon icon={faTimes} className="invalid" />
          )}
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => setMatchPwd(e.target.value)}
          value={matchPwd}
          required
          aria-invalid={validMatch ? 'false' : 'true'}
          aria-describedby="confirmnote"
          onFocus={() => setMatchFocus(true)}
          onBlur={() => setMatchFocus(false)}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? 'instructions' : 'offscreen'}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field.
        </p>

        <button
          type="submit"
          disabled={!!(!validName || !validPwd || !validMatch)}
          className={
            validName && validPwd && validMatch ? 'bg-primary text-yellow-50 mt-3 rounded-lg mx-1 ' : 'bg-innactiveBtn mt-3 mx-1 text-yellow-50  rounded-lg'
          }
        >
          Sign Up
        </button>
      </form>
      <p>
        Already registered?
        <br />
        <span className="line  bg-secondary px-2 rounded-lg">
          <a href="/LogIn">Sign In</a>
        </span>
      </p>
    </section>
  );
}

export default SignUp;
