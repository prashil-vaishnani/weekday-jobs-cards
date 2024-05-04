import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { IJobsInitialState, Job } from "../../types/jobs";

const initialState: IJobsInitialState = {
  jobsList: [],
  loading: false,
  errors: "",
  totalCount: 0,
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
  },
});

export const {
  getJobsListErrors,
  getJobsListLoading,
  getJobsListSuccess,
  setTotalJobsCount,
} = jobsSlice.actions;

export default jobsSlice.reducer;
