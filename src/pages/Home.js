import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMyContext } from '../context/context';
import axios from 'axios';
import jsSHA from 'jssha';
import Slider from 'react-slick';
import Typing from 'react-typing-animation';

// 引入 icons
import { BiSearch } from 'react-icons/bi';
import { AiOutlinePicture } from 'react-icons/ai';
import hotfire from '../images/hotfire.svg';
import location from '../images/location.png';
import { BiChevronRight } from 'react-icons/bi';
// 引入 components
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
          <div className="banner-home flex justify-center items-center">
            <div className="banner-mask"></div>
            <div className="container relative text-center">
              <Typing speed={200}>
                <h1 className="lg:text-5xl text-4xl font-bold text-white mb-4">
                  探索臺灣之美
                </h1>
                <Typing.Speed ms={200} />
                <h1 className="lg:text-5xl text-4xl font-bold text-white mb-4">
                  讓我們更親近這片土地
                </h1>
                <Typing.Speed ms={200} />
                <h2 className="text-2xl font-bold text-white mb-4">
                  景點、 美食、 活動
                </h2>
              </Typing>
              {/* <h1 className="text-5xl font-bold text-white mb-4">
                探索臺灣之美
              </h1>
              <h1 className="text-5xl font-bold text-white mb-4">
                讓我們更親近這片土地
              </h1>
              <h2 className="text-2xl font-bold text-white mb-4">
                景點、 美食、 活動
              </h2> */}
              {/* <div className="flex justify-center items-center">
                <div className="mr-2">
                  <input
                    className="md:w-96 w-40 shadow appearance-none py-sm px-md text-secondary leading-tight"
                    type="text"
                    placeholder="請輸入關鍵字搜尋"
                  />
                </div>
                <div className="mr-2">
                  <select className="shadow appearance-none py-1.5 px-md text-secondary ">
                    <option>景點</option>
                    <option>美食</option>
                    <option>活動</option>
                  </select>
                </div>
                <div className=" w-9 h-9 bg-primary rounded-md cursor-pointer">
                  <BiSearch className="text-white leading-9 text-4xl" />
                </div>
              </div> */}
            </div>
          </div>
          <div className="container mx-auto">
            <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="flex justify-between items-center">
                <div className="flex flex-wrap items-center">
                  <h2 className="text-3xl font-bold tracking-normal text-primary md:pr-md pr-sm">
                    熱門景點
                  </h2>
                  <img className="md:h-8 h-6" src={hotfire} />
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
                  slidesToShow={3}
                  slidesToScroll={3}
                  infinite={true}
                  dots={true}
                  autoplay={true}
                  autoplaySpeed={4000}
                  responsive={[
                    {
                      breakpoint: 770,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true,
                        arrows: true,
                      },
                    },
                    {
                      breakpoint: 375,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: true,
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
                            to={`/f2e/detail/${hotAttractions.ID}`}
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
                  <h2 className="text-3xl font-bold tracking-normal text-primary md:pr-md pr-sm">
                    熱門美食
                  </h2>
                  <img className="md:h-8 h-6" src={hotfire} />
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
                  autoplay={true}
                  autoplaySpeed={4000}
                  responsive={[
                    {
                      breakpoint: 770,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true,
                        arrows: true,
                      },
                    },
                    {
                      breakpoint: 375,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: true,
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
                            to={`/f2e/detail/${hotFood.ID}`}
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
                  <h2 className="text-3xl font-bold tracking-normal text-primary md:pr-md pr-sm">
                    熱門活動
                  </h2>
                  <img className="md:h-8 h-6" src={hotfire} />
                </div>
                <div>
                  <Link
                    to="/f2e/activities"
                    className="flex flex-wrap items-center text-danger"
                  >
                    <p className="text-base">更多熱門活動</p>
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
                  autoplay={true}
                  autoplaySpeed={4000}
                  responsive={[
                    {
                      breakpoint: 770,
                      settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2,
                        infinite: true,
                        dots: true,
                        arrows: true,
                      },
                    },
                    {
                      breakpoint: 375,
                      settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: true,
                        dots: false,
                        arrows: true,
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
                            to={`/f2e/detail/${hotActivities.ID}`}
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
