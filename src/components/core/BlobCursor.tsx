import { useTrail, animated } from "@react-spring/web";
import { useRef, useEffect, useCallback } from "react";

import "@/styles/blobcursor.css";

const fast = { tension: 1200, friction: 40 };
const slow = { mass: 15, tension: 200, friction: 50 };
const trans = (x: number, y: number) =>
  `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;

const BlobCursor = ({ blobType = "circle", fillColor = "#6f320c" }) => {
  const [trail, api] = useTrail(3, (i) => ({
    xy: [0, 0],
    config: i === 0 ? fast : slow,
  }));

  const ref = useRef<HTMLDivElement>(null);

  const updatePosition = useCallback(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      return { left: rect.left, top: rect.top };
    }
    return { left: 0, top: 0 };
  }, []);

  interface Position {
    left: number;
    top: number;
  }

  const handleMove = (e: MouseEvent | TouchEvent) => {
    const { left, top }: Position = updatePosition();
    const x =
      (e as MouseEvent).clientX ||
      ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientX);
    const y =
      (e as MouseEvent).clientY ||
      ((e as TouchEvent).touches && (e as TouchEvent).touches[0].clientY);
    api.start({ xy: [x - left, y - top] });
  };

  useEffect(() => {
    const handleResize = () => {
      updatePosition();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [updatePosition]);

  return (
    <div className="container">
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <filter id="blob">
          <feGaussianBlur in="SourceGraphic" result="blur" stdDeviation="30" />
          <feColorMatrix
            in="blur"
            values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 35 -10"
          />
        </filter>
      </svg>
      <div
        ref={ref}
        className="main"
        onMouseMove={(e) => handleMove(e as unknown as MouseEvent)}
        onTouchMove={(e) => handleMove(e as unknown as TouchEvent)}
      >
        {trail.map((props, index) => (
          <animated.div
            key={index}
            style={{
              transform: props.xy.to(trans),
              borderRadius: blobType === "circle" ? "50%" : "0%",
              backgroundColor: fillColor,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default BlobCursor;
