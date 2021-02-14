import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {authLogout, loggedInStatus} from '../../modules/auth/authSlice';
import {useHistory, useLocation} from 'react-router-dom';
import _ from 'lodash';

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

  const hideLoginButton = [
    '/login',
    '/register'
  ];

  return (
    <div className="header-wrapper">
      <div className="title">BLOG</div>
      {
        isAuthenticated ?
          <a className="logout" onClick={handleLogout}>LOGOUT</a> :
          !_.some(hideLoginButton, (path) => _.includes(location.pathname, path)) &&
          <a className="login" onClick={handleLogin}>LOGIN</a>
      }
    </div>
  );
}

export default Header;