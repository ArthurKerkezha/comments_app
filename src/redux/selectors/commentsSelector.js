import { createSelector } from "@reduxjs/toolkit";

const selectState = (state) => state.comments;

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectSkip = createSelector(selectState, (state) => state.skip);

const selectComments = createSelector(selectState, (state) => state.comments);

const selectComment = createSelector(selectState, (state) => state.comment);

const selectIsCommentLoading = createSelector(
  selectState,
  (state) => state.isCommentLoading,
);

const CommentsSelectors = {
  selectState,
  selectIsLoading,
  selectSkip,
  selectComments,
  selectComment,
  selectIsCommentLoading,
};

export default CommentsSelectors;
