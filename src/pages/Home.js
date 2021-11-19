import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/context';
import axios from 'axios';
import jsSHA from 'jssha';
import Slider from 'react-slick';

// 引入icon
import { AiOutlinePicture } from 'react-icons/ai';
import hotfire from '../images/hotfire.svg';
import location from '../images/location.png';
import { BiChevronRight } from 'react-icons/bi';
// 引入components
import BannerHome from '../components/BannerHome';
import Spinner from '../components/Spinner';

function Home() {
  const [hotAttractionsData, setHotAttractionsData] = useState([]);
  const [hotFoodData, setHotFoodData] = useState([]);
  const [hotActivitiesData, setHotActivitiesData] = useState([]);
  const { detail, setDetail, isLoading, setIsLoading } = useMyContext();
  useEffect(() => {
    // 先開起載入指示器
    setIsLoading(true);

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
        // console.log(foodData.data);
        setHotFoodData(foodData.data);

        // 活動 api

        const activitiesData = await axios.get(
          'https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$top=30&$format=JSON',
          {
            headers: getAuthorizationHeader(),
          }
        );
        // console.log(activitiesData.data);
        setHotActivitiesData(activitiesData.data);
      } catch (e) {
        console.log(e);
      }
    }
    getData();

    // 1.5秒後關閉指示器
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  }, []);

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
                    <div className="group pr-lg " key={hotAttractions.ID}>
                      <div className="shadow-md rounded-xl">
                        {JSON.stringify(hotAttractions.Picture) === '{}' ||
                        !hotAttractions.Picture.hasOwnProperty(
                          'PictureUrl1'
                        ) ? (
                          <div className="w-full h-60 bg-secondary rounded-t-xl overflow-hidden group-hover:opacity-75 aspect-none flex items-center text-secondary">
                            <div className="mx-auto">
                              <AiOutlinePicture className="text-7xl  mx-auto" />
                              <p>此景點未提供照片</p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                            <img
                              src={hotAttractions.Picture.PictureUrl1}
                              alt=""
                              className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="m-6 pb-lg ">
                          <div className="pb-sm flex justify-start items-center">
                            <img src={location} className="pr-sm" />
                            <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                              {hotAttractions.hasOwnProperty('Address')
                                ? hotAttractions.Address
                                : '詳見官網'}
                            </p>
                          </div>
                          <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base short-words h-7">
                            <a href="#">{hotAttractions.Name}</a>
                          </h3>
                          <p className="text-sm text-gray-500">開放時間</p>
                          <p className="text-sm text-gray-500 pb-sm short-words h-7 leading-7">
                            {hotAttractions.hasOwnProperty('OpenTime')
                              ? hotAttractions.OpenTime
                              : hotAttractions.StartTime.substring(0, 10)}
                          </p>

                          <Link
                            to={`f2e/detail/${hotAttractions.ID}`}
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
                    <div className="group pr-lg" key={hotFood.ID}>
                      <div className="shadow-md rounded-xl">
                        {JSON.stringify(hotFood.Picture) === '{}' ||
                        !hotFood.Picture.hasOwnProperty('PictureUrl1') ? (
                          <div className="w-full h-60 bg-secondary rounded-t-xl overflow-hidden group-hover:opacity-75 aspect-none flex items-center text-secondary">
                            <div className="mx-auto">
                              <AiOutlinePicture className="text-7xl  mx-auto" />
                              <p>此景點未提供照片</p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                            <img
                              src={hotFood.Picture.PictureUrl1}
                              alt=""
                              className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="m-6 pb-lg">
                          <div className="pb-sm flex justify-start items-center">
                            <img src={location} className="pr-sm" />
                            <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                              {hotFood.hasOwnProperty('Address')
                                ? hotFood.Address
                                : '詳見官網'}
                            </p>
                          </div>
                          <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base short-words h-7">
                            <a href="#">{hotFood.Name}</a>
                          </h3>
                          <p className="text-sm text-gray-500">開放時間</p>
                          <p className="text-sm text-gray-500 pb-sm short-words h-7 leading-7">
                            {hotFood.hasOwnProperty('OpenTime')
                              ? hotFood.OpenTime
                              : hotFood.StartTime.substring(0, 10)}
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
                    <div className="group pr-lg" key={hotActivities.ID}>
                      <div className="shadow-md rounded-xl">
                        {JSON.stringify(hotActivities.Picture) === '{}' ||
                        !hotActivities.Picture.hasOwnProperty('PictureUrl1') ? (
                          <div className="w-full h-60 bg-secondary rounded-t-xl overflow-hidden group-hover:opacity-75 aspect-none flex items-center text-secondary">
                            <div className="mx-auto">
                              <AiOutlinePicture className="text-7xl  mx-auto" />
                              <p>此景點未提供照片</p>
                            </div>
                          </div>
                        ) : (
                          <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                            <img
                              src={hotActivities.Picture.PictureUrl1}
                              alt=""
                              className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                            />
                          </div>
                        )}
                        <div className="m-6 pb-lg">
                          <div className="pb-sm flex justify-start items-center">
                            <img src={location} className="pr-sm" />
                            <p className="text-sm text-gray-500 font-semibold text-sm short-words">
                              {hotActivities.Location}
                            </p>
                          </div>
                          <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base short-words h-7">
                            <a href="#">{hotActivities.Name}</a>
                          </h3>
                          <p className="text-sm text-gray-500">開放時間</p>
                          <p className="text-sm text-gray-500 pb-sm short-words h-7 leading-7">
                            {hotActivities.hasOwnProperty('OpenTime')
                              ? hotActivities.OpenTime
                              : hotActivities.StartTime.substring(0, 10)}
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
                    </div>
                  ))}
                </Slider>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Home;
