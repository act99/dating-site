const CLIENT_ID = "af4c2105b17debc9c5ba96f70c6ee0b9";
const REDIRECT_URI =
//   "https://skifriend.shop/user/kakao/callback";
  "http://localhost:3000/user/kakao/callback";

// const REDIRECT_URI_PRO =
//   "https://skifriend.shop/user/kakao/callback/properties";
//   "http://localhost:3000/user/kakao/callback/properties";

//닉네임 동의 페이지
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code`;

//성별, 연령 동의 페이지
// export const KAKAO_ADD_PROPERTIES = `https://kauth.kakao.com/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI_PRO}&response_type=code&scope=gender,age_range`;