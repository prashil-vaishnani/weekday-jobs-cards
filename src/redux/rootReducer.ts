import { combineReducers } from "redux";
// slices
import JobsSlice from "./slice/JobsSlice";

const rootReducer = combineReducers({
  Jobs: JobsSlice,
});

export { rootReducer };
