import createDataContext from "./createDataContext";
import { findBegginEndDateForWeek } from "../helper/helper";

const reducer = (state, action) => {
  switch (action.type) {
    case "update_schedule_range":
      state.begginDate.setDate(state.begginDate.getDate() + action.payload * 7);
      state.endDate.setDate(state.endDate.getDate() + action.payload * 7);
      return { begginDate: state.begginDate, endDate: state.endDate };
    default:
      return state;
  }
};
const updateScheduleRange = dispatch => numberOfWeekToIncrease => {
  dispatch({ type: "update_schedule_range", payload: numberOfWeekToIncrease });
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //action
  { updateScheduleRange },
  //initial state
  findBegginEndDateForWeek(new Date())
);
