import { Grid, Paper, Typography } from "@mui/material";
import React, { useContext } from "react";
// import { Grid, Typography, Paper, makeStyles } from '@material-ui/core';

import { SocketContext } from "../Context";
import useStyle from "../styles/chattingStyle";

const VideoPlayer = (props) => {
  const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
    props;

  //   const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
  // useContext(SocketContext);
  const classes = useStyle.videoStyle();

  return (
    <Grid container className={classes.gridContainer}>
      {stream && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {name || "Name"}
            </Typography>
            <video
              playsInline
              muted
              ref={myVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
      {callAccepted && !callEnded && (
        <Paper className={classes.paper}>
          <Grid item xs={12} md={6}>
            <Typography variant="h5" gutterBottom>
              {call.name || "Name"}
            </Typography>
            <video
              playsInline
              ref={userVideo}
              autoPlay
              className={classes.video}
            />
          </Grid>
        </Paper>
      )}
    </Grid>
  );
};

export default VideoPlayer;
