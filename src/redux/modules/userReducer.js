import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { apis } from "../../shared/api";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
// actions
const LOG_IN = "LOG_IN";
const LOG_OUT = "LOG_OUT";
// action creators

const login = createAction(LOG_IN, (user) => ({ user })); // 로그인 - user정보, 로그인상태 변경
const logout = createAction(LOG_OUT, (user) => ({ user }));
// initialState
export const initialState = {
  user: {
    ageRange: null,
    career: null,
    gender: null,
    id: 0,
    nickname: "",
    phoneNum: null,
    profileImg: "",
    selfIntro: null,
    username: "",
    is_login: false,
    token: null,
  },

  // userId: null,
  // token: null,
  // userInfo: null, // user정보 - id, username, email, profile
  // isValidEmailMultiple: false, // email 중복체크 결과
  // loginError: null, // 로그인시 서버에러
  // authNumber: "", // 비밀번호 찾기시 인증번호
  // is_login: false, // 로그인 상태
};

// middleware actions
// reducer
// draft = state의 복제품 (불변성 유지)

const userinfoDB = () => {
  return function (dispatch, getState, { history }) {
    apis
      .getUserInfo()
      .then((res) => {
        console.log(res.data);
        dispatch(login({ ...res.data, is_login: true }));
      })
      .catch((error) => console.log(error));
  };
};

const kakaoLoginDB = (code) => {
  return async function (dispatch, getState, { history }) {
    await apis
      .kakaoLogin(code)
      .then((res) => {
        console.log(res);
        dispatch(login({ ...res.data }));
        // console.log(res);
        // console.log(res.headers);

        setCookie("token", res.headers.authorization);
        localStorage.setItem("userId", res.data);
        history.replace("/");
        history.go(0);
      })
      .catch((error) => console.log(error));
  };
};

export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload);
        draft.user = { ...action.payload.user }; //유저정보
        draft.user.is_login = true; //로그인상태
        draft.user.token = getCookie("token");
        // draft.token = getCookie()
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        draft.user = {
          ageRange: null,
          career: null,
          gender: null,
          id: 0,
          nickname: "",
          phoneNum: null,
          profileImg: "",
          selfIntro: null,
          username: "",
          is_login: false,
          token: null,
        };
        deleteCookie("token");
        localStorage.removeItem("userId");
      }),
    // produce(state, (draft)) => {
    // }
  },
  initialState
);

// action creator export

const actionCreators = {
  login,
  kakaoLoginDB,
  logout,
  userinfoDB,
};

export { actionCreators };
