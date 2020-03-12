import React, { useState, useContext } from "react";
import { View, Image } from "react-native";
import {
  Container,
  Header,
  Content,
  Form,
  Textarea,
  Button,
  Icon,
  Text
} from "native-base";
import * as ImagePicker from "expo-image-picker";
import { Context as GroupPostContext } from "../context/GroupPostContext";

const AddGroupPostScreen = ({ navigation }) => {
  const groupId = navigation.getParam("groupId");
  const [postDetail, setPostDetail] = useState({
    content: "",
    image: {}
  });
  const setContent = content => {
    setPostDetail({ ...postDetail, content });
  };
  const setImage = image => {
    setPostDetail({ ...postDetail, image });
  };
  const { create } = useContext(GroupPostContext);

  const _pickImage = async () => {
    const response = await ImagePicker.launchImageLibraryAsync({});
    if (!response.canceled) {
      setImage(response);
    }
  };
  const { content, image } = postDetail;
  return (
    <Container>
      <Content padder>
        <Form>
          <Textarea
            rowSpan={5}
            bordered
            placeholder="write some text..."
            value={content}
            onChangeText={setContent}
          />
        </Form>
        {image.uri ? (
          <Image
            source={{ uri: image.uri }}
            style={{ width: "100%", height: "100%", marginTop: 20 }}
          />
        ) : (
          <View />
        )}
        <Button
          iconRight
          transparent
          style={{ marginTop: 10 }}
          onPress={_pickImage}
        >
          <Text>写真を選択</Text>
          <Icon type="Feather" name="image" />
        </Button>
        <Button
          block
          light
          style={{ margin: 10 }}
          onPress={() => {
            create(groupId, postDetail, () => {
              navigation.navigate("GroupPostsScreen");
            });
          }}
        >
          <Text>投稿する</Text>
        </Button>
      </Content>
    </Container>
  );
};

export default AddGroupPostScreen;
