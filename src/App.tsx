import { useState } from "react";
import { useWorkoutSession } from "./hooks/useWorkoutSession";
import { LandingPage } from "./pages/LandingPage";
import { DifficultySelectPage } from "./pages/DifficultySelectPage";
import { WorkoutPage } from "./pages/WorkoutPage";
import { CompletePage } from "./pages/CompletePage";
import { ResultPage } from "./pages/ResultPage";
import type { Difficulty } from "./types";

type Page = "landing" | "difficulty" | "workout" | "complete" | "result";

function App() {
  const session = useWorkoutSession();
  const [page, setPage] = useState<Page>("landing");

  const goToDifficultySelect = () => {
    setPage("difficulty");
  };

  const startWorkout = (difficulty: Difficulty) => {
    session.startSession(difficulty);
    setPage("workout");
  };

  const quitWorkout = () => {
    session.quit();
    setPage("result");
  };

  const goToResult = () => {
    setPage("result");
  };

  const restartFromLanding = () => {
    session.reset();
    setPage("landing");
  };

  if (page === "landing") {
    return <LandingPage onNext={goToDifficultySelect} />;
  }

  if (page === "difficulty") {
    return <DifficultySelectPage onSelect={startWorkout} />;
  }

  if (page === "result") {
    return <ResultPage stats={session.stats} onRestart={restartFromLanding} />;
  }

  if (session.phase === "complete" || page === "complete") {
    return <CompletePage onViewStats={goToResult} />;
  }

  if (!session.currentCard || !session.currentExercise) {
    return null;
  }

  return (
    <WorkoutPage
      phase={session.phase as "exercise" | "rest"}
      currentCard={session.currentCard}
      currentExercise={session.currentExercise}
      exerciseCount={session.exerciseCount}
      completedCards={session.completedCards}
      totalCards={session.totalCards}
      restTime={session.restTime}
      isPaused={session.isPaused}
      difficulty={session.difficulty}
      onComplete={session.completeExercise}
      onSkipRest={session.skipRest}
      onResume={session.resume}
      onQuit={quitWorkout}
    />
  );
}

export default App;
