---
name: Welcome text animation
description: Durable constraint for replaying the welcome title, label, and paragraph on scroll.
---

The welcome text animation must replay when the block re-enters the viewport, but must not use a clipping mask that visibly cuts letters during capture or interaction. Use the approved timing and easing with opacity/position movement for this text.

**Why:** Repeated viewport captures showed that clip-path reveals made the title appear broken or invisible while the animation was in progress, even when the final state was correct.

**How to apply:** Keep the hero's timing and easing relationship for replay, but preserve full glyph rendering for the welcome title, label, and paragraph on desktop and mobile.