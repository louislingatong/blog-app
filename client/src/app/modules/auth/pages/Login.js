import React from 'react';
import LoginForm from '../forms/LoginForm';
import Article from '../../../components/article/Article';
import '../authStyles.css';

function Login() {
  return (
    <React.Fragment>
      <LoginForm/>
      <div className="article-wrapper">
        <Article title="ARTICLES" viewPath={'/view-article'}
                 enableLoadMore={true}/>
      </div>
    </React.Fragment>
  );
}

export default Login;