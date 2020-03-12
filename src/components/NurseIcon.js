import React from "react";
import { View, Text } from "react-native";
import { Feather } from "@expo/vector-icons";

const NurseIcon = ({ nurseAttendance }) => {
  return nurseAttendance ? (
    <View style={{ width: 40, flexDirection: "column", alignItems: "center" }}>
      <Text style={{ fontSize: 10 }}>見守員</Text>
      <Feather style={{ color: "#fcc1d0" }} size={25} name="user" />
    </View>
  ) : (
    <View style={{ width: 40, flexDirection: "column", alignItems: "center" }}>
      <Text style={{ fontSize: 10, color: "black", opacity: 0.1 }}>見守員</Text>
      <Feather style={{ color: "black", opacity: 0.1 }} size={25} name="user" />
    </View>
  );
};
export default NurseIcon;
