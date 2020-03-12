import React, { useState, useContext, useEffect } from "react";
import { Text } from "react-native";
import ToggleSwitch from "toggle-switch-react-native";
import { Context as AttendanceContext } from "../context/AttendanceContext";
import { Context as ScheduleContext } from "../context/ScheduleContext";
import { Context as ScheduleRangeContext } from "../context/ScheduleRangeContext";
import { Context as LocationContext } from "../context/LocationContext";
import Moment from "moment";

const Attendance = ({ date, scheduleId }) => {
  const { state, fetchAttendance, updateAttendance } = useContext(
    AttendanceContext
  );
  const { fetchSchedules } = useContext(ScheduleContext);
  const scheduleRangeStateAndActions = useContext(ScheduleRangeContext);
  const scheduleRangeState = scheduleRangeStateAndActions.state;

  const locationStateAndActions = useContext(LocationContext);
  const locationState = locationStateAndActions.state;
  const fetchLocation = locationStateAndActions.fetchLocation;

  const dateStringKey = Moment(date).format("YMMDD");
  const attendanceObject = state.find(attendanceObject => {
    return attendanceObject.date === dateStringKey;
  });
  const attendance =
    attendanceObject !== undefined ? attendanceObject.attendance : false;

  // const [counter, setCounter] = useState(0);
  useEffect(() => {
    fetchAttendance(date, locationState);
  }, [locationState]);

  const isOnHandler = async isOn => {
    await updateAttendance(dateStringKey, locationState, isOn, scheduleId);
    fetchSchedules(scheduleRangeState, locationState);
  };

  return (
    <ToggleSwitch
      isOn={attendance}
      // isOn={true}
      onColor="#ffd1dc"
      offColor="grey"
      label="利用予定"
      labelStyle={{ color: "black", fontWeight: "100" }}
      size="medium"
      onToggle={isOnHandler}
    />
  );
};
export default Attendance;
