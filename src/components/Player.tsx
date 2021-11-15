import * as React from "react";
import { FunctionComponent, useEffect, useRef } from "react";
import { Renderer } from "react-dom";

import * as Tone from "tone";
import Vex from "vexflow";

import '../App.css';
import { digitGenerator } from "../pi";

const digits = digitGenerator();
const VF = Vex.Flow;


// prettier-ignore
const MIDI_NOTES = [
    "C_1", "C#_1", "D_1", "D#_1", "E_1", "F_1", "F#_1", "G_1", "G#_1", "A_1", "A#_1", "B_1",
    "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
    "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
    "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
    "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
    "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8",
    "C9", "C#9", "D9", "D#9", "E9", "F9", "F#9", "G9"
];

interface PlayerProps {}
const Player: FunctionComponent<PlayerProps> = () => {
  const startNoteIdx = 60; // C3

  const play = async () => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();

    const loop = new Tone.Loop((time) => {
      let digit = digits.next().value;
      let note = MIDI_NOTES[startNoteIdx + digit];
      console.log(digit, "->", note);
      synth.triggerAttackRelease(note, "8n", time);

      let scoreNote = new VF.StaveNote({
        keys: [
          `${note.substring(0, note.length - 1)}/${note.substring(
            note.length - 1
          )}`,
        ],
        duration: "8",
      })
        .setContext(scoreContext)
        .setStave(stave)

        tickContext.addTickable(scoreNote)
        const group = scoreContext.openGroup();
        scoreNote.draw()
        scoreContext.closeGroup()
        group.classList.add('scroll')
        const box = group.getBoundingClientRect();
        group.classList.add('scrolling')
    }, "4n").start(0);

    Tone.Transport.start();
  };

  const stop = () => {
    Tone.Transport.stop();
    Tone.Transport.cancel(0);
  };

  const scoreContainer = useRef<HTMLDivElement>(null);
  let scoreRenderer = useRef<SVGElement>(null);
  let scoreContext: Vex.Flow.SVGContext;
  let stave: Vex.Flow.Stave;
  let tickContext: Vex.Flow.TickContext;
  useEffect(() => {
    if (scoreContainer.current) {
      scoreRenderer = new VF.Renderer(
        scoreContainer.current,
        VF.Renderer.Backends.SVG
      );

      scoreRenderer.resize(530, 110);
      scoreContext = scoreRenderer.getContext();
      tickContext = new VF.TickContext();
      tickContext.preFormat().setX(400);
      stave = new VF.Stave(10, 10, 10000).addClef("treble");
      stave.setContext(scoreContext).draw();
    }
  }, []);

  return (
    <div className="player">
      <button onClick={play}>Listen to π</button>
      <button onClick={stop}>OMG, stahp!</button>
      <div ref={scoreContainer}></div>
    </div>
  );
};

export default Player;
