feat(quiz-config): Implement Zustand store for quiz configuration

This commit initializes the Zustand store for managing quiz configuration settings such as category and difficulty. This store will provide a centralized place to store user-selected quiz parameters before starting a game.

# Files impacted:
- `src/features/quiz-config/model/config-hooks.ts`: New file, defining the Zustand store for quiz configuration state.
- `src/features/quiz-config/model/types.ts`: New file, defining the types for the quiz configuration state and actions.

# Behavioral changes:
- The application will now have a centralized state management solution for quiz configuration.

# Architectural changes:
- Introduction of Zustand for global state management within the quiz-config feature, adhering to Feature-Sliced Design principles.

# NEXT ACTION:
# Proceed with the code changes in `src/features/quiz-config/model/types.ts` and `src/features/quiz-config/model/config-hooks.ts` as described in this commit plan.