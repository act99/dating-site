// ** 테스트
// const BASE_URL = "http://52.78.96.234:8080";
// const REDIRECT_URI = "http://localhost:3000/user/kakao/callback";
// const WEB_SOCKET = "http://52.78.96.234:8080/ws-stomp";

// ** 배포
const BASE_URL = "https://goonzu.shop";
const REDIRECT_URI =
  "https://chat.d8pzcrluuw660.amplifyapp.com/user/kakao/callback";
const WEB_SOCKET = "https://goonzu.shop/wss-stomp";

// ** ws url
const WS_URL = "ws://goonzu.shop/groupcall";
const WSS_URL = "wss://goonzu.shop/groupcall";

const url = {
  BASE_URL,
  REDIRECT_URI,
  WEB_SOCKET,
  WS_URL,
  WSS_URL,
};

export default url;
