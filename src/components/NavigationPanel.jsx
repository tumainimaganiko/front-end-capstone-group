import React, { useState } from 'react';
import {
  BiLogoTwitter, BiLogoFacebook, BiLogoPinterestAlt, BiLogoInstagram,
} from 'react-icons/bi';
import { HiMenuAlt4 } from 'react-icons/hi';
import { TfiGoogle } from 'react-icons/tfi';
import { NavLink } from 'react-router-dom';

function NavigationPanel() {
  const [menu, setMenu] = useState(false);
  return (
    <>
      <button type="button" className="fixed top-5 left-5" onClick={() => setMenu(true)}>
        <HiMenuAlt4 className="text-[34px]" />
      </button>
      {menu && (
      <nav className="flex flex-col border-r bg-white text-center md:text-left border-white md:w-[16%] lg:w-[12%] fixed md:absolute top-0 left-0 bottom-0 right-0">
        <h2 className="pl-3 font-mono font-[900]">Car Rentals</h2>
        <div className="flex flex-col w-full h-4/5 absolute md:left-0 bottom-0 md:pl-3 justify-between">
          <ul>
            <li className=""><NavLink onClick={() => setMenu(false)} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">ACTIVITIES</NavLink></li>
            <li className=""><NavLink onClick={() => setMenu(false)} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">RESERVATION</NavLink></li>
            <li className=""><NavLink onClick={() => setMenu(false)} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">MY RESERVATIONS</NavLink></li>
            <li className=""><NavLink onClick={() => setMenu(false)} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">ADD CAR</NavLink></li>
            <li className=""><NavLink onClick={() => setMenu(false)} className="p-2 hover:bg-[#97BF11] hover:text-white font-[900] text-xs my-2 block" to="/">REMOVE CAR</NavLink></li>
          </ul>

          <div>
            <ul className="flex my-4 mx-auto md:mx-0 justify-center">
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={() => setMenu(false)} to="/"><BiLogoTwitter /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={() => setMenu(false)} to="/"><BiLogoFacebook /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={() => setMenu(false)} to="/"><TfiGoogle /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={() => setMenu(false)} to="/"><BiLogoInstagram /></NavLink></li>
              <li className="mx-3 md:mx-[3px]"><NavLink onClick={() => setMenu(false)} to="/"><BiLogoPinterestAlt /></NavLink></li>
            </ul>
            <p className="text-[8px] mx-0 text-center mb-3">@ 2015 PLAGGIO & CSPA - PIVA</p>
          </div>
        </div>
      </nav>
      )}
    </>
  );
}

export default NavigationPanel;
