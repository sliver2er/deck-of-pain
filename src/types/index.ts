export type Suit = 'spade' | 'club' | 'heart' | 'diamond';

export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13;

export interface Card {
  suit: Suit;
  value: CardValue;
  display: string;
}

export type ExerciseType = 'squat' | 'situp' | 'burpee' | 'pushup';

export type Difficulty = 'beginner' | 'easy' | 'medium' | 'hard' | 'hardcore';

export type SessionPhase = 'ready' | 'exercise' | 'rest' | 'complete';

export interface WorkoutStats {
  squat: number;
  situp: number;
  burpee: number;
  pushup: number;
  totalExerciseTime: number;
  totalRestTime: number;
  completedCards: number;
}

export interface DifficultyConfig {
  name: string;
  restTime: number;
  faceCardValue: number;
  isHardcore: boolean;
}
