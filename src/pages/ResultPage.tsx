import { Text, Button } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import type { WorkoutStats } from "../types";
import { EXERCISE_NAME } from "../constants";

interface ResultPageProps {
  stats: WorkoutStats;
  onRestart: () => void;
  onGoHome: () => void;
}

function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  if (mins === 0) return `${secs}초`;
  return `${mins}분 ${secs}초`;
}

export function ResultPage({ stats, onRestart, onGoHome }: ResultPageProps) {
  const exercises = [
    { key: "squat" as const, count: stats.squat },
    { key: "situp" as const, count: stats.situp },
    { key: "burpee" as const, count: stats.burpee },
    { key: "pushup" as const, count: stats.pushup },
  ];

  const totalExercises = exercises.reduce((sum, e) => sum + e.count, 0);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <Text typography="t2" fontWeight="bold" color={adaptive.grey900}>
          운동 결과
        </Text>
      </div>

      <div style={styles.content}>
        <div style={styles.summaryCard}>
          <Text typography="st5" fontWeight="semibold" color={adaptive.grey800}>
            완료한 카드
          </Text>
          <Text typography="t1" fontWeight="bold" color={adaptive.blue500}>
            {stats.completedCards}/52
          </Text>
        </div>

        <div style={styles.section}>
          <Text
            typography="st6"
            fontWeight="semibold"
            color={adaptive.grey600}
            style={{ marginBottom: 12 }}
          >
            운동별 횟수
          </Text>
          {exercises.map(({ key, count }) => (
            <div key={key} style={styles.statRow}>
              <Text typography="t5" color={adaptive.grey700}>
                {EXERCISE_NAME[key]}
              </Text>
              <Text typography="t5" fontWeight="semibold" color={adaptive.grey900}>
                {count}회
              </Text>
            </div>
          ))}
          <div style={styles.totalRow}>
            <Text typography="t5" fontWeight="semibold" color={adaptive.grey800}>
              총 운동 횟수
            </Text>
            <Text typography="t5" fontWeight="bold" color={adaptive.blue500}>
              {totalExercises}회
            </Text>
          </div>
        </div>

        <div style={styles.section}>
          <Text
            typography="st6"
            fontWeight="semibold"
            color={adaptive.grey600}
            style={{ marginBottom: 12 }}
          >
            시간
          </Text>
          <div style={styles.statRow}>
            <Text typography="t5" color={adaptive.grey700}>
              운동 시간
            </Text>
            <Text typography="t5" fontWeight="semibold" color={adaptive.grey900}>
              {formatTime(stats.totalExerciseTime)}
            </Text>
          </div>
          <div style={styles.statRow}>
            <Text typography="t5" color={adaptive.grey700}>
              쉬는 시간
            </Text>
            <Text typography="t5" fontWeight="semibold" color={adaptive.grey900}>
              {formatTime(stats.totalRestTime)}
            </Text>
          </div>
          <div style={styles.totalRow}>
            <Text typography="t5" fontWeight="semibold" color={adaptive.grey800}>
              총 소요 시간
            </Text>
            <Text typography="t5" fontWeight="bold" color={adaptive.blue500}>
              {formatTime(stats.totalExerciseTime + stats.totalRestTime)}
            </Text>
          </div>
        </div>
      </div>

      <div style={styles.buttons}>
        <Button
          size="xlarge"
          variant="fill"
          color="primary"
          display="block"
          onClick={onRestart}
        >
          다시하기
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
    backgroundColor: adaptive.grey50,
  },
  header: {
    padding: "20px",
    backgroundColor: adaptive.background,
    textAlign: "center",
  },
  content: {
    flex: 1,
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  summaryCard: {
    backgroundColor: adaptive.background,
    borderRadius: "16px",
    padding: "24px",
    textAlign: "center",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  section: {
    backgroundColor: adaptive.background,
    borderRadius: "16px",
    padding: "20px",
  },
  statRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "8px 0",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 0 0",
    marginTop: "8px",
    borderTop: `1px solid ${adaptive.grey200}`,
  },
  buttons: {
    padding: "20px",
    paddingBottom: "34px",
    backgroundColor: adaptive.background,
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
};
