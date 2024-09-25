import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CommentsThunks } from "../thunks";

const initialState = {
  isLoading: false,
  comments: [],
  comment: {},
  total: 0,
  limit: 20,
  skip: 0,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(CommentsThunks.loadComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CommentsThunks.loadComments.fulfilled, (state, { payload }) => {
        if (!payload) return;

        state.comments = payload.comments;
        state.total = payload.total;
        state.skip = payload.limit + payload.skip;
      })
      .addCase(CommentsThunks.addComment.fulfilled, (state, { payload }) => {
        state.comments = [payload, ...state.comments];
      })
      .addCase(CommentsThunks.removeComment.fulfilled, (state, { payload }) => {
        if (!payload) return;

        state.comments = state.comments.filter(
          (comment) => comment.id !== payload.id,
        );
      })
      .addCase(CommentsThunks.loadComment.fulfilled, (state, { payload }) => {
        if (!payload) return;

        state.comment = payload;
      })
      .addMatcher(
        isAnyOf(
          CommentsThunks.loadComments.fulfilled,
          CommentsThunks.loadComments.rejected,
        ),
        (state) => {
          state.isLoading = false;
        },
      );
  },
});

export const CommentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
