import * as React from "react";
import { digitGenerator } from "../pi";

export const Pi = () => {
  const digits = digitGenerator();

  const onProduce = () => {};

  digits.next().value; // advance to first decimal place

  const decimalPlaceCount = 1000;
  const decimalPlaces: number[] = Array(decimalPlaceCount);
  for (var i = 0; i < decimalPlaceCount; i++) {
    decimalPlaces[i] = digits.next().value;
  }

  return (
    <div style={{wordWrap: "break-word"}}>
      <h1>π</h1>
      <p>3.{decimalPlaces.join('')}</p>
    </div>
  );
};
