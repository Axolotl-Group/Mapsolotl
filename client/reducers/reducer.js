import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: "test",
};

const slice = createSlice({
  name: "testslice",
  initialState: initialState,
  reducers: {},
});

export const {} = slice.actions;
export default slice.reducer;
