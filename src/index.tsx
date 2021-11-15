import React from "react";
import ReactDOM from "react-dom";
import { Pi } from "./components/Pi";
import Player from "./components/Player";

ReactDOM.render(
  <div className="app">
    <div className="main">
      <Pi />
      <Player />
    </div>
  </div>,
  document.getElementById("root")
);
