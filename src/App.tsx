import * as React from "react";

import "./App.css";

import { Player, Pi } from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="main">
        <h1>π</h1>
        <Player />
        <Pi />
      </div>
    </div>
  );
};

export default App;
