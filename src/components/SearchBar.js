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
    setCurrentPage,
  } = useMyContext();

  useEffect(() => {
    setSearchWordClick('');
    setSearchCityClick('');
  }, []);
  // console.log('posts', posts);
  // posts.some(function(item,index,array){
  //     return item.hasOwnProperty('Address')
  // })
  // console.log(
  //   'result',
  //   // posts.every(function (item, index, array) {
  //   //   return item.hasOwnProperty('Address');
  //   // })
  //   posts.every((item) => item.hasOwnProperty('Address'))
  // );

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
      let newFilterPosts = [...newPosts].filter((item) => {
        // console.log('item', item);
        return item.hasOwnProperty('Address');
      });

      newPosts = newFilterPosts.filter((item) => {
        // console.log('item', item);
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
    setCurrentPage(1);
  };

  return (
    <>
      <form>
        <div className="flex justify-center items-center">
          <div className="mr-2">
            <input
              className="md:w-96 w-40 shadow appearance-none py-sm px-md text-secondary leading-tight bg-white"
              type="text"
              placeholder="請輸入關鍵字搜尋"
              value={searchWord}
              onChange={(e) => {
                setSearchWord(e.target.value);
              }}
            />
          </div>
          <div className="mr-2">
            <select
              className="shadow appearance-none py-1.5 px-md text-secondary bg-white"
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
