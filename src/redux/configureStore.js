import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsSlice from "./slices/commentsSlice";

const rootReducer = combineReducers({
  comments: commentsSlice,
});

export const store = configureStore({ reducer: rootReducer });
