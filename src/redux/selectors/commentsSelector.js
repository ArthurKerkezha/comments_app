import { createSelector } from "@reduxjs/toolkit";
import { uniqWith } from "lodash";

import Storage from "../../helpers/storage";
import { getUniqComments } from "../../utils";

const selectState = (state) => state.comments;

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectComments = createSelector(selectState, (state) => state.comments);

const selectComment = createSelector(selectState, (state) => state.comment);

const selectSkip = createSelector(selectState, (state) => state.skip);

const selectTotal = createSelector(selectState, (state) => state.total);

const selectLimit = createSelector(selectState, (state) => state.limit);

const selectUniqComments = createSelector(
  selectComments,
  selectIsLoading,
  (comments, isLoading) => {
    const addedComments = Storage.getAddedComments();

    const correctComments = isLoading ? [] : addedComments;

    // TODO this is just for demonstration purposes only, it's not good to do this.
    return uniqWith([...correctComments, ...comments], getUniqComments);
  },
);

const CommentsSelectors = {
  selectState,
  selectIsLoading,
  selectSkip,
  selectComments,
  selectComment,
  selectTotal,
  selectLimit,
  selectUniqComments,
};

export default CommentsSelectors;
