import React, {Suspense} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Loader from '../components/common/loader/Loader';
import {useSelector} from 'react-redux';
import {loggedInStatus} from '../modules/auth/authSlice';

function PrivateRoute({component: Component, ...rest}) {
  const isAuthenticated = useSelector(loggedInStatus);

  return (
    <Route {...rest} render={props => {
      return (
        <Suspense fallback={<Loader/>}>
          {
            isAuthenticated
              ? <Component {...props} />
              : <Redirect to={{
                pathname: '/login',
                state: {
                  from: props.location
                }
              }}/>
          }
        </Suspense>
      )
    }}/>
  );
}

export default PrivateRoute;
