import { useContext, useState, useEffect } from 'react';
import { BiSearch } from 'react-icons/bi';
import { useMyContext } from '../context/context';
import { CITY_OPTIONS } from '../data/cityData';

function Banner() {
  const {
    posts,
    setDisplayPosts,
    searchWord,
    setSearchWord,
    searchCity,
    setSearchCity,
    searchWordClick,
    setSearchWordClick,
    searchCityClick,
    setSearchCityClick,
  } = useMyContext();

  const handleSearch = (posts, searchWord) => {
    let newPosts = [];
    if (searchWord) {
      newPosts = posts.filter((item) => {
        return item.Name.includes(searchWord);
      });
    } else {
      newPosts = [...posts];
    }
    return newPosts;
  };

  const handleSelect = (posts, searchCity) => {
    let newPosts = [...posts];
    if (searchCity) {
      newPosts = [...newPosts].filter((item) => {
        return item.Address.includes(searchCity);
      });
    }
    return newPosts;
  };

  const handleSubmit = () => {
    let newPosts = [];
    // 處理文字搜尋
    newPosts = handleSearch(posts, searchWord);
    // 處理選擇搜尋
    newPosts = handleSelect(newPosts, searchCity);
    setDisplayPosts(newPosts);
    setSearchWord('');
    setSearchCity('');
    setSearchWordClick(searchWord);
    setSearchCityClick(searchCity);
  };

  return (
    <>
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
    </>
  );
}

export default Banner;
