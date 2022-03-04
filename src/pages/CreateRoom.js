import styled from "@emotion/styled";
import { Grid } from "@mui/material";
import React from "react";

const CreateRoom = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <FirstWrap>썸네일 이미지</FirstWrap>
      </Grid>
      <Grid item xs={8}>
        <FirstWrap>xs=4</FirstWrap>
      </Grid>
      <Grid item xs={4}>
        <SecondWrap>xs=4</SecondWrap>
      </Grid>
      <Grid item xs={8}>
        <SecondWrap>xs=8</SecondWrap>
      </Grid>
      <Grid item xs={12}>
        <SecondWrap></SecondWrap>
      </Grid>
    </Grid>
  );
};

const FirstWrap = styled.div`
  width: 100%;
  height: 20rem;
  background-color: aliceblue;
`;

const SecondWrap = styled.div`
  width: 100%;
  height: 15rem;
  background-color: aliceblue;
`;

const ThirdWrap = styled.div`
  width: 100%;
  height: 15rem;
  background-color: aliceblue;
`;

// const Item = styled(Paper)(({ theme }) => ({
//     backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
//     ...theme.typography.body2,
//     padding: theme.spacing(1),
//     textAlign: 'center',
//     color: theme.palette.text.secondary,
//   }));

export default CreateRoom;
