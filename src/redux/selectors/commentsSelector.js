import { createSelector } from "@reduxjs/toolkit";

const selectState = (state) => console.log(state) || state.comments;

const CommentsSelectors = {
  selectState,
};

export default CommentsSelectors;
