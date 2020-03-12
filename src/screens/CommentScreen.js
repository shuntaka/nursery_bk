import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
  Button,
  StatusBar
} from "react-native";
import { Card, Input } from "react-native-elements";
import { Context as CommentsContext } from "../context/CommentContext";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";

const CommentScreen = ({ navigation }) => {
  const { state, createComment, fetchComments } = useContext(CommentsContext);
  const [addedComment, setAddedComment] = useState("");

  const blogId = navigation.getParam("blogId");
  useEffect(() => {
    fetchComments(blogId);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>
        <FlatList
          style={styles.commentsAreaStyle}
          data={state}
          keyExtractor={comment => comment._id}
          renderItem={({ item }) => {
            return (
              <Card>
                <Text style={styles.commentStyle}>{item.content}</Text>
              </Card>
            );
          }}
        ></FlatList>
        <View style={styles.newCommentContainerStyle}>
          <Input
            multiline
            value={addedComment}
            onChangeText={text => setAddedComment(text)}
            inputContainerStyle={styles.inputContainerStyle}
            placeholder=" コメント"
            leftIcon={{ type: "feather", name: "message-square" }}
          />
          <TouchableOpacity
            onPress={() => {
              createComment(addedComment, blogId);
            }}
          >
            <Feather
              style={{
                color: "black"
              }}
              size={30}
              name={"send"}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    padding: 24,
    flex: 1,
    justifyContent: "flex-end"
  },
  header: {
    fontSize: 36,
    marginBottom: 5
  },
  commentsAreaStyle: {
    marginBottom: 5
  },
  commentStyle: {
    fontSize: 15,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 10
  },
  newCommentContainerStyle: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignSelf: "center",
    alignItems: "center",
    width: "95%"
  },
  inputContainerStyle: {
    marginTop: 10,
    marginBottom: 10
  }
});

export default CommentScreen;
