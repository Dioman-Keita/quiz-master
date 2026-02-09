# Feature Specification: Add French Language Support to Quiz-Master

## Feature Name
Add French Language Support to Quiz-Master

## Goal
- Enable users to switch between English and French.
- Translate all UI elements using a JSON language mapper.
- Translate quiz questions from Open Trivia DB using Google Translate API on the client side with caching.
- Maintain full English functionality.
- Ensure performance is not impacted and no regressions occur.

## Scope / Non-goals
**In-scope:**
- Implementation of a language selection dropdown (English / French).
- Creation of `en.json` and `fr.json` for UI text translations.
- Integration of client-side Google Translate API for dynamic quiz question translation.
- Caching mechanism for translated quiz questions to optimize performance.
- Logic to update UI and quiz questions dynamically upon language switch without page reload.
- Ensuring existing English functionality remains intact.

**Out-of-scope:**
- Backend translation services.
- Advanced localization features (e.g., date/time formatting, pluralization rules beyond basic string replacement).
- Translation of any content not explicitly mentioned (e.g., external links, images with embedded text).
- Major refactoring of existing, unrelated components.
- Fixing pre-existing bugs not related to this feature.

## User-visible behavior
- A language selection dropdown will be visible on the UI, likely in the header or a settings section.
- Users can select "English" or "French" from this dropdown.
- Upon selecting "French", all static UI text elements (buttons, labels, headings) will instantly switch to their French counterparts.
- When a quiz is started with French selected, the quiz questions fetched from Open Trivia DB will be displayed in French after a short loading period (for translation and caching).
- If the user switches back to English, all UI and quiz questions will revert to English.
- Translated quiz questions will be cached, so switching back and forth between languages within the same session will result in instant display of previously translated questions.
- If Google Translate API fails or returns an error for a question, the original English question will be displayed as a fallback.

## Requirements
1. Implement a **language selection dropdown** (English / French).
2. Apply **UI translations** using a JSON mapper:
   - `.llm/feature-add-french-support/lang/en.json`
   - `.llm/feature-add-french-support/lang/fr.json`
3. Translate **quiz questions dynamically** when French is selected:
   - Use Google Translate client-side
   - Cache translations to avoid repeated API calls
   - Only translate questions when needed (lazy translation)
4. Ensure that switching language:
   - Updates all visible UI text
   - Updates quiz questions
   - Does not reload the page unnecessarily
   - Does not break existing functionality
5. Place all LLM-generated code and artifacts under `.llm/feature-add-french-support/`
6. Optionally generate test instructions to validate language switching and translation
7. Follow **atomic commit** principles with Conventional Commit format:
   `feat(quiz): add French language support`

## Workflow
- Wait for user confirmation on this feature spec before starting implementation.
- Create dedicated feature branch: `feat/french-support`
- Implement all changes strictly according to this spec
- Commit atomically with message above
- Generate PR file referencing this feature spec

## Constraints
- Do not modify unrelated code or bugs
- Do not delete branches or archive files automatically
- Ensure that translations do not impact performance or UI behavior
- Ensure fallback to English if translation fails