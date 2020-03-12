import createDataContext from "./createDataContext";
import axios from "../api/api";

const reducer = (state, action) => {
  switch (action.type) {
    case "create_group_post_comment":
      return [...state, action.payload];
    case "fetch_group_post_comments":
      return action.payload;
    default:
      return state;
  }
};
const createGroupPostComment = dispatch => async (groupPostId, content) => {
  const response = await axios.post(`/groupPostComment`, {
    groupPostId,
    content
  });
  const groupPostCommentRaw = response.data;
  const groupPostComment = {
    ...groupPostCommentRaw,
    date: new Date(groupPostCommentRaw.date)
  };
  dispatch({ type: "create_group_post_comment", payload: groupPostComment });
};
const fetchGroupPostComments = dispatch => async groupPostId => {
  const response = await axios.get(
    `/groupPostComment?groupPostId=${groupPostId}`
  );
  const groupPostCommentsRaw = response.data;
  const groupPostComments = groupPostCommentsRaw.map(comment => ({
    ...comment,
    date: new Date(comment.date)
  }));
  dispatch({
    type: "fetch_group_post_comments",
    payload: groupPostComments
  });
};

export const { Context, Provider } = createDataContext(
  //reducer
  reducer,
  //actions
  { createGroupPostComment, fetchGroupPostComments },
  //initial state
  []
);
