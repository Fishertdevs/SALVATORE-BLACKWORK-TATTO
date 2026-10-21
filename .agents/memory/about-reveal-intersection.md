---
name: Scroll-reveal visibility
description: Constraint for IntersectionObserver-triggered clip-path text reveals.
---

Do not place a fully closed clip-path on an element before observing it for entry. Keep the clip-path open while it is offscreen and use opacity to hide it; apply the closed clip only after the observer detects entry.

**Why:** A fully clipped About text element stayed hidden because its intersection ratio did not reach the reveal threshold. Resetting offscreen state with opacity allowed re-entry to trigger normally.

**How to apply:** For scroll-driven text reveals, observe an unclipped target or wrapper. Keep the observed box measurable while it is offscreen, then apply the clip-path animation on entry and reset opacity after it fully leaves view.
