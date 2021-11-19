import {
  BrowserRouter as Router,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import qs from 'querystring';

import { MyContext } from './context/context';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
// pages
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import Activities from './pages/Activities';
import Food from './pages/Food';
import Detail from './pages/Detail';

function App() {
  const [posts, setPosts] = useState([]); // 全部的資料
  const [displayPosts, setDisplayPosts] = useState([]); // 展示的資料
  const [currentPagePosts, setCurrentPagePosts] = useState([]);
  const [postsPerPage] = useState(15); //每頁的顯示的資料筆數
  const [currentPage, setCurrentPage] = useState(1); // 目前在第幾頁，預設第一頁
  const [groupCount, setGroupCount] = useState(5);
  // 頁碼分組，顯示7個頁碼，其餘用省略號顯示
  const [startPage, setStartPage] = useState(1);
  // 分頁開始頁碼

  const [searchWord, setSearchWord] = useState('');
  const [searchWordClick, setSearchWordClick] = useState('');
  // console.log('searchWord', searchWord);

  const [searchCity, setSearchCity] = useState('');
  const [searchCityClick, setSearchCityClick] = useState('');
  // console.log('searchCity', searchCity);
  const [detail, setDetail] = useState([]);

  // 如果 currentPage 沒有設定，那就預設第一頁
  // 偵測網址上的變化
  useEffect(() => {
    setCurrentPage(parseInt(currentPage, 10) || 1);
  }, [currentPage]);

  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  const paginate = (pageNumber) => {
    // if (currentPage >= groupCount) {
    //   console.log('123');
    //   setStartPage(currentPage - 2);
    // }
    // if (currentPage < groupCount) {
    //   setStartPage(1);
    // }
    // if (currentPage === 1) {
    //   setStartPage(1);
    // }
    setCurrentPage(pageNumber);

    executeScroll();
  };

  // const handleSearch = (posts, searchWord) => {
  //   let newPosts = [];
  //   if (searchWord) {
  //     newPosts = posts.filter((item) => {
  //       return item.Name.includes(searchWord);
  //     });
  //   } else {
  //     newPosts = [...posts];
  //   }
  //   return newPosts;
  // };

  // const handleSelect = (posts, searchCity) => {
  //   let newPosts = [...posts];
  //   if (searchCity) {
  //     newPosts = [...newPosts].filter((item) => {
  //       return item.Address.includes(searchCity);
  //     });
  //   }
  //   return newPosts;
  // };
  // const handleSubmit = () => {
  //   let newPosts = [];
  //   // 處理文字搜尋
  //   newPosts = handleSearch(posts, searchWord);
  //   // 處理選擇搜尋
  //   newPosts = handleSelect(newPosts, searchCity);
  //   setDisplayPosts(newPosts);
  // };
  // useEffect(() => {
  //   // let newPosts = [];
  //   // // 處理文字搜尋
  //   // newPosts = handleSearch(posts, searchWord);
  //   // // 處理選擇搜尋
  //   // newPosts = handleSelect(newPosts, searchCity);
  //   // setDisplayPosts(newPosts);
  // }, [searchWord, searchCity]);

  return (
    <>
      <MyContext.Provider
        value={{
          posts,
          setPosts,
          postsPerPage,
          currentPage,
          setCurrentPage,
          paginate,
          myRef,
          searchWord,
          setSearchWord,
          displayPosts,
          setDisplayPosts,
          currentPagePosts,
          setCurrentPagePosts,
          searchCity,
          setSearchCity,
          groupCount,
          startPage,
          detail,
          setDetail,
          searchWordClick,
          setSearchWordClick,
          searchCityClick,
          setSearchCityClick,
        }}
      >
        <Router>
          <>
            <Navbar />
            <ScrollToTop>
              <Switch>
                <Route path="/f2e/detail/:id">
                  <Detail />
                </Route>
                <Route path="/f2e/attractions">
                  <Attractions />
                </Route>
                <Route path="/f2e/activities">
                  <Activities />
                </Route>
                <Route path="/f2e/food">
                  <Food />
                </Route>

                <Route path="/f2e">
                  <Home />
                </Route>
              </Switch>
            </ScrollToTop>
            <BackToTopButton />
            <Footer />
          </>
        </Router>
      </MyContext.Provider>
    </>
  );
}

export default App;
