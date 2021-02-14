import {configureStore} from '@reduxjs/toolkit';
import authReducer from '../modules/auth/authSlice';
import articleReducer from '../modules/article/articleSlice';

export default configureStore({
  reducer: {
    auth: authReducer,
    article: articleReducer,
  },
});
