# Last Change Base

THIS FILE IS THE ONLY SOURCE OF TRUTH.
ANYTHING NOT WRITTEN HERE DOES NOT EXIST.

MODE: UI-FIRST DEVELOPMENT

---

## ABSOLUTE RULES (NON NEGOTIABLE)

- The goal is to BUILD THE FULL UI.
- Backend robustness, error handling and optimizations come LATER.
- UI is always ITERATIVE.
- UI is NEVER frozen unless explicitly stated by the user.

FORBIDDEN TOPICS:

- robust-question-fetching
- backend robustness
- error handling strategies
- retries, edge cases, optimizations

If mentioned → STOP.

---

## 1. CURRENT PROJECT STATE

### 1.1 Implemented UI (ITERATIVE – NOT FINAL)

These elements EXIST but are NOT complete and MAY be modified freely.

- **UI Flow**: The complete UI flow from Home -> Game -> Result is implemented.
  - `HomePage`: Displays `ConfigForm` to start the quiz.
  - `GamePage`: Renders the `QuizBoard` which contains the main quiz logic, question display, and timer.
  - `ResultPage`: Shows the final score and a "Play Again" button.
  - `App.tsx`: Handles the routing between the pages.

- **Components**:
  - `ConfigForm`: Allows selecting category & difficulty (hardcoded).
  - `QuizBoard`: The main component for the quiz game.
  - `SummaryCard`: Displays the quiz results.

- **Status**: UI ITERATION
- **Modifiable**: YES

NO UI is considered final.

---

## 2. PROTECTED COMPONENTS

ONLY logic-level features may be protected.

UI components are NEVER protected.

Currently protected:

- NONE

---

## 3. CURRENT GOAL (FOCUS)

BUILD THE COMPLETE USER INTERFACE.

This includes:

- Screens
- Layout
- Visual states
- User flow
- Buttons, forms, placeholders
- Loading / empty / mock states (VISUAL ONLY)

NO real error handling.
NO backend refactor.
NO robustness explanation.

---

## 4. NEXT FEATURE TO IMPLEMENT

### Description (WHAT)

Improve the visual feedback and user experience of the UI.

This includes:
- Adding animations and transitions between UI states (e.g., when an answer is selected).
- Improving the visual design of the `QuestionCard` to provide clearer feedback for correct/incorrect answers.
- Enhancing the `TimerDisplay` with more engaging visual cues.
- General styling improvements to create a more polished and professional look and feel.


---

### Branch Policy

A new branch MUST be created for UI work.

Branch name:
`feat/ui-polish`

Only this branch is allowed.

---

### Allowed Files (UI ONLY)

The agent MAY modify any UI-related file, including but not limited to:

- src/pages/\*\*
- src/features/\*\*
- src/shared/ui/\*\*
- src/entities/\*\* (UI usage only, no robustness)
- src/app/styles/\*\*/index.css

If unsure → assume UI change is allowed.

---

## 5. EXECUTION ORDER

1. Create and switch to branch `feat/ui-polish`
2. Implement UI improvements as described above.
3. Ensure the app is visually and functionally navigable.
4. Update this file ONLY to describe UI progress.

DO NOT mark anything as FINAL.

---

## 6. FORBIDDEN ACTIONS

- Do NOT talk about backend robustness
- Do NOT block UI waiting for backend perfection
- Do NOT freeze UI components
- Do NOT invent non-UI constraints
- Do NOT refactor logic “for later safety”

---

## 7. PRE-EXECUTION CHECK (MANDATORY)

Before writing code, the agent MUST confirm:

1. The goal is UI polishing and improvement.
2. The branch is `feat/ui-polish`
3. The work is iterative and non-final

If not → STOP.