import React, {  useEffect, useRef, useState } from "react";
import { useColor } from "./Video";

import { VisualsProps } from "~/types";

export const Pixels = ({ digit, time }: VisualsProps) => {
  const rectSize = 2;
  const width = 100;
  const height = 100;
  const color = useColor(digit, time);
  const [position, setPosition] = useState([0, 0]);
  const [index, setIndex] = useState(0);
  const svg = useRef<SVGSVGElement>(null);


  useEffect(() => {
    for (let i = 0; i <= width; i = i + rectSize) {
      if (svg.current) {
        // adding directly to svg to get around constant state recomputation
        const l1 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l1.setAttribute("stroke", "#aeaeae");
        l1.setAttribute("stroke-width", "0.1");
        l1.setAttribute("y1", "0");
        l1.setAttribute("y2", height.toString());
        l1.setAttribute("x1", i.toString());
        l1.setAttribute("x2", i.toString());
        svg.current.appendChild(l1);
        
        const l2 = document.createElementNS("http://www.w3.org/2000/svg", "line");
        l2.setAttribute("stroke", "#aeaeae");
        l2.setAttribute("stroke-width", "0.1");
        l2.setAttribute("y1", i.toString());
        l2.setAttribute("y2", i.toString());
        l2.setAttribute("x1", "0");
        l2.setAttribute("x2", width.toString());
  
        svg.current.appendChild(l2);
      }
    }
  }, []);

  useEffect(() => {
    setIndex((s) => ++s);
    setPosition([
      ((index * rectSize) % width),
      (Math.floor(index * rectSize / width) * rectSize) % height,
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
      <svg viewBox={`0 0 ${width} ${height}`} ref={svg}>
        <rect width="100%" height="100%" fill="slategray" />
      </svg>
    </div>
  );
};
