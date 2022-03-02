import React, { useEffect } from "react";
import { history } from "../redux/store";
import { apis, axiosInstance } from "../shared/api";
import { setCookie } from "../shared/Cookie";
import { KAKAO_AUTH_URL } from "../shared/OAuth";

const KakaoOauth = () => {
  // 인가코드

  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    const kakaoLogin = async () => {
      await apis.kakaoLogin(code).then((res) => {
        setCookie("token", res.headers.authorization);
        localStorage.setItem("userId", res.data);
        window.location.href = KAKAO_AUTH_URL;
      });
    };
    kakaoLogin();
  }, []);

  // useEffect(() => {
  //   let code = new URL(window.location.href).searchParams.get("code");
  //   const kakaoLogin = async () => {
  //     await apis
  //       .kakaoLogin(code)
  //       .then((res) => {
  //         console.log(res);
  //         setCookie("token", res.headers.authorization);
  //         localStorage.setItem("userId", res.data);
  //         history.push("/");
  //       })
  //       .catch((error) => console.log(error));
  //   };
  //   kakaoLogin();

  // apis
  //   .kakaoLogin(code)
  //   .then((response) => {
  //     console.log(response.data);
  //     const address = response.data.address;
  //     console.log(response);
  //     setCookie("userId", response.data.userId);
  //     // let profileImg = encodeURIComponent(response.data.profileImg);
  //     // setCookie("userImg", profileImg);
  //     let name = encodeURIComponent(response.data.nickName);
  //     setCookie("userName", name);
  //     setCookie("userToken", `Bearer ${response.data.token}`);
  //     // console.log(address);
  //     if (address !== null) {
  //       history.push("/");
  //     } else {
  //       history.push("/login");
  //     }
  //   })
  //   .catch((err) => {
  //     console.log("에러발생", err);
  //   });
  // }, []);

  return <p>테스트 로딩중</p>;
};

export default KakaoOauth;
