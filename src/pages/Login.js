import React from "react";
import LoginCont from "../components/LoginCont.js";
import { KAKAO_AUTH_URL } from "../shared/OAuth.js";

const Login = (props) => {
    const clickSocial = () => {
        return (window.location.href = KAKAO_AUTH_URL);
      };
    
  return (
    <div>
      <LoginCont onClick={clickSocial} />
    </div>
  );
};

export default Login;