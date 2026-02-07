# PR: feat(ui): Build full quiz UI flow

## Feature Summary

This Pull Request implements the complete UI flow for the Quiz Master application, covering the Home, Game, and Result pages. It refactors the GamePage to utilize the new QuizBoard widget for core quiz logic and introduces a SummaryCard for displaying results. Basic routing between these pages is handled in `App.tsx`.

## Motivation

This PR establishes the foundational user interface for the quiz, allowing users to navigate through the entire quiz experience from configuration to results. It provides a visually and functionally navigable application as per the UI-FIRST development mode.

## Changes Made

-   `src/app/App.tsx`: Implemented state-based routing to navigate between `HomePage`, `GamePage`, and `ResultPage`.
-   `src/pages/game/ui/game-page.tsx`: Refactored to be a container for the `QuizBoard` widget.
-   `src/widgets/quiz-board/ui/quiz-board.tsx`: Created to encapsulate question fetching, timer management, answer handling, and score display logic, previously residing in `GamePage`.
-   `src/pages/result/ui/result-page.tsx`: Created to display quiz results using the `SummaryCard` and provide a "Play Again" option.
-   `src/widgets/result-summary/ui/summury-card.tsx`: Created to display the final score and percentage.
-   `src/entities/question/api/fetch-question.ts`: Fixed a JSX syntax error and `handleNextQuestion` was updated.

## How to Test

1.  Start the application.
2.  On the Home page, select a category and difficulty (currently hardcoded) and click "Start Quiz".
3.  Navigate through the quiz, answering questions. Observe the timer and score updates.
4.  Once the quiz ends (e.g., timer runs out), the app should transition to the Result page.
5.  On the Result page, verify the score and click "Play Again" to return to the Home page.

## Risks and Side Effects

-   **Mock Data**: The quiz still relies on hardcoded categories and difficulties for configuration, and question fetching uses a simple API without dynamic category selection.
-   **No Animations/Polish**: The UI is functional but lacks visual polish, animations, and detailed feedback for correct/incorrect answers. This is intended as per the UI-FIRST mode.
-   **State Management**: The core quiz logic is now in `QuizBoard`, improving modularity.

## NEXT ACTION

Update `last_change_base.md` to reflect the completion of the `feat/ui-build` feature (with commit hash `2fc4318`) and define the next feature to implement, which is `feat/ui-polish`.