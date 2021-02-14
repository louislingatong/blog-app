import React from 'react';
import Form from './Form';
import Article from '../../../components/Article';
import '../auth.css';

function Login() {
  return (
    <React.Fragment>
      <div className="page-title">Register</div>
      <Form/>
      <div style={{maxWidth: '1115px', margin: 'auto', marginTop: '92px'}}>
        <Article title="NEWS" viewPath={'/view-article'}
                 enableLoadMore={true}/>
      </div>
    </React.Fragment>

  );
}

export default Login;