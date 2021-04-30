import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "../features/dataSlice";
import searchSlice from "../features/searchSlice";

export const store = configureStore({
  reducer: {
    data: dataSlice,
    search: searchSlice,
  },
});
