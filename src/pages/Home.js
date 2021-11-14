import React from 'react';
import { Link } from 'react-router-dom'; //Link標籤要變成link
import hotfire from '../images/hotfire.svg';
import spot1 from '../images/spot1.png';
import spot2 from '../images/spot2.png';
import spot3 from '../images/spot3.png';
import location from '../images/location.png';

function Home() {
  return (
    <>
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-wrap items-center">
            <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
              熱門景點
            </h2>
            <img src={hotfire} />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot1}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot2}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot3}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
        </div>
      </div>
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-wrap items-center">
            <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
              熱門美食
            </h2>
            <img src={hotfire} />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot1}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot2}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot3}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
        </div>
      </div>
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto py-lg px-xl sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="flex flex-wrap items-center">
            <h2 className="text-3xl font-bold tracking-normal text-primary pr-md">
              熱門活動
            </h2>
            <img src={hotfire} />
          </div>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 lg:grid-cols-2 xl:grid-cols-3 xl:gap-x-8">
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot1}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot2}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
                </p>

                <Link
                  to="/"
                  className="border border-primary bg-white text-primary tracking-widest font-medium px-md py-sm rounded hover:bg-primary  hover:text-white inline-block flex justify-center relative btn overflow-hidden"
                >
                  <span className="absolute inset-0 bg-primary"></span>
                  <span className="absolute inset-0 flex justify-center items-center tracking-widest font-medium">
                    查看詳情
                  </span>
                  查看詳情
                </Link>
              </div>
            </div>
            <div className="group shadow-xl rounded-xl">
              <div className="w-full h-60 bg-gray-200 rounded-t-xl overflow-hidden     group-hover:opacity-75 aspect-none">
                <img
                  src={spot3}
                  alt=""
                  className="w-full h-full object-center object-cover transform transition duration-500 hover:scale-110"
                />
              </div>
              <div className="m-6 ">
                <div className="pb-sm flex justify-start items-center">
                  <img src={location} className="pr-sm" />
                  <p className="text-sm text-gray-500 font-semibold text-sm">
                    臺中市 清水區
                  </p>
                </div>
                <h3 className="text-sm text-gray-700 pb-sm font-semibold text-base">
                  <a href="#">
                    <span
                      aria-hidden="true"
                      className="absolute inset-0"
                    ></span>
                    高美濕地＿高美野生動物保護區
                  </a>
                </h3>
                <p className="text-sm text-gray-500 pb-sm">開放時間</p>
                <p className="text-sm text-gray-500 pb-sm">
                  詳見官網或電話洽詢
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
        </div>
      </div>
    </>
  );
}

export default Home;
