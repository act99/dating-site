import axios from "axios";

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const api = axios.create({
  // 실제 베이스 유알엘
  // 강욱님
  // baseURL: "https://3.38.252.235:8080",
  // 건욱님
  baseURL: "http://52.78.96.234:8080",
  // 건욱님
  // baseURL: "https://goonzu.shop",
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    token: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  kakaoLogin: (code) => api.get(`/user/kakao/callback?code=${code}`),
};
