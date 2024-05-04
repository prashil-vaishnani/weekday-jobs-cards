import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IJobsInitialState, Job, filterType } from "../../types/jobs";

const initialState: IJobsInitialState = {
  jobsList: [],
  loading: false,
  errors: "",
  totalCount: 0,
  filter: {} as filterType,
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    getJobsListLoading(state) {
      state.loading = true;
    },
    getJobsListSuccess(state, action: PayloadAction<Job[]>) {
      state.loading = false;
      state.jobsList = [...state.jobsList, ...action.payload];
    },
    getJobsListErrors(state, action: PayloadAction<string>) {
      state.loading = false;
      state.errors = action.payload;
    },
    setTotalJobsCount(state, action: PayloadAction<number>) {
      state.totalCount = action.payload;
    },
    setFilterValues(state, action) {
      state.filter = action.payload;
    },
  },
});

export const {
  getJobsListErrors,
  getJobsListLoading,
  getJobsListSuccess,
  setTotalJobsCount,
  setFilterValues
} = jobsSlice.actions;

export default jobsSlice.reducer;
