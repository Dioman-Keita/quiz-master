# Issue: Vercel Deployment Failure - TypeScript Compilation Errors in Tests

## Bug Description

The Vercel deployment fails during the build process due to TypeScript compilation errors originating from test files. Specifically, `tsc -b && vite build` reports `TS2554` errors, indicating a mismatch in the number of arguments expected by the `fetchQuestions` function and the number of arguments it receives in its test (`fetch-question.test.ts`) calls.

## Context

The `fetchQuestions` function's signature was recently updated to remove the `difficulty` and `category` parameters, as these are now retrieved directly from the `useQuizConfigStore` within the function. However, the corresponding test file, `src/entities/question/api/fetch-question.test.ts`, was not updated to reflect this change.

## Error Messages (from Vercel build log)

```
src/entities/question/api/fetch-question.test.ts(54,39): error TS2554: Expected 0-1 arguments, but got 3.
src/entities/question/api/fetch-question.test.ts(71,44): error TS2554: Expected 0-1 arguments, but got 3.
src/entities/question/api/fetch-question.test.ts(85,44): error TS2554: Expected 0-1 arguments, but got 3.
Error: Command "npm run build" exited with 2
```

## Expected Behavior

The Vercel build should complete successfully, meaning all TypeScript files, including tests, should compile without errors.

## Actual Behavior

The build fails with TypeScript error `TS2554` because the test file `fetch-question.test.ts` is still calling `fetchQuestions` with `difficulty` and `category` arguments, which are no longer expected by the updated function signature.

## Steps to Reproduce

1.  Attempt a Vercel deployment of the current codebase.
2.  Observe the build logs for the TypeScript compilation errors.
3.  Alternatively, run `npm run build` locally and observe the same `TS2554` errors.

## Suggested Fix (High-level)

Update the calls to `fetchQuestions` in `src/entities/question/api/fetch-question.test.ts` to match its new signature (expecting 0 or 1 argument, where the optional argument is `amount`).

## Priority

High - Blocks deployment.
