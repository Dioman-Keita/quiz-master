# Commit: feat(home): Integrate quiz-config into home page

## Implementation Details

This commit integrates the `ConfigForm` component into the `HomePage` and updates the question fetching logic to use the configured quiz settings.

### Files Impacted

-   `src/pages/home/ui/home-page.tsx`:
    -   Ensured the `ConfigForm` component is rendered. (This was already done, so no changes were necessary in this file during this feature's implementation).
-   `src/entities/question/api/fetch-question.ts`:
    -   Modified the `fetchQuestions` function to directly retrieve the `category` and `difficulty` from the `useQuizConfigStore` instead of accepting them as parameters.
    -   Added the import for `useQuizConfigStore` from `@features/quiz-config/model/config-hooks`.

### Behavioral and Architectural Changes

-   The `HomePage` now directly utilizes the `ConfigForm` for quiz configuration.
-   The question fetching mechanism is now linked to the global quiz configuration state managed by `useQuizConfigStore`, ensuring that fetched questions respect user preferences.
-   A direct dependency from `entities/question` to `features/quiz-config` has been introduced, as per the `last_change_base.md` instruction.

## NEXT ACTION

Create the `PR_feat-home-quiz-config-integration.md` file in the `.llm/features/home-quiz-config-integration/` directory.