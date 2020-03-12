import createDataContext from "./createDataContext";
import axios from "../api/api";

const reducer = (state, action) => {
  switch (action.type) {
    case "create_comment":
      return [...state, action.payload];
    case "fetch_comments":
      return action.payload;
    default:
      return state;
  }
};
const createComment = dispatch => async (commentContent, blogId) => {
  try {
    const response = await axios.post("/comments", {
      content: commentContent,

      blog: blogId
    });
    const comment = response.data;
    dispatch({ type: "create_comment", payload: comment });

    // const _fetchComments = fetchComments(dispatch);
    // _fetchComments(blogId);
  } catch (err) {
    console.log(err);
  }
};
const fetchComments = dispatch => async blogId => {
  try {
    const response = await axios.get("/comments", {
      params: { blogId: blogId }
    });

    const comments = response.data;
    dispatch({ type: "fetch_comments", payload: comments });
  } catch (err) {
    console.log(err);
  }
};

export const { Context, Provider } = createDataContext(
  reducer,
  { createComment, fetchComments },
  []
);
