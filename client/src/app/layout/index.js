import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/common/header/Header';
import Footer from '../components/common/footer/Footer';
import ScrollTop from '../components/common/scroll-top/ScrollTop';
import PrivateLayout from './Private';
import PublicLayout from './Public';
import {loggedInStatus} from '../modules/auth/authSlice';
import {useLocation} from 'react-router-dom'
import _ from 'lodash';

function Layout(props) {
  const {children} = props;
  const location = useLocation();
  const isAuthenticated = useSelector(loggedInStatus);

  const fixedHeader = [
    '/',
    '/login',
    '/register'
  ];

  return (
    <main>
      <Header/>
      <ScrollTop/>
      {
        isAuthenticated
          ? <PrivateLayout fixedHeader={_.includes(fixedHeader, location.pathname)} props={props}>{children}</PrivateLayout>
          : <PublicLayout fixedHeader={_.includes(fixedHeader, location.pathname)} {...props}>{children}</PublicLayout>
      }
      <Footer/>
    </main>
  );
}

export default Layout;
