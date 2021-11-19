import * as React from "react";
import { useEffect, useState } from "react";

import * as Tone from "tone";
import { useSynth } from "./components/Audio";
import { Polkadots } from "./components/Polkadots";

import { digitGenerator } from "./pi";

const digits = digitGenerator();
const chunkSize = 1;

const App = () => {
  const [started, setStarted] = useState(false);
  const start = () => setStarted(true);

  const [currentDigit, setCurrentDigit] = useState<number>(0);
  const [time, setTime] = useState<Tone.Unit.Time>(0);

  useSynth(currentDigit, time);

  useEffect(() => {
    Tone.start()
      .then(() =>
        new Tone.Loop((time) => {
          setTime(time);
          setCurrentDigit(digits.next().value);
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

  return (
    <div className="app">
      <div className={`modal ${started ? "" : "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content" style={{ textAlign: "center" }}>
          <i className="play-button far fa-10x fa-play-circle" onClick={start}>
            Play
          </i>
        </div>
      </div>
      <div style={{ width: "55vw" }}>
        <Polkadots digit={currentDigit} time={time} />
      </div>
    </div>
  );
};

export default App;
