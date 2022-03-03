import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoOauth from "./components/KakaoOauth";
import Rooms from "./pages/Rooms";
import ChattingRoom from "./pages/ChattingRoom";
import { actionCreators as userActions } from "./redux/modules/userReducer";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
import NotFound from "./pages/NotFound";
import Container from "@mui/material/Container";
import Room2 from "./components/Room2";
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
      <Container maxWidth="xl">
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/user/kakao/callback/" exact component={KakaoOauth} />
            {/* 채팅방 입장 */}
            <Route path="/rooms" exact component={Rooms} />
            <Route path="/rooms/:roomId" exact component={ChattingRoom} />
            <Route path="/test" exact component={Room2} />
            <Route path="*" exact component={NotFound} />
          </Switch>
        </ConnectedRouter>
      </Container>
    </>
  );
};

export default App;
