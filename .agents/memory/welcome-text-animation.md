---
name: Welcome text animation
description: Durable constraint for replaying the welcome title, label, and paragraph on scroll.
---

The welcome title and its subtitle animation must replay when the block re-enters the viewport, while explanatory paragraphs remain static and visible. The title animation must not use a clipping mask that visibly cuts letters during capture or interaction. Use the approved timing and easing with opacity/position movement for the headings.

**Why:** Repeated viewport captures showed that clip-path reveals made the title appear broken or invisible while the animation was in progress, even when the final state was correct; replaying body copy also made the section feel unstable.

**How to apply:** Keep the hero's timing and easing relationship for replay on the welcome title and label only. Keep the explanatory paragraph rendered continuously on desktop and mobile.