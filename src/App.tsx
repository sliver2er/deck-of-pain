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

  const handleNext = () => {
    setPage("difficulty");
  };

  const handleBack = () => {
    setPage("landing");
  };

  const handleSelectDifficulty = (difficulty: Difficulty) => {
    session.startSession(difficulty);
    setPage("workout");
  };

  const handleQuit = () => {
    session.quit();
    setPage("result");
  };

  const handleViewStats = () => {
    setPage("result");
  };

  const handleGoHome = () => {
    session.reset();
    setPage("landing");
  };

  if (page === "landing") {
    return <LandingPage onNext={handleNext} />;
  }

  if (page === "difficulty") {
    return (
      <DifficultySelectPage
        onSelect={handleSelectDifficulty}
        onBack={handleBack}
      />
    );
  }

  if (page === "result") {
    return (
      <ResultPage
        stats={session.stats}
        onRestart={handleGoHome}
        onGoHome={handleGoHome}
      />
    );
  }

  if (session.phase === "complete" || page === "complete") {
    return (
      <CompletePage onViewStats={handleViewStats} onGoHome={handleGoHome} />
    );
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
      onPause={session.pause}
      onResume={session.resume}
      onQuit={handleQuit}
    />
  );
}

export default App;
