import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getArticles = createAsyncThunk(
  'articles/getArticles',
  async function getArticlesAll({ limit, offset, url }) {
    const token = localStorage.getItem('token');
    let { data } = await axios.get(`${url}articles?limit=${limit}&offset=${offset}`, {
      headers: { Authorization: `Token ${token}` },
    });
    return data;
  }
);

export const getArticle = createAsyncThunk('articles/getArticle', async function getArticlesAll({ url, slug }) {
  const token = localStorage.getItem('token');
  let { data } = await axios.get(`${url}articles/${slug}`, {
    headers: { Authorization: `Token ${token}` },
  });
  return data;
});

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    offset: 0,
    limit: 5,
    url: 'https://kata.academy:8021/api/',
    articleArr: [],
    loading: false,
    error: false,
    articlesCount: 0,
    page: 1,
    article: {},
  },
  reducers: {
    changePage(state, action) {
      state.offset = state.limit * (action.payload.page - 1);
      state.page = action.payload.page;
    },
    clearArticle(state) {
      state.article = {};
    },
  },
  extraReducers: {
    [getArticles.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.articleArr = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },
    [getArticles.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
    [getArticle.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getArticle.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.article = action.payload;
    },
    [getArticle.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { changePage, clearArticle } = articlesSlice.actions;

export default articlesSlice.reducer;
