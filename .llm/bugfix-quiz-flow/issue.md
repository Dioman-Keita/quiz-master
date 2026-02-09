# Issue: Critical Bugs in Quiz Flow

## Description
This issue outlines critical bugs identified in the quiz flow that negatively impact user experience and the core functionality of the quiz.

## Problems

### 1. CRITICAL: Score Not Incrementing on Correct Answers
The quiz score does not update or increment when a user correctly answers a question. This prevents users from accurately tracking their performance.

### 2. CRITICAL: Incorrect Answer Feedback Display
The message indicating the correct answer is erroneously displayed even in scenarios where the user has already selected the correct answer. This provides confusing and redundant feedback.

### 3. Timer Not Stopping on User Choice
The quiz timer continues to run after a user has made their selection for a question. The timer should halt immediately upon the user's choice to accurately reflect the time taken for that specific question.

## Impact
These issues severely degrade the quiz experience by providing incorrect scoring, confusing feedback, and inaccurate time tracking.

## Reproduction Steps
(Detailed reproduction steps will be provided once the affected components are identified during investigation, but generally involve playing through a quiz and observing the described behaviors.)

## Expected Behavior
1.  The score should increment correctly for every right answer.
2.  The "correct answer" message should only appear when the user initially selects an incorrect answer.
3.  The timer should stop instantly upon a user's answer selection.

## Current Behavior
1.  Score does not increment on correct answers.
2.  "Correct answer" message is shown even for correct selections.
3.  Timer continues after a choice is made.