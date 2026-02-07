feat(session): Implement Zustand store for quiz session management

This commit initializes the Zustand store for managing the quiz session state. It defines the structure of the session state, including the current score, total questions asked, and whether an answer is correct. This store will serve as the central state management for the quiz game's progress.

# Files impacted:
- `src/entities/session/model/store.ts`: New file, defining the Zustand store for quiz session state.
- `src/entities/session/model/types.ts`: New file, defining the types for the session state and actions.

# Behavioral changes:
- The application will now have a centralized state management solution for the quiz session, allowing tracking of score and game progress.

# Architectural changes:
- Introduction of Zustand for global state management within the session entity, adhering to Feature-Sliced Design principles.

# NEXT ACTION:
# Proceed with the code changes in `src/entities/session/model/types.ts` and `src/entities/session/model/store.ts` as described in this commit plan.