import { createAction, handleActions } from "redux-actions";
import { produce } from "immer";
// import { apis } from "../../shared/api";
// import { deleteCookie, getCookie, setCookie } from "../../shared/Cookie";
// actions
const GET_CHAT = "GET_CHAT";
const SEND_CHAT = "SEND_CHAT";
// action creators

const getChat = createAction(GET_CHAT, (chat) => ({ chat }));
const sendChat = createAction(SEND_CHAT, (chat) => ({ chat }));

// initialState
export const initialState = {
  list: [],
};
const initialMessage = {
  id: 0,
  type: "TALK",
  roomId: 0,
  sender: "",
  message: "",
};

// middleware actions

const getChatDB = () => {
  return function (dispatch, getState, { history }) {};
};

export default handleActions(
  {
    [GET_CHAT]: (state, action) =>
      produce(state, (draft) => {
        draft.list.push(action.payload.chat);
      }),
    [SEND_CHAT]: (state, action) =>
      produce(state, (draft) => {
        console.log(action.payload.chat);
      }),
  },
  initialState
);

const actionCreators = {
  getChat,
};

export { actionCreators };
