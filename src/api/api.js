import axios from "axios";

const url = "http://localhost:3000";

const instance = axios.create({
  baseURL: url
});

export { url as baseURL };
export default instance;
