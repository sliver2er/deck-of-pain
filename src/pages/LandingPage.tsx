import { useState } from "react";
import { Text, Button, Post, Paragraph } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import type { Difficulty } from "../types";
import { DIFFICULTY_CONFIG } from "../constants";

interface LandingPageProps {
  onStart: (difficulty: Difficulty) => void;
}

const DIFFICULTIES: Difficulty[] = [
  "beginner",
  "easy",
  "medium",
  "hard",
  "hardcore",
];

export function LandingPage({ onStart }: LandingPageProps) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  const handleStart = () => {
    if (selectedDifficulty) {
      onStart(selectedDifficulty);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.header}>
          <Text typography="t1" fontWeight="bold" color={adaptive.grey900}>
            💪 고통의 카드팩
          </Text>
          <Text
            typography="t6"
            color={adaptive.grey600}
            style={{ marginTop: 8 }}
          >
            트럼프 카드로 홈트하기
          </Text>
        </div>

        <Post.Paragraph paddingBottom={24}>
          <Text typography="st5" fontWeight="semibold" color={adaptive.grey800}>
            고통의 카드팩이란?
          </Text>
          <Paragraph.Text>
            트럼프 카드를 이용한 재미있는 맨몸운동이에요.
            <br />
            <br />
            뽑은 트럼프 카드의 문양에 따라
            <br />• <b>스페이드</b>는 스쿼트
            <br />• <b>클로버</b>는 싯업
            <br />• <b>하트</b>는 버피
            <br />• <b>다이아몬드</b>는 푸쉬업
            <br />
            <br />
            개수는 <b>카드에 적힌 숫자</b>만큼 수행하고,
            <br />총 52장의 카드를 모두 소진하면 완료!
          </Paragraph.Text>
        </Post.Paragraph>

        <div style={styles.difficultySection}>
          <Text typography="st5" fontWeight="semibold" color={adaptive.grey800}>
            난이도 선택
          </Text>
          <div style={styles.difficultyList}>
            {DIFFICULTIES.map((diff) => {
              const config = DIFFICULTY_CONFIG[diff];
              const isSelected = selectedDifficulty === diff;
              return (
                <Button
                  key={diff}
                  size="large"
                  variant={isSelected ? "fill" : "weak"}
                  color={isSelected ? "primary" : "light"}
                  display="block"
                  onClick={() => setSelectedDifficulty(diff)}
                  style={{ justifyContent: "space-between" }}
                >
                  <span>{config.name}</span>
                  <Text typography="t7" color={adaptive.grey500}>
                    {config.restTime > 0
                      ? `쉬는시간 ${config.restTime}초`
                      : "쉬는시간 없음"}
                  </Text>
                </Button>
              );
            })}
          </div>
        </div>
      </div>

      <div style={styles.bottomCTA}>
        <Button
          size="xlarge"
          variant="fill"
          color="primary"
          display="block"
          disabled={!selectedDifficulty}
          onClick={handleStart}
        >
          시작하기
        </Button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: adaptive.background,
  },
  content: {
    padding: "24px 20px",
    paddingBottom: "100px",
  },
  header: {
    textAlign: "center",
    marginBottom: "32px",
  },
  difficultySection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  difficultyList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginTop: "12px",
  },
  bottomCTA: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "12px 20px 34px",
    backgroundColor: adaptive.background,
  },
};
