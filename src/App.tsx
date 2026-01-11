import { useState } from "react";
import { useWorkoutSession } from "./hooks/useWorkoutSession";
import { LandingPage } from "./pages/LandingPage";
import { WorkoutPage } from "./pages/WorkoutPage";
import { CompletePage } from "./pages/CompletePage";
import { ResultPage } from "./pages/ResultPage";

function App() {
  const session = useWorkoutSession();
  const [showResult, setShowResult] = useState(false);

  const handleStart = (difficulty: Parameters<typeof session.startSession>[0]) => {
    session.startSession(difficulty);
    setShowResult(false);
  };

  const handleQuit = () => {
    session.quit();
    setShowResult(true);
  };

  const handleViewStats = () => {
    setShowResult(true);
  };

  const handleGoHome = () => {
    session.reset();
    setShowResult(false);
  };

  console.log("App render, phase:", session.phase);

  if (session.phase === "ready") {
    return <LandingPage onStart={handleStart} />;
  }

  if (showResult) {
    return (
      <ResultPage
        stats={session.stats}
        onRestart={handleGoHome}
        onGoHome={handleGoHome}
      />
    );
  }

  if (session.phase === "complete") {
    return <CompletePage onViewStats={handleViewStats} onGoHome={handleGoHome} />;
  }

  if (!session.currentCard || !session.currentExercise) return null;

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
