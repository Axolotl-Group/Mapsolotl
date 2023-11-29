import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  listTrails: [],
  moreInfo: {},
};
// createSlice refernces state without mutating state
const slice = createSlice({
  name: 'testslice',
  initialState: initialState,
  reducers: {
    DISPLAY_SEARCH: (state, action) => {
      console.log('action.payload is ' + action.payload.data);
      state.listTrails = [...action.payload.data];
    },
    DISPLAY_MORE_INFO: (state, action) => {
      console.log('action.payload is ' + action.payload.data);
      let temp = { ...state.moreInfo };
      temp[action.payload.data[0].id] = action.payload.data[0];
      state.moreInfo = temp;
    },
  },
});

export const { DISPLAY_SEARCH, DISPLAY_MORE_INFO } = slice.actions;
export default slice.reducer;
