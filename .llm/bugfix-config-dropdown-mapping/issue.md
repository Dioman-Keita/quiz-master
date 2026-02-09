# Issue: Incorrect Dropdown Values on Site Configuration Page

## Description
On the site configuration page, some values within the dropdown lists are not displayed correctly. This is caused by a mapping issue, leading to an incorrect presentation of options to the user.

## Impact
This bug degrades the user experience as users are presented with incorrect or missing options in the configuration dropdowns. Furthermore, selecting an incorrectly displayed value could potentially lead to API crashes due to invalid data being submitted.

## Reproduction Steps
1. Navigate to the site configuration page.
2. Observe the dropdown lists (e.g., for quiz difficulty, categories, etc.).
3. Note that some expected values are either missing or incorrectly displayed.
4. Attempting to select these values may lead to unexpected behavior or API errors.

## Expected Behavior
All dropdown values on the site configuration page should be correctly mapped and displayed to the user, allowing for proper selection and submission without causing API errors.

## Current Behavior
Dropdown values are incorrectly displayed due to a mapping issue, leading to a poor user experience and potential API instability.