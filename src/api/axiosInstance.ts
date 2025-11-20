import axios from "axios";

export const api = axios.create({
  baseURL: "http://3.35.164.184:8888",
  timeout: 5000,
});
