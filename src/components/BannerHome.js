import React from 'react';
import { BiSearch } from 'react-icons/bi';

function Banner() {
  return (
    <>
      <div className="banner-home flex justify-center items-center">
        <div className="banner-mask"></div>
        <div class="container relative text-center">
          <h1 className="text-5xl font-bold text-white mb-4">尋找臺灣</h1>
          <h2 className="text-2xl font-bold text-white mb-4">
            景點、 美食、 活動
          </h2>
          <div className="flex justify-center items-center">
            <div className="mr-2">
              <input
                className="w-96 shadow appearance-none py-sm px-md text-secondary leading-tight"
                type="text"
                placeholder="你想去哪裡？請輸入關鍵字"
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Banner;
