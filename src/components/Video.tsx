import React, { useEffect, useState } from "react";
import * as Tone from "tone";

import * as CSS from "csstype";
import { useCache } from "./Cache";

export const useColor = (digit: number, time: Tone.Unit.Time) => {
  const [color, setColor] = useState<CSS.Property.Color>("black");
  const cache = useCache(digit, 9);

  const asRgbPart = (digits: number[]) =>
    (digits[0] * 100 + digits[1] * 10 + digits[2]) % 255;

  useEffect(() => {
    setColor(
      // prettier-ignore
      "rgb(" + // reads nicer as template string
        asRgbPart(cache.slice(0, 3)) + "," +
        asRgbPart(cache.slice(3, 6)) + "," +
        asRgbPart(cache.slice(6, 9)) +
      ")"
    );
  }, [time]);

  return color;
};
