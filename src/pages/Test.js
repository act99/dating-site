import React from "react";
import styled from "@emotion/styled";
import VideoChat from "./VideoChat";

const GroupContainer = styled.div`
  padding-top: 11.7vh;
  display: flex;
`;

const ChatRoom = styled.div`
  width: 100vw;
  height: auto;
  display: flex;
  #video-grid {
    height: 82%;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .video_box {
      width: 32%;
      position: relative;
      height: calc(50% - 12.5px);
      margin-left: 2%;
      &:nth-child(3n + 1) {
        margin-left: 0px;
      }
      &:nth-child(n + 4) {
        margin-top: 25px;
      }
      video {
        width: calc(100% - 1px);
        height: calc(78% - 1px);
        border-radius: 18px;
        object-fit: cover;
        position: relative;
        }
      video.mirror {
        transform: rotateY(180deg);
      }
      }
    }
  }
`;

const Test = () => {
  return (
    <>
      <VideoChat />
    </>
  );
};

export default Test;
