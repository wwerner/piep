import * as React from "react";
import { FaPlay } from "react-icons/fa";

import { Player } from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="main">
        <section className="hero" style={{textAlign: "center"}}>
          <p className="title">
            <span className="icon">
              <i className="fab fa-itunes-note"></i>
            </span>{" "}
            <span className="is-size-1">π</span>{" "}
            <span className="icon">
              <i className="fab fa-itunes-note"></i>
            </span>
          </p>
        </section>
        <Player />
      </div>
    </div>
  );
};

export default App;
