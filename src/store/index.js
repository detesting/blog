import { configureStore } from '@reduxjs/toolkit';

import filterReducer from './filtersSlice';
import ticketsReducer from './ticketsSlice';
import tabsReducer from './tabsSlice';

export default configureStore({
  reducer: {
    filters: filterReducer,
    tickets: ticketsReducer,
    tabs: tabsReducer,
  },
});
