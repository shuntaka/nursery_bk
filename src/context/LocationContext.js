import createDataContext from "./createDataContext";
import { AsyncStorage } from "react-native";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_location":
      return action.payload;
    case "update_location":
      return action.payload;
    default:
      return state;
  }
};

const fetchLocation = dispatch => async () => {
  try {
    let location = await AsyncStorage.getItem("location");
    if (location !== null) {
      dispatch({ type: "fetch_location", payload: location });
    } else {
      await AsyncStorage.setItem("location", "musashino");
      location = "musashino";
      dispatch({ type: "fetch_location", payload: location });
    }
  } catch (err) {
    console.log(err);
  }
};
const updateLocation = dispatch => async location => {
  try {
    await AsyncStorage.setItem("location", location);
    dispatch({ type: "update_location", payload: location });
  } catch (err) {
    console.log(err);
  }
};

export const { Provider, Context } = createDataContext(
  //reducer
  reducer,
  //actions
  { updateLocation, fetchLocation },
  //initial state
  "musashino"
);
