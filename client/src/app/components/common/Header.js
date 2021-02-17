import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, loggedInStatus} from '../../modules/auth/authSlice';
import {useHistory, useLocation} from 'react-router-dom';
import _ from 'lodash';
import darkLogo from '../../../DarkLogo.png'

function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const isAuthenticated = useSelector(loggedInStatus);

  const handleLogout = () => {
    dispatch(authLogout());
  };

  const handleLogin = () => {
    history.push('/login');
  };

  const handleClose = () => {
    history.push('/');
  };

  const fixedHeader = [
    '/',
    '/login',
    '/register'
  ];

  const hideLoginButton = [
    '/login',
    '/register'
  ];

  return (
    <div className={_.includes(fixedHeader, location.pathname) ? 'header-outer-wrapper fixed' : 'header-outer-wrapper'}>
      <div className="header-inner-wrapper">
        <div className="title">
          <img src={darkLogo} className="App-logo" alt="logo" />
        </div>
        {
          isAuthenticated ?
            <a className="header-action" onClick={handleLogout}>LOGOUT</a> :
            _.includes(hideLoginButton, location.pathname) ?
              <a className="header-action" onClick={handleClose}>CLOSE</a> :
              <a className="header-action" onClick={handleLogin}>LOGIN</a>
        }
      </div>
    </div>
  );
}

export default Header;