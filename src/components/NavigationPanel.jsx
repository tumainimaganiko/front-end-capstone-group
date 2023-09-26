import React, { useRef, useState } from 'react';
import {
  BiLogoTwitter, BiLogoFacebook, BiLogoPinterestAlt, BiLogoInstagram,
} from 'react-icons/bi';
import { HiXMark } from 'react-icons/hi2';
import { HiMenuAlt4 } from 'react-icons/hi';
import { TfiGoogle } from 'react-icons/tfi';
import { NavLink } from 'react-router-dom';
import logo from '../assets/images/logo-capstone.svg';
import useClickOutside from '../hooks/useClickOutside';

function NavigationPanel() {
  const [menu, setMenu] = useState(false);
  const navbarRef = useRef(null);

  const removeNavPanel = () => {
    setMenu(false);
  };

  useClickOutside(navbarRef, removeNavPanel);

  return (
    <>
      <button type="button" className="fixed top-2 left-2 md:top-5 md:left-5 md:text-white" onClick={() => setMenu(true)}>
        <HiMenuAlt4 className="text-[34px]" />
      </button>
      {menu && (
      <nav ref={navbarRef} className="flex flex-col border-r bg-white text-center md:text-left border-white md:w-[16%] lg:w-[12%] fixed md:absolute top-0 left-0 bottom-0 right-0">
        <button type="button" onClick={removeNavPanel}>
          <HiXMark className="text-[30px]" />
        </button>
        <img className=" w-1/2 h-1/5 block mx-auto" src={logo} alt="car logo" />
        <div className="flex flex-col w-full h-4/5 absolute md:left-0 bottom-0 md:pl-3 justify-between">
          <ul>
            <li className=""><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">VEHICLES</NavLink></li>
            <li className=""><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">RESERVATION</NavLink></li>
            <li className=""><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">MY RESERVATIONS</NavLink></li>
            <li className=""><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">ADD CAR</NavLink></li>
            <li className=""><NavLink onClick={removeNavPanel} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">REMOVE CAR</NavLink></li>
          </ul>

          <div>
            <ul className="flex my-4 mx-auto md:mx-0 justify-center">
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={removeNavPanel} to="/"><BiLogoTwitter /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={removeNavPanel} to="/"><BiLogoFacebook /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={removeNavPanel} to="/"><TfiGoogle /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={removeNavPanel} to="/"><BiLogoInstagram /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={removeNavPanel} to="/"><BiLogoPinterestAlt /></NavLink></li>
            </ul>
            <p className="text-[8px] mx-0 text-center mb-3">@ 2023 PLAGGIO & CSPA - PIVA</p>
          </div>
        </div>
      </nav>
      )}
    </>
  );
}

export default NavigationPanel;
