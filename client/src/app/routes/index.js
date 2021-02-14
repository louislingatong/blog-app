import React from 'react';
import {BrowserRouter as Router, Redirect, Switch} from 'react-router-dom';
import Layout from '../layout';
import PrivateRoute from './Private';
import PublicRoute from './Public';
import routes from './routes';

function Routes() {
  return (
    <Router>
      <Layout>
        <Switch>
          {
            routes.map((route, i) => {
              if (route.notFound) {
                return <Redirect key={i} to={{pathname: '/'}}/>
              }
              if (route.auth) {
                return <PrivateRoute key={i} {...route} />
              }
              return <PublicRoute key={i} {...route} />
            })
          }
        </Switch>
      </Layout>
    </Router>
  );
}

export default Routes;