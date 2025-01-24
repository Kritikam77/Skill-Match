import { useState, useEffect } from "react";

// Define the return type of the custom hook
interface ScrollState {
  scroll: number;
  direction: "up" | "down";
}
const minScroll=-10;
const maxScroll=210;

// Custom hook to track scroll direction and scroll count
export function useScroll(): ScrollState {
  const [scroll, setScroll] = useState<number>(0);
  const [direction, setDirection] = useState<"up" | "down">("down");

  useEffect(() => {

    function handleScroll(e: WheelEvent) {
      if (e.deltaY > 0 && scroll < maxScroll) {
        setDirection("down");
        setScroll((prev) => prev + 1);
      } else if (e.deltaY < 0 && scroll > minScroll) {
        setDirection("up");
        setScroll((prev) => prev - 1);
      }
    }

    document.addEventListener("wheel", handleScroll);

    return () => {
      document.removeEventListener("wheel", handleScroll);
    };
  }, [scroll]);

  return { scroll, direction };
}
