Fix: Quiz Statistics, Score, API Rate Limits, and Caching
Fixes #[issue-number]

Summary
This PR addresses multiple critical bugs affecting quiz functionality, statistics accuracy, API reliability, and user experience.

Changes Made

1. ✅ Fixed Double Score Increment
   Issue: Score increased by +2 for each correct answer
   Fix: Removed side effects from
   checkAnswer()
   in
   score-logic.ts
   Files:
   src/entities/session/lib/score-logic.ts
   ,
   src/entities/session/lib/score-logic.test.ts
2. ✅ Optimized API Calls (Batch Fetching)
   Issue: Frequent 429 errors from fetching questions one at a time
   Fix: Implemented batch fetching (10 questions per API call)
   Files:
   src/entities/question/api/fetch-question.ts
   ,
   src/entities/question/model/types.ts
3. ✅ Smart Caching & Partial Response Handling
   Issue: Partial API responses were cached, blocking retries
   Fix: Only cache full batches; added forceRefresh parameter
   Files:
   src/entities/question/api/fetch-question.ts
   ,
   src/entities/question/api/fetch-question.test.ts
4. ✅ Integrated SummaryCard Component
   Issue: Final statistics not displayed properly
   Fix: Replaced inline summary with
   SummaryCard
   component
   Files:
   src/widgets/quiz-board/ui/quiz-board.tsx
5. ✅ Fixed Quiz Termination Logic
   Issue: Quiz replayed last question before showing summary
   Fix: Detect batch completion and trigger
   setQuizOver
   immediately
   Files:
   src/widgets/quiz-board/ui/quiz-board.tsx
6. ✅ Force API Refresh on New Quiz
   Issue: Cached questions reused for new quizzes
   Fix: Force fresh API calls on startNewQuiz()
   Files:
   src/widgets/quiz-board/ui/quiz-board.tsx
   Testing
   ✅ Score increments correctly (+1 per correct answer)
   ✅ API called once per quiz (10 questions batch)
   ✅ SummaryCard appears after last question OR timer expiry
   ✅ Statistics show correct format (X / 10)
   ✅ No question replay after batch completion
   ✅ Fresh questions fetched for every new quiz
   ✅ Partial API responses not cached
   Files Changed
   src/entities/session/lib/score-logic.ts
   src/entities/session/lib/score-logic.test.ts
   src/entities/question/api/fetch-question.ts
   src/entities/question/api/fetch-question.test.ts
   src/entities/question/model/types.ts
   src/widgets/quiz-board/ui/quiz-board.tsx
   Breaking Changes
   None

Notes
All existing functionality preserved (translations, theming, etc.)
Performance significantly improved (90% reduction in API calls)
Caching strategy maintains balance between UX and API reliability
