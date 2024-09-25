import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";

import Storage from "../../helpers/storage";
import { CommentsServices } from "../../services";
import { CommentsSelector } from "../selectors";
import { generateErrorMessage } from "../../utils";

const loadComments = createAsyncThunk(
  "[commentsThunks]/loadComments",
  async (_, { getState }) => {
    const state = getState();
    const limit = CommentsSelector.selectLimit(state);
    const skip = CommentsSelector.selectSkip(state);
    const total = CommentsSelector.selectTotal(state);
    const comments = CommentsSelector.selectComments(state);

    if ((skip > total || skip === total) && skip !== 0) return null;

    const storageParams = Storage.getCommentsParamsState();

    const params = storageParams
      ? { limit: storageParams.skip }
      : { limit, skip };

    try {
      const { data } = await CommentsServices.getComments({
        params,
      });

      Storage.clearCommentsParamsState();

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
      const storageState = Storage.getRemovedComments();

      const { data } = await CommentsServices.removeComment(id);

      const removedComments = storageState ? [...storageState, data] : [data];

      // TODO this is just for demonstration purposes only, it's not good to do this. There must always be one source of truth
      Storage.setRemovedComments(removedComments);

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
      const storageState = Storage.getAddedComments();

      const response = await CommentsServices.addComment(data);

      const addedComments = storageState
        ? [...storageState, response.data]
        : [response.data];

      // TODO this is just for demonstration purposes only, it's not good to do this. There must always be one source of truth
      // TODO in this case there are restrictions BE
      Storage.setAddedComments(addedComments);
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
