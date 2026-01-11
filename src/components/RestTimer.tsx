import { Text, Button } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface RestTimerProps {
  timeLeft: number;
  totalTime: number;
  onSkip?: () => void;
}

export function RestTimer({ timeLeft, totalTime, onSkip }: RestTimerProps) {
  const progress = totalTime > 0 ? (timeLeft / totalTime) * 100 : 0;
  const circumference = 2 * Math.PI * 45;
  const strokeDashoffset = circumference * (1 - progress / 100);

  return (
    <div style={styles.container}>
      <div style={styles.timerWrapper}>
        <svg width="120" height="120" style={styles.svg}>
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={adaptive.greyOpacity100}
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke={adaptive.blue500}
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={styles.progressCircle}
          />
        </svg>
        <div style={styles.timeDisplay}>
          <Text typography="t1" fontWeight="bold" color={adaptive.grey900}>
            {timeLeft}
          </Text>
          <Text typography="t6" color={adaptive.grey500}>
            초
          </Text>
        </div>
      </div>

      <Text typography="t5" color={adaptive.grey600}>
        쉬는 시간
      </Text>

      {onSkip && (
        <Button
          size="medium"
          variant="weak"
          color="primary"
          onClick={onSkip}
        >
          건너뛰기
        </Button>
      )}
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '16px',
  },
  timerWrapper: {
    position: 'relative',
    width: '120px',
    height: '120px',
  },
  svg: {
    transform: 'rotate(-90deg)',
  },
  progressCircle: {
    transition: 'stroke-dashoffset 0.3s ease',
  },
  timeDisplay: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    display: 'flex',
    alignItems: 'baseline',
    gap: '2px',
  },
};
