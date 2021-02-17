import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {useMutation} from '@apollo/client';
import {CREATE_ARTICLE} from '../../../graphql/Mutations';
import {setArticleData} from '../articleSlice';
import {useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import ImageUploader from '../../../components/image-upload/ImageUploader';
import Loader from '../../../components/common/loader/Loader';
import {useForm} from 'react-hook-form';
import ConfirmDialog from '../../../components/confirm-dialog/ConfirmDialog';

function ArticleAddForm() {
  const history = useHistory();
  const dispatch = useDispatch();
  const {register, errors, handleSubmit, setValue, reset} = useForm();
  const [currentDate] = useState(moment(new Date()).format('YYYY.MM.DD'));
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [image, setImage] = useState('');
  const [redirectPath, setRedirectPath] = useState('');

  const [createArticle, {data, loading}] = useMutation(CREATE_ARTICLE);

  useEffect(() => {
    if (redirectPath) {
      history.push(redirectPath, {from: {path: history.location.pathname}});
    }
  }, [redirectPath]);

  useEffect(() => {
    if (data) {
      dispatch(setArticleData(data.addPost))
      setRedirectPath(`/view-article/${data.addPost.id}`)
    }
  }, [data]);

  const handleOnChange = (e) => {
    e.preventDefault();
    const {name, value} = e.target;
    setValue(name, value);
  };

  const onSave = (data) => {
    reset();
    createArticle({
      variables: {
        ...data,
        image
      }
    });
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setConfirmDialogOpen(true);
  };

  const handleConfirm = () => {
    setRedirectPath('/');
  };

  const handleDecline = () => {
    setConfirmDialogOpen(false);
  };

  const handleDrop = (value) => {
    setImage(value);
  };

  const confirmationDialog = () => (
    <ConfirmDialog open={confirmDialogOpen}>
      <div className="confirm-message">
        Are you sure you want to discard your changes?
      </div>
      <div className="confirm-action">
        <a style={{marginRight: '50px'}} onClick={handleConfirm}>OK</a>
        <a style={{alignSelf: 'right'}} onClick={handleDecline}>CANCEL</a>
      </div>
    </ConfirmDialog>
  );

  return (
    <React.Fragment>
      {loading && <Loader type="circular" /> }
      <div className="top-action">
        <a onClick={handleSubmit(onSave)} disabled={loading}>Save Article</a>
        <a onClick={handleCancel} disabled={loading}>Cancel</a>
      </div>
      {currentDate}
      <textarea id="title" name="title"
                className={errors.title && 'invalid-field'}
                ref={
                  register({
                    required: 'Title is required.'
                  })
                }
                onChange={handleOnChange}/>
      {errors.title && <small className="error-message">{errors.title.message}</small>}
      <ImageUploader handleDrop={handleDrop} />
      <textarea id="content" name="content"
                ref={register()}
                onChange={handleOnChange}/>
      {confirmationDialog()}
    </React.Fragment>
  );
}

export default ArticleAddForm;