import React from 'react';
import { useMyContext } from '../context/context';

function Pagination() {
  const {
    postsPerPage,
    paginate,
    currentPage,
    setCurrentPage,
    myRef,
    displayPosts,
    groupCount,
    startPage,
    setStartPage,
    totalPosts,
    totalPages,
  } = useMyContext();

  // const pages = [];
  // for (let i = 1; i <= totalPages; i++) {
  //   pages.push(i);
  // }

  const getPages = () => {
    let pages = [];
    if (totalPages <= 10) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(
          <button
            className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
            href="#"
            key={i}
            onClick={() => paginate(i)}
            style={{
              backgroundColor: i === currentPage ? '#2F798C' : '',
              color: i === currentPage ? '#ffffff' : '#2F798C',
            }}
          >
            {i}
          </button>
        );
      }
    } else {
      let pageLength = 0;
      // 第一頁
      pages.push(
        <button
          className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-primary hover:border-gray-300"
          href="#"
          onClick={() => paginate(1)}
          style={{
            backgroundColor: 1 === currentPage ? '#2F798C' : '',
            color: 1 === currentPage ? '#ffffff' : '#2F798C',
          }}
        >
          1
        </button>
      );
      if (groupCount + startPage > totalPages) {
        pageLength = totalPages;
      } else {
        pageLength = groupCount + startPage;
      }
      // 前面省略號（當當前頁碼比分組的頁碼大時顯示省略號）
      if (currentPage >= groupCount) {
        pages.push(
          <button
            className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-primary hover:border-gray-300"
            href="#"
          >
            ···
          </button>
        );
      }
      // 非第一頁和最後一頁顯示
      // console.log('pageLength', pageLength);
      for (let i = startPage; i < pageLength; i++) {
        if (i <= totalPages - 1 && i > 1) {
          pages.push(
            <button
              className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              href="#"
              key={i}
              onClick={() => {
                paginate(i);
              }}
              style={{
                backgroundColor: i === currentPage ? '#2F798C' : '',
                color: i === currentPage ? '#ffffff' : '#2F798C',
              }}
            >
              {i}
            </button>
          );
        }
      }
      // 後面省略號
      if (totalPages - startPage >= groupCount + 1) {
        pages.push(
          <button
            className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-primary hover:border-gray-300"
            href="#"
          >
            ···
          </button>
        );
      }
      // 最後一頁
      pages.push(
        <button
          className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-primary hover:border-gray-300"
          href="#"
          onClick={() => paginate(totalPages)}
          style={{
            backgroundColor: totalPages === currentPage ? '#2F798C' : '',
            color: totalPages === currentPage ? '#ffffff' : '#2F798C',
          }}
        >
          {totalPages}
        </button>
      );
    }

    return pages;
  };

  // const executeScroll = () => myRef.current.scrollIntoView();

  return (
    <>
      <div className="container mx-auto pb-lg">
        <div
          className="flex flex-row flex-nowrap justify-between md:justify-center items-center"
          aria-label="Pagination"
        >
          <button
            className="flex w-6 h-6 mr-1 justify-center items-center rounded-full border border-gray-200 bg-white text-primary hover:border-gray-300"
            href="#"
            title="Previous Page"
            style={{
              visibility: currentPage == 1 ? 'hidden' : 'visible',
            }}
            onClick={
              //   (e) => {
              //   if (currentPage == 1) {
              //     e.preventDefault();
              //     // return;
              //   } else {
              //     setCurrentPage(currentPage - 1);
              //     // executeScroll();
              //   }
              // }
              (e) => {
                paginate(currentPage - 1);
              }
            }
          >
            <span className="sr-only">Previous Page</span>
            <svg
              className="block w-4 h-4 fill-current text-primary"
              viewBox="0 0 256 512"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M238.475 475.535l7.071-7.07c4.686-4.686 4.686-12.284 0-16.971L50.053 256 245.546 60.506c4.686-4.686 4.686-12.284 0-16.971l-7.071-7.07c-4.686-4.686-12.284-4.686-16.97 0L10.454 247.515c-4.686 4.686-4.686 12.284 0 16.971l211.051 211.05c4.686 4.686 12.284 4.686 16.97-.001z"></path>
            </svg>
          </button>
          {/* {pages.map((number) => (
            <button
              className="hidden md:flex w-8 h-8 mx-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-300"
              href="#"
              title="Page 1"
              key={number}
              onClick={() => paginate(number)}
              style={{
                backgroundColor: number === currentPage ? '#2F798C' : '',
                color: number === currentPage ? '#ffffff' : '#2F798C',
              }}
            >
              {number}
            </button>
          ))} */}
          {getPages()}
          {/* 下一頁按鈕 */}
          <button
            className="flex w-6 h-6  ml-1 justify-center items-center rounded-full border border-gray-200 bg-white text-black hover:border-gray-30 text-primary"
            href="#"
            title="Next Page"
            style={{
              visibility:
                currentPage == totalPages || totalPages === 0
                  ? 'hidden'
                  : 'visible',
            }}
            onClick={(e) => {
              // if (currentPage == totalPages) {
              //   e.preventDefault();
              //   // return;
              // } else {
              //   setCurrentPage(currentPage + 1);
              //   // executeScroll();
              // }
              paginate(currentPage + 1);
            }}
          >
            <span className="sr-only">Next Page</span>
            <svg
              className="block w-4 h-4 fill-current "
              viewBox="0 0 256 512"
              aria-hidden="true"
              role="presentation"
            >
              <path d="M17.525 36.465l-7.071 7.07c-4.686 4.686-4.686 12.284 0 16.971L205.947 256 10.454 451.494c-4.686 4.686-4.686 12.284 0 16.971l7.071 7.07c4.686 4.686 12.284 4.686 16.97 0l211.051-211.05c4.686-4.686 4.686-12.284 0-16.971L34.495 36.465c-4.686-4.687-12.284-4.687-16.97 0z"></path>
            </svg>
          </button>
        </div>
      </div>
    </>
  );
}

export default Pagination;
