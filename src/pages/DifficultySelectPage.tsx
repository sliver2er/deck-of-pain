import { useState } from "react";
import { ListRow, Button } from "@toss/tds-mobile";
import { adaptive } from "@toss/tds-colors";
import type { Difficulty } from "../types";

interface DifficultySelectPageProps {
  onSelect: (difficulty: Difficulty) => void;
  onBack: () => void;
}

type DifficultyUIConfig =
  | { iconName: string; iconUrl?: never; label: string; description: string }
  | { iconName?: never; iconUrl: string; label: string; description: string };

const DIFFICULTY_UI: Record<Difficulty, DifficultyUIConfig> = {
  beginner: {
    iconName: "icon-baby",
    label: "입문자",
    description: "처음 하는 분들도 해낼 수 있어요.",
  },
  easy: {
    iconUrl: "https://static.toss.im/2d-emojis/png/4x/u263A.png",
    label: "초보자",
    description: "이 정도는 가뿐할 거예요.",
  },
  medium: {
    iconUrl: "https://static.toss.im/2d-emojis/png/4x/u1F633.png",
    label: "중급자",
    description: "쉽지만은 않을 거예요.",
  },
  hard: {
    iconUrl: "https://static.toss.im/2d-emojis/png/4x/u1F975.png",
    label: "고급자",
    description: "체력에 자신있으신가요?",
  },
  hardcore: {
    iconUrl: "https://static.toss.im/2d-emojis/png/4x/u1F608.png",
    label: "하드코어",
    description: "도전해 보세요.. 하실 수 있다면.",
  },
};

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

  const renderIcon = (ui: DifficultyUIConfig) => {
    if ("iconName" in ui && ui.iconName) {
      return <ListRow.AssetIcon shape="original" name={ui.iconName} />;
    }
    if ("iconUrl" in ui && ui.iconUrl) {
      return <ListRow.AssetIcon shape="original" url={ui.iconUrl} />;
    }
    return null;
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <div style={styles.difficultyList}>
          {DIFFICULTIES.map((diff) => {
            const ui = DIFFICULTY_UI[diff];
            const isSelected = selectedDifficulty === diff;
            return (
              <div
                key={diff}
                onClick={() => setSelectedDifficulty(diff)}
                style={{
                  ...styles.listRowWrapper,
                  backgroundColor: isSelected
                    ? adaptive.grey100
                    : "transparent",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                <ListRow
                  left={renderIcon(ui)}
                  contents={
                    <ListRow.Texts
                      type="2RowTypeA"
                      top={ui.label}
                      topProps={{
                        color: adaptive.grey700,
                        fontWeight: "bold",
                      }}
                      bottom={ui.description}
                      bottomProps={{ color: adaptive.grey600 }}
                    />
                  }
                  right={
                    isSelected ? (
                      <ListRow.AssetIcon
                        shape="original"
                        url="https://static.toss.im/2d-emojis/png/4x/u2705.png"
                      />
                    ) : undefined
                  }
                  verticalPadding="large"
                />
              </div>
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
    backgroundColor: adaptive.background,
    display: "flex",
    flexDirection: "column",
  },
  content: {
    flex: 1,
    padding: "16px 20px",
    paddingBottom: "100px",
  },
  difficultyList: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  listRowWrapper: {
    transition: "background-color 0.15s ease",
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
