import React from "react";
import LoginCont from "../components/LoginCont.js";
import { KAKAO_AUTH_URL } from "../shared/OAuth.js";

const Login = (props) => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <div>
      <LoginCont onClick={kakaoLogin} />
    </div>
  );
};

export default Login;
