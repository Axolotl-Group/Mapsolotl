import { configureStore } from '@reduxjs/toolkit';
import slice from './reducers/reducer.js';

export const store = configureStore({
  reducer: {
    list: slice,
  },
});

export default store;
