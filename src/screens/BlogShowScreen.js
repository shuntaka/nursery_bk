import React, { useContext } from "react";
import { View, Text, SafeAreaView, FlatList, StyleSheet } from "react-native";
import { Context as BlogContext } from "../context/BlogContext";
import { Card, Image } from "react-native-elements";

const BlogShowScreen = ({ navigation }) => {
  const { state } = useContext(BlogContext);
  const blogId = navigation.getParam("blogId");
  const blog = state.find(blog => blog._id === blogId);

  return (
    <SafeAreaView>
      <Card title={blog.title}>
        <Image
          source={{ uri: "https://via.placeholder.com/150" }}
          style={{ width: 200, height: 100 }}
        />
        <Text style={styles.textStyle}>{blog.content}</Text>
      </Card>
      <Card title={"Comments"}>
        <FlatList
          data={blog.comments}
          keyExtractor={comment => comment.id}
          renderItem={({ item }) => {
            return <Text>{item.comment}</Text>;
          }}
        ></FlatList>
      </Card>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    marginTop: 10,
    fontSize: 30
  }
});
export default BlogShowScreen;
