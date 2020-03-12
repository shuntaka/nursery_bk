import createDataContext from "./createDataContext";
import axios from "../api/api";

import findBegginEndDateForWeek from "../helper/helper";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_schedules":
      return action.payload;

    default:
      return state;
  }
};
const fetchSchedules = dispatch => async (dateRange, location) => {
  const { begginDate, endDate } = dateRange;

  // encode parameters
  const begginDateString = begginDate.toISOString();
  const endDateString = endDate.toISOString();

  // use parameters
  const response = await axios(
    `/schedules?begginDate=${begginDateString}&endDate=${endDateString}&location=${location}`
  );
  // decode response
  const schedulesWithDateString = response.data;
  const schedules = schedulesWithDateString.map(schedule => {
    return { ...schedule, date: new Date(schedule.date) };
  });

  schedules.sort((a, b) => a.date - b.date);
  dispatch({ type: "fetch_schedules", payload: schedules });
};

export const { Context, Provider } = createDataContext(
  reducer, // reducer
  { fetchSchedules }, //actions
  [] // initial state
);
