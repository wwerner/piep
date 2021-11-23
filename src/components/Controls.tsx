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
    <div className="controls columns p-1">
      <div className="column">
        <button
          className="button is-success is-medium control"
          onClick={onStart}
          style={{ width: "100%" }}
        >
          <span className="icon">
            <i className="fas fa-play-circle"></i>
          </span>
          <span>Start</span>
        </button>
      </div>
      <div className="column">
        <button
          className="button is-danger is-medium"
          onClick={onStop}
          style={{ width: "100%" }}
        >
          {" "}
          <span className="icon">
            <i className="fas fa-stop-circle"></i>
          </span>
          <span>Stop</span>
        </button>
      </div>
      <div className="column">
        <select
          className="select is-medium"
          onChange={setRoot}
          defaultValue={root}
          style={{ width: "100%" }}
        >
          {RootNotes.map((n) => (
            <option value={n} key={n}>
              {n}
            </option>
          ))}
        </select>
      </div>
      <div className="column">
        <select
          style={{ width: "100%" }}
          className="select is-medium"
          onChange={setScale}
          defaultValue="wholeTone"
        >
          {Object.keys(Scales).map((s) => (
            <option value={s} key={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
