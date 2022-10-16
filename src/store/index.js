import { configureStore } from "@reduxjs/toolkit";
import todos from "../reducers/todoSlice";
import activeFilter from "../reducers/filtersSlice";

const store = configureStore({
  reducer: { todos, activeFilter },
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
