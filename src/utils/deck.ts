import type { Card, CardValue, Suit, Difficulty } from '../types';
import { CARD_VALUE_LABEL, DIFFICULTY_CONFIG } from '../constants';

const SUITS: Suit[] = ['spade', 'club', 'heart', 'diamond'];
const VALUES: CardValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

export function createDeck(): Card[] {
  const deck: Card[] = [];

  for (const suit of SUITS) {
    for (const value of VALUES) {
      deck.push({
        suit,
        value,
        display: CARD_VALUE_LABEL[value],
      });
    }
  }

  return deck;
}

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffled = [...deck];

  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}

export function createShuffledDeck(): Card[] {
  return shuffleDeck(createDeck());
}

export function getExerciseCount(card: Card, difficulty: Difficulty): number {
  const config = DIFFICULTY_CONFIG[difficulty];

  if (config.isHardcore) {
    return card.value;
  }

  if (card.value >= 11 || card.value === 1) {
    return config.faceCardValue;
  }

  return card.value;
}
