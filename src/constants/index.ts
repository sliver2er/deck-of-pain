import type { Difficulty, DifficultyConfig, Suit, ExerciseType } from '../types';

export const DIFFICULTY_CONFIG: Record<Difficulty, DifficultyConfig> = {
  beginner: { name: '입문', restTime: 20, faceCardValue: 10, isHardcore: false },
  easy: { name: '초급', restTime: 15, faceCardValue: 10, isHardcore: false },
  medium: { name: '중급', restTime: 8, faceCardValue: 10, isHardcore: false },
  hard: { name: '고급', restTime: 3, faceCardValue: 10, isHardcore: false },
  hardcore: { name: '하드코어', restTime: 0, faceCardValue: 0, isHardcore: true },
};

export const SUIT_TO_EXERCISE: Record<Suit, ExerciseType> = {
  spade: 'squat',
  club: 'situp',
  heart: 'burpee',
  diamond: 'pushup',
};

export const EXERCISE_NAME: Record<ExerciseType, string> = {
  squat: '스쿼트',
  situp: '싯업',
  burpee: '버피',
  pushup: '푸쉬업',
};

export const EXERCISE_IMAGES: Record<ExerciseType, { up: string; down: string }> = {
  squat: { up: '/assets/icons/squat_up.png', down: '/assets/icons/squat_down.png' },
  situp: { up: '/assets/icons/situp_up.png', down: '/assets/icons/situp_down.png' },
  burpee: { up: '/assets/icons/burpee_up.png', down: '/assets/icons/burpee_down.png' },
  pushup: { up: '/assets/icons/pushup_up.png', down: '/assets/icons/pushup_down.png' },
};

export const CARD_DISPLAY: Record<number, string> = {
  1: 'A',
  2: '2',
  3: '3',
  4: '4',
  5: '5',
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
};

export const SUIT_SYMBOL: Record<Suit, string> = {
  spade: '♠',
  club: '♣',
  heart: '♥',
  diamond: '♦',
};

export const SUIT_COLOR: Record<Suit, string> = {
  spade: '#000000',
  club: '#000000',
  heart: '#FF0000',
  diamond: '#FF0000',
};
