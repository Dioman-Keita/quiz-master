# Feature: Implement Quiz Configuration and Integrate into Home Page

## Branch Name
feat/quiz-config

## Feature Intent and Scope
This feature aims to provide users with the ability to configure quiz parameters (like category and difficulty) before starting a quiz. It will involve creating a configuration form and integrating it into the Home Page, making the quiz more customizable and replayable.

**Scope**:
-   Implement the quiz configuration form in `src/features/quiz-config/ui/config-form.tsx`.
-   Develop a state management solution (e.g., Zustand store) in `src/features/quiz-config/model/config-hooks.ts` to store selected quiz parameters.
-   Integrate the configuration form into `src/pages/home/ui/home-page.tsx`.
-   Add navigation from the Home Page to the `GamePage`, passing the configured parameters.
-   Modify `src/entities/question/api/fetch-question.ts` to accept and utilize the configured category and difficulty.
-   Add unit tests for the configuration state management.

# NEXT ACTION:
# Create commit_feat-quiz-config.md in this feature's directory, detailing the implementation plan for the first commit.