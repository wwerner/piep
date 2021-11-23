import React, { ChangeEventHandler, useEffect, useRef, useState } from "react";
import { Note, RootNotes, Scale, Scales } from "./Audio";

export type ControlsProps = {
  onStart: () => void;
  onStop: () => void;
  root: Note;
  scale: Scale;
  onSelectRoot: (root: Note) => void;
  onSelectScale: (scale: Scale) => void;
};

export const Controls = ({
  onStart,
  onStop,
  root,
  onSelectRoot,
  onSelectScale,
}: ControlsProps) => {
  const setScale: ChangeEventHandler<HTMLSelectElement> = (e) =>
    onSelectScale(Scales[e.target.value]);

  const setRoot: ChangeEventHandler<HTMLSelectElement> = (e) =>
    onSelectRoot(e.target.value as Note);

  return (
    <div>
      <button onClick={onStart}>Start</button>
      <button onClick={onStop}>Stop</button>
      <select defaultValue={root}>
        {RootNotes.map((n) => (
          <option value={n} key={n}>
            {n}
          </option>
        ))}
      </select>
      <select onChange={setScale} defaultValue="wholeTone">
        {Object.keys(Scales).map((s) => (
          <option value={s} key={s}>
            {s}
          </option>
        ))}
      </select>
    </div>
  );
};
