import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

import { CommentsServices } from "../../services";

const loadComments = createAsyncThunk(
  "[commentsThunks]/loadComments",
  async (_) => {
    try {
      const { data } = await CommentsServices.getComments();

      return data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: error.message });
      }

      return [];
    }
  },
);

const loadComment = createAsyncThunk(
  "[commentsThunks]/loadComment",
  async (id) => {
    try {
      const { data } = await CommentsServices.getComment(id);

      return data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: error.message });
      }
      return {};
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
        notification.error({ message: error.message });
      }
      return null;
    }
  },
);

const addComment = createAsyncThunk(
  "[commentsThunks]/addComment",
  // eslint-disable-next-line consistent-return
  async (data) => {
    try {
      const response = await CommentsServices.addComment(data);

      console.log(response);
      // return data;
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: error.message });
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
