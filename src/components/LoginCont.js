import React, { useEffect, history } from "react";
// import LoginCont from "../components/LoginCont.js";
// import { KAKAO_API_URL } from "../shared/OAuth";

const LoginCont = (props) => {
  console.log(props.onClick);
  return (
    <div>
      <button
        className="login_btn login_kakao"
        onClick={props.onClick}
        //   onClick={() => {
        //     window.location.href = KAKAO_API_URL;
        //   }}
      >
        {/* <img src={kakaologo} alt="카카오 로고" /> */}
        <span className="ml20">카카오 로그인</span>
      </button>
    </div>
  );
};

export default LoginCont;
