# Fork usage and provenance

This fork preserves [GoogleChrome/modern-web-guidance](https://github.com/GoogleChrome/modern-web-guidance) and adds portable supplemental web guidance plus an example. Upstream content remains upstream-authored; additions are maintained in this fork. The name of the GitHub fork does not imply official status or endorsement.

- Fork: [channeleden/modern-web-guidance-official](https://github.com/channeleden/modern-web-guidance-official).
- Initial fork/base and observed `upstream/main`: `64a6d708f5a43f2cd3fde5d4d7db3905ba1bdf65`, release v1.0.1.
- License: [Apache-2.0](LICENSE); retain upstream notices. External linked documents retain their own licenses.
- Upstream publish source: [GoogleChrome/modern-web-guidance-src](https://github.com/GoogleChrome/modern-web-guidance-src). See [CONTRIBUTING.md](CONTRIBUTING.md) for upstream contributions.

## Use with any agent

From a checkout, ask the agent to read `skills/web-quality-supplement/SKILL.md` and the relevant references. This works through ordinary file reading with Codex, Claude Code, Grok, Gemini, Cursor, Copilot, Kimi and other surfaces without installing a provider-specific adapter. The content and safeguards are identical for every surface.

Example task prompt:

> Read skills/web-quality-supplement/SKILL.md. Build or review this page using current official guidance. Keep a complete native HTML path, use useful frontier features as optional enhancements, and report the source dates, fallback decisions and actual workflow evidence. Honor the project's preview boundary.

The upstream repository has several native plugin manifests, but not all declare skills the same way: some discover the skills directory, others list individual skills explicitly. The new skill's presence does not prove native discovery or activation. Explicit file reading is the portable fallback. Existing manifests and user agent configuration remain untouched; no provider installation is claimed. Official CLI search/retrieve serves the upstream catalogue, not this fork's added reference files.

Use the [upstream workflow](skills/modern-web-guidance/SKILL.md) for targeted retrieval:

```sh
npx -y modern-web-guidance@latest search "accessible form validation"
npx -y modern-web-guidance@latest retrieve "forms,accessibility"
```

The checkout is a publish target and currently lacks the compiled CLI referenced by its package metadata. Use the official npm CLI for retrieval; do not invoke a nonexistent local binary or treat this fork as a new npm release. Review Telemetry & Privacy in the upstream [README](README.md) before installing or running its CLI.

## Extend and update

Keep additions in `skills/web-quality-supplement/`, `examples/accessible-landing/` and this file. Do not rewrite generated upstream guides just to incorporate project preferences. Preserve upstream package/plugin identity unless intentionally packaging a separate release with reviewed metadata.

The local checkout's `upstream` remote fetches the original publish repository and has a disabled push URL. Other clones can configure the same read-oriented remote once:

```sh
git remote add upstream https://github.com/GoogleChrome/modern-web-guidance.git
git remote set-url --push upstream DISABLED
```

To synchronize, start from a clean integration branch, fetch `upstream`, inspect the upstream change log and diff, and merge the selected upstream revision. Resolve only genuine conflicts; preserve fork additions. Re-read source dates and changing API details, then exercise targeted CLI retrieval and the consuming page's actual workflow. Do not force-reset fork history to upstream or copy generated files between repositories. The upstream source repository is the contribution destination, not a second unrelated base to merge.

## Observed development limits

On 2026-11-23, official CLI `@latest` reported 1.0.1 and returned relevant results for form-validation and agentic-tool searches. Combined retrieval of `forms,accessibility,agentic-javascript-tools` produced forms/accessibility guidance but returned nonzero at the WebMCP origin-trial eligibility gate. Experimental adoption requires the supported project-specific opt-in and current sources; it does not activate browser support. No global opt-in is part of this supplement.

A single explicit `npx ...@1.0.1` invocation failed to find the command in this environment while `@latest` ran successfully. This is an observed tooling limitation, not evidence that all pinned installations fail. Native provider skill discovery and native browser WebMCP execution require separate observation. Source consumption, CLI retrieval, and successful page delivery do not substitute for those receipts.
