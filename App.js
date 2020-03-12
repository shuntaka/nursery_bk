import React from "react";
import { StyleSheet, Text, View, KeyboardAvoidingView } from "react-native";
import { createAppContainer } from "react-navigation";
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";
import BlogScreen from "./src/screens/BlogScreen";
import CommentScreen from "./src/screens/CommentScreen";
import ChatLikeCommentScreen from "./src/screens/ChatLikeCommentScreen";
import ScheduleScreen from "./src/screens/ScheduleScreen";
import { Feather } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import { SimpleLineIcons } from "@expo/vector-icons";
import GroupScreen from "./src/screens/GroupScreen";
import AddGroupScreen from "./src/screens/AddGroupScreen";
import GroupPostsScreen from "./src/screens/GroupPostsScreen";
import AddGroupPostScreen from "./src/screens/AddGroupPostScreen";
import GroupPostCommentsScreen from "./src/screens/GroupPostCommentsScreen";
import GuidesScreen from "./src/screens/GuidesScreen";
import FAQScreen from "./src/screens/FAQScreen";
import AddQuestionScreen from "./src/screens/AddQuestionScreen";

import { Provider as ScheduleProvider } from "./src/context/ScheduleContext";
import { Provider as BlogProvider } from "./src/context/BlogContext";
import { Provider as CommentProvider } from "./src/context/CommentContext";
import { Provider as AttendanceProvider } from "./src/context/AttendanceContext";
import { Provider as ScheduleRangeProvider } from "./src/context/ScheduleRangeContext";
import { Provider as LocationProvider } from "./src/context/LocationContext";
import { Provider as GroupProvider } from "./src/context/GroupContext";
import { Provider as GroupPostProvider } from "./src/context/GroupPostContext";
import { Provider as GroupPostCommentsProvider } from "./src/context/GroupPostCommentsContext";
import { Provider as QuestionProvider } from "./src/context/QuestionContext";
import { createStackNavigator, Header } from "react-navigation-stack";
import hoistNonReactStatics from "hoist-non-react-statics";
import { createMaterialTopTabNavigator } from "react-navigation-tabs";

const BlogFlow = createStackNavigator(
  {
    BlogScreen: BlogScreen,
    CommentScreen: {
      screen: ChatLikeCommentScreen,
      navigationOptions: () => ({
        // headerTransparent: true
      })
    },
    initialRouteName: BlogScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 50
      },
      headerForceInset: { top: "never", bottom: "never" }
    }
  }
);

const GuidesFlow = createStackNavigator(
  {
    GuidesScreen: GuidesScreen,
    FAQScreen: FAQScreen,
    AddQuestionScreen: AddQuestionScreen,
    initialRouteName: GuidesScreen
  },

  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 50
      },
      headerForceInset: { top: "never", bottom: "never" }
    }
  }
);

const GroupFlow = createStackNavigator(
  {
    GroupScreen: {
      screen: GroupScreen
    },
    AddGroupScreen: {
      screen: AddGroupScreen
    },
    GroupPostsScreen: {
      screen: GroupPostsScreen
    },
    AddGroupPostScreen: {
      screen: AddGroupPostScreen
    },
    GroupPostCommentsScreen: {
      screen: GroupPostCommentsScreen
    },
    initialRouteName: GroupScreen
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: 50
      },
      headerForceInset: { top: "never", bottom: "never" }
    }
  }
);

const topTabNavigator = createMaterialTopTabNavigator(
  {
    Schedule: {
      screen: ScheduleScreen,
      navigationOptions: {
        tabBarLabel: "Schedule",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Feather
              style={[{ color: tintColor }]}
              size={20}
              name={"calendar"}
            />
          </View>
        )
      }
    },
    Blog: {
      screen: BlogFlow,
      // screen: BlogFlowKeyboardAvoiding,
      navigationOptions: {
        tabBarLabel: "Blog",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Feather style={[{ color: tintColor }]} size={20} name={"edit"} />
          </View>
        )
      }
    },
    Group: {
      screen: GroupFlow,
      navigationOptions: {
        tabBarLabel: "Community",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <SimpleLineIcons
              style={[{ color: tintColor }]}
              size={20}
              name={"people"}
            />
          </View>
        )
      }
    },
    Guides: {
      screen: GuidesFlow,
      navigationOptions: {
        tabBarLabel: "Guides",
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Feather
              style={[{ color: tintColor }]}
              size={20}
              name={"file-text"}
            />
          </View>
        )
      }
    }
  },
  {
    tabBarOptions: {
      showIcon: true,
      upperCaseLabel: false,
      activeTintColor: "#f0edf6",
      inactiveTintColor: "#3e2465",
      tabStyle: {
        width: 100
      },
      labelStyle: { fontSize: 10 },
      iconStyle: {},
      style: { marginTop: 50, backgroundColor: "#288e9e" }
    },
    initialRouteName: "Schedule",
    inactiveColor: "#3e2465",
    activeColor: "#f0edf6",
    barStyle: { backgroundColor: "#288e9e" }
  }
);
const App = createAppContainer(topTabNavigator);

export default () => {
  return (
    <QuestionProvider>
      <GroupPostCommentsProvider>
        <GroupPostProvider>
          <GroupProvider>
            <LocationProvider>
              <ScheduleRangeProvider>
                <ScheduleProvider>
                  <BlogProvider>
                    <CommentProvider>
                      <AttendanceProvider>
                        <App />
                      </AttendanceProvider>
                    </CommentProvider>
                  </BlogProvider>
                </ScheduleProvider>
              </ScheduleRangeProvider>
            </LocationProvider>
          </GroupProvider>
        </GroupPostProvider>
      </GroupPostCommentsProvider>
    </QuestionProvider>
  );
};
