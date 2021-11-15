import * as React from "react";

import "./App.css";

import { Player } from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="main">
        <h1>π</h1>
        <Player />
      </div>
    </div>
  );
};

export default App;
