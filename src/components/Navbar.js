import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import TaiFun from '../images/TaiFun.png';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/context';

function Navbar(props) {
  const { navBtnState, setNavBtnState } = useMyContext();

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
            <Link
              to="/f2e"
              onClick={() =>
                setNavBtnState({
                  attractionsLinkClass: 'navBtn ',
                  activitiesLinkClass: 'navBtn',
                  foodLinkClass: 'navBtn',
                })
              }
            >
              <img src={logo} />
            </Link>
            <Link
              to="/f2e"
              onClick={() =>
                setNavBtnState({
                  attractionsLinkClass: 'navBtn ',
                  activitiesLinkClass: 'navBtn',
                  foodLinkClass: 'navBtn',
                })
              }
            >
              <img src={TaiFun} />
            </Link>
          </div>
          <div>
            <ul className="md:flex">
              <li>
                <Link
                  to="/f2e/attractions"
                  // className="navBtn navBtn-active"
                  className={navBtnState.attractionsLinkClass}
                  onClick={() =>
                    setNavBtnState({
                      attractionsLinkClass: 'navBtn navBtn-active',
                      activitiesLinkClass: 'navBtn',
                      foodLinkClass: 'navBtn',
                    })
                  }
                >
                  探索景點
                </Link>
              </li>
              <li>
                <Link
                  to="/f2e/food"
                  className={navBtnState.foodLinkClass}
                  onClick={() =>
                    setNavBtnState({
                      attractionsLinkClass: 'navBtn',
                      activitiesLinkClass: 'navBtn',
                      foodLinkClass: 'navBtn navBtn-active',
                    })
                  }
                >
                  品嚐美食
                </Link>
              </li>
              <li>
                <Link
                  to="/f2e/activities"
                  className={navBtnState.activitiesLinkClass}
                  onClick={() =>
                    setNavBtnState({
                      attractionsLinkClass: 'navBtn ',
                      activitiesLinkClass: 'navBtn navBtn-active',
                      foodLinkClass: 'navBtn',
                    })
                  }
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
