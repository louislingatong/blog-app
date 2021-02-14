import React, {useState} from 'react';
import Form from './Form';
import Breadcrumb from '../../../components/Breadcrumb';
import '../article.css'

function AddArticle() {
  return (
    <React.Fragment>
      <div className="breadcrumb-wrapper">
        <Breadcrumb/>
      </div>
      <div className="page-wrapper">
        <Form/>
      </div>
    </React.Fragment>
  );
}

export default AddArticle;