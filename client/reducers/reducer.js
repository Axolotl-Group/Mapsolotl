import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listTrails: [],
};

const slice = createSlice({
  name: 'testslice',
  initialState: initialState,
  reducers: {
    DISPLAY_SEARCH: (state, action) => {
      console.log('action.payload is ' + action.payload.data);
      state.listTrails = [...action.payload.data];
    },
  },
});

export const { DISPLAY_SEARCH } = slice.actions;
export default slice.reducer;
