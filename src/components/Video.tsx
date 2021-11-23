import React, { useEffect, useState } from "react";
import * as Tone from "tone";

import * as CSS from "csstype";
import { useCache } from "./Cache";

export type VisualsProps = {
  digit: number;
  time: any;
  palette?: palette;
};

export type Coordinate = {
  x: number;
  y: number;
};

const asRgbPart = (digits: number[]) =>
  ((digits[0] * 100 + digits[1] * 10 + digits[2]) % 255).toString(16);

export const asRgbString = (digits: number[]) => {
  return (
    "#" +
    asRgbPart(digits.slice(0, 3)) +
    asRgbPart(digits.slice(3, 6)) +
    asRgbPart(digits.slice(6, 9))
  );
};

// 10 colors, one for each digit
// prettier-ignore
export type palette = [ string, string, string, string, string, string, string, string, string, string ];
// prettier-ignore
export const Palettes: Record<string, palette> = {
  gulf: [ "#7A0300", "#C81201", "#F73600", "#ED6501", "#686972", "#D4F3FF", "#75D5FE", "#2BA7D9", "#215E88", "#182F75", ],
  redToGreen: [ "#aa3e3c", "#ac4f3d", "#af613d", "#b1733d", "#b4863d", "#b69a3d", "#b9af3d", "#b3bb3d", "#a2be3d", "#90c13d", ],
  gulf2: [ "#e9ebed", "#bfbdbc", "#757376", "#c9f8fe", "#5bd7fd", "#2788b6", "#162e75", "#fe8302", "#ec6401", "#fe4502", ],
  muted: [ "#95c165", "#354c28", "#0180fe", "#02408f", "#1de5e0", "#026466", "#ca61d0", "#4c2175", "#df894c", "#5a311d", ],
};

export const useColor = (
  digit: number,
  time: Tone.Unit.Time,
  palette?: palette
) => {
  const [color, setColor] = useState<CSS.Property.Color>();
  if (palette) {
    useEffect(() => {
      setColor(palette[digit]);
    }, [time]);
  } else {
    const cache = useCache(digit, 9);
    useEffect(() => {
      setColor(asRgbString(cache));
    }, [time]);
  }
  return color;
};
