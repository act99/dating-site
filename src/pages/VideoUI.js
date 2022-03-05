import React from "react";

const VideoUI = (props) => {
  const videoRef = React.useRef();

  React.useEffect(() => {
    props.streamManager.addVideoElement(videoRef.current);
    return () => {};
  }, [props.streamManager.addVideoElement(videoRef.current)]);

  return <video autoPlay={true} ref={this.videoRef} />;
};

export default VideoUI;
