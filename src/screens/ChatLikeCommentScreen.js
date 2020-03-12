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

import { GiftedChat } from "react-native-gifted-chat";
import { Card, Input } from "react-native-elements";
import { Context as CommentsContext } from "../context/CommentContext";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "react-navigation-stack";

const ChatLikeCommentScreen = ({ navigation }) => {
  const { state, createComment, fetchComments } = useContext(CommentsContext);
  const [addedComment, setAddedComment] = useState("");

  const blogId = navigation.getParam("blogId");
  useEffect(() => {
    fetchComments(blogId);
  }, []);

  const messages = state.map(comment => ({
    _id: comment._id,
    text: comment.content,
    createdAt: comment.date,
    user: {
      _id: 1
    }
  }));

  const onSendHandler = commentArray => {
    createComment(commentArray[0].text, blogId);
  };
  return (
    <View style={{ flex: 1 }}>
      {}
      <GiftedChat
        isKeyboardInternallyHandled={true}
        inverted={false}
        messages={messages}
        onSend={onSendHandler}
      />
      {Platform.OS === "android" && (
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={Header.HEIGHT + 64}
        />
      )}
    </View>
  );
};
export default ChatLikeCommentScreen;
