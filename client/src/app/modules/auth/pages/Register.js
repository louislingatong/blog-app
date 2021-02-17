import React from 'react';
import RegisterForm from '../forms/RegisterForm';
import Article from '../../../components/article/Article';
import '../authStyles.css';

function Login() {
  return (
    <React.Fragment>
      <RegisterForm/>
      <div className="article-wrapper">
        <Article title="ARTICLES" viewPath={'/view-article'}
                 enableLoadMore={true}/>
      </div>
    </React.Fragment>

  );
}

export default Login;