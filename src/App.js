import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import qs from 'querystring';

import { MyContext } from './context/context';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import BackToTopButton from './components/BackToTopButton';
import Spinner from './components/Spinner';
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

  // 載入指示的spinner動畫用的
  const [isLoading, setIsLoading] = useState(true);

  // 如果 currentPage 沒有設定，那就預設第一頁
  // 偵測網址上的變化
  useEffect(() => {
    setCurrentPage(parseInt(currentPage, 10) || 1);
  }, [currentPage]);

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
  };

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
          isLoading,
          setIsLoading,
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
