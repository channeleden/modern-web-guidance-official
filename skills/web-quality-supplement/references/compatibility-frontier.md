# Compatibility and frontier features

Reviewed 2026-11-23. Prefer the most useful current platform capability with a proportionate fallback. A frontier feature can improve the experience even before universal adoption; it must not make the main task conditional on an experimental browser, account, download, or model.

## Support policy

Use the project's explicit audience and version policy first. If none exists, preserve a semantic HTML core and add features according to capability detection. Do not silently invent a contractual browser-version guarantee.

[Baseline](https://developer.mozilla.org/en-US/docs/Glossary/Baseline/Compatibility) summarizes support across its browser set. Widely available means at least 30 months since cross-browser availability; newly available covers the current releases but does not guarantee older installations. It does not assess assistive technology, every webview, performance or usability. Read compatibility details for the exact subfeature.

| Layer | Adoption decision | Useful failure behavior |
| --- | --- | --- |
| Core content and primary action | HTML, native controls, ordinary navigation and server handling where applicable | Read, navigate and complete the task without enhancement |
| Established layout and components | Use supported native CSS/HTML; retain project-required older-browser handling | Readable flow and operable controls |
| Newly available platform capability | Adopt when it improves the task, detect what is used and keep its fallback | Same content/action with simpler presentation |
| Limited, experimental or origin-trial capability | Explicit project opt-in, current source/signature check, isolated adapter and failure containment | Omit the enhancement and preserve core behavior |

## Concrete choices

| Capability | Dated evidence | Enhancement / fallback choice |
| --- | --- | --- |
| Native `dialog` | MDN: widely available, cross-browser since March 2022; individual newer members differ | Use native modality when needed; keep an in-page route to essential content if modal setup fails |
| `document.startViewTransition()` | MDN: newly available, Baseline 2025, October 2025 | Guard the method and reduced-motion preference; run the same DOM update directly when unavailable; no navigation delayed for decoration |
| CSS `anchor-name` | MDN: newly available, Baseline 2026, January 2026; related members vary | Use `@supports` for the full positioning syntax; otherwise use normal-flow or bounded positioning without hiding controls |
| Scroll-driven animation or other rapidly evolving CSS | Inspect the exact property's current compatibility rather than assume from the family | Gate with `@supports`; content visible by default; reduced-motion gets the completed static state |
| WebMCP | Community Group draft 2026-11-19; experimental, not a W3C Standard | Feature-detected optional tool exposure; regular UI remains authoritative and complete |
| Browser-managed AI | API status/device/language/model availability varies | Optional, explicitly requested assistance with cancellation and honest unavailable state; the task remains possible manually |

Sources and current entry points: [dated source register](sources.md). The table records observations, not a permanent browser promise.

## Ruthless progressive enhancement

Write the simple state first. A failed stylesheet, unavailable method, rejected registration or aborted request must not leave content invisible, navigation intercepted, buttons inert, a spinner permanent, or a false success message. Prefer a static state, native control or direct navigation over a polyfill and a new dependency. Do not add a second client state machine just to preserve decoration.

Feature detection must match the operation: `@supports` for CSS syntax and guarded property/method checks for JS. Presence alone does not establish permission, model availability or successful execution. Contain optional initialization errors separately from core initialization. Avoid user-agent sniffing and global monkey patches.

For each enhancement, write one short decision: purpose, API/source checked, target audience, fallback, failure handling and observed result. Remove an enhancement that costs more latency, bytes, cognitive effort or maintenance than the user benefit justifies. No new runtime, component library or model call is required by this skill.
