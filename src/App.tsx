import * as React from "react";
import { useEffect, useState } from "react";

import * as Tone from "tone";
import { PolkadotsAnimated } from "./components";
import { Note, Scales, Scale, useSynth } from "./components/Audio";
import { Controls } from "./components/Controls";
import { Pi } from "./components/Pi";
import { Pixels } from "./components/Pixels";
import { Polkadots } from "./components/Polkadots";
import { Palettes } from "./components/Video";

import { digitGenerator } from "./pi";

const digits = digitGenerator();

const App = () => {
  const [modalClosed, setModalClosed] = useState(false);

  const [audioDigit, setAudioDigit] = useState<number>();
  const [videoDigit, setVideoDigit] = useState<number>();
  const [time, setTime] = useState<Tone.Unit.Time>(0);

  const [scale, setScale] = useState<Scale>(Scales.wholeTone);
  const [root, setRoot] = useState<Note>("C3");

  useSynth(audioDigit, time, scale, root);

  const stop = () => {
    Tone.Transport.stop().cancel(0);
  };

  const start = () => {
    Tone.start()
      .then(() =>
        new Tone.Loop((time) => {
          const digit = digits.next().value;
          setTime(time);
          setAudioDigit(digit);
          Tone.Draw.schedule(function () {
            setVideoDigit(digit);
          }, time);
        }, "4n").start(0)
      )
      .then((_loop) => {
        Tone.Transport.start();
      })
      .catch((err) => {
        console.error(err);
        stop();
      });
  };

  useEffect(() => {
    if (modalClosed) {
      start();
    }
  }, [modalClosed]);

  return (
    <div className="app">
      <div className={`modal ${modalClosed ? "" : "is-active"}`}>
        <div className="modal-background"></div>
        <div className="modal-content" style={{ textAlign: "center" }}>
          <i
            className="play-button far fa-10x fa-play-circle"
            onClick={() => setModalClosed(true)}
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
          onStart={start}
          onStop={stop}
        />
      </div>
      <div className="columns is-gapless is-multiline">
        <div className="column is-3">
          <PolkadotsAnimated
            digit={videoDigit}
            time={time}
            palette={Palettes.redToGreen}
          />
        </div>

        <div className="column is-3">
          <Polkadots digit={videoDigit} time={time} palette={Palettes.gulf2} />
        </div>
        <div className="column is-3">
          <Pixels
            digit={videoDigit}
            time={time}
            size={20}
            lines={true}
            palette={Palettes.muted}
          />
        </div>
        <div className="column is-3">
          <Pixels
            digit={videoDigit}
            time={time}
            size={4}
            palette={Palettes.gulf2}
            displayDigits={true}
          />
        </div>
        <div className="column is-12">
          <Pi digit={videoDigit} />
        </div>
      </div>
    </div>
  );
};

export default App;
