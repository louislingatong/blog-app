import React from 'react';
import {useSelector} from 'react-redux';
import Article from '../../components/Article';
import {loggedInStatus} from '../auth/authSlice';
import Carousel from '../../components/Carousel';

function Home() {
  const isAuthenticated = useSelector(loggedInStatus);
  return (
    <React.Fragment>
      <Carousel/>
      <div style={{maxWidth: '1120px', margin: 'auto', marginTop: '100px'}}>
        <Article title="ARTICLES" enableCreateItem={isAuthenticated} createPath={'/add-article'}
                 viewPath={'/view-article'}
                 enableLoadMore={true}/>
      </div>
    </React.Fragment>
  );
}

export default Home;