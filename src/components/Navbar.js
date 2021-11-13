import React from 'react';
import logo from '../images/logo.png';
import TaiFun from '../images/TaiFun.png';
import { Link } from 'react-router-dom'; //a標籤要變成link

function Navbar(props) {
  return (
    <>
      <header>
        <nav
          className="fixed flex flex-wrap items-center
    justify-between w-full
    py-4 md:py-0 px-4 text-gray-600 bg-white"
        >
          <div
            className="flex flex-wrap items-center
    justify-between"
          >
            <img src={logo} />
            <img src={TaiFun} />
          </div>
          <div>
            <ul className="md:flex">
              <li>
                <a className="block md:pr-6 hover:text-purple-400">探索景點</a>
              </li>
              <li>
                <a className="block md:pr-6 hover:text-purple-400">節慶活動</a>
              </li>
              <li>
                <a className="block md:pr-6 hover:text-purple-400">品嚐美食</a>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
