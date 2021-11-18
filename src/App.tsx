import * as React from "react";
import { useEffect, useState } from "react";

import * as Tone from "tone";
import { useSynth } from "./components/Audio";
import { Visuals } from "./components/Visuals";

import { digitGenerator } from "./pi";

const digits = digitGenerator();
const chunkSize = 1;

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
      <div style={{width:"25vw"}}>
       <Visuals chunk={chunk} time={time} />
       </div>
      <div style={{width:"55vw"}}>
       <Visuals chunk={chunk} time={time} />
      </div>
    </div>
  );
};

export default App;
