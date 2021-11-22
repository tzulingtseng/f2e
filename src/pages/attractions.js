import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import jsSHA from 'jssha';
import SearchBar from '../components/SearchBar';
// 引入icon
import { AiOutlinePicture } from 'react-icons/ai';
import hotfire from '../images/hotfire.svg';
import location from '../images/location.png';
import { useMyContext } from '../context/context';
// 引入components
import Pagination from '../components/Pagination';
import Spinner from '../components/Spinner';

function Attractions() {
  const {
    posts,
    setPosts,
    postsPerPage,
    currentPage,
    myRef,
    displayPosts,
    setDisplayPosts,
    searchWord,
    setSearchWord,
    searchCity,
    setSearchCity,
    searchWordClick,
    setSearchWordClick,
    searchCityClick,
    setSearchCityClick,
    isLoading,
    setIsLoading,
    setNavBtnState,
  } = useMyContext();

  useEffect(() => {
    // 先開起載入指示器
    setIsLoading(true);

    setNavBtnState({
      menu: 'hamburger',
      navWrapper: 'nav-wrapper',
      attractionsLinkClass: 'navBtn navBtn-active',
      activitiesLinkClass: 'navBtn ',
      foodLinkClass: 'navBtn ',
    });

    const getAllAttractionsData = async () => {
      try {
        const postsRes = await axios.get(
          'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=150&$format=JSON',
          {
            headers: getAuthorizationHeader(),
          }
        );
        // console.log('postsRes', postsRes);
        setPosts(postsRes.data);
        setDisplayPosts(postsRes.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllAttractionsData();

    // 0.5秒後關閉指示器
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, []);

  let history = useHistory();
  useEffect(() => {
    history.push(`/f2e/attractions/${currentPage}`);
  }, [currentPage]);

  const indexOfLastPost = currentPage * postsPerPage; // 20 = 2*10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 = 20-10
  const currentPosts = displayPosts.slice(indexOfFirstPost, indexOfLastPost); // 100.slice(10,20)

  // API ID & KEY 加密
  const getAuthorizationHeader = () => {
    //  填入自己 ID、KEY 開始
    let AppID = process.env.REACT_APP_TDX_APP_ID;
    let AppKey = process.env.REACT_APP_TDX_APP_KEY;
    //  填入自己 ID、KEY 結束
    let GMTString = new Date().toGMTString();
    let ShaObj = new jsSHA('SHA-1', 'TEXT');
    ShaObj.setHMACKey(AppKey, 'TEXT');
    ShaObj.update('x-date: ' + GMTString);
    let HMAC = ShaObj.getHMAC('B64');
    let Authorization =
      'hmac username="' +
      AppID +
      '", algorithm="hmac-sha1", headers="x-date", signature="' +
      HMAC +
      '"';
    return { Authorization: Authorization, 'X-Date': GMTString };
  };

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          {' '}
          <div className="banner-attractions flex justify-center items-center">
            <div className="banner-mask"></div>
            <div className="container relative text-center">
              <h1 className="text-5xl font-bold text-white mb-4">尋找景點</h1>
              <h2 className="text-2xl font-bold text-white mb-4">
                景點、 美食、 活動
              </h2>
              <SearchBar />
            </div>
          </div>
          <div className="container mx-auto" ref={myRef}>
            <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8 gap-6">
              <div className="md:flex md:justify-between md:items-end">
                <div className="flex flex-wrap items-center justify-center">
                  <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
                    搜尋結果
                  </h2>
                  <img className="h-8" src={hotfire} />
                </div>

                <p className="md:block hidden">
                  關鍵字：
                  <span className="text-primary">
                    {searchWordClick === '' ? '無' : searchWordClick}
                  </span>{' '}
                  ，地區：
                  <span className="text-primary">
                    {searchCityClick === '' ? '無' : searchCityClick}
                  </span>{' '}
                  ，共{' '}
                  <span className="text-primary">{displayPosts.length}</span>{' '}
                  筆資料
                </p>
                <p className="md:hidden block text-center mt-4 leading-7">
                  關鍵字：
                  <span className="text-primary">
                    {searchWordClick === '' ? '無' : searchWordClick}
                  </span>{' '}
                  ，地區：
                  <span className="text-primary">
                    {searchCityClick === '' ? '無' : searchCityClick}
                  </span>{' '}
                  ，
                </p>
                <p className="md:hidden block text-center leading-7">
                  共 <span className="text-primary">{displayPosts.length}</span>{' '}
                  筆資料
                </p>
              </div>
              <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 xl:gap-8">
                {currentPosts.map((item, i) => (
                  <div className="group shadow-md rounded-xl" key={item.ID}>
                    {JSON.stringify(item.Picture) === '{}' ||
                    !item.Picture.hasOwnProperty('PictureUrl1') ? (
                      <div className="w-full h-60 bg-secondary rounded-t-xl overflow-hidden group-hover:opacity-75 aspect-none flex items-center text-secondary">
                        <div className="mx-auto">
                          <AiOutlinePicture className="text-7xl  mx-auto" />
                          <p>此景點未提供照片</p>
                        </div>
                      </div>
                    ) : (
                      <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                        <img
                          src={item.Picture.PictureUrl1}
                          alt=""
                          className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                        />
                      </div>
                    )}
                    <div className="m-6 ">
                      <div className="pb-sm flex justify-start items-center">
                        <img src={location} className="pr-sm" />
                        <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                          {item.hasOwnProperty('Address')
                            ? item.Address
                            : '詳見官網'}
                        </p>
                      </div>
                      <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base short-words h-7">
                        <a href="#"> {item.Name}</a>
                      </h3>
                      <p className="text-sm text-gray-500">開放時間</p>
                      <p className="text-sm text-gray-500 pb-sm short-words h-7 leading-7">
                        {item.hasOwnProperty('OpenTime')
                          ? item.OpenTime
                          : item.StartTime.substring(0, 10)}
                      </p>

                      <Link
                        to={`/f2e/detail/${item.ID}`}
                        className="border border-primary bg-white text-primary tracking-widest font-medium px-md py-sm rounded hover:bg-primary-200  hover:text-white inline-block flex justify-center relative btn overflow-hidden"
                      >
                        <span className="absolute inset-0 bg-primary"></span>
                        <span className="absolute inset-0 flex justify-center items-center tracking-widest font-medium">
                          查看詳情
                        </span>
                        查看詳情
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <Pagination />
        </div>
      )}
    </>
  );
}

export default Attractions;
