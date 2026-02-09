# Bug: Quiz stats and score issues across languages, API rate limits, and language switch UX

## Context
Multiple related bugs are affecting the quiz correctness, user experience (UX), and API reliability.

## Problems

1.  **Incorrect Final Quiz Statistics**: The final quiz statistics (e.g., total score, number of correct answers) consistently display as `0`, regardless of the actual performance, in both English and French modes.
2.  **Score Visual Update Failure (French Mode)**: During an active quiz, the score counter does not visually update when the application is set to French, although it functions correctly in English.
3.  **Open Trivia DB API Rate Limiting**: The Open Trivia DB API frequently returns `429 (Too Many Requests)` errors. This issue is particularly noticeable when users switch languages or restart quizzes, indicating excessive or unnecessary API calls.
4.  **Poor Language Switch UX**: The current implementation of the language switch control offers a suboptimal user experience and lacks proper styling. A more intuitive and visually appealing dropdown selector is required.

## Root Causes (To be determined during investigation, but initial hypotheses):

*   **Incorrect Final Quiz Statistics**: Potential issues in how the final score is calculated or retrieved from the quiz session store, or a mismatch in how `answeredQuestions` is being tracked.
*   **Score Visual Update Failure (French Mode)**: Could be related to a rendering issue specific to the French locale, potentially an `i18next` configuration problem affecting React component updates, or a scope issue with the `useQuizSessionStore` in French mode.
*   **Open Trivia DB API Rate Limiting**: Likely due to `fetchQuestions` being called too frequently, possibly on every language change or component re-render when it shouldn't. The `QuizBoard` might be fetching new questions unnecessarily.
*   **Poor Language Switch UX**: The existing language selector (buttons) is basic and does not conform to standard UX patterns for language selection.

## Proposed Fixes (High-level):

*   Review and correct score calculation and display logic in `ResultPage` and `SummaryCard`.
*   Investigate and fix the visual update mechanism for the score in `QuizBoard` when in French mode.
*   Refactor question fetching to ensure questions are only fetched when genuinely needed (e.g., at the start of a new quiz, not on language change). Implement mechanisms to prevent redundant API calls.
*   Replace the existing language selection buttons with a more appropriate and styled dropdown component.

## Acceptance Criteria
-   Final quiz statistics are correctly computed and displayed in both English and French.
-   Score updates visually during the quiz in both English and French.
-   Language switching does NOT trigger unnecessary quiz refetches.
-   `429` errors from Open Trivia DB are eliminated or significantly reduced.
-   The language switch control is a dropdown selector with improved UX and styling.