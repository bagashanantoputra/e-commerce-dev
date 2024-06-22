import { useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import './Styles.css'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false);
  
    // Mendeteksi perubahan dalam posisi scroll
    useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
  
      // Membersihkan listener saat komponen dibongkar
      return () => {
        window.removeEventListener('scroll', toggleVisibility);
      };
    }, []);
  
    // Fungsi untuk menggulir ke atas saat tombol diklik
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <button
        className={`scroll-to-top-button ${isVisible ? 'visible' : ''}`}
        onClick={scrollToTop}
      >
        <ArrowUpwardIcon />
      </button>
    );
  };

export default ScrollToTop;
