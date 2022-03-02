import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/userReducer";
import { useDispatch } from "react-redux";
const KakaoOauth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    dispatch(userActions.kakaoLoginDB(code));
  }, []);

  return <p>테스트 로딩중</p>;
};

export default KakaoOauth;
