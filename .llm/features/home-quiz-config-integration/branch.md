# Branch: feat/home-quiz-config-integration

## Feature Intent and Scope

This branch integrates the existing `ConfigForm` into the `home-page.tsx` and updates the `fetchQuestions` function in `src/entities/question/api/fetch-question.ts` to utilize the quiz configuration (category and difficulty) from the `useQuizConfigStore`.

The scope of this feature includes:
1.  Ensuring `ConfigForm` is correctly rendered on `home-page.tsx`.
2.  Modifying `fetch-question.ts` to retrieve quiz `category` and `difficulty` directly from `useQuizConfigStore` before making an API call.
3.  Verifying that no protected components (like `robust-question-fetching` or `ConfigForm` itself) are unintentionally altered.

## NEXT ACTION

Create the `commit_feat-home-quiz-config-integration.md` file in the `.llm/features/home-quiz-config-integration/` directory.