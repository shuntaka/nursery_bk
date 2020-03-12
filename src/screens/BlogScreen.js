import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Header, Card, Image, Divider } from "react-native-elements";
import { Context as BlogContext } from "../context/BlogContext";
import { Feather } from "@expo/vector-icons";

const BlogScreen = ({ navigation }) => {
  const { state, fetchBlogs } = useContext(BlogContext);
  useEffect(() => {
    fetchBlogs();
    const listner = navigation.addListener("didFocus", () => {
      fetchBlogs();
    });
    return () => {
      listner.remove();
    };
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <FlatList
        data={state}
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
                  navigation.navigate("CommentScreen", { blogId: item._id });
                }}
              >
                <Text>{`コメント${item.comments.length}件`}</Text>
              </TouchableOpacity>
              <Divider />
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("CommentScreen", { blogId: item._id });
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

export default BlogScreen;
