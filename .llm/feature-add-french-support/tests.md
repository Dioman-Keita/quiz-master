# Feature Tests for French Language Support

## Objective
To validate the correct implementation and functionality of French language support, including UI translations, dynamic question translation, caching, and overall language switching without regressions.

## Test Cases

### Test Case 1: Initial Language Load and UI Translation
**Steps:**
1.  Open the application in a web browser.
2.  Observe the initial UI elements (e.g., "Quiz Master" title, "Settings", "Select Category", "Start Quiz" button).

**Expected Result:**
*   All UI elements should be displayed in English by default.

### Test Case 2: Language Switching - English to French
**Steps:**
1.  From the home page, locate the language selector (EN/FR buttons in the header).
2.  Click the "FR" button.
3.  Observe all visible UI elements on the home page (title, settings, dropdown labels, button texts).

**Expected Result:**
*   All static UI text elements on the home page should immediately switch from English to French. Examples:
    *   "Quiz Master" -> "Maître du Quiz"
    *   "Settings" -> "Paramètres"
    *   "Select Category" -> "Sélectionner une catégorie"
    *   "Start Quiz" -> "Démarrer le Quiz"
*   The page should not reload.

### Test Case 3: Language Switching - French to English
**Steps:**
1.  (Continue from Test Case 2, with French selected).
2.  Click the "EN" button in the language selector.
3.  Observe all visible UI elements on the home page.

**Expected Result:**
*   All static UI text elements on the home page should immediately switch back from French to English.
*   The page should not reload.

### Test Case 4: Dynamic Question Translation
**Steps:**
1.  Select "FR" using the language selector.
2.  Configure a quiz (e.g., any category, any difficulty).
3.  Click "Démarrer le Quiz" (Start Quiz).
4.  Observe the question card.

**Expected Result:**
*   A "Traduction de la question..." (Translating Question...) message should briefly appear.
*   The quiz question and its options should then appear in French.
*   The category displayed on the question card (if applicable) should also be in French.
*   If translation fails for any reason, the question and options should fallback to English.

### Test Case 5: Question Translation Caching
**Steps:**
1.  (Continue from Test Case 4, with French selected and a question translated).
2.  Answer the current question to proceed to the next one.
3.  Switch back to English using the language selector.
4.  Switch back to French.
5.  Answer another question.

**Expected Result:**
*   When switching back to French for a question that was previously translated, the "Traduction de la question..." message should either not appear or appear for a very brief moment (indicating a cache hit). The question should appear in French quickly.
*   Subsequent questions (that haven't been seen/translated yet) should still show the "Translating Question..." message.

### Test Case 6: Quiz Flow with French Language
**Steps:**
1.  Select "FR" using the language selector.
2.  Start a quiz.
3.  Answer several questions, observing that questions and options are translated.
4.  Let the timer run out or finish the quiz.
5.  Navigate to the results page.

**Expected Result:**
*   The entire quiz flow (questions, answers, timer messages, score display) should consistently be in French.
*   The results page should display "Quiz Terminé !" and "Votre score final est :" in French.
*   The "Réessayer" (Try Again) button should be in French.
*   No functional regressions (e.g., incorrect scoring, broken buttons).

### Test Case 7: Error Handling for Translation
**Steps:**
1.  (Hypothetically) Simulate a failure in the translation service (e.g., by temporarily blocking requests to `translate.googleapis.com` in browser dev tools, if possible).
2.  Select "FR" and start a quiz.
3.  Observe a question loading.

**Expected Result:**
*   If translation fails, the system should gracefully fallback to displaying the original English question and options.
*   An error message (translated if possible, otherwise English) indicating the translation failure might be shown.

## Verification Checklist
- [ ] UI elements translated correctly on language switch.
- [ ] Quiz questions and options dynamically translated to French.
- [ ] Translated questions are cached and load faster on subsequent views.
- [ ] No page reloads occur during language switching.
- [ ] Existing English functionality remains intact.
- [ ] Translation error fallback mechanism works as expected (displays original English).