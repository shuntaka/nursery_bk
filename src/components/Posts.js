import React from "react";
import { View, Text, StyleSheet, SafeAreaView, FlatList } from "react-native";
import { Card, Divider, Image } from "react-native-elements";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import GroupPostCommentsScreen from "../screens/GroupPostCommentsScreen";

const Posts = ({ postsData, navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={postsData}
        keyExtractor={blog => blog.title}
        renderItem={({ item }) => {
          return (
            <Card title={item.title}>
              <TouchableOpacity>
                <Text style={sytles.blogContentStyle}>{item.content}</Text>
              </TouchableOpacity>
              <Image
                source={{ uri: item.imageUrls[0] }}
                style={{ width: 200, height: 200 }}
              />
              <TouchableOpacity
                style={sytles.numberOfCommentsAreaStyle}
                onPress={() => {
                  navigation.navigate("GroupPostCommentsScreen", {
                    blogId: item._id
                  });
                }}
              >
                <Text>{`コメント${item.comments.length}件`}</Text>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("GroupPostCommentsScreen", {
                    blogId: item._id
                  });
                }}
                style={sytles.addCommentAreaStyle}
              >
                <Feather
                  style={{ color: "black" }}
                  size={25}
                  name={"message-square"}
                />
                <Text> コメントする</Text>
              </TouchableOpacity>
            </Card>
          );
        }}
      />
    </SafeAreaView>
  );
};

const sytles = StyleSheet.create({
  blogContentStyle: {
    fontSize: 15,
    marginBottom: 10
  },
  numberOfCommentsAreaStyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 20
  },
  addCommentAreaStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    marginBottom: 10
  }
});

export default Posts;
