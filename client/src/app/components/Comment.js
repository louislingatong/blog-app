import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useMutation} from '@apollo/client';
import {CREATE_COMMENT} from '../graphql/Mutations';
import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {fetchArticle, setArticleData} from '../modules/article/articleSlice';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import Loader from './common/Loader';

Comment.propTypes = {
  title: PropTypes.string,
  comments: PropTypes.array.isRequired,
};

function Comment(props) {
  const params = useParams();
  const dispatch = useDispatch();
  const article = useSelector(fetchArticle)
  const {register, errors, handleSubmit, setValue, reset} = useForm();
  const [comments, setComments] = useState([]);
  const [createComment, {data, loading}] = useMutation(CREATE_COMMENT);

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments])

  useEffect(() => {
    if (data) {
      setComments((prevState => {
        const state = prevState.slice();
        state.push(data.addComment);
        return state;
      }));

      let newArticle = Object.assign({}, article);
      newArticle.comments = newArticle.comments.concat(data.addComment);
      dispatch(setArticleData(newArticle));
    }
  }, [data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setValue(name, value);
  };

  const onSubmit = (data) => {
    reset();
    createComment({
      variables: {
        postId: parseInt(params.id),
        ...data
      }
    });
  };

  const dateCreated = (createdAt) => {
    // Api response return incorrect createdAt of comment
    const dateCreated = new Date(createdAt);
    const dateToday = new Date();
    const diff = new Date(dateToday.getTime() - dateCreated.getTime());

    if (diff.getUTCFullYear() - 1970) {
      return (diff.getUTCFullYear() - 1970) + ' year(s) ago';
    } else if (diff.getUTCMonth()) {
      return diff.getUTCMonth() + ' months(s) ago';
    } else if (diff.getUTCDate() === 1) {
      return 'yesterday';
    } else {
      return diff.getUTCDate() + ' day(s) ago';
    }
  };

  return (
    <React.Fragment>
      {loading && <Loader type="circular"/>}
      <div className="comment-title">{props.title.toUpperCase() || 'COMMENTS'}</div>
      {
        _.orderBy(comments, ['createdAt'], ['asc']).map((comment, i) => (
          <div className="comment-container" key={i}>
            <p>{comment.content}</p>
            <strong><small>{dateCreated(comment.createdAt)}</small></strong>
          </div>
        ))
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <textarea id="content" name="content" placeholder="Write comment"
                  className={errors.content && 'invalid-field'}
                  ref={
                    register({
                      required: 'Content is required.'
                    })
                  }
                  onChange={handleOnChange}/>
        {errors.content && <small className="error-message">{errors.content.message}</small>}
        <button type="submit">SUBMIT</button>
      </form>
    </React.Fragment>
  );
}

export default Comment;