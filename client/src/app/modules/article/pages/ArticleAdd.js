import React, {useState} from 'react';
import ArticleAddForm from '../forms/ArticleAddForm';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import '../article.css'

function AddArticle() {
  return (
    <React.Fragment>
      <div className="breadcrumb-wrapper">
        <Breadcrumb/>
      </div>
      <div className="page-wrapper">
        <ArticleAddForm/>
      </div>
    </React.Fragment>
  );
}

export default AddArticle;