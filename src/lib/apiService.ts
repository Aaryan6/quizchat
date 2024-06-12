import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:9025/",
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiService;
