import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

import { Loader } from "./shared/components";
import { store } from "./redux/configureStore";
import { router } from "./routes";
import "./styles/app.less";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<div>Loading...</div>} persistor={persistor}> */}
      <RouterProvider router={router} fallbackElement={<Loader />} />
      {/* </PersistGate> */}
    </Provider>
  </React.StrictMode>,
);
