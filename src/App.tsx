import * as React from "react";
import { FaPlay } from "react-icons/fa";

import { Player } from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="main">
        <section className="hero" style={{textAlign: "center", marginBottom: "20px"}}>
          <p className="title">
            <span className="icon">
              <i className="fab fa-itunes-note"></i>
            </span>{" "}
            <span className="is-size-1">π</span>{" "}
            <span className="icon">
              <i className="fab fa-itunes-note"></i>
            </span>
          </p>
          <p className="subtitle is-size-3">
            This is what π could sound like.
            <br />
            How many digits can you bear?
          </p>
        </section>
        <Player />
      </div>
    </div>
  );
};

export default App;
