import React, { useEffect } from "react";
import { actionCreators as userActions } from "../redux/modules/userReducer";
import { useDispatch } from "react-redux";
import styled from "@emotion/styled";
import LinearProgress from "@mui/material/LinearProgress";
import { Stack } from "@mui/material";

const KakaoOauth = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    let code = new URL(window.location.href).searchParams.get("code");
    dispatch(userActions.kakaoLoginDB(code));
  }, []);

  return (
    <Wrap>
      <Content>로딩중입니다... 잠시만 기다려주세요 :)</Content>
      <Stack sx={{ width: "50%", color: "grey.500" }} spacing={2}>
        <LinearProgress color="secondary" />
      </Stack>
    </Wrap>
  );
};

const Wrap = styled.div`
  width: 100%;
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Content = styled.h3`
  font-size: large;
  margin-bottom: 10vh;
`;

export default KakaoOauth;
