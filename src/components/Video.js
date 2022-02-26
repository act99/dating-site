import { startCase } from "lodash";
import React from "react";
import styled from "styled-components";
import { SocketContext } from "./SocketContext";

const Video = () => {
  //   const { name, callAccepted, myVideo, userVideo, callEnded, stream, call } =
  //     React.useContext(SocketContext);
  const socket = new WebSocket(`ws://localhost:8080/signal`);
  const peerConnectionConfig = {
    iceServers: [
      { urls: "stun:stun.stunprotocol.org:3478" },
      { urls: "stun:stun.l.google.com:19302" },
    ],
  };

  const videoButtonOff = React.useRef();
  const videoButtonOn = React.useRef();
  const audioButtonOff = React.useRef();
  const audioButtonOn = React.useRef();
  const exitButton = React.useRef();
  const localVideo = React.useRef();
  const remoteVideo = React.useRef();
  const localRoomRef = React.useRef();
  const localRoom = localRoomRef.current;
  const localUserName = localStorage.getItem("uuid");

  let localStream;
  let localVideoTracks;
  let myPeerConnection;

  function sendToServer(msg) {
    let msgJSON = JSON.stringify(msg);
    socket.send(msgJSON);
  }

  const handleICECandidateEvent = (event) => {
    if (event.candidate) {
      sendToServer({
        from: localUserName,
        type: "signal",
        data: event.candidate,
      });
      console.log("handleICECandidateEvent: ICE candidate sent");
    }
  };

  function handleOfferMessage(message) {
    myPeerConnection
      .createAnswer()
      .then(function (answer) {
        return myPeerConnection.setLocalDescription(answer);
      })
      .then(function () {
        sendToServer({
          from: localUserName,
          type: "signal",
          data: {
            sdp: myPeerConnection.localDescription,
          },
        });
        console.log("handleOfferMessage: SDP answer sent");
      })
      .catch(function (reason) {
        // an error occurred, so handle the failure to connect
        console.log("failure to connect error: ", reason);
      });
  }

  function handleNegotiationNeededEvent() {
    myPeerConnection
      .createOffer()
      .then(function (offer) {
        return myPeerConnection.setLocalDescription(offer);
      })
      .then(function () {
        sendToServer({
          from: localUserName,
          type: "signal",
          data: {
            sdp: myPeerConnection.localDescription,
          },
        });
        console.log("handleNegotiationNeededEvent: SDP offer sent");
      })
      .catch(function (reason) {
        // an error occurred, so handle the failure to connect
        console.log("failure to connect error: ", reason);
      });
  }

  function getLocalMediaStream(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
    localStream
      .getTracks()
      .forEach((track) => myPeerConnection.addTrack(track, localStream));
  }

  function getMedia(constraints) {
    if (localStream) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
    }
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then(getLocalMediaStream)
      .catch(handleGetUserMediaError);
  }

  function start() {
    createPeerConnection();
    getMedia(mediaConstraints);
  }

  function stop() {
    // send a message to the server
    sendToServer({
      from: localUserName,
      type: "text",
      data: "Client " + localUserName + " disconnected",
    });
    if (socket != null) {
      socket.close();
    }
    console.log("Socket closed");
  }

  function handleGetUserMediaError(error) {
    console.log("navigator.getUserMedia error: ", error);
    switch (error.name) {
      case "NotFoundError":
        alert(
          "Unable to open your call because no camera and/or microphone" +
            "were found."
        );
        break;
      case "SecurityError":
      case "PermissionDeniedError":
        // Do nothing; this is the same as the user canceling the call.
        break;
      default:
        alert("Error opening your camera and/or microphone: " + error.message);
        break;
    }

    stop();
  }

  const createPeerConnection = () => {
    myPeerConnection = new RTCPeerConnection(peerConnectionConfig);
    myPeerConnection.onicecandidate = handleICECandidateEvent;
    myPeerConnection.onnegotiationneeded = handleNegotiationNeededEvent;
  };

  function logError(error) {
    console.log(error.name + ": " + error.message);
  }

  const mediaConstraints = {
    audio: true,
    video: true,
  };

  React.useEffect(() => {
    start();
  }, []);

  socket.onopen = function () {
    console.log("웹소켓이 연결되었습니다." + localRoom);
    sendToServer({
      from: localUserName,
      type: "join",
      data: localRoom,
    });
  };
  socket.onmessage = function (message) {
    const webSocketMessage = JSON.parse(message.data);
    if (webSocketMessage.type === "text") {
      console.log(
        `텍스트 메시지 from ${webSocketMessage.from} 받은 데이터 : ${webSocketMessage.data}`
      );
    } else if (webSocketMessage.type === "signal") {
      console.log("서버로부터 온 신호입니다.");
      if (message.data.sdp) {
        console.log("서버로부터 SDP 를 받았습니다.");
        myPeerConnection
          .setRemoteDescription(
            new RTCSessionDescription(webSocketMessage.data.sdp)
          )
          .then(() => {
            if (myPeerConnection.remoteDescription.type === "offer") {
              handleOfferMessage(message);
              console.log("remoteDescription.type == offer");
            }
          });
      } else {
        console.log("Candidate received from server");
      }
    } else {
      console.log("Error: Wrong type message received from server");
    }
  };
  socket.onclose = function (message) {
    console.log("Socket has been closed");
  };
  // ** 비디오 버튼 클릭 했을 때 event
  videoButtonOff.onclick = () => {
    localVideoTracks = localStream.getVideoTracks();
    localVideoTracks.forEach((track) => localStream.removeTrack(track));
    console.log("Video Off");
  };
  videoButtonOn.onclick = () => {
    localVideoTracks.forEach((track) => localStream.addTrack(track));
    console.log("Video On");
  };

  audioButtonOff.onclick = () => {
    localVideo.muted = true;
    console.log("Audio Off");
  };
  audioButtonOn.onclick = () => {
    localVideo.muted = false;
    console.log("Audio On");
  };

  // close socket when exit
  exitButton.onclick = () => {
    stop();
  };

  return (
    <VideoWrap>
      <video />
    </VideoWrap>
  );
};

const VideoWrap = styled.div`
  width: 900px;
  height: 900px;
`;

export default Video;
