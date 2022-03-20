import { createSlice } from '@reduxjs/toolkit';

const tabsSlice = createSlice({
  name: 'filters',
  initialState: {
    value: 'cheap',
  },
  reducers: {
    setCheap(state) {
      state.value = 'cheap';
    },
    setFast(state) {
      state.value = 'fast';
    },
  },
});

export const { setCheap, setFast } = tabsSlice.actions;

export default tabsSlice.reducer;
