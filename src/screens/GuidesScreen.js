import React, { useState } from "react";
import { View } from "react-native";
import {
  Container,
  Header,
  Content,
  Segment,
  List,
  ListItem,
  Card,
  Text,
  CardItem,
  Body,
  Icon,
  Button
} from "native-base";
import { State } from "react-native-gesture-handler";

const descriptions = {
  musashino: {
    who: "全社員(子供は原則小学生まで)",
    place: "7号館2階(旧多目的室)",
    procedure:
      "上長了解のもと、利用当日に「武蔵野ロケ子連れ出勤トライアル同意書」を提出",
    time: "平日 9:00 - 18:00",
    network: "D-net, Wi-Fiテザリング",
    car: "NW総研企画へ事前申請(要上長承認)が必要　(1日最大10台、先着順)",
    info:
      "お子様の安全確保ならびに面倒見に関しては、原則社員(保護者)の方の自己責任とします。お子様の体調不良の場合、ご遠慮下さい。"
  },
  yokosuka: {
    who: "3総研社員",
    place: "2F図書館内 技間スペース",
    procedure: "上長了解のもと、利用当日に書類申請、利用予約は不要",
    time: "平日 9:00 - 17:30",
    network: "D-net, Wi-Fiテザリング",
    car: "NW総研企画へ事前申請(要上長承認)が必要　(1日最大10台、先着順)",
    info:
      "お子様の安全確保ならびに面倒見に関しては、原則社員(保護者)の方の自己責任とします。お子様の体調不良の場合、ご遠慮下さい。"
  },
  atsugi: {
    who: "3総研社員・知財センタ社員・派遣社員と小学生までの子供",
    place: "2号館2階 2-205S",
    procedure:
      "上長了解のもと、利用当日に「武蔵野ロケ子連れ出勤トライアル同意書」を提出",
    time: "平日 9:00 - 18:00",
    network: "D-net, Wi-Fiテザリング",
    car: "NW総研企画へ事前申請(要上長承認)が必要　(1日最大10台、先着順)",
    info:
      "毎週水曜日9:30-17:00は、みまもりスタッフが常駐しています。書類申請により当日の利用も可能です。時間外利用はご相談ください。"
  }
};

const GuidesScreen = ({ navigation }) => {
  const [state, setState] = useState({
    location: "musashino"
  });
  const description = descriptions[state.location];
  return (
    <Container>
      <Segment>
        <Button
          first
          active={state.location === "musashino"}
          onPress={() => {
            setState({
              location: "musashino"
            });
          }}
        >
          <Text>武蔵野</Text>
        </Button>
        <Button
          active={state.location === "yokosuka"}
          onPress={() => {
            setState({
              location: "yokosuka"
            });
          }}
        >
          <Text>横須賀</Text>
        </Button>
        <Button
          active={state.location === "atsugi"}
          last
          onPress={() => {
            setState({
              location: "atsugi"
            });
          }}
        >
          <Text>厚木</Text>
        </Button>
      </Segment>
      <Content padder>
        <Button
          iconLeft
          light
          block
          onPress={() => {
            navigation.navigate("FAQScreen");
          }}
        >
          <Icon type="MaterialCommunityIcons" name="comment-question-outline" />
          <Text>FAQ</Text>
        </Button>
        <Card>
          <CardItem header>
            <Icon type="MaterialCommunityIcons" name="account-child" />
            <Text>対象</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description.who}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Icon type="MaterialIcons" name="room" />
            <Text>場所</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description.place}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Icon type="MaterialCommunityIcons" name="file-document-outline" />
            <Text>利用申請</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description.procedure}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Icon type="FontAwesome" name="clock-o" />
            <Text>利用時間</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description.time}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Icon type="MaterialCommunityIcons" name="web" />
            <Text>ネット環境</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description.network}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Icon type="MaterialCommunityIcons" name="car-side" />
            <Text>車通勤</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description.car}</Text>
            </Body>
          </CardItem>
        </Card>
        <Card>
          <CardItem header>
            <Icon type="MaterialCommunityIcons" name="information-outline" />
            <Text>その他</Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>{description.info}</Text>
            </Body>
          </CardItem>
        </Card>
      </Content>
    </Container>
  );
};

export default GuidesScreen;
