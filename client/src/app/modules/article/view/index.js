import React, {useEffect} from 'react';
import {useLazyQuery} from '@apollo/client';
import {LOAD_ARTICLE_DETAILS} from '../../../graphql/Queries';
import {Link, useHistory, useParams} from 'react-router-dom';
import moment from 'moment';
import {useDispatch, useSelector} from 'react-redux';
import {fetchArticle, setArticleData} from '../articleSlice';
import {loggedInStatus} from '../../auth/authSlice';
import _ from 'lodash';
import Breadcrumb from '../../../components/Breadcrumb';
import Comment from '../../../components/Comment';
import Loader from '../../../components/common/Loader';
import '../article.css'

function ViewArticle() {
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const article = useSelector(fetchArticle);
  const isAuthenticated = useSelector(loggedInStatus);
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
        {!_.isEmpty(article) && <Breadcrumb name={article.title}/>}
      </div>
      <div className="page-wrapper">
        <div className="top-action">
          {isAuthenticated &&
          <Link to={{
            pathname: `/edit-article/${parseInt(params.id)}`,
            state: {from: {path: history.location.pathname, params}}
          }}>Edit Article</Link>}
        </div>
        <p className="date">
          {article.createdAt && moment(article.createdAt).format('YYYY.MM.DD')}
        </p>
        <h1 className="title">
          {article.title}
        </h1>
        {article.image && <div className="article-image" style={{backgroundImage: `url(${article.image})`}}/>}
        <p className="content">
          {article.content}
        </p>
        <div className="comment-wrapper">
          <Comment title="COMMENTS" comments={article.comments}/>
        </div>
      </div>
    </React.Fragment>
  );
}

export default ViewArticle;