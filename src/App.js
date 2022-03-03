import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoOauth from "./components/KakaoOauth";
import Rooms from "./pages/Rooms";
import ChattingRoom from "./pages/ChattingRoom";
import { actionCreators as userActions } from "./redux/modules/userReducer";
import { useDispatch } from "react-redux";
import { apis } from "./shared/api";
import NavBar from "./components/NavBar";
const App = () => {
  const dispatch = useDispatch();
  React.useEffect(() => {
    if (document.cookie) {
      dispatch(userActions.userinfoDB());
    }
  }, []);

  return (
    <>
      <NavBar />
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route path="/user/kakao/callback/" exact component={KakaoOauth} />
        {/* 채팅방 입장 */}
        <Route path="/rooms" exact component={Rooms} />
        <Route path="/rooms/:roomId" exact component={ChattingRoom} />
      </ConnectedRouter>
    </>
  );
};

export default App;
