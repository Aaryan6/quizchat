import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.NEXT_PUBLIC_QUIZ_API,
  headers: {
    "Content-Type": "application/json",
  },
});

export default apiService;
