import React, { useEffect, useState } from "react";
import * as Tone from "tone";

import * as CSS from "csstype";
import { useCache } from "./Cache";

const asRgbPart = (digits: number[]) =>
  (digits[0] * 100 + digits[1] * 10 + digits[2]) % 255;

export const asRgbString = (digits: number[]) => {
  console.log(digits);
  return (
    "rgb(" + // reads nicer than as template string
    asRgbPart(digits.slice(0, 3)) +
    "," +
    asRgbPart(digits.slice(3, 6)) +
    "," +
    asRgbPart(digits.slice(6, 9)) +
    ")"
  );
};
export const useColor = (digit: number, time: Tone.Unit.Time) => {
  const [color, setColor] = useState<CSS.Property.Color>("black");
  const cache = useCache(digit, 9);

  useEffect(() => {
    setColor(asRgbString(cache));
  }, [time]);

  return color;
};
