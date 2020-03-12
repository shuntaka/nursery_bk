import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Card, Image } from "react-native-elements";
import { withNavigation } from "react-navigation";

const BlogItem = ({ title, navigation }) => {
  return (
    <TouchableOpacity onPress={() => navigation.navigate("BlogShowScreen")}>
      <Card title={title}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={{ width: 200, height: 100 }}
        />
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardStyle: {}
});
export default withNavigation(BlogItem);
