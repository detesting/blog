import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    options: [
      { label: 'Без пересадок', value: 'Без пересадок' },
      { label: '1 пересадка', value: '1 пересадка' },
      { label: '2 пересадки', value: '2 пересадки' },
      { label: '3 пересадки', value: '3 пересадки' },
    ],
    value: ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'],
    all: true,
    maxLength: 4,
  },
  reducers: {
    changeAll(state) {
      state.value = state.all ? [] : ['Без пересадок', '1 пересадка', '2 пересадки', '3 пересадки'];
      state.all = !state.all;
    },
    changeOption(state, action) {
      state.value = action.payload.checkedValue;
      state.all = state.value.length === state.maxLength;
    },
  },
});

export const { changeAll, changeOption } = filtersSlice.actions;

export default filtersSlice.reducer;
