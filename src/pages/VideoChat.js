import styled from "@emotion/styled";
import React from "react";
import Participant from "../shared/Participants";
import { sendMessage } from "../shared/SocketFunc";
import url from "../shared/url";
import utils from "kurento-utils";
import { history } from "../redux/store";

const VideoChat = () => {
  const wsUrl = url.WSS_URL;
  const ws = new WebSocket(wsUrl);
  var participants = {};

  // **
  const roomRef = React.useRef();
  // let room = roomRef.current.value
  const [room, setRoom] = React.useState("");
  const changeRoomHandler = () => {
    setRoom(roomRef.current.value);
  };
  const nameRef = React.useRef();
  const [name, setName] = React.useState("");
  const changeNameHandler = () => {
    setName(nameRef.current.value);
  };

  const joinRef = React.useRef();

  const [roomHeader, setRoomHeader] = React.useState("");
  // **

  var webRtcPeer = utils.WebRtcPeer.WebRtcPeerSendrecv();

  const start = () =>
    (ws.onmessage = function (message) {
      var parsedMessage = JSON.parse(message.data);
      console.info("Received message: " + message.data);

      switch (parsedMessage.id) {
        case "existingParticipants":
          onExistingParticipants(parsedMessage);
          break;
        case "newParticipantArrived":
          onNewParticipant(parsedMessage);
          break;
        case "participantLeft":
          onParticipantLeft(parsedMessage);
          break;
        case "receiveVideoAnswer":
          receiveVideoResponse(parsedMessage);
          break;
        case "iceCandidate":
          participants[parsedMessage.name].rtcPeer.addIceCandidate(
            parsedMessage.candidate,
            function (error) {
              if (error) {
                console.error("Error adding candidate: " + error);
                return;
              }
            }
          );
          break;
        default:
          console.error("Unrecognized message", parsedMessage);
      }
    });

  console.log(room);
  function register() {
    // name = document.getElementById("name").value;
    // var room = document.getElementById("roomName").value;
    setRoomHeader(`Room ${room}`);

    // document.getElementById("room-header").innerText = "ROOM " + room;
    joinRef.current.style.display = "none";
    roomRef.current.style.display = "block";

    var message = {
      id: "joinRoom",
      name: name,
      room: room,
    };
    sendMessage(message, ws);
  }

  function onNewParticipant(request) {
    receiveVideo(request.name);
  }

  function receiveVideoResponse(result) {
    participants[result.name].rtcPeer.processAnswer(
      result.sdpAnswer,
      function (error) {
        if (error) return console.error(error);
      }
    );
  }

  function callResponse(message) {
    if (message.response != "accepted") {
      console.info("Call not accepted by peer. Closing call");
      ws.close();
    } else {
      webRtcPeer.processAnswer(message.sdpAnswer, function (error) {
        if (error) return console.error(error);
      });
    }
  }

  function onExistingParticipants(msg) {
    var constraints = {
      audio: true,
      video: {
        mandatory: {
          maxWidth: 320,
          maxFrameRate: 15,
          minFrameRate: 15,
        },
      },
    };
    console.log(name + " registered in room " + room);
    var participant = new Participant(name);
    participants[name] = participant;
    var video = participant.getVideoElement();

    var options = {
      localVideo: video,
      mediaConstraints: constraints,
      onicecandidate: participant.onIceCandidate.bind(participant),
    };

    participant.rtcPeer = new utils.WebRtcPeer.WebRtcPeerSendonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      }
    );

    msg.data.forEach(receiveVideo);
  }

  function leaveRoom() {
    sendMessage(
      {
        id: "leaveRoom",
      },
      ws
    );

    for (var key in participants) {
      participants[key].dispose();
    }
    roomRef.current.style.display = "none";
    document.getElementById("join").style.display = "block";

    ws.close();
  }

  function receiveVideo(sender) {
    var participant = new Participant(sender);
    participants[sender] = participant;
    var video = participant.getVideoElement();

    var options = {
      remoteVideo: video,
      onicecandidate: participant.onIceCandidate.bind(participant),
    };

    participant.rtcPeer = new utils.WebRtcPeer.WebRtcPeerRecvonly(
      options,
      function (error) {
        if (error) {
          return console.error(error);
        }
        this.generateOffer(participant.offerToReceiveVideo.bind(participant));
      }
    );
  }

  function onParticipantLeft(request) {
    console.log("Participant " + request.name + " left");
    var participant = participants[request.name];
    participant.dispose();
    delete participants[request.name];
  }

  React.useEffect(() => {
    start();
    return () => {
      leaveRoom();
      history.go(0);
    };
  }, []);

  const onSubmit = () => {
    register();
    return false;
  };
  return (
    <Container id="container">
      <div id="wrapper">
        <Join ref={joinRef}>
          <h1>Join a Room</h1>
          <form onSubmit={onSubmit} acceptCharset="UTF-8">
            <p>
              <input
                ref={nameRef}
                type="text"
                name="name"
                value={name}
                onChange={changeNameHandler}
                id="name"
                placeholder="Username"
                required
              />
            </p>
            <p>
              <input
                ref={roomRef}
                onChange={changeRoomHandler}
                type="text"
                name="room"
                value={room}
                placeholder="Room"
                required
              />
            </p>
            <p className="submit">
              <input type="submit" name="commit" value="Join!" />
            </p>
          </form>
        </Join>
        <div ref={roomRef} id="room" style={{ display: "none" }}>
          <h2>{roomHeader}</h2>
          <div id="participants"></div>
          <input
            type="button"
            id="button-leave"
            onMouseUp={leaveRoom}
            value="Leave room"
          />
        </div>
      </div>
    </Container>
    // <Container id="container">
    //   <div id="wrapper">
    //     <Join id="join">
    //
    //     </Join>

    //   </div>
    // </Container>
  );
};

// const Room = styled.div`
//   width: 100%;
//   text-align: center;
// `;

// const Input = styled.input`
//   font-family: "Lucida Grande", Tahoma, Verdana, sans-serif;
//   font-size: 14px;
//   margin: 5px;
//   padding: 0 10px;
//   width: 200px;
//   height: 34px;
//   color: #404040;
//   background: white;
//   border: 1px solid;
//   border-color: #c4c4c4 #d1d1d1 #d4d4d4;
//   border-radius: 2px;
//   outline: 5px solid #eff4f7;
//   -moz-outline-radius: 3px;
//   -webkit-box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
//   box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.12);
//   :foucs {
//     border-color: #7dc9e2;
//     outline-color: #dceefc;
//     outline-offset: 0;
//   }
// `;

const Container = styled.div`
  margin: "50px auto";
  width: "640px";
`;

const Join = styled.div`
  position: relative;
  margin: 0 auto;
  padding: 20px 20px 20px;
  width: 310px;
  background: white;
  border-radius: 3px;
  -webkit-box-shadow: 0 0 200px rgba(255, 255, 255, 0.5),
    0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 0 200px rgba(255, 255, 255, 0.5), 0 1px 2px rgba(0, 0, 0, 0.3);
  /*Transition*/
  -webkit-transition: all 0.3s linear;
  -moz-transition: all 0.3s linear;
  -o-transition: all 0.3s linear;
  transition: all 0.3s linear;
  :before {
    content: "";
    position: absolute;
    top: -8px;
    right: -8px;
    bottom: -8px;
    left: -8px;
    z-index: -1;
    background: rgba(0, 0, 0, 0.08);
    border-radius: 4px;
  }
  h1 {
    margin: -20px -20px 21px;
    line-height: 40px;
    font-size: 15px;
    font-weight: bold;
    color: #555;
    text-align: center;
    text-shadow: 0 1px white;
    background: #f3f3f3;
    border-bottom: 1px solid #cfcfcf;
    border-radius: 3px 3px 0 0;
    background-image: -webkit-linear-gradient(top, whiteffd, #eef2f5);
    background-image: -moz-linear-gradient(top, whiteffd, #eef2f5);
    background-image: -o-linear-gradient(top, whiteffd, #eef2f5);
    background-image: linear-gradient(to bottom, whiteffd, #eef2f5);
    -webkit-box-shadow: 0 1px whitesmoke;
    box-shadow: 0 1px whitesmoke;
  }
  p {
    margin: 20px 0 0;
  }
  p:first-of-type {
    margin-top: 0;
  }
  p.submit {
    text-align: center;
  }
`;

// const SubmitButton = styled.button`
//   padding: 0 18px;
//   height: 29px;
//   font-size: 12px;
//   font-weight: bold;
//   color: #527881;
//   text-shadow: 0 1px #e3f1f1;
//   background: #cde5ef;
//   border: 1px solid;
//   border-color: #b4ccce #b3c0c8 #9eb9c2;
//   border-radius: 16px;
//   outline: 0;
//   -webkit-box-sizing: content-box;
//   -moz-box-sizing: content-box;
//   box-sizing: content-box;
//   background-image: -webkit-linear-gradient(top, #edf5f8, #cde5ef);
//   background-image: -moz-linear-gradient(top, #edf5f8, #cde5ef);
//   background-image: -o-linear-gradient(top, #edf5f8, #cde5ef);
//   background-image: linear-gradient(to bottom, #edf5f8, #cde5ef);
//   -webkit-box-shadow: inset 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.15);
//   box-shadow: inset 0 1px white, 0 1px 2px rgba(0, 0, 0, 0.15);
// `;

export default VideoChat;
