import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import Login from "./pages/Login";
import KakaoOauth from "./components/KakaoOauth";

const App = () => {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/login" exact component={Login} />
        <Route
          path="/user/kakao/callback/"
          exact
          component={KakaoOauth}
        ></Route>
      </ConnectedRouter>
    </>
  );
};

export default App;
