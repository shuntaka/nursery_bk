import React, { useEffect, useContext, useCallback } from "react";
import { Card, Header } from "react-native-elements";
import { View, StyleSheet, Text, SafeAreaView } from "react-native";
import { Feather } from "@expo/vector-icons";
import { FlatList, TouchableOpacity } from "react-native-gesture-handler";
import { DefaultTheme, List, Divider } from "react-native-paper";
import { Context as ScheduleContext } from "../context/ScheduleContext";
import { Context as ScheduleRangeContext } from "../context/ScheduleRangeContext";
import { Context as LocationContext } from "../context/LocationContext";
import NurseIcon from "../components/NurseIcon";
import Attendance from "../components/Attendance";
import Moment from "moment";
import findBegginEndDateForWeek from "../helper/helper";

const ScheduleScreen = ({ navigation }) => {
  const { state, fetchSchedules } = useContext(ScheduleContext);

  const scheduleRangeStateAndActions = useContext(ScheduleRangeContext);
  const scheduleRangeState = scheduleRangeStateAndActions.state;
  const updateScheduleRange = scheduleRangeStateAndActions.updateScheduleRange;

  const locationStateAndActions = useContext(LocationContext);
  const locationState = locationStateAndActions.state;
  const fetchLocation = locationStateAndActions.fetchLocation;
  const updateLocation = locationStateAndActions.updateLocation;

  const fetchSchedulesForScheduleRange = useCallback(() => {
    fetchSchedules(scheduleRangeState, locationState);
  }, [scheduleRangeState, locationState]);

  useEffect(() => {
    fetchLocation();
    fetchSchedulesForScheduleRange(scheduleRangeState, locationState);

    const listner = navigation.addListener("didFocus", () => {
      fetchSchedulesForScheduleRange(scheduleRangeState, locationState);
    });
    return () => {
      listner.remove();
    };
  }, [scheduleRangeState, locationState]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Card containerStyle={styles.schedulesAreaContainerStyle}>
        <View style={styles.locationSelectorStyle}>
          <TouchableOpacity
            onPress={() => {
              updateLocation("musashino");
            }}
          >
            {locationState === "musashino" ? (
              <Text style={{ fontSize: 30 }}>武蔵野</Text>
            ) : (
              <Text style={{ fontSize: 20, opacity: 0.2 }}>武蔵野</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              updateLocation("yokosuka");
            }}
          >
            {locationState === "yokosuka" ? (
              <Text style={{ fontSize: 30 }}>横須賀</Text>
            ) : (
              <Text style={{ fontSize: 20, opacity: 0.2 }}>横須賀</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              updateLocation("atsugi");
            }}
          >
            {locationState === "atsugi" ? (
              <Text style={{ fontSize: 30 }}>厚木</Text>
            ) : (
              <Text style={{ fontSize: 20, opacity: 0.2 }}>厚木</Text>
            )}
          </TouchableOpacity>
        </View>
        <FlatList
          style={styles.schedulesListContainerStyle}
          data={state}
          keyExtractor={schedule => schedule.date.toISOString()}
          renderItem={({ item }) => {
            return (
              <View style={styles.scheduleItemContainerStyle}>
                <Text>{`${Moment(item.date).format("M/D")} ${
                  "日月火水木金土"[item.date.getDay()]
                }`}</Text>
                <NurseIcon nurseAttendance={item.nurseAttendance} />
                <Text>{`使うかも：${item.numberOfAttendee}人`}</Text>
                <Attendance date={item.date} scheduleId={item._id} />
              </View>
            );
          }}
        />
        <View style={styles.pagingIconsContainerStyle}>
          <TouchableOpacity onPress={() => updateScheduleRange(-1)}>
            <Feather name="chevron-left" size={50} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => updateScheduleRange(1)}>
            <Feather name="chevron-right" size={50} />
          </TouchableOpacity>
        </View>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  locationSelectorStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: 40,
    paddingBottom: 40
  },
  schedulesAreaContainerStyle: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "space-between",
    marginTop: "5%",
    marginBottom: "5%",
    // marginLeft: 10,
    // marginRight: 10,
    borderColor: "grey",
    borderWidth: 0.5,
    paddingTop: 0,
    paddingBottom: 0,
    paddingLeft: 0,
    paddingRight: 0
  },
  schedulesListContainerStyle: {
    borderColor: "grey",
    borderTopWidth: 0.5
  },
  scheduleItemContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "grey",
    borderBottomWidth: 0.5,
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 10,
    paddingRight: 10
    // marginTop: 10
  },
  pagingIconsContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 0,
    marginBottom: 0,
    paddingTop: 20,
    paddingBottom: 0
  }
});
export default ScheduleScreen;
