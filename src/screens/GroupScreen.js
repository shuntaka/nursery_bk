import React, { useEffect, useContext } from "react";
// import { Card, Image, Button } from "react-native-elements";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Button,
  Icon
} from "native-base";
import { View, StyleSheet, Image } from "react-native";
import { SafeAreaView } from "react-navigation";
import {
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native-gesture-handler";
import { Context as GroupContext } from "../context/GroupContext";
import { baseURL } from "../api/api";

const GroupScreen = ({ navigation }) => {
  //  return <Text>GroupScreen</Text>;
  const { state, fetchGroups } = useContext(GroupContext);
  useEffect(() => {
    fetchGroups();
    const listener = navigation.addListener("didFocus", () => {
      fetchGroups();
    });
    return () => {
      listener.remove();
    };
  }, []);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Container>
        <Content>
          <Card>
            <CardItem header>
              <Text>Community</Text>
            </CardItem>
            <CardItem>
              <Button
                iconLeft
                rounded
                light
                onPress={() => {
                  navigation.navigate("AddGroupScreen");
                }}
              >
                <Icon
                  type="AntDesign"
                  name="pluscircle"
                  style={{ fontSize: 20 }}
                />
                <Text>作成</Text>
              </Button>
            </CardItem>
            <CardItem>
              <FlatList
                horizontal
                data={state}
                keyExtractor={group => {
                  return group.groupName;
                }}
                renderItem={({ item }) => {
                  return (
                    <TouchableOpacity
                      style={styles.groupContainer}
                      onPress={() => {
                        navigation.navigate("GroupPostsScreen", {
                          groupId: item._id
                        });
                      }}
                    >
                      {item.hasGroupImage ? (
                        <Image
                          source={{
                            uri: `${baseURL}/groups/${item._id}/groupImages`
                          }}
                          style={{ width: 100, height: 100 }}
                        />
                      ) : (
                        <View
                          style={{
                            width: 100,
                            height: 100,
                            backgroundColor: "grey"
                          }}
                        />
                      )}
                      <Text>{item.groupName}</Text>
                    </TouchableOpacity>
                  );
                }}
              />
            </CardItem>
          </Card>
        </Content>
      </Container>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  groupContainer: {
    margin: 10,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default GroupScreen;
