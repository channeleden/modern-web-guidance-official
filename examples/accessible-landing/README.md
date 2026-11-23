# Accessible web design reference page

A static, independent-service landing page, built as an application of the official Modern Web Guidance fork. No framework, build step, third-party font, account, or backend is required.

## Visual guide and local inspection

The 2026-11-23 showcase iteration turns the page into a visual explanation of its design decisions. Distinct editorial compositions cover semantic structure, keyboard focus, adaptable typography and color, motion preferences, the agent layer and the actual brief interaction. A guide map expands the practical scope into performance, privacy, complete processes and maintaining the work. This is the guidance applied to this example, not the complete Chrome catalogue or a substitute for all applicable WCAG criteria.

`showcase.css` supplies the visual chapters and decorative section/element boundaries. Inspection boxes are on initially and can be toggled with a native button after JavaScript initializes. They follow real layout boxes, never intercept pointer events and do not implement accessibility remediation. Implementation explanations use native details/summary and remain available without JavaScript or the inspector.

`showcase.js` is a separate optional module; it cannot block the independent worksheet initialization in `app.js`. It samples Intersection Observer entry/exit, intersection ratios and CSS-pixel bounds at defined thresholds. These are geometric samples, not continuous positions, occlusion checks, attention, reading, screen-reader tracking or conformance evidence. DOM focus is reported separately and is not labelled as proof of keyboard use. Section-level events never inspect or copy form values. The most-intersecting sampled section is displayed, not an inferred active reader.

Events are retained only in this tab's memory, newest first, capped at 16; elapsed timestamps are seconds since the inspection module started. There is no network transmission, site storage or persistent identifier. The event list and passive metrics use `aria-live="off"` so scrolling does not produce a stream of announcements. The native pause toggle freezes observation and focus updates; Clear events removes the local history. Hidden tabs disconnect the observer, and resumption obtains fresh samples rather than treating an unobserved interval as measured time. Reduced-motion users start with telemetry paused, and changing that preference to reduced motion pauses it again. They may explicitly resume the passive stream.

Intersection Observer absence leaves the page and DOM-focus explanation usable and marks viewport measurement unavailable. An optional text-size slider changes only its labelled specimen, not browser zoom or OS text size. A native toggle shifts decorative shapes on request; reduced motion gets the immediate state change without a transition. The page-position line uses a native CSS scroll timeline behind syntax and motion-preference checks. Unsupported browsers omit that decorative line; there is no scroll handler, polyfill or dependency.

Current platform sources checked: [Intersection Observer](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), [document visibility](https://developer.mozilla.org/en-US/docs/Web/API/Document/visibilityState), and [animation-timeline](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timeline). Source authoring does not establish execution in a browser. The updated page and both added assets returned HTTP 200; JavaScript parsing passed. Visual review, real viewport/focus event behavior, no-JavaScript fallback, zoom, print, assistive-technology use and native WebMCP remain unverified pending authorized real-use review.

From this directory, run:

```sh
python3 -m http.server 53519 --bind 127.0.0.1
```

Open `http://127.0.0.1:53519/`. Any ordinary static server works. No publishing or public domain is configured.

## What works

- Semantic service content, anchor navigation, native FAQ disclosures, and labelled worksheet controls remain available without JavaScript. The unenhanced controls have no form owner: pressing Enter cannot navigate or send answers. A static `brief-template.txt` can be downloaded, filled in a text editor, and kept without JavaScript. The browser can also print the worksheet; long text inside native fields may print differently between browsers, so the text template is the dependable no-JavaScript way to keep extended answers.
- JavaScript promotes the same controls into a native form only after installing its no-navigation handler. It validates required answers and length limits, prepares a visible readonly brief, and offers explicit copy and `.txt` download actions. No request, email, analytics, site storage, or hidden submission is involved. The generated text identifies that nothing was sent. Editing an answer hides the old result and revokes its old download URL so it cannot be mistaken for the updated brief.
- Clipboard failure selects the readonly text and explains how to copy manually. Missing object-URL support leaves selectable text and browser printing available. Print styling uses the complete generated text rather than a clipped textarea when a prepared brief exists.
- Focus uses a 3px solid outline with 5px offset, controls target at least 48 CSS pixels at default text size, and content remains in DOM order. Inline text links use the WCAG inline-target exception. Native radio inputs remain visible. Form errors are linked only while displayed, and error feedback starts after interaction or an attempted preparation.
- CSS starts from ordinary block/grid/flex layout, with an intrinsic one-column fallback at narrower sizes, logical dimensions, relative type, flexible wrapping, and no fixed text-container heights. `:has()` selected-radio styling and `flex-wrap: balance` are optional. Native checked state and ordinary wrapping remain sufficient. No scroll reveals, autoplay, parallax, drag interaction, hover-only information, custom focus trap, or timed interruption exists.
- Reduced-motion preferences suppress the small disclosure-chevron transition; forced colors retain native colors, borders, and outline focus. The `text-scale` meta opt-in leaves the root font size under browser control, with normal zoom and relative typography as the fallback.
- Supported browsers grow multiline fields vertically at a stable full width, so longer answers are easier to review. Older browsers keep ordinary scrollable, vertically resizable textareas. Balanced short headings and selected paragraphs with refined wrapping fall back to ordinary line breaks without changing their content or order.

## Optional browser-agent layer

The example-local `.mwgrc` contains `{"allowOriginTrials":true}`. This is an intentional, narrowly scoped authoring opt-in following the user's explicit request for frontier agent layers with fallbacks. It does **not** activate an origin trial, install a token, set browser flags, change global configuration, or imply the browser supports WebMCP.

The enhanced native form has the documented declarative `toolname` and `tooldescription` annotations. There is deliberately no `toolautosubmit`: a compatible browser agent can fill the visible form, and the person reviews it before preparing a brief. The submit handler uses the same validation and visible result for human and agent interactions, and responds through the documented `SubmitEvent.respondWith()` only when that method exists and `agentInvoked` is true. Browsers without WebMCP ignore the attributes and retain the ordinary form. No polyfill or duplicate imperative tool is registered.

Current imperative guidance uses `document.modelContext`, not obsolete `navigator.modelContext`. This example needs no imperative API, capability spoof, or unsupported registration fallback. Native WebMCP execution is unverified until the page is used in an actual compatible browser with the relevant experiment. The declarative surface remains experimental and may change.

The inline JSON-LD describes only the visible page and service. It invents no identity, reviews, prices, availability, ratings, address, or certifications. It is a discovery aid, not a separate agent service or evidence of search eligibility.

## Source decisions

Sources consulted on 2026-11-23:

- [WCAG 2.2](https://www.w3.org/TR/WCAG22/): the design target is AA for applicable page behavior, with selected stronger focus/target-size/motion choices. This is not a conformance certification or claim that all criteria have been tested. No automated score is presented.
- [WAI forms: user notifications](https://www.w3.org/WAI/tutorials/forms/notifications/): persistent labels and help text, linked corrective errors, focus on the first failing answer, and truthful completion feedback.
- [WAI: Reflow](https://www.w3.org/WAI/WCAG22/Understanding/reflow.html): content-first stacking and wrapping, with no horizontal-overflow masking.
- [WAI: Focus Appearance](https://www.w3.org/WAI/WCAG22/Understanding/focus-appearance/): solid perimeter focus indicators rather than a shadow-only ring.
- [WAI: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html): minimal user-triggered motion that respects the system preference.
- [Chrome: Agentic Forms](https://developer.chrome.com/docs/modern-web-guidance/guides/webmcp/agentic-forms) and [Chrome: Declarative API](https://developer.chrome.com/docs/ai/webmcp/declarative-api): visible native form, optional declarative annotations, explicit human review, shared submit logic, and ordinary-browser fallback.
- [WebMCP draft](https://webmachinelearning.github.io/webmcp/): experimental status and the current `document.modelContext` imperative surface. The draft focuses on the imperative API; Chrome's declarative form API is a separate experimental surface, not an interoperable standard claim.

### Modern Web Guidance

The official `modern-web-guidance` skill was searched before implementation and the following guide IDs were retrieved. The checked-in example applies them without pulling its toolkit into the visitor flow.

- **`forms`**: I use explicit labels, native radio choices and required/maxlength constraints, and only show new errors on blur or an attempted preparation, not while someone is writing ("Don't trigger validation errors or `aria-live` error announcements on every keystroke"). The local-only worksheet intentionally has no server fallback; its static text template supplies a useful no-JavaScript path without sending data.
- **`accessibility`**: I keep native controls and disclosures, put error descriptions on fields only while those errors are displayed, and move focus to the prepared result ("Prefer HTML elements and attributes to ARIA"). The page makes no audit-score or certification claim.
- **`respect-os-text-scale`**: I opt into OS text scaling without overriding the root font size ("DO NOT explicitly set the root `font-size` in your stylesheet"). Relative units and wrapping remain the fallback in browsers that ignore the opt-in.
- **`css-layout`**: I keep responsive layout in source order and let content wrap ("Don't use `order` or `flex-direction: *-reverse` to reorder interactive content"). Unknown balanced-wrapping and `:has()` support cannot remove controls or essential state.
- **`agentic-forms`**: I omit automatic submission, annotate one visible native form, and reuse its validation/result ("Browsers that do not support WebMCP will ignore the `tool*` attributes"). The experimental authoring opt-in is limited to this example; there is no claim of real native agent execution yet.
- **`form-fields-automatically-fit-contents`**: I keep textarea width stable while enabling vertical growth with `field-sizing: content` ("Users will simply experience standard scrolling for overflowing content inside fixed-size inputs and textareas"). Unsupported browsers retain rows and native resizing, without a mirroring script or mandatory polyfill.
- **`improve-text-layout-and-legibility`**: I balance short headings and refine wrapping only for selected prose ("DO NOT apply `text-wrap: balance` globally"). Unsupported wrapping properties are ignored, preserving ordinary readable line breaks.
- **`scroll-progress-indicator`**: I keep the page-position line purely decorative and omit it when native CSS timelines are unavailable ("If the animation is only considered to be decorative, opt for Progressive Enhancement"). The timeline follows the animation shorthand so it is not reset.
- **`motion`**: I keep chapter content visible before any enhancement and limit spatial transitions to the no-preference media query ("Keep the final state"). The optional shape interaction changes immediately with reduced motion, without waiting for an animation event.
- **`html`**: I use native expandable implementation notes with accessible text links in their expanded content ("use `<details>` and `<summary>` for a native disclosure pattern without JS"). Inspection geometry is decorative rather than a focusable custom overlay.

The showcase re-applies the `accessibility` guide's passive live-region rule: "Don't use live regions for interstitial states". Its event stream is silent unless someone navigates to it, and a pause control freezes the stream.

## Validation and remaining review

Initial implementation checks are source-level only: JavaScript parsing, actual static-server responses, and review of no-send sequencing. No screenshots, visual QA, design jury, synthetic tests, mock WebMCP capability, unit tests, or audit-score campaign were run. This follows the operator's instruction to preview the artifact before visual QA.

Before treating this as an audited public service page, the operator should preview the design and authorize any visual review. Remaining real-use review includes keyboard and focus visibility, actual 320px reflow and 200–400% zoom, increased text spacing and OS text scale, mobile/touch use, forced colors, reduced motion, VoiceOver/Safari and other relevant assistive-technology/browser pairs, clipboard/download/print behavior, and disabled-user feedback. Native WebMCP requires a real compatible environment; a mocked API would not prove native execution. Actual host policies and the chosen contact destination also remain future deployment decisions.

The static sample has no receiving contact address or service-request endpoint. Preparing a brief does not book, send, reserve, or create a lead. Any future receiving flow needs explicit server validation, privacy handling, and accurate receiving/success copy.
