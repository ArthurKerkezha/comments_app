import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CommentsThunks } from "../thunks";
import { filteredWithRemovedComments, getUniqComments } from "../../utils";

const initialState = {
  isLoading: false,
  comments: [],
  comment: {},
  total: 0,
  limit: 20,
  skip: 0,
  formValues: {},
  addedComments: [],
  removedComments: [],
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setFullState: (state, { payload }) => payload,
    setFormValues: (state, { payload }) => {
      Object.assign(state.formValues, payload);
    },
    clearComments(state) {
      Object.assign(state, initialState);
    },
    clearFormValues(state) {
      state.formValues = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CommentsThunks.loadComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(
        CommentsThunks.loadSavedState.fulfilled,
        (state, { payload }) => {
          if (!payload) return;

          // eslint-disable-next-line consistent-return
          return { ...payload };
        },
      )
      .addCase(CommentsThunks.loadComments.fulfilled, (state, { payload }) => {
        if (!payload) return;

        state.comments = payload.comments;
        state.total = payload.total;
        state.skip = payload.limit + payload.skip;
        state.isLoading = false;
      })
      .addCase(CommentsThunks.addComment.fulfilled, (state, { payload }) => {
        state.addedComments = [payload, ...state.addedComments];
      })
      .addCase(CommentsThunks.removeComment.fulfilled, (state, { payload }) => {
        if (!payload) return;

        const removedComments = [...state.removedComments, payload];

        state.addedComments = state.addedComments.filter(
          (comment) => !getUniqComments(comment, payload),
        );
        state.comments = filteredWithRemovedComments(
          state.comments,
          removedComments,
        );
        state.removedComments = removedComments;
      })
      .addCase(CommentsThunks.loadComment.fulfilled, (state, { payload }) => {
        if (!payload) return;

        state.comment = payload;
      })
      .addMatcher(isAnyOf(CommentsThunks.loadComments.rejected), (state) => {
        state.isLoading = false;
      });
  },
});

export const CommentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
