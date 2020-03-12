import React, { useEffect, useContext } from "react";
import {
  View,
  Image,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity
} from "react-native";
import { Divider } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import { Card, Button, Icon, Text } from "native-base";
import { baseURL } from "../api/api";
import { Context as GroupPostContext } from "../context/GroupPostContext";

const GroupPostsScreen = ({ navigation }) => {
  const { state, fetchGroupPosts } = useContext(GroupPostContext);
  const groupId = navigation.getParam("groupId");
  useEffect(() => {
    fetchGroupPosts(groupId);
    const listener = navigation.addListener("didFocus", () => {
      fetchGroupPosts(groupId);
    });
    return () => {
      listener.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Button
        iconLeft
        rounded
        light
        style={{ margin: 10, justifyContent: "flex-start" }}
        onPress={() => {
          navigation.navigate("AddGroupPostScreen", {
            groupId
          });
        }}
      >
        <Icon type="SimpleLineIcons" name="pencil" />
        <Text>記事を作成</Text>
      </Button>
      <FlatList
        style={{ padding: 10 }}
        data={state}
        keyExtractor={post => post._id}
        renderItem={({ item }) => {
          return (
            <Card style={{ padding: 10 }}>
              <TouchableOpacity></TouchableOpacity>
              <Image
                source={{
                  uri: `${baseURL}/groups/${groupId}/posts/${item._id}/images`
                }}
                style={{
                  width: "100%",
                  height: 300
                }}
                resizeMode="cover"
              />
              <Text style={sytles.groupPostContentStyle}>{item.content}</Text>
              <TouchableOpacity
                style={sytles.numberOfCommentsAreaStyle}
                onPress={() => {
                  navigation.navigate("GroupPostCommentsScreen", {
                    groupPostId: item._id
                  });
                }}
              >
                <Text>{`コメント${item.comments.length}件`}</Text>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("GroupPostCommentsScreen", {
                    groupPostId: item._id
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
  groupPostContentStyle: {
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
export default GroupPostsScreen;
