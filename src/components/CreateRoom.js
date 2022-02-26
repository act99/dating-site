import axios from "axios";
import React from "react";

const CreateRoom = () => {
  const submit = () => {
    const rtcApi = axios.create({
      baseURL: "http://localhost:8080",
    });
  };
  const mediaStreamConstraints = {
    video: true,
  };
  const localVideo = document.querySelector("video");
  let localStream;
  function gotLocalMediaStream(mediaStream) {
    localStream = mediaStream;
    localVideo.srcObject = mediaStream;
  }
  function handleLocalMediaStreamError(error) {
    console.log("navigator.getUserMedia error: ", error);
  }
  React.useEffect(() => {
    navigator.mediaDevices
      .getUserMedia(mediaStreamConstraints)
      .then(gotLocalMediaStream)
      .catch(handleLocalMediaStreamError);
  }, []);

  return (
    <div>
      <h1>Realtime communication with WebRTC</h1>
      <video autoPlay playsInline></video>
      <script src="js/main.js"></script>
    </div>
  );
};

export default CreateRoom;
