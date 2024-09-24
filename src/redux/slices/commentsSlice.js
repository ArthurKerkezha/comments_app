import { createSlice } from "@reduxjs/toolkit";

const commentsSlice = createSlice({
  name: "counter",
  initialState: {
    value: 0,
  },
  reducers: {
    incremented: (state) => {
      state.value += 1;
    },
    decremented: (state) => {
      state.value -= 1;
    },
  },
});

export const CommentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
