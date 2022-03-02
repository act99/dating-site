import { head } from "lodash";
import React from "react";
import { useDispatch } from "react-redux";
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
  const [connected, setConnected] = React.useState(false);
  // ** params 로 받은 roomId 와 roomName
  //   const params = useParams();
  //   const roomId = params.roomId;
  const location = useLocation();
  const item = location.state;
  const roomName = item.roomName;
  const roomId = item.roomId;
  const chatRef = React.useRef();

  const sock = new SockJS("http://52.78.96.234:8080/ws-stomp");
  let options = {
    debug: true,
    header: { Authorization: token },
    protocols: Stomp.VERSIONS.supportedVersions(),
  };
  const ws = Stomp.over(sock, options);
  // ** params 로 받은 roomId 와 roomName 끝
  const [data, setData] = React.useState({
    // sender: "",
    type: "TALK",
    roomId: "",
    // roomName: "",
    message: "",
    // messages: [],
    // token: "",
    // userCount: null,
  });
  // const [receiveData, setReceiveData] = React.useState(second)

  // const sendMessage = (type) => {
  //   ws.send(
  //     `/pub/chat/message`,
  //     { Authorization: token + "" },
  //     JSON.stringify({ type: type, ...data }),
  //     setData({ ...data, message: "" })
  //   );
  // };
  const recvMessage = (recv) => {
    console.log(recv);
    setData({
      ...data,
      userCount: recv.userCount,
      messages: [
        { type: recv.type, sender: recv.sender, message: recv.message },
        ...data.messages,
      ],
    });
  };
  const sendingMessageHandler = (event) => {
    setData({ ...data, message: event.target.value });
  };
  const sendHandler = (type) => {
    ws.send(
      `/pub/chat/message`,
      { Authorization: token },
      JSON.stringify({ ...data }),
      setData({ ...data, message: "" })
    );
  };

  React.useEffect(() => {
    setData({ ...data, roomId: roomId });
    console.log(item);
    console.log(token);
    created();
  }, []);

  const created = () => {
    try {
      ws.connect(
        { Authorization: token },
        (frame) => {
          ws.subscribe(
            `/chat/room/enter/${roomId}`,
            (message) => {
              let recv = JSON.parse(message.body);
              recvMessage(recv);
            },
            { Authorization: token }
          );
        },
        (error) => {
          console.log("서버연결 실패");
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h3>ChattingRoom</h3>
      <input value={data.message} onChange={sendingMessageHandler} />
      <button onClick={sendHandler}>전송버튼</button>
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
