import React, {useEffect, useState} from 'react'
import moment from 'moment';
import {useMutation} from '@apollo/client';
import {UPDATE_ARTICLE} from '../../../graphql/Mutations';
import {setArticleData} from '../articleSlice';
import {useDispatch} from 'react-redux';
import {useHistory, useParams} from 'react-router-dom';
import PropTypes from 'prop-types';
import ImageUpload from '../../../components/ImageUpload';
import Loader from '../../../components/common/Loader';
import {useForm} from 'react-hook-form';
import ConfirmDialog from '../../../components/ConfirmDialog';
import _ from 'lodash';

Form.propTypes = {
  article: PropTypes.object.isRequired,
}

function Form(props) {
  const {article} = props;
  const params = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const {register, errors, handleSubmit, setValue, reset} = useForm();
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [image, setImage] = useState(article.image);
  const [changedState, setChangeState] = useState({});

  const [updateArticle, {data, loading}] = useMutation(UPDATE_ARTICLE);

  useEffect(() => {
    if (data) {
      // Api response return incorrect post
      dispatch(setArticleData(data.updatePost))
      history.goBack();
    }
  }, [data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setValue(name, value);
    handleChangeState(name, value);
  };

  const onSave = (data) => {
    reset();
    updateArticle({
      variables: {
        ...data,
        id: parseInt(params.id),
        image
      }
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    if (_.isEmpty(changedState)) {
      handleConfirm();
    } else {
      setConfirmDialogOpen(true);
    }
  };

  const handleConfirm = () => {
    history.goBack();
  };

  const handleDecline = () => {
    setConfirmDialogOpen(false);
  };

  const handleChangeState = (name, value) => {
    const filteredEntries = Object.entries(article).filter(([key, value2]) => {
      return name === key && value === value2
    });

    if (!_.isEmpty(filteredEntries)) {
      const [key] = filteredEntries[0];
      setChangeState(prevState => {
        const state = Object.assign({}, prevState);
        delete state[key];
        return state;
      });
    } else {
      setChangeState({
        ...changedState,
        [name]: value
      });
    }
  };

  const handleDrop = (value) => {
    setImage(value);
    handleChangeState('image', value);
  };

  return (
    <React.Fragment>
      {loading && <Loader type="circular"/>}
      <div className="top-action">
        <a onClick={handleSubmit(onSave)} disabled={loading}>Save Article</a>
        <a onClick={handleCancel} disabled={loading}>Cancel</a>
      </div>
      <p className="date">{article.createdAt && moment(article.createdAt).format('YYYY.MM.DD')}</p>
      <textarea id="title" name="title" defaultValue={article.title} key={article.title}
                className={errors.title && 'invalid-field'}
                ref={
                  register({
                    required: 'Title is required.'
                  })
                }
                onChange={handleOnChange}/>
      {errors.title && <small className="error-message">{errors.title.message}</small>}
      <ImageUpload handleDrop={handleDrop} image={article.image || ''}/>
      <textarea id="content" name="content" defaultValue={article.content} key={article.content}
                ref={register()}
                onChange={handleOnChange}/>
      <ConfirmDialog open={confirmDialogOpen}>
        <div className="confirm-message">
          Are you sure you want to discard your changes?
        </div>
        <div className="confirm-sub-message">
          {
            Object.entries(changedState).map(([key, value]) => {
              return <p key={key}>{`The field "${key}" has been changed.`}</p>
            })
          }
        </div>
        <div className="confirm-action">
          <a style={{marginRight: '50px'}} onClick={handleConfirm}>OK</a>
          <a style={{alignSelf: 'right'}} onClick={handleDecline}>CLOSE</a>
        </div>
      </ConfirmDialog>
    </React.Fragment>
  );
}

export default Form;