import { head } from "lodash";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
// let sockJS = new SockJS("http://52.78.96.234:8080/ws");
// ** 배포 시
// let sockJS = new SockJS("https://52.78.96.234:8080/wss");

const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];

const ChattingRoom = () => {
  const dispatch = useDispatch();

  // ** params 로 받은 roomId 와 roomName
  const location = useLocation();
  const locationState = location.state;
  const roomName = locationState.roomName;
  const roomId = locationState.roomId;

  // ** user 정보
  const user = useSelector((state) => state.userReducer.user);
  const nickname = user.nickname;
  const username = user.username;

  // ** 채팅 ref
  const chatRef = React.useRef();

  // ** SockJS 설정
  const sock = new SockJS("http://52.78.96.234:8080/ws-stomp");
  let options = {
    debug: true,
    header: { Authorization: token },
    protocols: Stomp.VERSIONS.supportedVersions(),
  };
  const ws = Stomp.over(sock, options);

  // ** 메시지 보내기 위한 핸들러
  const [sendMessage, setSendMessage] = React.useState({
    type: "TALK",
    roomId: "",
    sender: "",
    message: "",
    userCount: 0,
  });
  // input값 핸들러
  const sendingMessageHandler = (event) => {
    setSendMessage({ ...sendMessage, message: event.target.value });
  };
  // 메시지 보내기 핸들러
  const sendingMessage = () => {
    setSendMessage({ ...sendMessage, type: "TALK" });
    ws.send(
      `/pub/chat/message`,
      { Authorization: token },
      JSON.stringify({ ...sendMessage }),
      setSendMessage({ ...sendMessage, message: "" })
    );
  };
  // ** receive
  const [receivedMessage, setReceivedMessage] = React.useState([]);
  // const recvMessage = (recv) => {
  //   console.log(recv);
  //   setData({
  //     ...data,
  //     userCount: recv.userCount,
  //     messages: [
  //       { type: recv.type, sender: recv.sender, message: recv.message },
  //       ...data.messages,
  //     ],
  //   });
  // };
  const created = () => {
    try {
      ws.connect(
        { Authorization: token },
        (frame) => {
          ws.subscribe(
            `/chat/room/enter/${roomId}`,
            (message) => {
              console.log(message);
              let recv = JSON.parse(message.body);
              setReceivedMessage([recv, ...receivedMessage]);
              console.log("Receive 데이터" + recv);
              // recvMessage(recv);
            },
            { Authorization: token }
          );
        },
        (error) => {
          console.log("서버연결 실패", error);
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const disconnected = () => {
    if (ws !== null) {
      ws.disconnect();
      console.log("연결 종료");
    }
  };
  React.useEffect(() => {
    setSendMessage({ ...sendMessage, roomId: roomId, sender: nickname });
    created();
    return () => disconnected();
  }, []);

  return (
    <div>
      <h3>ChattingRoom</h3>
      <input value={sendMessage.message} onChange={sendingMessageHandler} />
      <button onClick={sendingMessage}>전송버튼</button>
      <ul>
        {receivedMessage.map((item, index) => (
          <li>{item.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default ChattingRoom;

//   const connectSockJS = () => {
//     console.log("hi");
//     let headers = { token: token };
//     // ** 3차 시도
//     const sock = new SockJS("http://52.78.96.234:8080/ws-stomp");

//     let options = {
//       debug: false,
//       protocols: Stomp.VERSIONS.supportedVersions(),
//       headers: headers,
//     };
//     let ws = Stomp.over(sock, options);
//     const create = () => {
//       console.log(token);
//       setData({ ...data, roomId: roomId, roomName: roomName });
//       ws.connect(
//         { Authorization: token },
//         function (frame) {
//           ws.subscribe(`/sub/chat/room/${roomId}`, function (message) {
//             let recv = JSON.parse(message.body);
//           });
//         },
//         function (error) {
//           console.log("연결실패, 다시 접속 바람");
//         }
//       );
//     };
//     create();
//   };

// ** 2차 시도
//     const client = new Client({
//       brokerURL: "ws://52.78.96.234:8080/ws-stomp/",
//       connectHeaders: headers,
//       debug: function (str) {
//         console.log(str);
//       },
//       reconnectDelay: 5000, //자동 재 연결
//       heartbeatIncoming: 4000,
//       heartbeatOutgoing: 4000,
//     });
//     client.onConnect = function (frame) {
//       console.log("연결 완료");
//     };
//     client.onStompError = function (frame) {
//       // Will be invoked in case of error encountered at Broker
//       // Bad login/passcode typically will cause an error
//       // Complaint brokers will set `message` header with a brief message. Body may contain details.
//       // Compliant brokers will terminate the connection after any error
//       console.log("Broker reported error: " + frame.headers["message"]);
//       console.log("Additional details: " + frame.body);
//     };
//     client.activate();
//
// ** 1차 시도
//   const connectSockJS = () => {
//     let sockJS = new SockJS("http://52.78.96.234:8080/ws-stomp/ws");
//     let options = {
//       debug: false,
//       protocols: Stomp.VERSIONS.supportedVersions(),
//       headers: { Authorization: token },
//     };
//     let stompClient = Stomp.over(sockJS, options);
//     console.log(`소켓 연결을 시도합니다.`);
//     console.log(token);
//     let headers = { Authorization: token };
//     console.log(headers);
//     stompClient.connect(
//       headers,
//       (frame) => {
//         setConnected(true);
//         console.log("소켓 연결 성공", frame);
//         stompClient.subscribe(`/chat/room/enter/${roomId}`, (tick) => {
//           console.log(tick.body);
//         });
//       },
//       (error) => {
//         console.log("연결 실패");
//         console.log(error);
//       }
//     );
//   };

//   type: "TALK",
//   roomId: "",
//   roomName: "",
//   message: "",
//   messages: [],
//   token: "",
//   userCount: 0,
