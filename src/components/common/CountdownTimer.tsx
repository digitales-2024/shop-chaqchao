import { useEffect, useState } from "react";

interface CountdownTimerProps {
  duration: number; // Duración en segundos
  onComplete: () => void;
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({
  duration,
  onComplete,
}) => {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    if (timeLeft <= 0) {
      onComplete();
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft, onComplete]);

  const formatTime = (time: number): string => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return <div>Tiempo restante: {formatTime(timeLeft)}</div>;
};

export default CountdownTimer;
