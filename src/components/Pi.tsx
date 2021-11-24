import * as React from "react";
import { useEffect, useState } from "react";

type PiProps = {
  digit: number | undefined ;
};
export const Pi = ({ digit }: PiProps) => {
  const [pi, setPi] = useState("");

  useEffect(() => {
    if (digit !== undefined) {
      setPi((s) => (s === "" ? `${digit}.` : `${s}${digit}`)); // add decimal separator after first digit
    }
  }, [digit]);

  return (
    <div className="pi" style={{ width: "100%", textAlign: "center" }}>
      {pi ? (
        pi
      ) : (
        <button
          style={{ border: 0, backgroundColor: "transparent" }}
          className="button is-loading is-large"
        ></button>
      )}
    </div>
  );
};
