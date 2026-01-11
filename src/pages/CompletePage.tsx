import { Text, Button } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";

interface CompletePageProps {
  onViewStats: () => void;
  onGoHome: () => void;
}

export function CompletePage({ onViewStats, onGoHome }: CompletePageProps) {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.emoji}>🎉</div>
        <Text typography="t1" fontWeight="bold" color={adaptive.grey900}>
          축하해요
        </Text>
        <Text
          typography="t5"
          color={adaptive.grey600}
          style={{ marginTop: 12 }}
        >
          52장의 카드를 모두 완료했어요
        </Text>
      </div>

      <div style={styles.buttons}>
        <Button
          size="xlarge"
          variant="fill"
          color="primary"
          display="block"
          onClick={onViewStats}
        >
          통계 보기
        </Button>
        <Button
          size="xlarge"
          variant="weak"
          color="light"
          display="block"
          onClick={onGoHome}
        >
          홈으로
        </Button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    backgroundColor: adaptive.background,
  },
  content: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "24px",
    textAlign: "center",
  },
  emoji: {
    fontSize: "80px",
    marginBottom: "24px",
  },
  buttons: {
    padding: "20px",
    paddingBottom: "34px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
};
