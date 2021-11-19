import { useEffect, useState } from "react";

export const useCache = (digit: number, size: number) => {
  const [cache, setCache] = useState(Array.from({ length: size }, () => 0));

  useEffect(() => {
    setCache((s) => [digit, ...s].slice(0, size)); // poor man's ring buffer
  }, [digit]);

  return cache
};
