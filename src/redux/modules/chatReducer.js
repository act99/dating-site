// import { createAction, handleActions } from "redux-actions";
// import { produce } from "immer";
// import { apis } from "../../shared/api";
// import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
// // actions
// const GET_CHAT = "GET_CHAT";
// const SEND_CHAT = "SEND_CHAT";
// // action creators

// const login = createAction(LOG_IN, (user) => ({ user })); // 로그인 - user정보, 로그인상태 변경
// const logout = createAction(LOG_OUT, (user) => ({ user }));
// // initialState
// export const initialState = {
//   userId: null,
//   token: null,
//   userInfo: null, // user정보 - id, username, email, profile
//   isValidEmailMultiple: false, // email 중복체크 결과
//   loginError: null, // 로그인시 서버에러
//   authNumber: "", // 비밀번호 찾기시 인증번호
//   is_login: false, // 로그인 상태
// };

// // middleware actions
// // reducer
// // draft = state의 복제품 (불변성 유지)

// const kakaoLoginDB = (code) => {
//   return async function (dispatch, getState, { history }) {
//     await apis.kakaoLogin(code).then((res) => {
//       dispatch(login({ ...res.data }));
//       // console.log(res);
//       // console.log(res.headers);
//       setCookie("token", res.headers.authorization);
//       localStorage.setItem("userId", res.data);
//       history.replace("/");
//     });
//   };
// };

// export default handleActions(
//   {
//     [LOG_IN]: (state, action) =>
//       produce(state, (draft) => {
//         draft.userInfo = action.payload; //유저정보
//         draft.is_login = true; //로그인상태
//         draft.token = getCookie("token");
//         draft.userId = localStorage.getItem("userId");
//         // draft.token = getCookie()
//       }),
//     [LOG_OUT]: (state, action) =>
//       produce(state, (draft) => {
//         draft.userInfo = null;
//         draft.is_login = false;
//         deleteCookie("token");
//         localStorage.removeItem("userId");
//       }),
//     // produce(state, (draft)) => {
//     // }
//   },
//   initialState
// );

// // action creator export

// const actionCreators = {
//   login,
//   kakaoLoginDB,
//   logout,
// };

// export { actionCreators };
