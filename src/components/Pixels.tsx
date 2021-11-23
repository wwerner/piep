import React, { useEffect, useRef, useState } from "react";
import { useColor } from "./Video";
import * as CSS from "csstype";

import { Coordinate, VisualsProps } from "~/types";

type PixelsProps = VisualsProps & { lines?: boolean; size?: number };

type PixelDefinition = {
  fill: CSS.Property.Color;
  x: number;
  y: number;
};

export const Pixels = ({
  digit,
  time,
  lines = false,
  size = 10,
}: PixelsProps) => {
  const pixelSize = 2;
  const canvasSize = size * pixelSize;
  const color = useColor(digit, time);
  const [index, setIndex] = useState(0);
  const svg = useRef<SVGSVGElement>(null);
  const [grid, setGrid] = useState<PixelDefinition[][]>(
    Array.from({ length: canvasSize }, (_, y) =>
      Array.from({ length: canvasSize }, (_, x) => ({
        fill: "slategray",
        x,
        y,
      }))
    )
  );

  // add guide lines if @lines is set
  useEffect(() => {
    // adding lines directly to svg; these are static and don't require to be rendered reactively
    for (let i = 0; i <= canvasSize; i = i + pixelSize) {
      if (lines && svg.current) {
        const l1 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        l1.setAttribute("stroke", "#aeaeae");
        l1.setAttribute("stroke-width", "0.1");
        l1.setAttribute("y1", "0");
        l1.setAttribute("y2", canvasSize.toString());
        l1.setAttribute("x1", i.toString());
        l1.setAttribute("x2", i.toString());
        svg.current.appendChild(l1);

        const l2 = document.createElementNS(
          "http://www.w3.org/2000/svg",
          "line"
        );
        l2.setAttribute("stroke", "#aeaeae");
        l2.setAttribute("stroke-width", "0.1");
        l2.setAttribute("y1", i.toString());
        l2.setAttribute("y2", i.toString());
        l2.setAttribute("x1", "0");
        l2.setAttribute("x2", canvasSize.toString());

        svg.current.appendChild(l2);
      }
    }
  }, []);

  const updateGrid = (pixel: PixelDefinition) => {
    setGrid((grid) => {
      console.log(pixel.x, pixel.y);
      grid[pixel.x][pixel.y] = pixel;
      return grid;
    });
  };

  useEffect(() => {
    setIndex((s) => ++s);

    updateGrid({
      fill: color,
      x: index % size,
      y: Math.floor((index / size) % size),
    });
  }, [time]);

  return (
    <div>
      <svg viewBox={`0 0 ${canvasSize} ${canvasSize}`} ref={svg}>
        <rect width="100%" height="100%" fill="slategray" />
        {grid.map((row, yIdx) =>
          row.map(({ fill, x, y }, xIdx) => (
            <rect
              key={`pixel-${x}-${y}`}
              fill={fill}
              width={pixelSize}
              height={pixelSize}
              y={y * pixelSize}
              x={x * pixelSize}
            />
          ))
        )}
      </svg>
    </div>
  );
};
