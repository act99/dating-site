import React from "react";
import { KAKAO_AUTH_URL } from "../shared/OAuth.js";

const Login = (props) => {
  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
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
    </div>
  );
};

export default Login;
