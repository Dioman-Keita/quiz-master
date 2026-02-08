# 🧠 Quiz Master – Interactive Quiz App

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-cyan)
![Zustand](https://img.shields.io/badge/State-Zustand-orange)

A high-performance interactive quiz application, built with a modern and scalable architecture (**Feature-Sliced Design**) aligned with industry standards in 2026.

---

## 🚀 Deployed Site

Experience the Quiz Master live!
👉 [https://quiz-master-nine-vert.vercel.app/](https://quiz-master-nine-vert.vercel.app/)

---

## ✨ Features

-   🎯 **Custom Configuration**: Select category and difficulty level via a user-friendly configuration form.
-   ⏱️ **Interactive Timer**: Per-question time management with visual feedback and engaging cues.
-   📊 **Scoring System**: Real-time score calculation and a comprehensive results screen with percentage.
-   🎨 **Visual Feedback & Animations**:
    -   Clear indicators (Green/Red) for correct/incorrect answers, enhanced with subtle pulse/shake animations.
    -   Modern **Glassmorphism** design applied to main UI cards.
    -   Subtle hover effects on interactive elements for a polished feel.
    -   Smooth fade-in transitions for main page content.
-   📱 **Responsive Design**: Optimized layout for seamless experience across various screen sizes (mobile, tablet, desktop).
-   ♿ **Accessibility**:
    -   All interactive elements are keyboard navigable.
    -   Appropriate ARIA attributes for enhanced screen reader support.
    -   Improved focus management and clear color contrast for better readability.
-   🔄 **Replayability**: Full game state reset without page reload, allowing endless quiz sessions.

---

## 🏗️ Technical Architecture (Feature-Sliced Design)

This project follows the **FSD (Feature-Sliced Design)** methodology to ensure maintainability and scalability.  
The codebase is structured by business domains (Slices) rather than technical layers.

---

## 📁 Project Structure

```text
├── 📜 README.md
├── 🟨 eslint.config.js
├── 📄 index.html
├── 🗂️ package-lock.json
├── 🗂️ package.json
├── 📁 public
│   ├── 🖼️ vite.svg
├── 📁 src
│   ├── 📁 app                # Global configuration (Providers, Styles)
│   │   ├── 🟦 App.tsx
│   │   ├── 🟦 main.tsx
│   │   ├── 📁 styles
│   │   │   ├── 🎨 index.css
│   ├── 📁 entities           # Business Logic & Data Model
│   │   ├── 📁 question       # Question logic (API, Types)
│   │   │   ├── 📁 api
│   │   │   │   ├── 🟨 fetch-question.ts
│   │   │   │   ├── 🟨 fetch-question.test.ts
│   │   │   ├── 📁 lib
│   │   │   │   ├── 🟨 decoder.ts
│   │   │   ├── 📁 model
│   │   │   │   ├── 🟨 types.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 question-card.tsx
│   │   ├── 📁 session        # State Management (Zustand)
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 lib
│   │   │   │   ├── 🟨 score-logic.ts
│   │   │   ├── 📁 model
│   │   │   │   ├── 🟨 store.ts
│   ├── 📁 features           # User Actions
│   │   ├── 📁 answer-question
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 answer-list.tsx
│   │   ├── 📁 quiz-config
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 config-form.tsx
│   │   ├── 📁 quiz-timer
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 timer-display.tsx
│   ├── 📁 pages              # Screen composition
│   │   ├── 📁 game
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 game-page.tsx
│   │   ├── 📁 home
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 home-page.tsx
│   │   ├── 📁 result
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 result-page.tsx
│   ├── 📁 shared             # Reusable utilities & UI Kit
│   │   ├── 📁 api
│   │   │   ├── 🟨 client.ts
│   │   ├── 📁 lib
│   │   │   ├── 🟨 cn.ts
│   │   │   ├── 🟨 utils.ts
│   │   ├── 📁 ui
│   │   │   ├── 🟦 button.tsx
│   │   │   ├── 🟦 card.tsx
│   │   │   ├── 🟦 icon.tsx
│   │   │   ├── 🟦 typography.tsx
│   ├── 📁 widgets            # Complex UI blocks
│   │   ├── 📁 layout-header
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 header.tsx
│   │   ├── 📁 quiz-board
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 quiz-board.tsx
│   │   ├── 📁 result-summary
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 summury-card.tsx
├── 🗂️ tsconfig.app.json
├── 🗂️ tsconfig.json
├── 🟨 vite.config.ts
```

---

## 🖼️ Screenshots

_Placeholder for engaging screenshots showcasing the UI, animations, and responsive behavior._

---

## ⚙️ Installation

To set up and run the Quiz Master application locally, follow these steps:

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/quiz-master.git
    cd quiz-master
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the development server:**
    ```bash
    npm run dev
    ```
    The application will be accessible at `http://localhost:5173` (or another port if 5173 is in use).
4.  **Build for production:**
    ```bash
    npm run build
    ```
    This will compile the application into the `dist/` directory.

---

## 🕹️ Usage

The Quiz Master application is designed for intuitive interaction:

1.  **Home Page**:
    *   Upon launching, you'll land on the Home page where you can configure your quiz.
    *   Use the dropdowns to select your desired **Category** and **Difficulty** (currently uses hardcoded options).
    *   Click the "Start Quiz" button to begin.
2.  **Game Page**:
    *   Questions will appear one by one with a countdown timer.
    *   Select an answer option by clicking on it.
    *   Visual feedback (green for correct, red for incorrect) and animations will indicate your choice.
    *   Click "Next Question" to proceed.
3.  **Result Page**:
    *   Once the quiz is complete (either by answering all questions or running out of time), you'll be directed to the Result page.
    *   View your final score and percentage.
    *   Click "Play Again" to return to the Home page and start a new quiz.

---

## 🤝 Contribution

We welcome contributions to the Quiz Master project! If you'd like to contribute, please follow these guidelines:

1.  **Fork the repository** and create your branch from `main`.
2.  **Make your changes**. Ensure your code adheres to the project's coding standards.
3.  **GPG Sign your commits**. All commits must be GPG-signed. Refer to GitHub's documentation on [signing commits](https://docs.github.com/en/authentication/managing-commit-signatures/signing-commits) for more information.
4.  **Open a Pull Request**. Provide a clear and concise description of your changes, including the motivation and any relevant testing instructions.

---