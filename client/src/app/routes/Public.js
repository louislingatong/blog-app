import React, {lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';
import Loader from '../components/common/loader/Loader';

function PublicRoutes({component: Component, ...rest}) {
  return (
    <Route {...rest} render={props => {
      return (
        <Suspense fallback={
          <Loader/>
        }>
          <Component {...props} />
        </Suspense>
      )
    }}/>
  );
}

export default PublicRoutes;
