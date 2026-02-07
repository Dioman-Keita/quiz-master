# Pull Request: feat/session-and-answer-logic - Implement Zustand Store for Quiz Session Management

## Summary
This PR introduces the foundational Zustand store for managing the quiz session state. It defines the core state properties like score, question index, answered questions count, and quiz over status, along with actions to manipulate this state.

## Motivation
To build an interactive quiz application, a robust and centralized state management solution for the quiz session is essential. This store enables tracking of game progress, scoring, and overall quiz status, which are critical for subsequent features like answer handling, timer integration, and displaying results.

## Changes Made
- **`src/entities/session/model/types.ts`**: New file defining TypeScript interfaces for `QuizSessionState`, `QuizSessionActions`, and `QuizSessionStore`.
- **`src/entities/session/model/store.ts`**: New file implementing the Zustand store (`useQuizSessionStore`) with initial state and actions (`incrementScore`, `incrementQuestionIndex`, `incrementAnsweredQuestions`, `setQuizOver`, `resetSession`).

## How to Test
1.  **Inspect Store State**: After starting the application, you can inspect the Zustand store using browser developer tools (if a Zustand devtools extension is installed) or by logging its state in `GamePage.tsx` or other components that will use it.
2.  **Verify Actions**: You can manually call the store's actions (e.g., `useQuizSessionStore.getState().incrementScore()`) and verify that the state updates as expected. (This will be more thoroughly tested once integrated with UI).
3.  **No direct UI impact**: This PR introduces only the state management core; there is no direct visual change to the application yet.

## Risks and Side Effects
-   **Integration complexity**: The store is now defined, but its integration into `GamePage` and other features will require careful implementation in subsequent steps.
-   **Zustand dependency**: Introduces Zustand as a new project dependency.

## Checklist
- [x] Code follows project style guidelines.
- [ ] Tests have been added/updated to cover new functionality. (Will be added in a separate commit/PR).
- [ ] Documentation has been updated (if necessary). (Internal agent docs are updated)
- [ ] All new and existing tests pass. (No direct tests for this PR yet)

# NEXT ACTION:
# Update .llm/state/last_change_base.md to reflect that this part of the feature is implemented. Then, proceed with committing the changes.