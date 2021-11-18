import { useContext, useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useMyContext } from '../context/context';
import { CITY_OPTIONS } from '../data/cityData';

function Banner() {
  const { searchWord, setSearchWord, searchCity, setSearchCity, handleSubmit } =
    useMyContext();

  return (
    <>
      <div className="banner-attractions flex justify-center items-center">
        <div className="banner-mask"></div>
        <div className="container relative text-center">
          <h1 className="text-5xl font-bold text-white mb-4">尋找景點</h1>
          <h2 className="text-2xl font-bold text-white mb-4">
            景點、 美食、 活動
          </h2>
          <form>
            <div className="flex justify-center items-center">
              <div className="mr-2">
                <input
                  className="w-96 shadow appearance-none py-sm px-md text-secondary leading-tight"
                  type="text"
                  placeholder="你想去哪裡？請輸入關鍵字"
                  value={searchWord}
                  onChange={(e) => {
                    setSearchWord(e.target.value);
                  }}
                />
              </div>
              <div className="mr-2">
                <select
                  className="shadow appearance-none py-1.5 px-md text-secondary "
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                >
                  <option value="">全部縣市</option>
                  {Object.keys(CITY_OPTIONS).map((cityKey) => (
                    <option key={cityKey} value={CITY_OPTIONS[cityKey]}>
                      {CITY_OPTIONS[cityKey]}
                    </option>
                  ))}
                </select>
              </div>
              <div className=" w-9 h-9 bg-primary rounded-md ">
                <BiSearch
                  className="text-white leading-9 text-4xl cursor-pointer"
                  onClick={handleSubmit}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default Banner;
