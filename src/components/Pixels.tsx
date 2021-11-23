import React, { useEffect, useRef, useState } from "react";
import { palette, useColor, VisualsProps } from "./Video";
import * as CSS from "csstype";

type PixelsProps = VisualsProps & {
  lines?: boolean;
  size?: number;
  displayDigits?: boolean;
};

type PixelDefinition = {
  fill: CSS.Property.Color | undefined;
  digit: number;
  x: number;
  y: number;
};

const invertHex = (hex: string = '#FF0000') => {
  return (
    "#" +
    (Number(`0x1${hex.substring(1)}`) ^ 0xffffff)
      .toString(16)
      .substring(1)
      .toUpperCase()
  );
};

export const Pixels = ({
  digit,
  time,
  palette = undefined,
  lines = false,
  size = 10,
  displayDigits = false,
}: PixelsProps) => {
  const pixelSize = 2;
  const canvasSize = size * pixelSize;
  const color = useColor(digit, time, palette);
  const [index, setIndex] = useState(0);
  const svg = useRef<SVGSVGElement>(null);
  const [grid, setGrid] = useState<PixelDefinition[][]>(
    Array.from({ length: canvasSize }, (_, y) =>
      Array.from({ length: canvasSize }, (_, x) => ({
        fill: "slategray",
        digit: -1,
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
      grid[pixel.x][pixel.y] = pixel;
      return grid;
    });
  };

  useEffect(() => {
    setIndex((s) => ++s);

    updateGrid({
      fill: color,
      digit: digit,
      x: index % size,
      y: Math.floor((index / size) % size),
    });
  }, [time]);

  return (
    <div className="m-0 p-0">
      <svg viewBox={`0 0 ${canvasSize} ${canvasSize}`} ref={svg}>
        <rect width="100%" height="100%" fill="slategray" />
        {grid.map((row, yIdx) =>
          row.map(({ fill, x, y, digit }, xIdx) => (
            <g>
              <rect
                key={`pixel-${x}-${y}`}
                fill={fill}
                width={pixelSize}
                height={pixelSize}
                y={y * pixelSize}
                x={x * pixelSize}
              ></rect>
              {displayDigits && digit !== -1 && (
                <text
                  y={y * pixelSize + pixelSize * 0.87}
                  x={x * pixelSize + pixelSize * 0.13}
                  fontSize={pixelSize}
                  fill={invertHex(fill)}
                >
                  {digit}
                </text>
              )}
            </g>
          ))
        )}
      </svg>
    </div>
  );
};
