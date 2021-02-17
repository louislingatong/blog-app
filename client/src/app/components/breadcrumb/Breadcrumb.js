import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import routes from '../../routes/routes';
import _ from 'lodash';
import './breadcrumbStyles.css';

Breadcrumb.propTypes = {
  name: PropTypes.string,
};

function Breadcrumb(props) {
  const history = useHistory();
  const params = useParams();
  const [fromState, setFromState] = useState({});
  const [currentState, setCurrentState] = useState({});


  useEffect(() => {
    if (history.location.state && _.isEmpty(fromState)) {
      const {path, name, params} = history.location.state.from;
      if (name) {
        setFromState({
          name,
          path
        });
      } else {
        const route = matchRoute(params, path);
        setFromState({
          name: route.name,
          path: route.path
        });
      }
    } else if (!history.location.state && _.isEmpty(fromState)) {
      const route = matchRoute(null, '/');
      setFromState({
        name: route.name,
        path: route.path
      });
    }
  }, [fromState]);

  useEffect(() => {
    if (_.isEmpty(currentState)) {
      const path = history.location.pathname;
      if (props.name) {
        setCurrentState({
          name: props.name
        });
      } else {
        const route = matchRoute(params, path);
        setCurrentState({
          name: route.name
        });
      }
    }
  }, [currentState]);

  const matchRoute = (obj, path) => {
    return _.find(routes, (route) => {
      let newPath;
      if (obj && Object.entries(obj).length) {
        Object.entries(obj).forEach(([key, value]) => {
          newPath = route.path.replace(`:${key}`, value);
        });
        return path === newPath;
      } else {
        return path === route.path;
      }
    })
  };

  return (
    <React.Fragment>
      <a className="from-state" onClick={history.goBack}>{fromState.name}</a> > {currentState.name}
    </React.Fragment>
  );
}

export default Breadcrumb;