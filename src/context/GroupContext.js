import createDataContext from "./createDataContext";
import axios from "../api/api";

const reducer = (state, action) => {
  switch (action.type) {
    // case "create_group":
    //   return [...state, action.payload];
    case "fetch_groups":
      return action.payload;
    default:
      return state;
  }
};
const createGroup = dispatch => async (groupName, imageData, callback) => {
  console.log(`groupName is ${groupName}`);
  const createGroupResponse = await axios.post("/groups", {
    groupName
  });

  const group = createGroupResponse.data;
  const uploadImageResponse = await axios.post(
    `/groups/${group._id}/groupImages`,
    imageData
  );
  console.log(uploadImageResponse.data);
  callback();
};
const fetchGroups = dispatch => async () => {
  const response = await axios.get("/groups");
  const groups = response.data;
  dispatch({ type: "fetch_groups", payload: groups });
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  // actions
  { createGroup, fetchGroups },
  //initial state
  []
);
