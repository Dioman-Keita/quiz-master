# Feature: Implement Core Quiz Session Logic and Answer Handling

## Branch Name
feat/session-and-answer-logic

## Feature Intent and Scope
This feature aims to establish the foundational logic for managing a quiz session, including tracking the user's score, processing answers, and providing feedback. It will integrate the `session` entity for state management and `answer-question` feature for interaction.

**Scope**:
-   Implement the Zustand store in `src/entities/session/model/store.ts` to manage quiz state (e.g., score, answered questions, current question index).
-   Develop score calculation and session update logic in `src/entities/session/lib/score-logic.ts`.
-   Create a mechanism (e.g., hook or function) in `src/features/answer-question/model/answer-hooks.ts` to handle user answer submissions, compare them against the correct answer, and update the session state.
-   Modify `src/pages/game/ui/game-page.tsx` to utilize the session store, call answer handling logic, and display basic score feedback.
-   Add unit tests for session store and score logic.

# NEXT ACTION:
# Create commit_feat-session-and-answer-logic.md in this feature's directory, detailing the implementation plan for the first commit.