export const sendingMessage = (ws, setSendMessage, sendMessage, token) => {
  setSendMessage({ ...sendMessage, type: "TALK" });
  ws.send(
    `/pub/chat/message`,
    { Authorization: token },
    JSON.stringify({ ...sendMessage }),
    setSendMessage({ ...sendMessage, message: "" })
  );
};

export function sendMessage(message, ws) {
  var jsonMessage = JSON.stringify(message);
  console.log("Sending message: " + jsonMessage);
  ws.send(jsonMessage);
}

// 메시지 보내기 핸들러
// const sendingMessage = () => {
//   setSendMessage({ ...sendMessage, type: "TALK" });
//   ws.send(
//     `/pub/chat/message`,
//     { Authorization: token },
//     JSON.stringify({ ...sendMessage }),
//     setSendMessage({ ...sendMessage, message: "" })
//   );
// };
