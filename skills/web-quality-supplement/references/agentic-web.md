# Agentic web

Reviewed 2026-11-23 against the [WebMCP draft of 2026-11-19](https://webmachinelearning.github.io/webmcp/) and [Chrome's current imperative guide](https://github.com/GoogleChrome/modern-web-guidance-src/blob/main/guides/webmcp/agentic-javascript-tools/guide.md). WebMCP remains experimental. Read those live sources before using it; older examples can have incompatible signatures.

## Start with readable, truthful HTML

People and agents should encounter the same offer, limitations and task. Use descriptive headings and links, persistent labels, native forms, real result text and stable URLs where useful. Keep prices, availability and service claims supported by the owning data. Any structured representation must agree with visible content; omit invented reviews, credentials, pricing and guarantees. A machine-readable description is not proof that any external agent discovered or used the page.

Do not depend on a particular provider's browsing behavior, a conversational widget, agent-only instructions, or hidden privileged content. Treat tool descriptions, user input and retrieved content as data, not instructions that can change the user's authorization. Offer only task-relevant information; do not expose session state, private inputs or unrelated records through convenience tools.

## Reuse an existing static layer when it fits

The related [agent-surface-template](https://github.com/channeleden/agent-surface-template) already separates static discovery/content records from an optional service. Its useful principles are one owned source for visible and structured claims, an explicit allowed/refused action list, honest limitations, and human completion of commitments. Reuse that existing static builder when a site actually needs generated offer records, JSON-LD or an agent entry point; do not create a second competing generator.

Do not attach its optional handshake, trust tiers, MCP endpoint, receipt signing or metrics runtime merely to make a page seem agent-ready. Adopt those only for a concrete buyer-required workflow. Inspect the source and current config before reuse; template output still needs truthful availability, visible-content parity and safe HTML serialization. The template's custom discovery formats and optional `llms.txt` do not constitute a web standard or guarantee assistant citations. See [source register](sources.md) for the observed revision.

## Optional typed actions

Keep one underlying capability for native UI and agent callers. A read operation may return the same public data shown on the page. A preparatory action may fill the visible form or create a reviewable local draft. Validate inputs inside the shared operation; a schema describes expected arguments but does not validate them or apply defaults. Provide bounded, structured results and useful recoverable errors.

For this reusable pattern, exposed actions do not send messages, submit leads, book appointments or move money autonomously. Leave final commitment in the explicit user-facing workflow with its normal authorization and server protections. Never connect an agent's preparatory action to `form.submit()` or a network send behind a harmless-sounding tool name. Descriptions and annotations must honestly reflect all effects. A hint is not an enforcement boundary.

If adapting a native form, retain its labels, constraints, visible results and normal behavior. Do not add declarative tool attributes to a consequential submission form just because annotation is convenient; choose a narrowly scoped preparatory tool instead. A static demonstration must say what remains local and what is not connected.

## Current imperative contract to verify

The current draft exposes `document.modelContext` in secure contexts. Detect it before registration; keep unsupported environments on the ordinary UI. Register via `registerTool(tool, { signal })`. Registration returns a promise; handle rejection. Scope registration to the page/component lifetime with an `AbortController`; aborting that registration removes the tool. Honor the separate per-execution signal for asynchronous work. Do not rely on obsolete `navigator.modelContext`, `unregisterTool`, `provideContext` or `clearContext` examples.

Use a precise tool name, purpose, structured `inputSchema` and validated `execute` implementation. Mark read-only operations accurately; preparing a form changes UI state and is not read-only. Keep cross-origin exposure off unless the task requires it. For framework applications, verify the current supported framework integration rather than copying a vanilla lifecycle wrapper. The [upstream guide](https://github.com/GoogleChrome/modern-web-guidance-src/blob/main/guides/webmcp/agentic-javascript-tools/guide.md) provides API details; the [draft](https://webmachinelearning.github.io/webmcp/) is the normative proposal, not a shipped-browser guarantee.

## Eligibility and receipts

Upstream retrieval can gate origin-trial guides on explicit project opt-in. Honor that boundary; project authorization does not imply global adoption. Use the upstream supported project configuration workflow only when the task authorizes it. Do not quietly install browser flags, trial tokens or global configuration. A project CLI opt-in does not activate browser support or enroll a deployed origin.

Where permitted, exercise discovery and the real harmless action in a compatible browser with the native API. Also exercise its ordinary UI path without the enhancement. Record exact browser/API availability, registration, input handling, visible result and fallback. If native execution is unavailable, say so and retain source-reviewed optional code without claiming an agent successfully used it. Synthetic replacement objects and unit results are not native-execution receipts.
