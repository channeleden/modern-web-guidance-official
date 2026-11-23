# Standards and accessibility

Reviewed 2026-11-23. Normative target: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), Recommendation 2024-12-12. This is a practical selection, not the complete conformance scope. Apply the standard's exceptions and applicability conditions. Full-page and complete-process assessment is necessary before making a conformance claim.

## Selected A/AA requirements

- Preserve semantic relationships, meaningful reading order, text alternatives, page language, descriptive titles and labels (1.1.1, 1.3.1–2, 2.4.2, 2.4.6, 3.1.1).
- Support keyboard operation without traps; provide bypass navigation, logical focus order, visible focus and focus not entirely hidden by author content (2.1.1–2, 2.4.1, 2.4.3, 2.4.7, 2.4.11).
- Meet text contrast of 4.5:1, or 3:1 for qualifying large text; relevant UI/graphics need 3:1. Preserve text resizing, reflow and text-spacing changes (1.4.3–4, 1.4.10–12).
- Provide 24×24 CSS-pixel targets or meet a specified exception; offer alternatives to dragging (2.5.7–8).
- Identify input purpose, label controls, explain errors, expose names/roles/states and announce status changes (1.3.5, 3.3.1–3, 4.1.2–3). Apply error-prevention and accessible-authentication requirements where relevant (3.3.4, 3.3.8).

See the [complete normative criteria and conformance requirements](https://www.w3.org/TR/WCAG22/). Media, timing, gestures, navigation consistency, redundant entry, and other applicable criteria remain in scope even when absent from this selection.

## Implementation choices

Start with [HTML's native form contract](https://html.spec.whatwg.org/multipage/forms.html): working links, real buttons, explicit labels, named controls, constraints, and an honest destination. Use GET only for nonsensitive retrieval. Mutations require the server's existing validation, authorization and appropriate request protection. Client checks improve feedback; they do not establish trust.

Maintain a single coherent reading sequence in the DOM. A visual grid must not reorder the task. Keep important text in HTML rather than generated CSS, canvas, images, tooltips, or agent-only metadata. Use native elements before adding ARIA; any additional state must match actual behavior. Prefer visible help over hidden verbosity.

For forms, show actionable feedback after an attempt or a relevant completed interaction. Preserve entries on failure. Connect help/errors to the control, correct stale invalid states, and avoid repeated live announcements while typing. Announce actual results rather than simulated success. If a demo only prepares a request, label it as a draft and explain where sending ends.

For dialogs, prefer [native `dialog`](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/dialog) when a modal is actually needed. Name it, choose suitable initial focus, retain an obvious close action, and return focus appropriately. Do not duplicate native modality with a competing focus trap. Avoid making essential information modal-only; an in-page destination can be a simpler fallback.

## Stronger design choices, beyond the selected AA floor

These are practical preferences, not claims that WCAG AA mandates every choice: generous 44–48px controls when space allows; clear language; visible labels; nonessential motion disabled under reduced-motion preference; no hidden-on-load scroll reveal of essential copy; robust outlines in forced colors; useful empty, unavailable and offline states; minimal announcements and no surprise focus shifts. Distinguish these choices from the normative criterion when explaining the work.

## Evidence

After the operator's permitted preview/review point, exercise the actual primary journey with keyboard, enlargement/reflow, relevant assistive technology and supported browsers. Record observed behavior and limits. Automated accessibility output can help locate defects; it does not establish full conformance or usability. Source review alone establishes implementation intent, not user acceptance or a completed accessibility assessment.
