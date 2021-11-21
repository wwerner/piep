import React, {  useEffect, useRef, useState } from "react";
import { useColor } from "./Video";

import { VisualsProps } from "~/types";

type PixelProps = VisualsProps & { lines?: boolean, size?: number }

export const Pixels = ({ digit, time, lines = false, size = 10}: PixelProps) => {
  const rectSize = 2;
  const canvasSize = size; // side length of square, even numbers work best
  const color = useColor(digit, time);
  const [position, setPosition] = useState([0, 0]);
  const [index, setIndex] = useState(0);
  const svg = useRef<SVGSVGElement>(null);


  useEffect(() => {
    for (let i = 0; i <= canvasSize; i = i + rectSize) {
      if (lines && svg.current) {
        // adding directly to svg to get around constant state recomputation
        const l1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l1.setAttribute("stroke", "#aeaeae");
        l1.setAttribute("stroke-width", "0.1");
        l1.setAttribute("y1", "0");
        l1.setAttribute("y2", canvasSize.toString());
        l1.setAttribute("x1", i.toString());
        l1.setAttribute("x2", i.toString());
        svg.current.appendChild(l1);
        
        const l2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
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

  useEffect(() => {
    setIndex((s) => ++s);
    setPosition([
      ((index * rectSize) % canvasSize),
      (Math.floor(index * rectSize / canvasSize) * rectSize) % canvasSize,
    ]);
    
    if (svg.current) {
      // adding directly to svg to get around constant state recomputation
      const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      rect.setAttribute("fill", color);
      rect.setAttribute("width", rectSize.toString());
      rect.setAttribute("height", rectSize.toString());
      rect.setAttribute("x", position[0].toString());
      rect.setAttribute("y", position[1].toString());

      svg.current.appendChild(rect);
    }
  }, [time]);

  return (
    <div>
      <svg viewBox={`0 0 ${canvasSize} ${canvasSize}`} ref={svg}>
        <rect width="100%" height="100%" fill="slategray" />
      </svg>
    </div>
  );
};
