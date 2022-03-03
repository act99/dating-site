import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
import Mypage from "./pages/Mypage";

const App = () => {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Home} />
        <Route path="/mypage" exact component={Mypage} />
      </ConnectedRouter>
    </>
  );
};

export default App;
