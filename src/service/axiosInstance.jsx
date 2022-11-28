import axios from "axios";

const escapedToken = JSON.parse(localStorage.getItem("persist:root"))?.token;
const token = escapedToken && JSON.parse(escapedToken);

export const axiosWithToken = axios.create({
  baseURL: "https://14189.fullstack.clarusway.com/",
});

axiosWithToken.interceptors.request.use(function (config) {
  console.log("interceptor is running");
  if (!config.headers["Authorization"]) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});
