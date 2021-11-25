import React, { useState, useEffect } from 'react';
import logo from '../images/logo.png';
import TaiFun from '../images/TaiFun.png';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/context';

function Navbar(props) {
  const { navBtnState, setNavBtnState } = useMyContext();
  // const toggleMenu = () => {
  //   setNavBtnState({
  //     ...navBtnState,
  //     menu: !navBtnState.menu,
  //   });
  // };

  return (
    <>
      <header>
        <nav
          className="fixed flex flex-wrap items-center
    justify-between w-full
    py-0 px-lg text-gray-600 bg-white z-50 shadow-lg"
        >
          <div
            className="flex flex-wrap items-center
    justify-between"
          >
            <Link
              to="/f2e"
              onClick={() =>
                setNavBtnState({
                  menu: 'hamburger',
                  navWrapper: 'nav-wrapper',
                  attractionsLinkClass: 'navBtn',
                  activitiesLinkClass: 'navBtn ',
                  foodLinkClass: 'navBtn ',
                })
              }
            >
              <img src={logo} />
            </Link>
            <Link
              to="/f2e"
              onClick={() =>
                setNavBtnState({
                  menu: 'hamburger',
                  navWrapper: 'nav-wrapper',
                  attractionsLinkClass: 'navBtn',
                  activitiesLinkClass: 'navBtn ',
                  foodLinkClass: 'navBtn ',
                })
              }
            >
              <img src={TaiFun} />
            </Link>
          </div>
          <div
            class={navBtnState.menu}
            onClick={() => {
              {
                navBtnState.menu === 'hamburger'
                  ? setNavBtnState({
                      menu: 'hamburger active',
                      navWrapper: 'nav-wrapper active',
                    })
                  : setNavBtnState({
                      menu: 'hamburger',
                      navWrapper: 'nav-wrapper',
                    });
              }
            }}
          >
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <div class={navBtnState.navWrapper}>
            <ul className="flex">
              <li>
                <Link
                  to="/f2e/attractions/1"
                  // className="navBtn navBtn-active"
                  className={navBtnState.attractionsLinkClass}
                  onClick={() =>
                    setNavBtnState({
                      menu: 'hamburger',
                      navWrapper: 'nav-wrapper',
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
                  to="/f2e/food/1"
                  className={navBtnState.foodLinkClass}
                  onClick={() =>
                    setNavBtnState({
                      menu: 'hamburger',
                      navWrapper: 'nav-wrapper',
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
                  to="/f2e/activities/1"
                  className={navBtnState.activitiesLinkClass}
                  onClick={() =>
                    setNavBtnState({
                      menu: 'hamburger',
                      navWrapper: 'nav-wrapper',
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
