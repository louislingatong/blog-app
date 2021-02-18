import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {useMutation, useSubscription} from '@apollo/client';
import {CREATE_COMMENT} from '../../graphql/Mutations';
import {COMMENT_SUBSCRIPTION} from '../../graphql/Subscriptions';
import {useParams} from 'react-router-dom';
import {useForm} from 'react-hook-form';
import {fetchArticle, setArticleData} from '../../modules/article/articleSlice';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import Loader from '../common/loader/Loader';

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
  const subscriptionResult = useSubscription(COMMENT_SUBSCRIPTION);
  const [createComment, mutationResult] = useMutation(CREATE_COMMENT);

  useEffect(() => {
    setComments(props.comments);
  }, [props.comments])

  useEffect(() => {
    if (subscriptionResult.data) {
      setComments((prevState => {
        const state = prevState.slice();
        state.push(subscriptionResult.data.newComment);
        return state;
      }));

      let newArticle = Object.assign({}, article);
      newArticle.comments = newArticle.comments.concat(subscriptionResult.data.newComment);
      dispatch(setArticleData(newArticle));
    }
  }, [subscriptionResult.data]);

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
    const dateCreated = new Date(createdAt);
    const dateToday = new Date();
    const diff = new Date(dateToday.getTime() - dateCreated.getTime());

    if (diff.getUTCFullYear() - 1970) {
      return (diff.getUTCFullYear() - 1970) + ' years ago';
    } else if (diff.getUTCMonth()) {
      return diff.getUTCMonth() + ' months ago';
    } else if (dateCreated.toDateString() === dateToday.toDateString()) {
      return 'today';
    } else if (diff.getUTCDate() === 1) {
      return 'yesterday';
    } else {
      return diff.getUTCDate() + ' days ago';
    }
  };

  return (
    <React.Fragment>
      {subscriptionResult.loading && mutationResult.loading && <Loader type="circular"/>}
      <div className="title">{props.title.toUpperCase() || 'COMMENTS'}</div>
      {
        _.orderBy(comments, ['createdAt'], ['asc']).map((comment, i) => (
          <div className="comment-container" key={i}>
            <p>{comment.content}</p>
            <small>{dateCreated(comment.createdAt)}</small>
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
