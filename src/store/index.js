import { configureStore } from '@reduxjs/toolkit';

import userSlice from './userSlice';
import articlesSlice from './articlesSlice';

export default configureStore({
  reducer: {
    user: userSlice,
    articles: articlesSlice,
  },
});
