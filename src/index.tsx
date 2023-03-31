import { configureStore } from "@reduxjs/toolkit";
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import modeReducer from "slices/modeSlice";

const store = configureStore({
  reducer: {
    mode: modeReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
