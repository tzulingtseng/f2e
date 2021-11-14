import React from 'react';
import logo from '../images/logo.png';
import TaiFun from '../images/TaiFun.png';
import { Link } from 'react-router-dom'; //Link標籤要變成link

function Navbar(props) {
  return (
    <>
      <header>
        <nav
          className="fixed flex flex-wrap items-center
    justify-between w-full
    py-0 px-lg text-gray-600 bg-white z-50"
        >
          <div
            className="flex flex-wrap items-center
    justify-between"
          >
            <Link to="/f2e">
              <img src={logo} />
            </Link>
            <Link to="/f2e">
              <img src={TaiFun} />
            </Link>
          </div>
          <div>
            <ul className="md:flex">
              <li>
                <Link
                  to="/f2e/attractions"
                  className="block md:pr-lg text-secondary hover:text-primary"
                >
                  探索景點
                </Link>
              </li>
              <li>
                <Link
                  to="/f2e/food"
                  className="block md:pr-lg text-secondary hover:text-primary"
                >
                  品嚐美食
                </Link>
              </li>
              <li>
                <Link
                  to="/f2e/activities"
                  className="block  text-secondary hover:text-primary"
                >
                  節慶活動
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
