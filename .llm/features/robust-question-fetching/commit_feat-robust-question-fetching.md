feat(question): Implement loading and error states for question fetching

This commit introduces robust loading and error state management to the question fetching mechanism. It modifies the `fetch-question.ts` utility to expose `isLoading` and `isError` states, along with `error` details, allowing UI components to provide better feedback to the user during API interactions.

# Files impacted:
- `src/entities/question/api/fetch-question.ts`: Modified to include loading and error state management.
- `src/entities/question/model/types.ts`: May need updates to include new types for loading/error states.

# Behavioral changes:
- When questions are being fetched, a loading indicator can be displayed.
- If question fetching fails, an error message can be displayed to the user.

# Architectural changes:
- The `fetchQuestion` function will now return an object that includes `data`, `isLoading`, `isError`, and `error` properties, rather than just the data or throwing an error directly. This aligns with common data fetching patterns (e.g., React Query).

# NEXT ACTION:
# Proceed with the code changes in `src/entities/question/api/fetch-question.ts` and `src/entities/question/model/types.ts` as described in this commit plan.
