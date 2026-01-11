import { Text } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';

interface ProgressIndicatorProps {
  current: number;
  total: number;
}

export function ProgressIndicator({ current, total }: ProgressIndicatorProps) {
  const progress = total > 0 ? (current / total) * 100 : 0;

  return (
    <div style={styles.container}>
      <div style={styles.textRow}>
        <Text typography="t3" fontWeight="bold" color={adaptive.grey900}>
          {current}
        </Text>
        <Text typography="t5" color={adaptive.grey500}>
          /{total}
        </Text>
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
    gap: '2px',
  },
  progressBar: {
    width: '100%',
    height: '4px',
    backgroundColor: adaptive.greyOpacity100,
    borderRadius: '2px',
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: adaptive.blue500,
    borderRadius: '2px',
    transition: 'width 0.3s ease',
  },
};
