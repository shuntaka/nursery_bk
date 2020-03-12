import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";
import Moment from "moment";
import axios from "../api/api";
const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_attendance":
      return updateAttendanceStateHelper(state, action.payload);
    case "update_attendance": {
      return updateAttendanceStateHelper(state, action.payload);
    }
    default:
      return state;
  }
};

const updateAttendanceStateHelper = (state, newAttendanceObject) => {
  const newState = state.filter(
    attendanceObject => attendanceObject.date !== newAttendanceObject.date
  );
  newState.push(newAttendanceObject);
  return newState;
};

const fetchAttendance = dispatch => async (date, location) => {
  const dateStringKey = Moment(date).format("YMMDD");
  const attendanceString = await AsyncStorage.getItem(dateStringKey);
  // decode the stored data
  let attendanceObj = JSON.parse(attendanceString);
  let attendance;

  // when the data exists for the date & location
  if (attendanceObj !== null && attendanceObj[location] !== undefined) {
    attendance = attendanceObj[location];
    dispatch({
      type: "fetch_attendance",
      payload: { date: dateStringKey, attendance }
    });
  } else {
    // when the data does NOT exist for date or location
    // store encoded data
    const newAttendanceObj = attendanceObj ? attendanceObj : {};
    newAttendanceObj[location] = false;
    await AsyncStorage.setItem(dateStringKey, JSON.stringify(newAttendanceObj));
    attendance = false;
    dispatch({
      type: "fetch_attendance",
      payload: { date: dateStringKey, attendance }
    });
  }
};

const updateAttendance = dispatch => async (
  dateStringKey,
  location,
  attendance,
  scheduleId
) => {
  try {
    const attendanceString = await AsyncStorage.getItem(dateStringKey);
    // decode stored data
    const attendanceObj = JSON.parse(attendanceString);
    attendanceObj[location] = attendance;

    // store encoded data
    await AsyncStorage.setItem(dateStringKey, JSON.stringify(attendanceObj));
    dispatch({
      type: "update_attendance",
      payload: { date: dateStringKey, attendance }
    });

    const numberOfAttendeeDiff = attendance ? 1 : -1;
    return axios.patch(`/schedules/numberOfAttendee/${scheduleId}`, {
      numberOfAttendeeDiff: JSON.stringify(numberOfAttendeeDiff)
    });
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { fetchAttendance, updateAttendance },

  //intial state
  []
);
