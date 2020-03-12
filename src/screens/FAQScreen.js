import React, { useEffect, useContext } from "react";
import { View, FlatList } from "react-native";
import {
  Container,
  Content,
  Body,
  Card,
  CardItem,
  Button,
  Text,
  Icon
} from "native-base";
import { Context as QuestionContext } from "../context/QuestionContext";

const FAQScreen = ({ navigation }) => {
  const { state, fetchQuestion } = useContext(QuestionContext);
  console.log(state);
  useEffect(() => {
    fetchQuestion();
    const listener = navigation.addListener("didFocus", () => {
      fetchQuestion();
    });
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <View style={{ flex: 1, padding: 10 }}>
      <Button
        block
        light
        onPress={() => {
          navigation.navigate("AddQuestionScreen");
        }}
      >
        <Icon type="AntDesign" name="form" />
        <Text>問い合わせをする</Text>
      </Button>
      <FlatList
        data={state}
        keyExtractor={question => question._id}
        renderItem={({ item }) => {
          return (
            <Card>
              <CardItem header>
                <Text>{item.question}</Text>
              </CardItem>
              <CardItem>
                <Text>{item.answer}</Text>
              </CardItem>
            </Card>
          );
        }}
      ></FlatList>
    </View>
  );
};

export default FAQScreen;
