---
name: web-quality-supplement
description: Supplement Modern Web Guidance when building or reviewing web pages, native forms, accessibility, browser compatibility, progressive enhancement, and optional agent-facing web actions. Use for concrete web implementation work; load only the reference relevant to the task.
---

# Web quality supplement

Build usable, legible web experiences with current platform capabilities. Keep ordinary reading, navigation, and primary actions available when enhancements fail. This is the fork's supplemental skill, not an upstream Chrome standard or an accessibility certification.

1. Read the project's actual browser/support requirements and identify the primary user journey. Use the upstream [Modern Web Guidance workflow](../modern-web-guidance/SKILL.md) to search and retrieve relevant guides. Do not load the whole catalogue.
2. For structure, forms, focus, and accessible behavior, read [standards and accessibility](references/standards-accessibility.md). Target all applicable WCAG 2.2 A/AA criteria; the short selection here does not replace the full standard.
3. For newer platform features, read [compatibility and frontier features](references/compatibility-frontier.md). Choose the newest useful enhancement that can fail harmlessly; Baseline is evidence about availability, not a ceiling on experimentation.
4. For agent-readable content or typed actions, read [agentic web](references/agentic-web.md). Semantic HTML works everywhere; WebMCP is an optional experimental adapter over the same user-facing capability.
5. Consult [dated sources](references/sources.md) before depending on changing APIs. Recheck the specific member and deployed browser version; a family-level API badge is insufficient.
6. Report what was implemented and actually exercised, the fallback, and anything still unverified. Use real normal workflows. Respect the project's preview/review boundaries; do not invent conformance, performance, or browser-execution evidence.

Use the same source with Codex, Claude Code, Grok, Gemini, Cursor, Copilot, Kimi, or another coding agent. Native skill installation is optional: an agent able to read this file and its relative references can apply the complete guidance. No model, credential, service, browser extension, or machine-specific path is required. See [fork usage and provenance](../../FORK.md) for discovery limitations and upstream synchronization.
