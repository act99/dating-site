import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/store";
import Home from "./pages/Home";
const App = () => {
  return (
    <>
      <ConnectedRouter history={history}>
        <Route path="/" exact component={Home} />
      </ConnectedRouter>
    </>
  );
};

export default App;
