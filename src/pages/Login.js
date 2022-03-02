import React from "react";
import { useDispatch } from "react-redux";
import { KAKAO_AUTH_URL } from "../shared/OAuth.js";
import { actionCreators as userActions } from "../redux/modules/userReducer.js";
import { useHistory } from "react-router-dom";
const Login = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };
  const logout = () => {
    dispatch(userActions.logout());
    history.replace("/");
    history.go(0);
  };

  return (
    <div>
      <div>
        <a id="custom-login-btn" onClick={kakaoLogin}>
          <img
            src="//k.kakaocdn.net/14/dn/btqCn0WEmI3/nijroPfbpCa4at5EIsjyf0/o.jpg"
            width="222"
          />
        </a>
      </div>
      <div>
        <button onClick={logout}>로그아웃</button>
      </div>
    </div>
  );
};

export default Login;
