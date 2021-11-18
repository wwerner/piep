import * as React from "react";
import { useEffect, useState } from "react";

import * as Tone from "tone";
import { Player } from "./components";
import { useSynth } from "./components/Audio";

import { digitGenerator } from "./pi";

const digits = digitGenerator();
const chunkSize = 3;

const App = () => {
  const [started, setStarted] = useState(false);
  const start = () => setStarted(true);

  const [chunk, setChunk] = useState<number[]>([]);
  const [time, setTime] = useState<Tone.Unit.Time>(0);

  useSynth(chunk, time);

  useEffect(() => {
    Tone.start()
      .then(() =>
        new Tone.Loop((time) => {
          setTime(time);
          nextChunk();
        }, "4n").start(0)
      )
      .then((_loop) => {
        Tone.Transport.start();
      })
      .catch((err) => {
        console.error(err);
        Tone.Transport.stop().cancel(0);
      });
  }, [started]);

  const nextChunk = () =>
    setChunk(Array.from({ length: chunkSize }, () => digits.next().value));

  return (
    <div className="app">
      <div className={`modal ${started ? "" : "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content" style={{ textAlign: "center" }}>
          <i
            className="play-button far fa-10x fa-play-circle"
            onClick={start}
          ></i>
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
