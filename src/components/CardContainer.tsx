import { useState, useEffect } from 'react';
import { Text } from '@toss/tds-mobile';
import type { Card, ExerciseType } from '../types';
import { SUIT_SYMBOL, SUIT_COLOR, EXERCISE_IMAGES } from '../constants';

interface CardContainerProps {
  card: Card;
  exerciseType: ExerciseType;
}

export function CardContainer({ card, exerciseType }: CardContainerProps) {
  const [isUp, setIsUp] = useState(true);

  const color = SUIT_COLOR[card.suit];
  const symbol = SUIT_SYMBOL[card.suit];
  const images = EXERCISE_IMAGES[exerciseType];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsUp((prev) => !prev);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.card}>
      <div style={styles.cornerTopLeft}>
        <Text typography="t3" fontWeight="bold" style={{ color, lineHeight: 1 }}>
          {card.display}
        </Text>
        <Text typography="t4" style={{ color, lineHeight: 1, marginTop: 4 }}>
          {symbol}
        </Text>
      </div>

      <div style={styles.center}>
        <img
          src={isUp ? images.up : images.down}
          alt={exerciseType}
          style={styles.exerciseImage}
        />
      </div>

      <div style={styles.cornerBottomRight}>
        <Text typography="t3" fontWeight="bold" style={{ color, lineHeight: 1 }}>
          {card.display}
        </Text>
        <Text typography="t4" style={{ color, lineHeight: 1, marginTop: 4 }}>
          {symbol}
        </Text>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  card: {
    position: 'relative',
    width: '280px',
    height: '400px',
    backgroundColor: '#FFFFFF',
    borderRadius: '16px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: '16px',
    left: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: '16px',
    right: '16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    transform: 'rotate(180deg)',
  },
  center: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exerciseImage: {
    width: '160px',
    height: '160px',
    objectFit: 'contain',
  },
};
