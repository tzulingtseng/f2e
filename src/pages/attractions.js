import React, { useState, useEffect } from 'react';
import { Link, useParams, useHistory } from 'react-router-dom'; //a標籤要變成link
import axios from 'axios';
import jsSHA from 'jssha';
import BannerAttractions from '../components/BannerAttractions';
// 引入icon
import hotfire from '../images/hotfire.svg';
import location from '../images/location.png';
import { useMyContext } from '../context/context';
import Pagination from '../components/Pagination';

function Attractions() {
  const { currentPageURL } = useParams();
  const { posts, setPosts, postsPerPage, currentPage, myRef, setPage } =
    useMyContext();
  setPage(currentPageURL);

  let history = useHistory();
  useEffect(() => {
    history.push(`/f2e/attractions/${currentPage}`);
  }, [currentPage]);
  // const [allAttractions, setAllAttractions] = useState([]);
  // pagination

  // const [posts, setPosts] = useState([]); // 全部的資料
  // const [currentPage, setCurrentPage] = useState(1); // 目前在第幾頁，預設第一頁
  // const [postsPerPage, setPostsPerPage] = useState(5); //每頁的顯示的資料筆數
  useEffect(() => {
    // 有篩選縣市的景點資料
    // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot/Taipei?$top=30&$format=JSON
    // 全部景點資料
    // https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON
    const getAllAttractionsData = async () => {
      try {
        const postsRes = await axios.get(
          'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON',
          {
            headers: getAuthorizationHeader(),
          }
        );
        console.log('postsRes', postsRes);
        setPosts(postsRes.data);
      } catch (e) {
        console.log(e);
      }
    };
    getAllAttractionsData();
    // console.log('allAttractions', posts);

    // TODO：取得這一頁應該要有的資料
    // page 1: 1-15 跳過0筆
    // page 2: 16-30 跳過15筆
    // LIMIT: 要取幾筆資料
    // OFFSET: 要跳過幾筆資料
  }, []);

  const indexOfLastPost = currentPage * postsPerPage; // 20 = 2*10
  const indexOfFirstPost = indexOfLastPost - postsPerPage; // 10 = 20-10
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost); // 100.slice(10,20)
  // console.log('currentPosts', currentPosts);

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
      <BannerAttractions />
      <div className="container mx-auto" ref={myRef}>
        <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center">
              <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
                搜尋結果
              </h2>
              <img src={hotfire} />
            </div>
            <p className="">
              目前顯示 <span className="text-primary">15</span> 筆
            </p>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            {currentPosts.map((item, i) => (
              <div className="group shadow-xl rounded-xl" key={item.ID}>
                <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                  <img
                    src={item.Picture.PictureUrl1}
                    alt=""
                    className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                  />
                </div>
                <div className="m-6 ">
                  <div className="pb-sm flex justify-start items-center">
                    <img src={location} className="pr-sm" />
                    <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                      {item.Address}
                    </p>
                  </div>
                  <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                    <a href="#"> {item.Name}</a>
                  </h3>
                  <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                  <p className="text-sm text-gray-500 pb-sm short-words h-6">
                    {item.OpenTime}
                  </p>

                  <Link
                    to="/"
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
    </>
  );
}

export default Attractions;
