import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; //a標籤要變成link
import axios from 'axios';
import env from 'react-dotenv';
import jsSHA from 'jssha';
import $ from 'jquery';
import Slider from 'react-slick';

// 引入icon
import hotfire from '../images/hotfire.svg';
import location from '../images/location.png';
import { BiChevronRight } from 'react-icons/bi';
// 引入components
import BannerHome from '../components/BannerHome';
// 引入照片
import spot1 from '../images/spot1.png';
import spot2 from '../images/spot2.png';
import spot3 from '../images/spot3.png';

function Home() {
  const [hotAttractionsData, setHotAttractionsData] = useState([]);
  const [hotFoodData, setHotFoodData] = useState([]);
  const [hotActivitiesData, setHotActivitiesData] = useState([]);
  useEffect(() => {
    async function getData() {
      try {
        // 景點 api
        const attractionsData = await axios.get(
          'https://ptx.transportdata.tw/MOTC/v2/Tourism/ScenicSpot?$top=30&$format=JSON',
          {
            headers: getAuthorizationHeader(),
          }
        );
        // console.log(attractionsData.data);
        setHotAttractionsData(attractionsData.data);

        // 食物 api
        const foodData = await axios.get(
          'https://ptx.transportdata.tw/MOTC/v2/Tourism/Restaurant?$top=30&$format=JSON',
          {
            headers: getAuthorizationHeader(),
          }
        );
        console.log(foodData.data);
        setHotFoodData(foodData.data);

        // 活動 api

        const activitiesData = await axios.get(
          'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=30&$format=JSON',
          {
            headers: getAuthorizationHeader(),
          }
        );
        console.log(activitiesData.data);
        setHotActivitiesData(activitiesData.data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();
  }, []);

  const getAuthorizationHeader = () => {
    //  填入自己 ID、KEY 開始
    // let AppID = '1091b7947f8c4fb9b62d235438b5cf18';
    // let AppKey = 'QNGy17E_hvfTkWF347_iWsYLcb0';
    let AppID = process.env.REACT_APP_TDX_APP_ID;
    let AppKey = process.env.REACT_APP_TDX_APP_KEY;
    console.log('AppID', AppID);
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
      <BannerHome />
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center">
              <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
                熱門景點
              </h2>
              <img src={hotfire} />
            </div>
            <div>
              <Link
                to="/f2e/attractions"
                className="flex flex-wrap items-center text-danger"
              >
                <p>更多熱門景點</p>
                <BiChevronRight />
              </Link>
            </div>
          </div>
          {/* <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8 hotSlider"></div> */}
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 hotSlider">
            <Slider
              arrows={true}
              dots={true}
              slidesToShow={3}
              slidesToScroll={3}
              infinite={true}
              // autoplay={true}
              // autoplaySpeed={2000}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 770,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                  },
                },
              ]}
            >
              {hotAttractionsData.map((hotAttractions, i) => (
                <div
                  className="group shadow-xl rounded-xl px-sm"
                  key={hotAttractions.ID}
                >
                  <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                    <img
                      src={hotAttractions.Picture.PictureUrl1}
                      alt=""
                      className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="m-6 ">
                    <div className="pb-sm flex justify-start items-center">
                      <img src={location} className="pr-sm" />
                      <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                        {hotAttractions.Address}
                      </p>
                    </div>
                    <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                      <a href="#">{hotAttractions.Name}</a>
                    </h3>
                    <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                    <p className="text-sm text-gray-500 pb-sm short-words h-6">
                      {hotAttractions.OpenTime}
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
            </Slider>
          </div>
        </div>
      </div>
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center">
              <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
                熱門美食
              </h2>
              <img src={hotfire} />
            </div>
            <div>
              <Link
                to="/f2e/food"
                className="flex flex-wrap items-center text-danger"
              >
                <p>更多熱門美食</p>
                <BiChevronRight />
              </Link>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 hotSlider">
            <Slider
              arrows={true}
              dots={true}
              slidesToShow={3}
              slidesToScroll={3}
              infinite={true}
              // autoplay={true}
              // autoplaySpeed={2000}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 770,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                  },
                },
              ]}
            >
              {hotFoodData.map((hotFood, i) => (
                <div
                  className="group shadow-xl rounded-xl px-sm"
                  key={hotFood.ID}
                >
                  <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                    <img
                      src={hotFood.Picture.PictureUrl1}
                      alt=""
                      className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="m-6 ">
                    <div className="pb-sm flex justify-start items-center">
                      <img src={location} className="pr-sm" />
                      <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                        {hotFood.Address}
                      </p>
                    </div>
                    <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                      <a href="#">{hotFood.RestaurantName}</a>
                    </h3>
                    <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                    <p className="text-sm text-gray-500 pb-sm short-words h-6">
                      {hotFood.OpenTime}
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
            </Slider>
          </div>
        </div>
      </div>
      <div className="container mx-auto pb-lg">
        <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex flex-wrap items-center">
              <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
                熱門活動
              </h2>
              <img src={hotfire} />
            </div>
            <div>
              <Link
                to="/f2e/activities"
                className="flex flex-wrap items-center text-danger"
              >
                <p>更多熱門活動</p>
                <BiChevronRight />
              </Link>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 hotSlider">
            <Slider
              arrows={true}
              dots={true}
              slidesToShow={3}
              slidesToScroll={3}
              infinite={true}
              // autoplay={true}
              // autoplaySpeed={2000}
              responsive={[
                {
                  breakpoint: 1024,
                  settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: true,
                    dots: true,
                  },
                },
                {
                  breakpoint: 770,
                  settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true,
                  },
                },
              ]}
            >
              {hotActivitiesData.map((hotActivities, i) => (
                <div
                  className="group shadow-xl rounded-xl px-sm"
                  key={hotActivities.ID}
                >
                  <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                    <img
                      src={hotActivities.Picture.PictureUrl1}
                      alt=""
                      className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                    />
                  </div>
                  <div className="m-6 ">
                    <div className="pb-sm flex justify-start items-center">
                      <img src={location} className="pr-sm" />
                      <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                        {hotActivities.Location}
                      </p>
                    </div>
                    <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base short-words h-7">
                      <a href="#">{hotActivities.Name}</a>
                    </h3>
                    <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                    <p className="text-sm text-gray-500 pb-sm short-words h-6">
                      {hotActivities.StartTime.substring(0, 10)}
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
            </Slider>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
