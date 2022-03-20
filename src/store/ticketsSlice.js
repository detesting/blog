import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

async function findTickets(id) {
  let { data } = await axios.get(`https://front-test.beta.aviasales.ru/tickets?searchId=${id}`);
  return data;
}

export const getTickets = createAsyncThunk('tickets/getTickets', async function getTicketsAll() {
  let { data: searchID } = await axios.get('https://front-test.beta.aviasales.ru/search');
  let data = {
    stop: false,
  };
  try {
    data = await findTickets(searchID.searchId);
  } catch (e) {
    let { data: searchIDnew } = await axios.get('https://front-test.beta.aviasales.ru/search');
    data = await findTickets(searchIDnew.searchId);
  }
  try {
    while (!data.stop) {
      let newData = await findTickets(searchID.searchId);
      data.tickets.push(...newData.tickets);
      data.stop = newData.stop;
    }
  } catch (e) {
    await getTicketsAll();
  }
  return data.tickets;
});

const ticketsSlice = createSlice({
  name: 'tickets',
  initialState: {
    tickets: [],
    loading: false,
    error: false,
    countTickets: 5,
  },
  reducers: {
    addFiveTickets(state) {
      state.countTickets += 5;
    },
  },
  extraReducers: {
    [getTickets.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [getTickets.fulfilled]: (state, action) => {
      state.loading = false;
      state.error = false;
      state.tickets.push(...action.payload);
    },
    [getTickets.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const { addFiveTickets } = ticketsSlice.actions;

export default ticketsSlice.reducer;
