import React, {useEffect, useState} from 'react';
import {useWindowScroll} from 'react-use';
import './scrollTopStyles.css';

function ScrollTop() {
  const {y: pageYOffset} = useWindowScroll();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (pageYOffset > 400) {
      setVisible(true);
    } else {
      setVisible(false);
    }
  }, [pageYOffset]);

  const scrollToTop = () => {
    return window.scrollTo({top: 0, behavior: 'smooth'});
  };

  if (!visible) {
    return false;
  }
  ;

  return (
    <div className="scroll-to-top" onClick={scrollToTop}>
      <span>^</span>
      <strong>TOP</strong>
    </div>
  );
}

export default ScrollTop;