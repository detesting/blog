import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLogin: localStorage.getItem('isLogin') ? localStorage.getItem('isLogin') : false,
    userInfo: {},
  },
  reducers: {
    loginIn(state) {
      state.isLogin = true;
      localStorage.setItem('isLogin', 'true');
    },
    loginOut(state) {
      state.isLogin = false;
      localStorage.setItem('isLogin', '');
    },
  },
});

export const { loginIn, loginOut } = userSlice.actions;

export default userSlice.reducer;
