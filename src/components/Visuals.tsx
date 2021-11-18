import React, { useEffect, useRef, useState } from "react";
import { useColor } from "./Video";

import * as CSS from "csstype";

type VisualsProps = {
  chunk: number[];
  time: any;
};

type CircleDefinition = {
  fill: CSS.Property.Color;
  r: number;
  cx: number;
  cy: number;
};
export const Visuals = ({ chunk, time }: VisualsProps) => {
  const maxDots = 15;
  const color = useColor(chunk, time);
  const [dots, setDots] = useState<CircleDefinition[]>([]);
  const [cache, setCache] = useState([0, 0, 0, 0, 0]);

  const svg = useRef<SVGSVGElement>(null);

  useEffect(() => {
    setCache((s) => [...chunk, ...s].slice(0, 5)); // poor man's ring buffer
  }, [chunk]);

  useEffect(() => {
    if (cache.length > 4) {
      console.log(cache, dots);
      setDots((s) =>
        [
          {
            fill: color,
            r: cache[0]/2,
            cx: Math.max(cache[0], 10 * cache[1] + cache[2] - 2 * cache[0]),
            cy: Math.max(cache[0], 10 * cache[3] + cache[4] - 2 * cache[0]),
          },
          ...s,
        ].slice(0, maxDots)
      );
    }
  }, [time]);

  return (
    <div
      style={{ backgroundColor: "slategray", border: "1px solid hotpink" }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" ref={svg}>
        {dots?.map((d, idx) => (
          <circle {...d} key={idx}></circle>
        ))}
      </svg>
    </div>
  );
};
