import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useHistory} from 'react-router-dom';
import {useLazyQuery} from '@apollo/client';
import {LOAD_ARTICLES} from '../graphql/Queries';
import {fetchAllArticles, setArticleList} from '../modules/article/articleSlice';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import Loader from './common/Loader';

Article.propTypes = {
  title: PropTypes.string,
  enableCreateItem: PropTypes.bool,
  createPath: PropTypes.string,
  viewPath: PropTypes.string.isRequired,
  enableLoadMore: PropTypes.bool.isRequired,
};

function Article(props) {
  const {title, enableCreateItem, createPath, viewPath, enableLoadMore} = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const articles = useSelector(fetchAllArticles);
  const [limit, setLimit] = useState(6);
  const [loadArticles, {called, loading, data}] = useLazyQuery(LOAD_ARTICLES, {
    fetchPolicy: "network-only",
    variables: {limit: limit}
  });

  useEffect(() => {
    if (data) {
      dispatch(setArticleList(data.posts));
    } else {
      loadArticles();
    }
  }, [data]);

  const handleLoadMore = () => {
    loadArticles();
    setLimit(limit * 2);
  };

  const handleCreateItem = () => {
    history.push(createPath, {from: {path: history.location.pathname}});
  };

  return (
    <div className="article-wrapper">
      {called && loading && <Loader type="circular"/>}
      <div className="header-container">
        <div className="title">{title.toUpperCase() || 'ACTICLES'}</div>
        {
          enableCreateItem && <a className="create-item" onClick={handleCreateItem}>Create New Article</a>
        }
      </div>
      <div className="item-container">
        {
          articles.map((article, i) => (
            <div key={i} className="item"
                 onClick={() => history.push(`${viewPath}/${article.id}`, {from: {path: history.location.pathname}})}>
              <div className="image" style={{backgroundImage: `url(${article.image})`}}/>
              {article.createdAt && <div className="date">{moment(article.createdAt).format('YYYY.MM.DD')}</div>}
              <div className="title">{article.title}</div>
            </div>
          ))
        }
      </div>
      {enableLoadMore && <button className="load-more" onClick={handleLoadMore}>LOAD MORE</button>}
    </div>
  );
}

export default Article;