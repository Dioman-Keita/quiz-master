# Pull Request: Fix Incorrect Dropdown Mapping for Quiz Categories

## Closes #issue

## Description
This Pull Request addresses a bug on the site configuration page where certain category values in the dropdown lists were not displayed correctly due to mapping issues. Specifically, "Any Category", "Science: Computers", and "Science & Nature" were affected.

The fix involves explicitly mapping these categories to their correct translation keys within the `ConfigForm` component:
- "Any Category" is now correctly mapped to `category.any`.
- "Science: Computers" is now correctly mapped to `category.computers`.
- "Science & Nature" is now correctly mapped to `category.science_nature`.

This ensures that all category names are properly translated and displayed in the quiz configuration dropdown, improving user experience and preventing potential API issues from incorrect selections.

## Changes Made
- Modified `src/features/quiz-config/ui/config-form.tsx` to include explicit mapping logic for problematic category names to their respective translation keys.

## How to Test
1. Navigate to the site configuration page.
2. Observe the category dropdown.
3. Verify that "Any Category", "Science: Computers", and "Science & Nature" are now displayed correctly according to the `en.json` translation file.
4. Select these categories and ensure no unexpected behavior or API errors occur.