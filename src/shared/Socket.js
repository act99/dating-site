//   const sendingMessage = (ws, sendMessage, setSendMessage, token) => {
//     setSendMessage({ ...sendMessage, type: "TALK" });
//     ws.send(
//       `/pub/chat/message`,
//       { Authorization: token },
//       JSON.stringify({ ...sendMessage }),
//       setSendMessage({ ...sendMessage, message: "" })
//     );
//   };
