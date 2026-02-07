# Last Change Base

This file is the ONLY source of truth for the current project state.
Any assumption not explicitly written here is INVALID.

LLM RULE:

- Read this file first
- Obey it strictly
- Do NOT infer missing steps
- Do NOT repeat completed work

---

## 1. CURRENT PROJECT STATE

### 1.1 Completed Features (DO NOT TOUCH)

- Feature name:
  - Description:
  - Status: COMPLETED
  - Branch:
  - Commit:

Example:

- quiz-config / ConfigForm
  - Implemented ConfigForm UI
  - Connected to useQuizConfigStore
  - Uses hardcoded categories & difficulties
  - Branch: feat/quiz-config
  - Commit: ee7477e

- home-quiz-config-integration
  - Integrated `ConfigForm` into `home-page.tsx` and updated `fetchQuestions` to use values from `useQuizConfigStore`.
  - Branch: `feat/home-quiz-config-integration`
  - Commit: `9c7e171`
  - PR: (To be filled after PR)

---

### 1.2 Protected / Frozen Components

These parts are FINAL and must NEVER be modified.

- robust-question-fetching
- quiz-config (ConfigForm)
- Any file not listed in "Next Action"

---

## 2. CURRENT WORK CONTEXT

### Active Branch Policy

- No work is allowed on completed feature branches
- A NEW branch MUST be created for each new feature or integration

---

## 3. NEXT FEATURE TO IMPLEMENT

### Description (WHAT)

Clearly describe the feature to be implemented.

Implement robust error handling and loading states for question fetching in `src/entities/question/api/fetch-question.ts`. This also involves fetching quiz categories dynamically from the Open Trivia Database API and using these categories to fetch quiz questions.

---

### Mandatory Branch (WHERE)

A new branch MUST be created before any code change.

Branch name:
`feat/robust-question-fetching`

Working on another branch is FORBIDDEN.

---

### Allowed Files (SCOPE)

ONLY these files may be modified:

- src/entities/question/api/fetch-question.ts
- src/entities/question/api/fetch-question.test.ts
- src/entities/question/model/types.ts
- src/features/quiz-config/ui/config-form.tsx (to use dynamic categories)
- src/entities/question/api/fetch-categories.ts (new file)
- src/entities/question/api/fetch-categories.test.ts (new file)


Any file not listed here MUST NOT be changed.

---

## 4. NEXT ACTION (EXECUTION ORDER)

The following steps MUST be executed in order.
Skipping or reordering steps is NOT allowed.

1. Create and switch to branch `feat/robust-question-fetching`
2. Create `branch.md` for `feat/robust-question-fetching`
3. Create `commit_feat-robust-question-fetching.md`
4. Create `PR_feat-robust-question-fetching.md`
5. Update `last_change_base.md` with commit and PR links.

---

## 5. FORBIDDEN ACTIONS

- Do NOT reimplement completed features
- Do NOT modify protected components
- Do NOT change the execution order
- Do NOT invent new tasks
- Do NOT refactor unrelated code
- Do NOT commit outside the specified branch

---

## 6. PRE-EXECUTION CHECK (MANDATORY)

Before writing any code, the agent MUST:

1. Restate the current state
2. Name the branch it will create
3. List the files it will modify

If any of these are incorrect → STOP.