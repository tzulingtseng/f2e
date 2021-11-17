import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { MyContext } from './context/context';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
// pages
import Home from './pages/Home';
import Attractions from './pages/Attractions';
import Activities from './pages/Activities';
import Food from './pages/Food';
import Detail from './pages/Detail';

function App() {
  const [posts, setPosts] = useState([]); // 全部的資料
  const [displayPosts, setDisplayPosts] = useState([]); // 展示的資料
  const [postsPerPage] = useState(5); //每頁的顯示的資料筆數
  const [currentPage, setCurrentPage] = useState(1); // 目前在第幾頁，預設第一頁

  const [searchWord, setSearchWord] = useState('');

  // 如果 currentPage 沒有設定，那就預設第一頁
  // 偵測網址上的變化
  useEffect(() => {
    setCurrentPage(parseInt(currentPage, 10) || 1);
  }, [currentPage]);

  const myRef = useRef();
  const executeScroll = () => myRef.current.scrollIntoView();

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    executeScroll();
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
          myRef,
          searchWord,
          setSearchWord,
          displayPosts,
          setDisplayPosts,
        }}
      >
        <Router>
          <>
            <Navbar />
            <Switch>
              <Route path="/f2e/attractions">
                <Attractions />
              </Route>
              <Route path="/f2e/activities">
                <Activities />
              </Route>
              <Route path="/f2e/food">
                <Food />
              </Route>
              <Route path="/f2e/detail">
                <Detail />
              </Route>
              <Route path="/f2e">
                <Home />
              </Route>
            </Switch>
            <Footer />
          </>
        </Router>
      </MyContext.Provider>
    </>
  );
}

export default App;
