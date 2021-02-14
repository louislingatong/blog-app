import React, {lazy, Suspense} from 'react';
import {Route} from 'react-router-dom';
import Loader from '../components/common/Loader';

function PublicRoutes(props) {
  const {component, ...rest} = props;
  const Component = lazy(() => import(`../${component}`));

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
