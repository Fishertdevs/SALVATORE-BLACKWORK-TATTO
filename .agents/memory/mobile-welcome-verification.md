---
name: Mobile welcome verification
description: How to verify the mobile welcome animation without confusing its initial and completed states.
---

Verify the mobile welcome with two separate captures: an immediate capture for the grayscale opening and a delayed browser capture for the final hero.

**Why:** A browser test that waits for navigation completion can miss the opening animation and capture only the finished hero, producing a false conclusion that the grayscale phase never ran.

**How to apply:** After changing the mobile welcome, use an immediate app-preview capture to inspect the grayscale state. Use a delayed mobile browser check only for the final hero layout and console errors.