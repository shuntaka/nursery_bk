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
import { Context as GroupPostCommentsContext } from "../context/GroupPostCommentsContext";
import { FlatList } from "react-native";
import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Header } from "react-navigation-stack";

const groupPostCommentsScreen = ({ navigation }) => {
  const { state, createGroupPostComment, fetchGroupPostComments } = useContext(
    GroupPostCommentsContext
  );
  const [addedComment, setAddedComment] = useState("");

  const groupPostId = navigation.getParam("groupPostId");
  useEffect(() => {
    fetchGroupPostComments(groupPostId);
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
    createGroupPostComment(groupPostId, commentArray[0].text);
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
export default groupPostCommentsScreen;
