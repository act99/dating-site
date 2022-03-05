import axios from "axios";
import { actionCreators as userActions } from "../redux/modules/userReducer";
import url from "./url";
const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];
const api = axios.create({
  baseURL: url.BASE_URL,
  headers: {
    "content-type": "application/json;charset=UTF-8",
    accept: "application/json",
    Authorization: token,
  },
});

api.interceptors.request.use(function (config) {
  const accessToken = document.cookie.split("=")[1];
  config.headers.common["Authorization"] = `${accessToken}`;
  return config;
});

export const apis = {
  // ** 카카오 로그인
  kakaoLogin: (code) => api.get(`/user/kakao/callback?code=${code}`),
  getUserInfo: () => api.post(`/chat/user`),
  // ** 영상채팅
  getRooms: () => api.get(`/chat/rooms`),
  createRooms: (name) => api.post(`/chat/room`, name),
  // enterRoom: (roomId) => api.get(`/room/enter/${roomId}`),
};
