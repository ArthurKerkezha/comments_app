import { createSelector } from "@reduxjs/toolkit";

const selectState = (state) => state.comments;

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectComments = createSelector(selectState, (state) => state.comments);

const selectComment = createSelector(selectState, (state) => state.comment);

const selectSkip = createSelector(selectState, (state) => state.skip);

const selectTotal = createSelector(selectState, (state) => state.total);

const selectLimit = createSelector(selectState, (state) => state.limit);

const CommentsSelectors = {
  selectState,
  selectIsLoading,
  selectSkip,
  selectComments,
  selectComment,
  selectTotal,
  selectLimit,
};

export default CommentsSelectors;
