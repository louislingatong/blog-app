import React from 'react';
import {useSelector} from 'react-redux';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ScrollTop from '../components/common/ScrollTop';
import PrivateLayout from './Private';
import PublicLayout from './Public';
import {loggedInStatus} from '../modules/auth/authSlice';

function Layout(props) {
  const {children} = props;
  const isAuthenticated = useSelector(loggedInStatus);

  return (
    <main>
      <Header/>
      <ScrollTop/>
      {
        isAuthenticated
          ? <PrivateLayout props={props}>{children}</PrivateLayout>
          : <PublicLayout {...props}>{children}</PublicLayout>
      }
      <Footer/>
    </main>
  );
}

export default Layout;
