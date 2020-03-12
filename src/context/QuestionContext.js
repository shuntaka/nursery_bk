import createDataContext from "../context/createDataContext";
import axios from "../api/api";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_question":
      return action.payload;
    default:
      return state;
  }
};
const createQuestion = dispatch => async (question, callback) => {
  const response = await axios.post("/questions", {
    question
  });
  if (callback) {
    callback();
  }
};
const fetchQuestion = dispatch => async () => {
  const response = await axios.get("/questions");
  dispatch({ type: "fetch_question", payload: response.data });
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { createQuestion, fetchQuestion },
  //initial state
  []
);
