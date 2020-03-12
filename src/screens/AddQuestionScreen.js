import React, { useState, useContext } from "react";
import { View } from "react-native";
import { Container, Content, Button, Text, Icon, Textarea } from "native-base";

import { Context as QuestionContext } from "../context/QuestionContext";

const AddQuestionScreen = ({ navigation }) => {
  const [state, setState] = useState("");
  const { createQuestion } = useContext(QuestionContext);
  return (
    <Container>
      <Content padder>
        <Textarea
          rowSpan={5}
          placeholder="write some text..."
          bordered
          value={state}
          onChangeText={setState}
        ></Textarea>
        <Button
          light
          block
          style={{ marginTop: 20 }}
          onPress={() => {
            createQuestion(state, () => {
              navigation.navigate("FAQScreen");
            });
          }}
        >
          <Icon type="MaterialCommunityIcons" name="send" />
          <Text>送る</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default AddQuestionScreen;
