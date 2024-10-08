import { createAsyncThunk } from "@reduxjs/toolkit";
import { notification } from "antd";
import axios from "axios";
import { isEmpty } from "lodash";

import { CommentsServices } from "../../services";
import { CommentsSelector } from "../selectors";
import { generateErrorMessage, getUniqComments } from "../../utils";
import Storage from "../../helpers/storage";

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
  async (_, { getState, dispatch }) => {
    const storageState = Storage.getApplicationState();
    const { limit, skip } = storageState;
    const params = { limit, skip };

    try {
      const { data } = await CommentsServices.getComments({
        params,
      });

      console.log("loadSavedState");
      return { ...storageState, ...data };
    } catch (error) {
      if (!axios.isCancel(error)) {
        notification.error({ message: generateErrorMessage(error) });
      }
    }
  },
);

const loadComments = createAsyncThunk(
  "[commentsThunks]/loadComments",
  async (_, { getState, signal, rejectWithValue }) => {
    const state = getState();
    const limit = CommentsSelector.selectLimit(state);
    const skip = CommentsSelector.selectSkip(state);
    const total = CommentsSelector.selectTotal(state);
    const comments = CommentsSelector.selectComments(state);

    console.log("loadComments");
    if ((skip > total || skip === total) && skip !== 0) return null;

    const params = { limit, skip };

    try {
      const { data } = await CommentsServices.getComments({
        params,
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
