# PR: feat(home): Integrate Quiz Config into Home Page

## Feature Summary

This Pull Request integrates the `ConfigForm` component into the `HomePage` and updates the `fetchQuestions` utility to consume quiz configuration settings (category and difficulty) directly from the `useQuizConfigStore`. This ensures that quiz questions are fetched based on user-selected preferences.

## Motivation

The `ConfigForm` was previously implemented but not fully integrated into the application flow. This PR closes that gap by placing the `ConfigForm` on the `HomePage` and connecting its output (quiz configuration) to the question fetching logic. This significantly enhances the user experience by allowing users to customize their quiz before starting.

## Risks and Side Effects

-   **Tight Coupling**: A direct dependency has been introduced from `entities/question/api/fetch-question.ts` to `features/quiz-config/model/config-hooks.ts`. While this was a explicit instruction from `last_change_base.md`, it creates a coupling that might not align with strict Feature-Sliced Design principles, potentially making the `fetch-question.ts` less reusable in contexts without `useQuizConfigStore`. Future refactoring might be needed if this coupling becomes problematic.
-   **No Dynamic Categories**: The `ConfigForm` still uses hardcoded categories and difficulties. Dynamic fetching of categories is considered a separate, future feature (`feat/robust-question-fetching`).

## NEXT ACTION

Update `last_change_base.md` to reflect the completion of the `feat/home-quiz-config-integration` feature and define the next feature to implement.