import { useState, useCallback, useRef, useEffect } from 'react';

interface UseStopwatchReturn {
  time: number;
  isRunning: boolean;
  start: () => void;
  stop: () => void;
  reset: () => void;
}

export function useStopwatch(): UseStopwatchReturn {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback(() => {
    if (!isRunning) {
      setIsRunning(true);
    }
  }, [isRunning]);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    setIsRunning(false);
  }, []);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  return { time, isRunning, start, stop, reset };
}

interface UseCountdownReturn {
  time: number;
  isRunning: boolean;
  isComplete: boolean;
  start: (seconds: number) => void;
  stop: () => void;
  reset: () => void;
}

export function useCountdown(onComplete?: () => void): UseCountdownReturn {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const start = useCallback((seconds: number) => {
    setTime(seconds);
    setIsRunning(true);
    setIsComplete(false);
  }, []);

  const stop = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setTime(0);
    setIsRunning(false);
    setIsComplete(false);
  }, []);

  useEffect(() => {
    if (isRunning && time > 0) {
      intervalRef.current = window.setInterval(() => {
        setTime((prev) => {
          if (prev <= 1) {
            setIsRunning(false);
            setIsComplete(true);
            onCompleteRef.current?.();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, time]);

  return { time, isRunning, isComplete, start, stop, reset };
}
