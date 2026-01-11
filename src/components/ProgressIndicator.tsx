interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div style={styles.container}>
      <div style={styles.textRow}>
        <span style={styles.currentText}>{current}</span>
        <span style={styles.separator}>/</span>
        <span style={styles.totalText}>{total}</span>
      </div>
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressFill, width: `${progress}%` }} />
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
  },
  textRow: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '4px',
  },
  currentText: {
    fontSize: '24px',
    fontWeight: 'bold',
    color: '#191F28',
  },
  separator: {
    fontSize: '18px',
    color: '#8B95A1',
  },
  totalText: {
    fontSize: '18px',
    color: '#8B95A1',
  },
  progressBar: {
    width: '100%',
    height: '4px',
    backgroundColor: '#E5E8EB',
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#3182F6',
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
};
