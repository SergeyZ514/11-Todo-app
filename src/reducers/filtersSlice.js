import { createSlice } from "@reduxjs/toolkit";

export const FILTER_TITLES = ["All", "Active", "Completed"];

const savedFilter = localStorage.getItem("activeFilter");

const initialState = savedFilter ? JSON.parse(savedFilter) : "All";

const filtersSlice = createSlice({
  name: "activeFilter",
  initialState,
  reducers: {
    activeFilterChange: (state, action) => {
      return (state = action.payload);
    },
  },
});

const { actions, reducer } = filtersSlice;

export default reducer;

export const { activeFilterChange } = actions;
