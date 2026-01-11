import { useState, useCallback } from 'react';
import type { Card } from '../types';
import { createShuffledDeck } from '../utils/deck';

interface UseDeckReturn {
  currentCard: Card | null;
  remainingCount: number;
  totalCount: number;
  drawCard: () => Card | null;
  reset: () => void;
}

export function useDeck(): UseDeckReturn {
  const [deck, setDeck] = useState<Card[]>(() => createShuffledDeck());
  const [currentCard, setCurrentCard] = useState<Card | null>(null);

  const drawCard = useCallback(() => {
    if (deck.length === 0) {
      return null;
    }

    const [drawnCard, ...remaining] = deck;
    setDeck(remaining);
    setCurrentCard(drawnCard);
    return drawnCard;
  }, [deck]);

  const reset = useCallback(() => {
    setDeck(createShuffledDeck());
    setCurrentCard(null);
  }, []);

  return {
    currentCard,
    remainingCount: deck.length,
    totalCount: 52,
    drawCard,
    reset,
  };
}
