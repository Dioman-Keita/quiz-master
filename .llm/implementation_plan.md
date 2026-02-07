# Implementation Plan

This plan outlines the high-level structure of the Quiz Master application, derived directly from the project's main README.md.

## System Structuring by Functionality Blocks:

### 1. Application Core (`src/app/`)
-   **Purpose**: Global configuration, application-wide providers, and main styling.
-   **Components**: `App.tsx`, `main.tsx`, `providers/`, `styles/`.

### 2. Entities (`src/entities/`)
-   **Purpose**: Encapsulates core business logic and data models.
-   **Sub-domains**:
    -   **Question (`src/entities/question/`)**: Handles everything related to quiz questions.
        -   `api/`: API integration for fetching questions (`fetch-question.ts`).
        -   `lib/`: Data transformation and decoding utilities (`decoder.ts`).
        -   `model/`: Type definitions for questions (`types.ts`).
        -   `ui/`: UI components for displaying questions (`question-card.tsx`).
    -   **Session (`src/entities/session/`)**: Manages the quiz session state.
        -   `lib/`: Logic for scoring (`score-logic.ts`).
        -   `model/`: Zustand store for session state (`store.ts`).
    -   **User (`src/entities/user/`)**: (Currently empty, placeholder for user-related logic if needed).

### 3. Features (`src/features/`)
-   **Purpose**: Implements specific user interactions and functionalities.
-   **Sub-features**:
    -   **Answer Question (`src/features/answer-question/`)**: Handles user answers.
        -   `model/`: Hooks related to answering (`answer-hooks.ts`).
        -   `ui/`: UI for displaying answer choices (`answer-list.tsx`).
    -   **Quiz Configuration (`src/features/quiz-config/`)**: Manages quiz setup.
        -   `model/`: Hooks for configuration (`config-hooks.ts`).
        -   `ui/`: UI for the configuration form (`config-form.tsx`).
    -   **Quiz Timer (`src/features/quiz-timer/`)**: Manages the quiz timer.
        -   `model/`: Hooks for timer logic (`timer-hooks.ts`).
        -   `ui/`: UI for displaying the timer (`timer-display.tsx`).

### 4. Pages (`src/pages/`)
-   **Purpose**: Composes entities, features, and shared components into full-screen views.
-   **Pages**:
    -   **Game Page (`src/pages/game/`)**: The main interactive quiz screen.
    -   **Home Page (`src/pages/home/`)**: The entry point, likely for configuration or starting a quiz.
    -   **Result Page (`src/pages/result/`)**: Displays the quiz outcome and score.

### 5. Shared (`src/shared/`)
-   **Purpose**: Contains highly reusable utilities, API clients, and foundational UI components.
-   **Contents**:
    -   `api/`: Generic API client (`client.ts`).
    -   `assets/`: Static assets.
    -   `lib/`: General utility functions (`cn.ts`, `utils.ts`).
    -   `ui/`: Reusable UI primitives (`button.tsx`, `card.tsx`, `icon.tsx`, `typography.tsx`).

### 6. Widgets (`src/widgets/`)
-   **Purpose**: Complex UI blocks composed of multiple features or entities, often specific to a layout section.
-   **Widgets**:
    -   **Layout Header (`src/widgets/layout-header/`)**: Application-wide header.
    -   **Quiz Board (`src/widgets/quiz-board/`)**: The main display area for quiz questions and answers.
    -   **Result Summary (`src/widgets/result-summary/`)**: Displays a summary of the quiz results.

---

## Next Feature to Implement

**Feature**: Implement robust error handling and loading states for question fetching in `src/entities/question/api/fetch-question.ts`.

**Why it is next**: A stable data fetching mechanism is fundamental for any interactive application. Without proper error handling and loading indicators, the user experience can be poor, and the application might appear broken when API issues occur. This feature directly supports the "Custom Configuration" and "Interactive Timer" aspects by ensuring questions are loaded reliably and gracefully handling network or server issues. It's a foundational improvement that will enhance the stability and user experience of the core quiz functionality.

**Branch**: `feat/robust-question-fetching`

**NEXT ACTION**: Create `.llm/workflow_rules.md` by copying the content of `@AGENT.md` into it.