import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import { CommentsThunks } from "../thunks";

const initialState = {
  isLoading: false,
  isCommentLoading: false,
  comments: [],
  comment: {},
  skip: 0,
};

const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {
    setComment: (state, { payload }) => {
      state.comment = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CommentsThunks.loadComments.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(CommentsThunks.loadComments.fulfilled, (state, { payload }) => {
        if (!payload) return;

        state.comments = payload.comments;
      })
      .addCase(CommentsThunks.loadComment.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(CommentsThunks.removeComment.fulfilled, (state, { payload }) => {
        if (!payload) return;
        state.comments = state.comments.filter(
          (comment) => comment.id !== payload.id,
        );
      })
      .addCase(CommentsThunks.loadComment.fulfilled, (state, { payload }) => {
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
      )
      .addMatcher(
        isAnyOf(
          CommentsThunks.loadComment.fulfilled,
          CommentsThunks.loadComment.rejected,
        ),
        (state) => {
          state.isCommentLoading = false;
        },
      );
  },
});

export const CommentsActions = commentsSlice.actions;

export default commentsSlice.reducer;
