import React from 'react';
import lightLogo from '../../../LightLogo.png';

function Footer() {
  return (
    <div className="footer-wrapper">
      <div className="content">
        <div className="app-name">
          <img src={lightLogo} className="App-logo" alt="logo" />
        </div>
        <div>LOUIS C. LINGATONG</div>
        <div>Senior Software Engineer</div>
      </div>
      <div className="copyright-container">Copyright©2021 Blog Inc.</div>
    </div>
  );
}

export default Footer;