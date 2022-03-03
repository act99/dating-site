import {
  Divider,
  Fab,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import SockJS from "sockjs-client";
import Stomp from "stompjs";
import SendIcon from "@mui/icons-material/Send";
import useStyle from "../styles/chattingStyle";
import { actionCreators as chatActions } from "../redux/modules/chatReducer";
const tokenCheck = document.cookie;
const token = tokenCheck.split("=")[1];

const ChattingRoom = () => {
  const classes = useStyle.makeChattingStyle();
  const dispatch = useDispatch();

  // ** params 로 받은 roomId 와 roomName
  const location = useLocation();
  const locationState = location.state;
  const roomName = locationState.roomName;
  const roomId = locationState.roomId;

  // ** user 정보
  const user = useSelector((state) => state.userReducer.user);
  const nickname = user.nickname;

  // ** SockJS 설정
  const sock = new SockJS("http://52.78.96.234:8080/ws-stomp");
  // 배포시
  // let sock = new SockJS("https://52.78.96.234:8080/wss");
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
  });
  // input값 핸들러
  const sendingMessageHandler = (event) => {
    setSendMessage({ ...sendMessage, message: event.target.value });
  };
  // 메시지 보내기 핸들러
  const sendingMessage = (ws) => {
    setSendMessage({ ...sendMessage, type: "TALK" });
    ws.send(
      `/pub/chat/message`,
      { Authorization: token },
      JSON.stringify({ ...sendMessage }),
      setSendMessage({ ...sendMessage, message: "" })
    );
  };
  const chattingList = useSelector((state) => state.chatReducer.list);

  // ** 스크롤 핸들러
  const chattingRef = React.useRef();
  const created = () => {
    try {
      ws.connect(
        { Authorization: token },
        (frame) => {
          console.log("hi");
          ws.subscribe(
            `/sub/chat/room/${roomId}`,
            (message) => {
              let recv = JSON.parse(message.body);
              console.log(recv);
              dispatch(chatActions.getChat(recv));
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
    chattingRef.current.scrollIntoView({ behavior: "smooth" });
    setSendMessage({ ...sendMessage, roomId: roomId, sender: nickname });
    created();
    return () => disconnected();
  }, [chattingList]);

  return (
    <>
      <div>
        <Grid container className={classes.chatSection}>
          <Grid item xs={9}>
            <List className={classes.messageArea}>
              {chattingList.map((item, index) =>
                item.sender === nickname ? (
                  <ListItem key={index + "" + (item.id + "")}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="right"
                          primary={item.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align="right"
                          secondary="09:30"
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                ) : (
                  <ListItem key={index + "" + (item.id + "")}>
                    <Grid container>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          primary={item.message}
                        ></ListItemText>
                      </Grid>
                      <Grid item xs={12}>
                        <ListItemText
                          align="left"
                          secondary="09:31"
                        ></ListItemText>
                      </Grid>
                    </Grid>
                  </ListItem>
                )
              )}
              <div ref={chattingRef} />
            </List>
            <Divider />
            <Grid container style={{ padding: "20px" }}>
              <Grid item xs={11}>
                <TextField
                  id="outlined-basic-email"
                  label="Type Something"
                  fullWidth
                  value={sendMessage.message}
                  onChange={sendingMessageHandler}
                />
              </Grid>
              <Grid item xs={1} align="right">
                <Fab color="primary" aria-label="add" onClick={sendingMessage}>
                  <SendIcon />
                </Fab>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
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
