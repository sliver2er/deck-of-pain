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
            stroke="#E5E5E5"
            strokeWidth="8"
          />
          <circle
            cx="60"
            cy="60"
            r="45"
            fill="none"
            stroke="#3182F6"
            strokeWidth="8"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            style={styles.progressCircle}
          />
        </svg>
        <div style={styles.timeDisplay}>
          <span style={styles.timeText}>{timeLeft}</span>
          <span style={styles.unitText}>초</span>
        </div>
      </div>

      <p style={styles.label}>쉬는 시간</p>

      {onSkip && (
        <button onClick={onSkip} style={styles.skipButton}>
          건너뛰기
        </button>
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
  timeText: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#191F28',
  },
  unitText: {
    fontSize: '16px',
    color: '#6B7684',
  },
  label: {
    fontSize: '16px',
    color: '#6B7684',
    margin: 0,
  },
  skipButton: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: '600',
    color: '#3182F6',
    backgroundColor: 'transparent',
    border: '1px solid #3182F6',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};
