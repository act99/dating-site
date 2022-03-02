import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { apis } from "../shared/api";
import { setCookie } from "../shared/Cookie";

const KakaoOauth = () => {
  const history = useHistory();
  // 인가코드

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async () => {
      await apis.kakaoLogin(code).then((res) => {
        setCookie("token", res.headers.authorization);
        localStorage.setItem("userId", res.data);
        history.replace("/");
      });
    };
    kakaoLogin();
  }, []);

  return <p>테스트 로딩중</p>;
};

export default KakaoOauth;
