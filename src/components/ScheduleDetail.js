import React from "react";
import { View, Text, StyleSheet } from "react-native";
import NurseIcon from "./NurseIcon";
import Attendance from "./Attendance";

const ScheduleDetail = ({ detail }) => {
  return (
    <View style={styles.detail}>
      <Text>{detail.date}</Text>
      <NurseIcon nurseAttendance={detail.nurseAttendance} />
      <Text>{`${detail.attendee} people may use`}</Text>
      <Attendance
        date={detail.date}
        id={detail.id}
        attendance={detail.attendance}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  detail: {
    height: 80,
    paddingTop: 20,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "grey",
    borderBottomWidth: 0.5
  }
});
export default ScheduleDetail;
