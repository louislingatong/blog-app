import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {LOGIN} from '../../../graphql/Mutations';
import {useMutation} from '@apollo/client';
import {useDispatch, useSelector} from 'react-redux';
import {authLogin, loggedInStatus} from '../authSlice';
import Loader from '../../../components/common/Loader';
import {useForm} from 'react-hook-form';

function Form() {
  const history = useHistory()
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loggedInStatus);
  const {register, errors, handleSubmit, setValue, reset} = useForm();

  const [login, {data, loading}] = useMutation(LOGIN);

  useEffect(() => {
    if (isAuthenticated) {
      history.push('/', {from: {path: history.location.pathname}})
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (data && data.authenticate) {
      dispatch(authLogin(data.authenticate));
    }
  }, [data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setValue(name, value);
  };

  const onLogin = (data) => {
    reset();
    login({
      variables: {
        ...data
      }
    });
  };

  const goToRegister = () => {
    history.push('/register')
  };

  return (
    <div className="form-wrapper">
      {loading && <Loader type="circular"/>}
      <div className="title">LOGIN</div>
      <form onSubmit={handleSubmit(onLogin)} noValidate>
        <div className="form-item">
          <label>Email</label>
          <input type="text" id="email" name="email"
                 className={errors.email && 'invalid-field'}
                 ref={
                   register({
                     required: 'Email is required.',
                     pattern: {
                       value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                       message: 'Incorrect email format.'
                     }
                   })
                 }
                 onChange={handleOnChange}/>
          {errors.email && <small className="error-message">{errors.email.message}</small>}
        </div>
        <div className="form-item">
          <label>Password</label>
          <input type="password" id="password" name="password"
                 className={errors.password && 'invalid-field'}
                 ref={
                   register({
                     required: 'Password is required.'
                   })
                 }
                 onChange={handleOnChange}/>
          {errors.password && <small className="error-message">{errors.password.message}</small>}
        </div>
        <button type="submit" disabled={loading}>LOGIN</button>
      </form>
      <div className="confirmation">
        <label className="message">No account yet?</label>
        <a className="link" onClick={goToRegister}>REGISTER HERE</a>
      </div>
    </div>
  );
}

export default Form;