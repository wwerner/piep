import * as React from "react";
import { FunctionComponent, useEffect, useRef } from "react";

import * as Tone from "tone";
import Vex, { RenderContext, Stave, TickContext } from "vexflow";
import { DEFAULT_NOTE_IDX, NOTES, SCORE_NOTES } from "../audio";

import { digitGenerator } from "../pi";

const { Stave, StaveNote, TickContext, Renderer } = Vex.Flow;

const digits = digitGenerator();

const Player: FunctionComponent = () => {
  const scoreContainer = useRef<HTMLDivElement>(null);
  let scoreRenderer;
  let scoreContext: RenderContext;
  let stave: Stave;
  let tickContext: TickContext;

  useEffect(() => {
    if (scoreContainer.current) {
      scoreRenderer = new Renderer(
        scoreContainer.current,
        Renderer.Backends.SVG
      );

      scoreRenderer.resize(530, 110);
      scoreContext = scoreRenderer.getContext();
      tickContext = new TickContext();
      tickContext.preFormat().setX(400);
      stave = new Stave(10, 10, 10000).addClef("treble");
      stave.setContext(scoreContext).draw();
    }
  }, []);

  const drawNote = (note: string) => {
    const scoreNote: Vex.Flow.StaveNote = new StaveNote({
      keys: [note],
      duration: "4",
    });

    scoreNote.setContext(scoreContext).setStave(stave);

    tickContext.addTickable(scoreNote);
    const group = scoreContext.openGroup();
    scoreNote.draw();
    scoreContext.closeGroup();
    group.classList.add("scroll");
    const box = group.getBoundingClientRect();
    group.classList.add("scrolling");
  };

  const playNote = (synth: Tone.Synth, note: string, time: number) => {
    synth.triggerAttackRelease(note, "8n", time);
  };

  const play = () =>
    Tone.start()
      .then(() => new Tone.Synth().toDestination())
      .then((synth) =>
        new Tone.Loop((time) => {
          let digit = digits.next().value;
          onNewDigit(digit, synth, time);
        }, "4n").start(0)
      )
      .then(() => Tone.Transport.start())
      .catch((err) => {
        console.error(err);
        Tone.Transport.stop().cancel(0);
      });

  const stop = () => {
    Tone.Transport.stop().cancel(0);
  };

  const onNewDigit = (digit: number, synth: Tone.Synth, time: number) => {
    let idx = DEFAULT_NOTE_IDX + digit;
    playNote(synth, NOTES[idx], time);
    drawNote(SCORE_NOTES[idx]);
  };

  return (
    <div className="player">
      <button onClick={play}>Listen to π</button>
      <button onClick={stop}>OMG, stahp!</button>
      <div ref={scoreContainer}></div>
    </div>
  );
};

export default Player;
