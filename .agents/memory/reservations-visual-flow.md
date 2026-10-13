---
name: Reservations visual flow
description: Visual structure and copy for the booking flow inside the red callout.
---

Keep the booking experience visually quiet inside the existing red callout: show one step at a time in a three-stage slider labeled “01 IMAGINA”, “02 VISUALIZA”, and “03 CONVERSEMOS”. Initially show only the centered white “RESERVA TU PROYECTO” label, single-line display title, intro text, and three steps; reveal step details when the user selects “01 IMAGINA”. Keep the top area clear of the navbar and the three-step navigation compact. Add a “SALIR” control inside step one that returns to the overview without discarding uploaded photos. Omit the SB emblem. Keep image upload boxes compact and centered. On wide screens, place consent and privacy together, and center the placement field beside the generate button; center upload labels and preview status text. Keep primary buttons white and pill-shaped, and the placement input's full outline white. Borrow FAQ's viewport-triggered reveal quality, but give reservations its own staggered depth transitions and responsive hover feedback.

The reservation preview uses a browser-local composition of the body photo and reference, not generative AI. Do not send either photo to an external provider unless the user explicitly chooses an image-editing integration; the reviewed no-key Pollinations option generates from text rather than editing uploaded photos.

**Why:** The user repeatedly refined the booking layout from screenshots, chose local composition after learning the no-key image generator would not use the uploaded references, and wants a compact overview with a clear exit from step one.

**How to apply:** Preserve the overview-only initial state, reveal step details on selection, close to the overview without losing photos, keep the three-stage order and local-only image handling, and retain download and WhatsApp request behavior within those stages.
