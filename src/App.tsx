import { RSA_PSS_SALTLEN_DIGEST } from "constants";
import * as React from "react";
import { useEffect, useState } from "react";

import * as Tone from "tone";
import { PolkadotsAnimated } from "./components";
import { Note, Scales, Scale, useSynth, RootNotes } from "./components/Audio";
import { Controls } from "./components/Controls";
import { Pixels } from "./components/Pixels";
import { Polkadots } from "./components/Polkadots";
import { Palettes } from "./components/Video";

import { digitGenerator } from "./pi";

const digits = digitGenerator();

const App = () => {
  const [started, setStarted] = useState(false);
  const start = () => setStarted(true);

  const [currentDigit, setCurrentDigit] = useState<number>(0);
  const [time, setTime] = useState<Tone.Unit.Time>(0);

  const [scale, setScale] = useState<Scale>(Scales.wholeTone);
  const [root, setRoot] = useState<Note>("C3");

  useSynth(currentDigit, time, scale, root);
  const stopAudio = () => {
    Tone.Transport.stop().cancel(0);
  };

  const startAudio = () => {
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
        stopAudio();
      });
  };

  useEffect(() => {
    if (started) {
      startAudio();
    }
  }, [started]);

  return (
    <div className="app">
      <div className={`modal ${started ? "" : "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content" style={{ textAlign: "center" }}>
          <i
            className="play-button far fa-10x fa-play-circle"
            onClick={start}
            aria-label="Play"
          >
            {" "}
          </i>
        </div>
      </div>
      <div className="controls">
        <Controls
          root={root}
          onSelectRoot={setRoot}
          scale={scale}
          onSelectScale={setScale}
          onStart={startAudio}
          onStop={stopAudio}
        />
      </div>
      <div className="columns is-gapless is-multiline">
        <div className="column is-3">
          <PolkadotsAnimated
            digit={currentDigit}
            time={time}
            palette={Palettes.redToGreen}
          />
        </div>

        <div className="column is-3">
          <Polkadots
            digit={currentDigit}
            time={time}
            palette={Palettes.gulf2}
          />
        </div>
        <div className="column is-3">
          <Pixels
            digit={currentDigit}
            time={time}
            size={20}
            lines={true}
            palette={Palettes.muted}
          />
        </div>
        <div className="column is-3">
          <Pixels
            digit={currentDigit}
            time={time}
            size={4}
            lines={true}
            palette={Palettes.gulf2}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
