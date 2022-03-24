import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createUser = createAsyncThunk(
  'user/createUser',
  async function createNewUser({ user, url }, { rejectWithValue }) {
    let { data, request } = await axios.post(`${url}users`, user);
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    return data;
  }
);

export const loginUser = createAsyncThunk(
  'user/loginUser',
  async function loginInUser({ user, url }, { rejectWithValue }) {
    let { data, request } = await axios.post(`${url}users/login`, user);
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    let { token } = data.user;
    localStorage.setItem('token', token);
    return data;
  }
);

export const getUserInfo = createAsyncThunk('user/getUserInfo', async function getUser({ url }) {
  const token = localStorage.getItem('token');
  const { data } = await axios.get(`${url}user`, { headers: { Authorization: `Token ${token}` } });
  console.log(data);
  return data;
});

export const editUser = createAsyncThunk(
  'user/editUser',
  async function editUserInfo({ user, url }, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    let { data, request } = await axios.put(`${url}user`, user, {
      headers: { Authorization: `Token ${token}` },
    });
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    return data;
  }
);

export const createArticle = createAsyncThunk(
  'user/createArticle',
  async function createNewArticle({ article, url }, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const { data, request } = await axios.post(`${url}articles`, article, {
      headers: { Authorization: `Token ${token}` },
    });
    console.log(data);
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    return data;
  }
);

export const updateArticle = createAsyncThunk(
  'user/updateArticle',
  async function updateUserArticle({ article, url, slug }, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const { data, request } = await axios.put(`${url}articles/${slug}`, article, {
      headers: { Authorization: `Token ${token}` },
    });
    console.log(data);
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    return data;
  }
);

export const deleteArticle = createAsyncThunk(
  'user/deleteArticle',
  async function deleteUserArticle({ url, slug }, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    const { data, request } = await axios.delete(`${url}articles/${slug}`, {
      headers: { Authorization: `Token ${token}` },
    });
    console.log(data);
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    return data;
  }
);

export const addFavorite = createAsyncThunk(
  'user/addFavorite',
  async function addUserFavorite({ url, slug }, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    console.log(`Token ${token}`);
    const { data, request } = await axios.post(
      `${url}articles/${slug}/favorite`,
      {},
      {
        headers: { Authorization: `Token ${token}` },
      }
    );
    console.log(data);
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    return data;
  }
);

export const deleteFavorite = createAsyncThunk(
  'user/deleteFavorite',
  async function deleteUserFavorite({ url, slug }, { rejectWithValue }) {
    const token = localStorage.getItem('token');
    console.log(`Token ${token}`);
    const { data, request } = await axios.delete(`${url}articles/${slug}/favorite`, {
      headers: { Authorization: `Token ${token}` },
    });
    console.log(data);
    let { statusText } = request;
    if (statusText !== 'OK') {
      rejectWithValue();
    }
    return data;
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false,
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : {},
    loading: false,
    error: false,
  },
  reducers: {
    loginOut(state) {
      state.isLogin = false;
      state.userInfo = {};
      localStorage.clear();
    },
  },
  extraReducers: {
    [createUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [createUser.fulfilled]: (state) => {
      state.loading = false;
      state.error = false;
    },
    [createUser.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },

    [loginUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [loginUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.userInfo = action.payload.user;

      state.isLogin = true;
      localStorage.setItem('isLogin', 'true');
    },
    [loginUser.rejected]: (state) => {
      state.loading = false;
      state.error = true;

      state.isLogin = false;
    },

    [getUserInfo.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getUserInfo.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));

      state.userInfo = action.payload.user;
    },
    [getUserInfo.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },

    [editUser.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [editUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.userInfo = action.payload.user;

      state.isLogin = true;
      localStorage.setItem('userInfo', JSON.stringify(action.payload.user));
    },
    [editUser.rejected]: (state) => {
      state.loading = false;
      state.error = true;

      state.isLogin = false;
    },
  },
});

export const { loginOut } = userSlice.actions;

export default userSlice.reducer;
