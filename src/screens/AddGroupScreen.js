import axios from "../api/api";
import React, { useContext, useState } from "react";
import { View, Text, Image, Platform, TouchableOpacity } from "react-native";
import * as ImagePicker from "expo-image-picker";
import {
  Container,
  Content,
  Form,
  Item,
  Label,
  Input,
  Button,
  Icon
} from "native-base";
import FromData from "form-data";
import { Context as GroupContext } from "../context/GroupContext";

const AddGroupScreen = ({ navigation }) => {
  const [groupDetail, setGroupDetail] = useState({
    groupName: "",
    groupImage: ""
  });
  const setGroupName = name => {
    setGroupDetail({ ...groupDetail, groupName: name });
  };
  const setGroupImage = image => {
    setGroupDetail({ ...groupDetail, groupImage: image });
  };
  const { createGroup } = useContext(GroupContext);

  const _pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({});
    if (!result.canceled) {
      setGroupImage(result);
    }
  };

  const createFormData = (groupImage, body) => {
    const data = new FormData();
    data.append("groupImage", {
      name: groupImage.uri.match(/[^\/]*?$/)[0],
      type: groupImage.type,
      uri:
        Platform.OS === "android"
          ? groupImage.uri
          : groupImage.uri.replace("file://", "")
    });
    if (!body === undefined) {
      Object.keys(body).map(key => {
        data.append(key, body[key]);
      });
    }
    return data;
  };

  const { groupName, groupImage } = groupDetail;
  return (
    <Container style={{ padding: 10 }}>
      <Form>
        <Item stackedLabel>
          <Label>コミュニティの名前</Label>
          <Input value={groupName} onChangeText={setGroupName} />
        </Item>
      </Form>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          marginTop: 30
        }}
        onPress={_pickImage}
      >
        {groupImage.uri ? (
          <Image
            style={{ width: 50, height: 50 }}
            source={{ uri: groupImage.uri }}
          />
        ) : (
          <Icon type="Feather" name="image" style={{ width: 50, height: 50 }} />
        )}
        <Text>コミュニティの画像を選ぶ</Text>
      </TouchableOpacity>
      <Button
        block
        light
        style={{ marginTop: 10 }}
        onPress={() => {
          createGroup(groupName, createFormData(groupImage), () => {
            navigation.navigate("GroupScreen");
          });
        }}
      >
        <Text>コミュニティを作成する</Text>
      </Button>
    </Container>
  );
};
export default AddGroupScreen;
