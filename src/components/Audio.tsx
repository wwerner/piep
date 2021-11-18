import { useEffect, useState } from "react";
import * as Tone from "tone";
import { Unit } from "tone";

// prettier-ignore
export const NOTES = [ 
    // used for playing audio
    "C0", "C#0", "D0", "D#0", "E0", "E#0", "F0", "F#0", "G0", "G#0", "A0", "A#0",
    "C1", "C#1", "D1", "D#1", "E1", "E#1", "F1", "F#1", "G1", "G#1", "A1", "A#1",
    "C2", "C#2", "D2", "D#2", "E2", "E#2", "F2", "F#2", "G2", "G#2", "A2", "A#2",
    "C3", "C#3", "D3", "D#3", "E3", "E#3", "F3", "F#3", "G3", "G#3", "A3", "A#3",
    "C4", "C#4", "D4", "D#4", "E4", "E#4", "F4", "F#4", "G4", "G#4", "A4", "A#4",
    "C5", "C#5", "D5", "D#5", "E5", "E#5", "F5", "F#5", "G5", "G#5", "A5", "A#5",
    "C6", "C#6", "D6", "D#6", "E6", "E#6", "F6", "F#6", "G6", "G#6", "A6", "A#6",
    "C7", "C#7", "D7", "D#7", "E7", "E#7", "F7", "F#7", "G7", "G#7", "A7", "A#7",
    "C8", "C#8", "D8", "D#8", "E8", "E#8", "F8", "F#8", "G8", "G#8", "A8", "A#8",
    "C9", "C#9", "D9", "D#9", "E9", "E#9", "F9", "F#9", "G9", "G#9", "A9", "A#9",
    "C10", "C#10", "D10", "D#10", "E10", "E#10", "F10", "F#10", "G10", "G#10", "A10", "A#10",
    "C11", "C#11", "D11", "D#11", "E11", "E#11", "F11", "F#11", "G11", "G#11", "A11", "A#11",
];
const BASE_NOTE_IDX = 48; // C4

export const useSynth = (chunk: number[], time: Tone.Unit.Time) => {
  const [synth, setSynth] = useState<Tone.PolySynth | undefined>(undefined);

  useEffect(() => {
    setSynth(new Tone.PolySynth().toDestination());
  }, []);

  useEffect(() => {
    if (synth) {
      synth.triggerAttackRelease(
        chunk.map((d) => NOTES[BASE_NOTE_IDX + d]),
        "8n",
        time,
        0.5
      );
    }
  }, [time]);
  
};
