import React from 'react';
import lightLogo from '../../../../LightLogo.png';
import './footerStyles.css';

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="content-container">
        <div className="logo-container">
          <img src={lightLogo} className="App-logo" alt="logo" />
        </div>
        <label>LOUIS C. LINGATONG</label>
        <label>Senior Software Engineer</label>
      </div>
      <label>Copyright©2021 Blog Inc.</label>
    </div>
  );
}

export default Footer;