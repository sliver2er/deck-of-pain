import { Text, Button, Modal } from '@toss/tds-mobile';
import { adaptive } from '@toss/tds-colors';
import type { Card, ExerciseType, Difficulty } from '../types';
import { CardContainer } from '../components/CardContainer';
import { RestTimer } from '../components/RestTimer';
import { ProgressIndicator } from '../components/ProgressIndicator';
import { EXERCISE_NAME, DIFFICULTY_CONFIG } from '../constants';

interface WorkoutPageProps {
  phase: 'exercise' | 'rest';
  currentCard: Card;
  currentExercise: ExerciseType;
  exerciseCount: number;
  completedCards: number;
  totalCards: number;
  restTime: number;
  isPaused: boolean;
  difficulty: Difficulty;
  onComplete: () => void;
  onSkipRest: () => void;
  onPause: () => void;
  onResume: () => void;
  onQuit: () => void;
}

export function WorkoutPage({
  phase,
  currentCard,
  currentExercise,
  exerciseCount,
  completedCards,
  totalCards,
  restTime,
  isPaused,
  difficulty,
  onComplete,
  onSkipRest,
  onPause,
  onResume,
  onQuit,
}: WorkoutPageProps) {
  const config = DIFFICULTY_CONFIG[difficulty];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <ProgressIndicator current={completedCards} total={totalCards} />
      </div>

      <div style={styles.main}>
        {phase === 'exercise' ? (
          <>
            <CardContainer card={currentCard} exerciseType={currentExercise} />
            <div style={styles.exerciseInfo}>
              <Text typography="t4" fontWeight="bold" color={adaptive.grey900}>
                {EXERCISE_NAME[currentExercise]}
              </Text>
              <Text typography="t1" fontWeight="bold" color={adaptive.blue500}>
                {exerciseCount}회
              </Text>
            </div>
          </>
        ) : (
          <RestTimer
            timeLeft={restTime}
            totalTime={config.restTime}
            onSkip={onSkipRest}
          />
        )}
      </div>

      <div style={styles.footer}>
        {phase === 'exercise' && (
          <Button
            size="xlarge"
            variant="fill"
            color="primary"
            display="block"
            onClick={onComplete}
          >
            완료
          </Button>
        )}

        <div style={styles.controlButtons}>
          <Button
            size="large"
            variant="weak"
            color="light"
            display="block"
            onClick={isPaused ? onResume : onPause}
          >
            {isPaused ? '재개' : '일시정지'}
          </Button>
          <Button
            size="large"
            variant="weak"
            color="danger"
            display="block"
            onClick={onQuit}
          >
            포기
          </Button>
        </div>
      </div>

      <Modal open={isPaused} onOpenChange={(open) => !open && onResume()}>
        <Modal.Overlay onClick={onResume} />
        <Modal.Content>
          <div style={styles.pauseModal}>
            <Text typography="t1" style={{ marginBottom: 8 }}>⏸️</Text>
            <Text typography="t3" fontWeight="bold" color={adaptive.grey900}>
              일시정지
            </Text>
            <div style={styles.pauseButtons}>
              <Button
                size="large"
                variant="fill"
                color="primary"
                display="block"
                onClick={onResume}
              >
                계속하기
              </Button>
              <Button
                size="large"
                variant="weak"
                color="danger"
                display="block"
                onClick={onQuit}
              >
                포기하기
              </Button>
            </div>
          </div>
        </Modal.Content>
      </Modal>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: adaptive.grey50,
  },
  header: {
    padding: '20px',
    backgroundColor: adaptive.background,
  },
  main: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
    gap: '24px',
  },
  exerciseInfo: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  footer: {
    padding: '20px',
    paddingBottom: '34px',
    backgroundColor: adaptive.background,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  controlButtons: {
    display: 'flex',
    gap: '12px',
  },
  pauseModal: {
    padding: '32px 24px',
    textAlign: 'center',
  },
  pauseButtons: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    marginTop: '24px',
  },
};
