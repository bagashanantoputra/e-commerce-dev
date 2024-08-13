import React, { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Styles.css';

const ScrollToTop = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Detect scroll position changes
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="scroll-to-top">
      <button
        className={`scroll-to-top-button ${isVisible ? 'visible' : 'invisible'}`}
        onClick={scrollToTop}
        aria-label="Scroll to top"
      >
        <ArrowUpwardIcon />
      </button>
    </div>
  );
};

export default ScrollToTop;
