import React, {lazy, Suspense} from 'react';
import {Redirect, Route} from 'react-router-dom';
import Loader from '../components/common/Loader';
import {useSelector} from 'react-redux';
import {loggedInStatus} from '../modules/auth/authSlice';

function PrivateRoute(props) {
  const {component, ...rest} = props;
  const isAuthenticated = useSelector(loggedInStatus);
  const Component = lazy(() => import(`../${component}`));

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
