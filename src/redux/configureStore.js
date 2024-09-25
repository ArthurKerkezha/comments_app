import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import commentsSlice from "./slices/commentsSlice";

const rootReducer = combineReducers({
  comments: commentsSlice,
});

const persistConfig = {
  key: "comments",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({ reducer: persistedReducer });

export const persistor = persistStore(store);
