import { useState, useCallback, useEffect, useRef } from 'react';
import type { Card, Difficulty, SessionPhase, WorkoutStats, ExerciseType } from '../types';
import { DIFFICULTY_CONFIG, SUIT_TO_EXERCISE } from '../constants';
import { createShuffledDeck, getExerciseCount } from '../utils/deck';
import { useStopwatch } from './useTimer';

interface UseWorkoutSessionReturn {
  phase: SessionPhase;
  currentCard: Card | null;
  currentExercise: ExerciseType | null;
  exerciseCount: number;
  completedCards: number;
  totalCards: number;
  restTime: number;
  stats: WorkoutStats;
  isPaused: boolean;
  difficulty: Difficulty;
  startSession: (difficulty: Difficulty) => void;
  completeExercise: () => void;
  skipRest: () => void;
  pause: () => void;
  resume: () => void;
  quit: () => void;
  reset: () => void;
}

const initialStats: WorkoutStats = {
  squat: 0,
  situp: 0,
  burpee: 0,
  pushup: 0,
  totalExerciseTime: 0,
  totalRestTime: 0,
  completedCards: 0,
};

export function useWorkoutSession(): UseWorkoutSessionReturn {
  const [phase, setPhase] = useState<SessionPhase>('ready');
  const [difficulty, setDifficulty] = useState<Difficulty>('beginner');
  const [deck, setDeck] = useState<Card[]>([]);
  const [currentCard, setCurrentCard] = useState<Card | null>(null);
  const [stats, setStats] = useState<WorkoutStats>(initialStats);
  const [isPaused, setIsPaused] = useState(false);
  const [exerciseStartTime, setExerciseStartTime] = useState(0);
  const [restTime, setRestTime] = useState(0);

  const exerciseTimer = useStopwatch();
  const restIntervalRef = useRef<number | null>(null);

  const config = DIFFICULTY_CONFIG[difficulty];

  const clearRestInterval = useCallback(() => {
    if (restIntervalRef.current) {
      clearInterval(restIntervalRef.current);
      restIntervalRef.current = null;
    }
  }, []);

  const drawNextCard = useCallback(() => {
    clearRestInterval();
    setRestTime(0);

    setDeck((currentDeck) => {
      if (currentDeck.length === 0) {
        setPhase('complete');
        return currentDeck;
      }

      const [nextCard, ...remaining] = currentDeck;
      setCurrentCard(nextCard);
      setPhase('exercise');
      setExerciseStartTime(Date.now());
      exerciseTimer.reset();
      exerciseTimer.start();
      return remaining;
    });
  }, [exerciseTimer, clearRestInterval]);

  const startRestTimer = useCallback((seconds: number) => {
    setRestTime(seconds);
    setPhase('rest');

    restIntervalRef.current = window.setInterval(() => {
      setRestTime((prev) => {
        if (prev <= 1) {
          clearRestInterval();
          setStats((s) => ({
            ...s,
            totalRestTime: s.totalRestTime + seconds,
          }));
          drawNextCard();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  }, [clearRestInterval, drawNextCard]);

  const startSession = useCallback((selectedDifficulty: Difficulty) => {
    setDifficulty(selectedDifficulty);
    setStats(initialStats);
    setIsPaused(false);
    clearRestInterval();

    const newDeck = createShuffledDeck();
    const [firstCard, ...remaining] = newDeck;
    setDeck(remaining);
    setCurrentCard(firstCard);
    setPhase('exercise');
    setExerciseStartTime(Date.now());
    exerciseTimer.reset();
    exerciseTimer.start();
  }, [exerciseTimer, clearRestInterval]);

  const completeExercise = useCallback(() => {
    if (!currentCard || phase !== 'exercise') return;

    exerciseTimer.stop();
    const exerciseDuration = Math.floor((Date.now() - exerciseStartTime) / 1000);

    const exerciseType = SUIT_TO_EXERCISE[currentCard.suit];
    const count = getExerciseCount(currentCard, difficulty);

    setStats((prev) => ({
      ...prev,
      [exerciseType]: prev[exerciseType] + count,
      totalExerciseTime: prev.totalExerciseTime + exerciseDuration,
      completedCards: prev.completedCards + 1,
    }));

    const restDuration = DIFFICULTY_CONFIG[difficulty].restTime;

    if (restDuration > 0 && deck.length > 0) {
      startRestTimer(restDuration);
    } else {
      drawNextCard();
    }
  }, [currentCard, phase, difficulty, deck.length, exerciseTimer, exerciseStartTime, startRestTimer, drawNextCard]);

  const skipRest = useCallback(() => {
    if (phase !== 'rest') return;

    const usedRestTime = config.restTime - restTime;
    setStats((prev) => ({
      ...prev,
      totalRestTime: prev.totalRestTime + usedRestTime,
    }));

    clearRestInterval();
    drawNextCard();
  }, [phase, restTime, config.restTime, clearRestInterval, drawNextCard]);

  const pause = useCallback(() => {
    setIsPaused(true);
    if (phase === 'exercise') {
      exerciseTimer.stop();
    } else if (phase === 'rest') {
      clearRestInterval();
    }
  }, [phase, exerciseTimer, clearRestInterval]);

  const resume = useCallback(() => {
    setIsPaused(false);
    if (phase === 'exercise') {
      exerciseTimer.start();
    } else if (phase === 'rest' && restTime > 0) {
      restIntervalRef.current = window.setInterval(() => {
        setRestTime((prev) => {
          if (prev <= 1) {
            clearRestInterval();
            setStats((s) => ({
              ...s,
              totalRestTime: s.totalRestTime + config.restTime,
            }));
            drawNextCard();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [phase, exerciseTimer, restTime, config.restTime, clearRestInterval, drawNextCard]);

  const quit = useCallback(() => {
    exerciseTimer.stop();
    clearRestInterval();
    setPhase('complete');
  }, [exerciseTimer, clearRestInterval]);

  const reset = useCallback(() => {
    setPhase('ready');
    setDeck([]);
    setCurrentCard(null);
    setStats(initialStats);
    setIsPaused(false);
    setRestTime(0);
    exerciseTimer.reset();
    clearRestInterval();
  }, [exerciseTimer, clearRestInterval]);

  useEffect(() => {
    return () => {
      clearRestInterval();
    };
  }, [clearRestInterval]);

  const currentExercise = currentCard ? SUIT_TO_EXERCISE[currentCard.suit] : null;
  const exerciseCount = currentCard ? getExerciseCount(currentCard, difficulty) : 0;

  return {
    phase,
    currentCard,
    currentExercise,
    exerciseCount,
    completedCards: stats.completedCards,
    totalCards: 52,
    restTime,
    stats,
    isPaused,
    difficulty,
    startSession,
    completeExercise,
    skipRest,
    pause,
    resume,
    quit,
    reset,
  };
}
