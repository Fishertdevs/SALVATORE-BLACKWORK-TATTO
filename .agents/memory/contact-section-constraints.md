---
name: Contact-section constraints
description: User-approved geometry to preserve when refining the tattoo studio contact section.
---

Preserve the portrait's approved large rendered size and the contact/map panel's width. When a request is limited to alignment or spacing, adjust local padding and margins rather than changing the outer grid proportions or portrait aspect ratio.

For mobile portrait alignment changes, verify the rendered contact section at the affected viewport and measure the portrait's right edge before reporting completion. A CSS change alone does not confirm the visible gap is fixed; keep desktop placement unchanged for mobile-only requests.

The approved interaction is a permanently grayscale portrait that reveals localized original color as the mouse or pen moves over it. Painted areas persist after the pointer leaves and while scrolling within Contact, then clear only when the Contact section is exited. Keep the image static, use a normal cursor, and do not require clicks. Contact and footer entrance animations replay each time they enter view. The FAQ belongs immediately before Contact and must stay out of the navbar.

**Why:** The user approved the contact refinements as “perfect” and specified these interaction and placement rules; future edits should not undo them. A mobile portrait change also needed follow-up because a visible right-side gap remained after the initial CSS adjustment.

**How to apply:** Treat the portrait size/crop, contact-card width, interaction, section order, navbar omission, and repeatable animations as fixed unless the user explicitly asks to change them. Adjust local spacing only when a request is limited to alignment, and verify the actual mobile rendering for portrait-position changes.