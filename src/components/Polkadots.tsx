import React, { useEffect, useRef, useState } from "react";
import { useColor } from "./Video";

import * as CSS from "csstype";
import { useCache } from "./Cache";
import { VisualsProps } from "~/types";

type CircleDefinition = {
  fill: CSS.Property.Color;
  r: number;
  cx: number;
  cy: number;
  key?: string;
};
export const Polkadots = ({ digit, time }: VisualsProps) => {
  const maxDots = 15;
  const color = useColor(digit, time);
  const [dots, setDots] = useState<CircleDefinition[]>([]);
  const cache = useCache(digit, 5);

  useEffect(() => {
    if (cache.length > 4) {
      setDots((s) =>
        [
          {
            fill: color,
            r: cache[0] / 2,
            cx: Math.max(cache[0], 10 * cache[1] + cache[2] - 2 * cache[0]),
            cy: Math.max(cache[0], 10 * cache[3] + cache[4] - 2 * cache[0]),
            key: cache.reduce((i, acc) => acc + i, ""),
          },
          ...s,
        ].slice(0, maxDots)
      );
    }
  }, [time]);

  return (
    <div>
      <svg viewBox="0 0 100 100">
        <rect width="100%" height="100%" fill="slategray" />
        {dots?.map((d, idx) => (
          <circle {...d} key={idx} className="polkadot"></circle>
        ))}
      </svg>
    </div>
  );
};
