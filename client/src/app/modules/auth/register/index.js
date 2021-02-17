import React from 'react';
import Form from './Form';
import Article from '../../../components/Article';
import '../auth.css';

function Login() {
  return (
    <React.Fragment>
      <Form/>
      <div style={{maxWidth: '1115px', margin: 'auto', marginTop: '258px'}}>
        <Article title="ARTICLES" viewPath={'/view-article'}
                 enableLoadMore={true}/>
      </div>
    </React.Fragment>

  );
}

export default Login;