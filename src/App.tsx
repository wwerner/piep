import * as React from "react";
import { useEffect, useState } from "react";

import * as Tone from "tone";
import { Player } from "./components";

import { digitGenerator } from "./pi";

const digits = digitGenerator();

const App = () => {
  const [synth, setSynth] = useState<Tone.Synth | undefined>(undefined);
  const [started, setStarted] = useState(false);

  const start = () => setStarted(true);

  useEffect(() => {
    Tone.start()
      .then(() => new Tone.Synth().toDestination())
      .then((synth) => setSynth(synth))
      .then(() =>
        new Tone.Loop((time) => {
          let digit = digits.next().value;
          onNewDigit(digit);
        }, "4n").start(0)
      )
      .then((_loop) => Tone.Transport.start())
      .catch((err) => {
        console.error(err);
        Tone.Transport.stop().cancel(0);
      });
  }, [started]);

  const onNewDigit = (digit: number) => {
    console.log(digit);
  };

  return (
    <div className="app">
      <div className={`modal ${started ? "" : "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content" style={{ textAlign: "center" }}>
          <i className='play-button far fa-10x fa-play-circle' onClick={start}></i>
        </div>
      </div>
      <div className="main">
        <section className="hero" style={{ textAlign: "center" }}>
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
