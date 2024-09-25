import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

import { CommentsServices } from "../../services";
import { CommentsSelector } from "../selectors";
import { generateErrorMessage } from "../../utils";

const loadComments = createAsyncThunk(
  "[commentsThunks]/loadComments",
  async (_, { getState }) => {
    const state = getState();
    const limit = CommentsSelector.selectLimit(state);
    const skip = CommentsSelector.selectSkip(state);
    const comments = CommentsSelector.selectComments(state);

    try {
      const { data } = await CommentsServices.getComments({
        params: {
          limit,
          skip,
        },
      });

      return {
        ...data,
        comments: [...comments, ...data.comments],
      };
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: generateErrorMessage(error) });
      }

      return null;
    }
  },
);

const loadComment = createAsyncThunk(
  "[commentsThunks]/loadComment",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await CommentsServices.getComment(id);

      return data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: generateErrorMessage(error) });

        return rejectWithValue(error.message);
      }
      return null;
    }
  },
);

const removeComment = createAsyncThunk(
  "[commentsThunks]/removeComment",
  async (id) => {
    try {
      const { data } = await CommentsServices.removeComment(id);

      return data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: generateErrorMessage(error) });
      }
      return null;
    }
  },
);

const addComment = createAsyncThunk(
  "[commentsThunks]/addComment",
  async (data) => {
    try {
      const response = await CommentsServices.addComment(data);

      return response.data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: generateErrorMessage(error) });
      }
      return null;
    }
  },
);

const CommentsThunks = {
  loadComments,
  loadComment,
  removeComment,
  addComment,
};

export default CommentsThunks;
