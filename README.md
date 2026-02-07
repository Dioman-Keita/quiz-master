# 🧠 Quiz Master – Interactive Quiz App

![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Vite](https://img.shields.io/badge/Vite-5-purple)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3-cyan)
![Zustand](https://img.shields.io/badge/State-Zustand-orange)

A high-performance interactive quiz application, built with a modern and scalable architecture (**Feature-Sliced Design**) aligned with industry standards in 2026.

---

## ✨ Features

- 🎯 **Custom Configuration**: Select category and difficulty level via API.
- ⏱️ **Interactive Timer**: Per-question time management with visual feedback.
- 📊 **Scoring System**: Real-time score calculation and results screen with percentage.
- 🎨 **Visual Feedback**: Clear indicators (Green/Red) and responsive design (Glassmorphism).
- 🔄 **Replayability**: Full game state reset without page reload.

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
│   ├── 📁 widgets            # Complex UI blocks
│   │   ├── 📁 quiz-board
│   │   │   ├── 🟨 index.ts
│   │   │   ├── 📁 ui
│   │   │   │   ├── 🟦 quiz-board.tsx
├── 🗂️ tsconfig.app.json
├── 🗂️ tsconfig.json
├── 🟨 vite.config.ts
```
