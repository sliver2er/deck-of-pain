import { useState } from "react";
import { Text, Button } from "@toss/tds-mobile";
import type { Difficulty } from "../types";
import { DIFFICULTY_CONFIG } from "../constants";

interface DifficultySelectPageProps {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

const DIFFICULTIES: Difficulty[] = [
  "beginner",
  "easy",
  "medium",
  "hard",
  "hardcore",
];

export function DifficultySelectPage({ onSelect }: DifficultySelectPageProps) {
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<Difficulty | null>(null);

  const handleStart = () => {
    if (selectedDifficulty) {
      onSelect(selectedDifficulty);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.difficultyList}>
          {DIFFICULTIES.map((diff) => {
            const config = DIFFICULTY_CONFIG[diff];
            const isSelected = selectedDifficulty === diff;
            return (
              <Button
                key={diff}
                size="large"
                variant={isSelected ? "fill" : "weak"}
                color="primary"
                display="block"
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  justifyContent: "space-between",
                  padding: "16px 20px",
                }}
              >
                <span style={{ fontWeight: 600 }}>{config.name}</span>
                <Text
                  typography="t7"
                  style={{ color: isSelected ? "#ffffff" : "#8B95A1" }}
                >
                  {config.restTime > 0
                    ? `쉬는시간 ${config.restTime}초`
                    : "쉬는시간 없음"}
                </Text>
              </Button>
            );
          })}
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
          시작할게요
        </Button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#ffffff",
    display: "flex",
    flexDirection: "column",
  },
  header: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "16px 20px",
    borderBottom: "1px solid #F2F4F6",
  },
  content: {
    flex: 1,
    padding: "24px 20px",
    paddingBottom: "100px",
  },
  difficultyList: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  hint: {
    marginTop: "24px",
    padding: "16px",
    backgroundColor: "#F9FAFB",
    borderRadius: "12px",
    textAlign: "center",
  },
  bottomCTA: {
    position: "fixed",
    bottom: 0,
    left: 0,
    right: 0,
    padding: "12px 20px 34px",
    backgroundColor: "#ffffff",
  },
};
