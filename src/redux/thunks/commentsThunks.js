import { createAsyncThunk } from "@reduxjs/toolkit";

const getComment = createAsyncThunk(
  "[commentsThunks]/getComments",
  async (data, { dispatch }) => {
    try {
      console.log("ok");
    } catch (error) {
      console.log("error");
    }
  },
);

const CommentsThunks = {
  getComment,
};

export default CommentsThunks;
