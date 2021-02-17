import React, {useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useMutation} from "@apollo/client";
import {REGISTER} from '../../../graphql/Mutations';
import {authLogin, loggedInStatus} from '../authSlice';
import {useDispatch, useSelector} from 'react-redux';
import Loader from '../../../components/common/loader/Loader';
import {useForm} from 'react-hook-form';
import '../authStyles.css';

function RegisterForm() {
  const history = useHistory()
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(loggedInStatus);
  const {register, errors, handleSubmit, setValue, watch, reset} = useForm();

  const [signUp, {data, loading}] = useMutation(REGISTER);

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

  const onRegister = (data) => {
    reset();
    signUp({
      variables: {
        ...data
      }
    });
  };

  const goToLogin = () => {
    history.push('/login')
  };

  return (
    <div className="form-container">
      {loading && <Loader type="circular"/>}
      <div className="form-title">Register</div>
      <form onSubmit={handleSubmit(onRegister)} noValidate>
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
          {errors.email && <small>{errors.email.message}</small>}
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
          {errors.password && <small>{errors.password.message}</small>}
        </div>
        <div className="form-item">
          <label>Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword"
                 className={errors.confirmPassword && 'invalid-field'}
                 ref={
                   register({
                     required: 'Confirm Password is required.',
                     validate: (value) => value === watch('password') || 'Passwords don\'t match.'
                   })
                 }
                 onChange={handleOnChange}/>
          {errors.confirmPassword && <small>{errors.confirmPassword.message}</small>}
        </div>
        <button type="submit" disabled={loading}>REGISTER</button>
      </form>
      <div className="confirmation-container">
        <label>Already have an account?</label>
        <a onClick={goToLogin}>LOGIN HERE</a>
      </div>
    </div>
  );
}

export default RegisterForm;