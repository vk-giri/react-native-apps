import { configureStore } from '@reduxjs/toolkit';

import favReducer from './favourite';

export const store = configureStore({
  reducer: {
    favMeals: favReducer,
  },
});
