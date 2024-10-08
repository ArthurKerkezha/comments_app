import { createSelector } from "@reduxjs/toolkit";
import { isEmpty, uniqWith } from "lodash";

import {
  filteredWithAddedComments,
  filteredWithRemovedComments,
  getUniqComments,
} from "../../utils";

const selectState = (state) => state.comments;

const selectIsLoading = createSelector(selectState, (state) => state.isLoading);

const selectComments = createSelector(selectState, (state) => state.comments);

const selectComment = createSelector(selectState, (state) => state.comment);

const selectSkip = createSelector(selectState, (state) => state.skip);

const selectTotal = createSelector(selectState, (state) => state.total);

const selectLimit = createSelector(selectState, (state) => state.limit);

const selectAddedComments = createSelector(
  selectState,
  (state) => state.addedComments,
);

const selectRemovedComments = createSelector(
  selectState,
  (state) => state.removedComments,
);

const selectUniqComments = createSelector(
  selectComments,
  selectAddedComments,
  (comments, addedComments) =>
    filteredWithAddedComments(comments, addedComments),
);

const selectFilteredComments = createSelector(
  selectUniqComments,
  selectRemovedComments,
  (comments, removedComments) =>
    // TODO this is just for demonstration purposes only, it's not good to do this.
    filteredWithRemovedComments(comments, removedComments),
);

const selectFormValues = createSelector(
  selectState,
  (state) => state.formValues,
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
  selectFilteredComments,
  selectFormValues,
  selectAddedComments,
  selectRemovedComments,
};

export default CommentsSelectors;
