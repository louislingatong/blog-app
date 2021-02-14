import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  list: [],
  data: {},
};

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticleList: (state, action) => {
      state.list = action.payload;
    },
    setArticleData: (state, action) => {
      state.data = action.payload;
    },
  }
});

export const {setArticleList, setArticleData} = articleSlice.actions;

export const fetchAllArticles = state => state.article.list;

export const fetchArticle = state => state.article.data;

export default articleSlice.reducer;
