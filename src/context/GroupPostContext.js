import createDataContext from "./createDataContext";
import axios from "../api/api";
import { createFormDataWithImage } from "../helper/helper";

const reducer = (state, action) => {
  switch (action.type) {
    case "fetch_group_posts":
      return action.payload;
    default:
      state;
  }
};
const create = dispatch => async (groupId, postDetail, callback) => {
  const { content, image } = postDetail;
  const createPostResponse = await axios.post(`/groups/${groupId}/posts`, {
    content
  });
  const postId = createPostResponse.data._id;
  const data = createFormDataWithImage("image", image);
  const uploadImageResponse = await axios.post(
    `/groups/${groupId}/posts/${postId}/images`,
    data
  );
  callback();
};
const fetchGroupPosts = dispatch => async groupId => {
  const response = await axios.get(`/groupPosts?groupId=${groupId}`);
  const groupPostsRow = response.data;
  const groupPosts = groupPostsRow.map(groupPost => {
    return {
      ...groupPost,
      date: new Date(groupPost.date)
    };
  });

  groupPosts.sort((a, b) => a.date - b.date);
  dispatch({ type: "fetch_group_posts", payload: groupPosts });
};

export const { Context, Provider } = createDataContext(
  // reducer
  reducer,
  // actions
  { create, fetchGroupPosts },
  // initial state
  []
);
