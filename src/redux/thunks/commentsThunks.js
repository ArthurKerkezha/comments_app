import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import { isEmpty } from "lodash";

import { CommentsServices } from "../../services";
import { CommentsSelector } from "../selectors";
import {
  calculateNextSkip,
  generateErrorMessage,
  getUniqComments,
} from "../../utils";
import Storage from "../../helpers/storage";
import { DEFAULT_LIMIT } from "../../constants";

const loadInitialState = createAsyncThunk(
  "[commentsThunks]/loadInitialState",
  async (_, { dispatch }) => {
    const storageState = Storage.getApplicationState();

    const thunk = storageState ? loadSavedState : loadComments;

    return dispatch(thunk());
  },
);

const loadSavedState = createAsyncThunk(
  "[commentsThunks]/loadSavedState",
  // eslint-disable-next-line consistent-return
  async (_) => {
    const storageState = Storage.getApplicationState();
    const { limit, skip } = storageState;

    const countedLimit = skip === DEFAULT_LIMIT ? limit : skip;

    const params = { limit: countedLimit, skip };

    try {
      const { data } = await CommentsServices.getComments({
        params,
      });

      return { ...storageState, ...data };
    } catch (error) {
      // TODO errors should be handled correctly
      if (!axios.isCancel(error)) {
        notification.error({ message: generateErrorMessage(error) });
      }
    }
  },
);

const loadComments = createAsyncThunk(
  "[commentsThunks]/loadComments",
  async (_, { getState }) => {
    const state = getState();
    const skip = CommentsSelector.selectSkip(state);
    const total = CommentsSelector.selectTotal(state);
    const comments = CommentsSelector.selectComments(state);

    if (skip >= total && skip !== 0) return;

    const params = {
      limit: DEFAULT_LIMIT,
      skip: calculateNextSkip(skip, DEFAULT_LIMIT, total),
    };

    try {
      const { data } = await CommentsServices.getComments({
        params,
      });

      // eslint-disable-next-line consistent-return
      return {
        ...data,
        comments: [...comments, ...data.comments],
      };
    } catch (error) {
      // TODO errors should be handled correctly
      if (!axios.isCancel(error)) {
        notification.error({ message: generateErrorMessage(error) });
      }
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

        return null;
      }
      return null;
    }
  },
);

const removeComment = createAsyncThunk(
  "[commentsThunks]/removeComment",
  async ({ item }, { getState }) => {
    const addedComments = CommentsSelector.selectAddedComments(getState());

    try {
      const commentElem = addedComments.find((comment) =>
        getUniqComments(comment, item),
      );

      if (!isEmpty(commentElem)) {
        return commentElem;
      }

      const { data } = await CommentsServices.removeComment(item.id);

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

      // TODO this is just for demonstration purposes only, it's not good to do this. There must always be one source of truth
      // TODO in this case there are restrictions BE
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
  loadInitialState,
  loadSavedState,
};

export default CommentsThunks;
