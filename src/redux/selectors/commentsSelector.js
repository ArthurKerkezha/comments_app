import { createSelector } from "@reduxjs/toolkit";

const selectState = (state) => console.log(state) || state.comments;

const CommentSelectors = {
  selectState,
};

export default CommentSelectors;
