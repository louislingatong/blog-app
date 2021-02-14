import React, {useEffect} from 'react'
import {useLazyQuery} from '@apollo/client';
import {LOAD_ARTICLE_DETAILS} from '../../../graphql/Queries';
import {fetchArticle, setArticleData} from '../articleSlice';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import _ from 'lodash';
import Breadcrumb from '../../../components/Breadcrumb';
import Comment from '../../../components/Comment';
import Form from './Form';
import '../article.css'
import Loader from '../../../components/common/Loader';

function EditArticle() {
  const params = useParams();
  const dispatch = useDispatch();
  const article = useSelector(fetchArticle);

  const [loadArticleDetails, {called, loading, data}] = useLazyQuery(LOAD_ARTICLE_DETAILS, {
    fetchPolicy: "network-only",
    variables: {id: parseInt(params.id)}
  });

  useEffect(() => {
    if (data) {
      data.post.id !== article.id && dispatch(setArticleData(data.post));
    } else {
      loadArticleDetails();
    }
  }, [data]);

  if (_.isEmpty(article)) return null;

  return (
    <React.Fragment>
      {called && loading && <Loader type="circular"/>}
      <div className="breadcrumb-wrapper">
        <Breadcrumb name={article.title}/>
      </div>
      <div className="page-wrapper">
        <Form article={article}/>
        <div className="comment-wrapper">
          <Comment title="Comments" comments={article.comments}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default EditArticle;