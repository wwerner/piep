import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { gsap, Quad } from "gsap";
import * as CSS from "csstype";

import { useColor } from "./Video";
import { useCache } from "./Cache";
import { VisualsProps } from "~/types";

type CircleDefinition = {
  fill: CSS.Property.Color;
  r: number;
  cx: number;
  cy: number;
  id: string;
};
export const PolkadotsAnimated = ({ digit, time }: VisualsProps) => {
  const maxDots = 25;
  const color = useColor(digit, time);
  const [dots, setDots] = useState<CircleDefinition[]>([]);
  const cache = useCache(digit, 5);

  const svg = useRef<SVGSVGElement>(null);
  const q = gsap.utils.selector(svg);

  useEffect(() => {}, []);

  useEffect(() => {
    if (cache.length > 4) {
      const id = `polkadot-${new Date().getTime()}`;
      setDots((s) =>
        [
          {
            fill: color,
            r: cache[0] / 2,
            cx: cache[0],
            cy: cache[0],
            id,
          },
          ...s,
        ].slice(0, maxDots)
      );
      // setTimeout(() => {
      //   gsap
      //     .timeline({ repeat: 0 })
      //     .to(
      //       q(`#${id}`),
      //       {
      //         transformOrigin: "center center",
      //         ease: "power4.in",
      //         autoAlpha: 0,
      //         scale: 0.1,
      //         duration: 1,
      //         reversed: true,
      //       },
      //       5
      //     )
      //     .to(q(`#${id}`), {
      //       transformOrigin: "center center",
      //       autoAlpha: 0,
      //       scale: 2,
      //       ease: "power4.in",
      //       duration: maxDots * 0.5,
      //     });
      // }, 0);
    }
  }, [time]);

  return (
    <div>
      <svg viewBox="0 0 100 100" ref={svg}>
        <rect width="100%" height="100%" fill="slategray" />
        {dots?.map((d, idx) => (
          <circle {...d} key={d.id} className="polkadot-animated"></circle>
        ))}
      </svg>
    </div>
  );
};
