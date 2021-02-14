import React from 'react';
import Routes from './app/routes';
import {useDispatch} from 'react-redux';
import {authCheck} from './app/modules/auth/authSlice';
import './App.css'

function App() {
  const dispatch = useDispatch();
  dispatch(authCheck());
  return (
    <div className="App">
      <Routes/>
    </div>
  );
}

export default App;
