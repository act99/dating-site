import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
import axios from "axios";
import { apis } from "../../shared/api";

// actions
const LOG_OUT = "LOG_OUT";
const GET_USER = "GET_USER";
const SET_USER = "SET_USER";
const USERINFO = "USERINFO";
const LOG_IN = "LOG_IN";
// action creators

const login = createAction(LOG_IN, (user) => ({ user })); // 로그인 - user정보, 로그인상태 변경

const logOut = createAction(LOG_OUT, (user) => ({ user }));
const getUser = createAction(GET_USER, (user) => ({ user }));
const setUser = createAction(SET_USER, (user) => ({ user }));
const userInfo = createAction(SET_USER, (user) => ({ user }));

// initialState
export const initialState = {
  userInfo: null, // user정보 - id, username, email, profile
  isValidEmailMultiple: false, // email 중복체크 결과
  loginError: null, // 로그인시 서버에러
  authNumber: "", // 비밀번호 찾기시 인증번호
  is_login: false, // 로그인 상태
};

const loginByKakao =
  (data) =>
  async (dispatch, getState, { history }) => {
    try {
      // 카카오 로그인으로 받아온 토큰으로 서버에서 jwt 토근을 받아옴
      const res = await apis.loginByKakao(data);

      const token = res.data.token;
      const username = res.data.username;
      const userId = res.data.userid;

      // 받아온정보 쿠키저장
      setCookie("access-token", token);
      setCookie("username", username);
      setCookie("userId", userId);

      // 헤더에 토큰 저장
      axios.defaults.headers.common["token"] = `${token}`;

      // 토큰으로 유저정보 받아옴
      dispatch(fetchUserProfile(1));
    } catch (error) {
      console.error(error);
      // dispatch(setLoginError(error.response.data.errorMessage));
    }
  };

const fetchUserProfile =
  (type = 0) =>
  async (dispatch, getState, { history }) => {
    try {
      const res = await apis.getUserProfile();
      dispatch(login(res.data));
      // 헤더에 토큰으로 유저정보 가져오는 로직
      // 로그인 유지와 로그인에서 사용

      // 첫 로그인시에 페이지이동 하기 위해 type으로 분기, type=0은 로그인 유지이므로 페이지이동 x
      if (type === 1) {
        history.push("/chat");
      }
    } catch (error) {
      console.error(error);
    }
  };

// middleware actions
// reducer
// draft = state의 복제품 (불변성 유지)
export default handleActions(
  {
    [LOG_IN]: (state, action) =>
      produce(state, (draft) => {
        draft.userInfo = action.payload; //유저정보
        draft.is_login = true; //로그인상태
      }),
    // produce(state, (draft)) => {
    // }
    [SET_USER]: (state, action) =>
      produce(state, (draft) => {
        // setCookie("is_login", "success");
        draft.token = action.payload.user.token;
        draft.userinfo = {
          email: action.payload.user.email,
          nickname: action.payload.user.nickname,
        };
      }),
    [LOG_OUT]: (state, action) =>
      produce(state, (draft) => {
        // deleteCookie("is_login");
        draft.userinfo = null;
        draft.token = null;
      }),
    [GET_USER]: (state, action) => produce(state, (draft) => {}),
    [USERINFO]: (state, action) =>
      produce(state, (draft) => {
        draft.user = action.payload.user;
        draft.username = action.payload.username;
      }),
  },
  initialState
);

// action creator export

const actionCreators = {
  logOut,
  getUser,
  loginByKakao,
};

export { actionCreators };
