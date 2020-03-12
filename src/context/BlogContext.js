import createDataContext from "./createDataContext";
import axios from "../api/api";

const reducer = (state, action) => {
  switch (action.type) {
    // case "update_blogs":
    //   action.payload;
    case "fetch_blogs":
      return action.payload;
    default:
      return state;
  }
};
const fetchBlogs = dispatch => async () => {
  try {
    const response = await axios.get("/blogs");

    const blogs = response.data;
    dispatch({ type: "fetch_blogs", payload: blogs });
  } catch (err) {
    console.log(err);
  }
};
const updateBlogs = dispatch => blogs => {
  dispatch({ type: "update_blogs", payload: blogs });
};

export const { Context, Provider } = createDataContext(
  reducer,
  {
    fetchBlogs,
    updateBlogs
  },
  []
);
