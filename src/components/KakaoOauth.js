import React, { useEffect } from "react";
import { history } from "../redux/store";
import { apis, axiosInstance } from "../shared/api";
import { setCookie } from "../shared/Cookie";

const KakaoOauth = () => {
  // 인가코드
  let code = new URL(window.location.href).searchParams.get("code");

  useEffect(() => {
    apis
      .kakaoLogin(code)
      .then((response) => {
        // console.log(response);
        const address = response.data.address;
        setCookie("userId", response.data.userId);
        // let profileImg = encodeURIComponent(response.data.profileImg);
        // setCookie("userImg", profileImg);
        let name = encodeURIComponent(response.data.nickName);
        setCookie("userName", name);
        setCookie("userToken", `Bearer ${response.data.token}`);
        // console.log(address);
        if (address !== null) {
          history.push("/");
        } else {
          history.push("/login");
        }
      })
      .catch((err) => {
        console.log("에러발생", err);
      });
  }, []);

  return (
      <p>테스트 로딩중</p>
  );
};

export default KakaoOauth;
