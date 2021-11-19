import React, { useState, useEffect } from 'react';
import { BsArrowUpShort } from 'react-icons/bs';

function BackToTopButton() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const checkScrollHeight = () => {
      if (!showButton && window.pageYOffset > 400) {
        setShowButton(true);
      } else if (showButton && window.pageYOffset <= 400) {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', checkScrollHeight);
    return () => {
      window.removeEventListener('scroll', checkScrollHeight);
    };
  }, [showButton]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div
        class="rounded-full h-10 w-10 items-center justify-center border-2 border-primary cursor-pointer fixed bottom-20 right-8 z-50 opacity-50 hover:opacity-100 hover:bg-primary scrollToTop-animate"
        onClick={scrollToTop}
        style={{ display: showButton ? 'flex' : 'none' }}
      >
        <BsArrowUpShort className="text-primary text-4xl hover:text-white" />
      </div>
    </>
  );
}

export default BackToTopButton;
