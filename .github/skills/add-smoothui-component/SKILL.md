---
name: add-smoothui-component
description: Install and showcase SmoothUI components or blocks in this repository. Use when asked to add a SmoothUI component, install a registry item, or turn a SmoothUI preview/demo into a homepage showcase.
---

# Add a SmoothUI component

Install one or more SmoothUI components or blocks into this repository, create a self-contained showcase that renders with no props, and register it in `src/lib/data-components.ts`. Do not commit.

## Repository conventions

- Package manager: `pnpm`; use `pnpx` for one-off CLI commands.
- SmoothUI registry: `https://smoothui.dev/r/{name}.json`.
- Component root: `src/components/smoothui/<kebab-name>/`.
- Component source: `index.tsx`; put the homepage showcase in a sibling `<kebab-name>-demo.tsx`.
- Put sizable demo literals in a sibling `default-data.tsx`.
- The homepage renders the registered `Component` as `<Component />`, without props.
- `@/*` aliases to `src/*`; `components.json` maps `@smoothui` to the SmoothUI registry.
- Check `src/lib/data-components.ts` before installing or registering; skip an item whose URL is already present.
- Reference patterns: `src/components/smoothui/agent-avatar/agent-avatars.tsx`, `src/components/smoothui/basic-accordion/default-data.tsx`, and `src/components/smoothui/animated-o-t-p-input/`.
- Validate with `pnpm exec tsc --noEmit`, `pnpm lint`, and `pnpm format`. Never commit.

## Determine the input and registry name

Process multiple requested components in order. Treat unrecognized non-URL input as source code, not as a component name.

- **Registry/name input:** a `/r/<name>.json` URL, `<name>.json`, or bare registry name. Build the showcase yourself.
- **Code/demo input:** a pasted snippet. Preserve its structure, copy, state, and animations; only adapt imports, move literals to optional defaults, and make it self-sufficient.
- **Preview/docs input:** a `https://smoothui.dev/preview/<id>` URL, docs URL, or a name explicitly requested with a demo. Use the upstream docs example as the showcase.
- If no component or source is specified, show the current entries in `src/lib/data-components.ts` and ask which item to add.

Resolve the exact registry name from the URL or import path first. A PascalCase identifier can be converted to kebab case as a heuristic, but verify it: acronyms and punctuation often differ from the actual name.

Before installing, fetch `https://smoothui.dev/r/<name>.json` and confirm it returns HTTP 200. If a guess fails, check the component docs frontmatter at `https://raw.githubusercontent.com/educlopez/smoothui/main/apps/docs/content/docs/components/<guess>.mdx`; its `installer` value is the registry name. Never install on a 404 or 500. Read the registry JSON and every file's content to learn targets, exports, required props, and dependencies.

Useful read-only upstream references:

- Registry: `https://smoothui.dev/r/<name>.json`
- Component source: `https://raw.githubusercontent.com/educlopez/smoothui/main/packages/smoothui/components/<name>/index.tsx`
- Block source: `https://raw.githubusercontent.com/educlopez/smoothui/main/packages/smoothui/blocks/<section>/<name>/index.tsx`
- Docs metadata: `https://raw.githubusercontent.com/educlopez/smoothui/main/apps/docs/content/docs/components/<name>.mdx`
- Preview example: `https://raw.githubusercontent.com/educlopez/smoothui/main/apps/docs/examples/<exampleId>.tsx`
- Example tree and file sizes: `https://api.github.com/repos/educlopez/smoothui/git/trees/main?recursive=1`

For a preview, list matching examples (`<id>.tsx`, `canvas/<id>.tsx`, and `<id>-1.tsx` through `<id>-9.tsx`) and choose the largest by file size. Prefer the plain example over `canvas/` when both exist. Follow one-line re-exports to their real source. Block example imports are a cue to install and render the referenced block.

## Install and inspect

Install the SmoothUI item with:

```sh
pnpx shadcn@latest add https://smoothui.dev/r/<name>.json --yes
```

Do not add `--overwrite` unless correcting a broken previous install. The CLI should handle registry dependencies. Add missing dependencies only if necessary; `motion` and `lucide-react` are already project dependencies. Install additional showcase dependencies only when required; do not register them as showcases.

Use the registry `target` to verify the installed path. If it landed outside `src/components/smoothui/<name>/`, move it to the correct location and repair relative imports. Keep the upstream component's exports intact; modify its behavior only as needed for this repo or a zero-prop showcase.

## Build a zero-prop showcase

Put the showcase in the sibling demo file so a later registry overwrite will not erase it. Register the showcase, not a component root that requires props or children.

- Make every showcase prop optional and provide realistic defaults in parameter destructuring.
- Lift hardcoded demo values into optional props with defaults when that makes the example configurable.
- Store substantial arrays/strings/JSX fixtures in `default-data.tsx`; keep small values inline.
- If the component is compound, compose its exported parts into a useful no-prop showcase.
- Add `"use client"` to files using hooks, effects, motion, canvas, timers, or event handlers.
- Remap upstream imports:
  - `@repo/smoothui/components/<name>` → `@/components/smoothui/<name>`
  - `@repo/smoothui/blocks/<section>/<name>` → `@/components/smoothui/<name>` (install the block too)
  - `@repo/shadcn-ui/components/ui/<name>` → `@/components/ui/<name>` (install the shadcn primitive if missing)
  - Inline only the small pieces needed from upstream demo fixtures; replace unavailable repo/docs imports with local markup and Tailwind.
- Never leave unresolved imports. Keep changes and dependencies minimal.
- Make the wrapper visually intentional and centered, typically `flex w-full flex-col items-center justify-center`. Do not invent fixed or minimum heights (`min-h-*`, `h-*`) for the showcase wrapper; use padding if spacing is needed.
- Fix lint errors shipped by the registry rather than suppressing them. Prefer deriving values from props/state over effects that synchronously mirror props into state.

## Register the showcase

Add an import and one entry in `src/lib/data-components.ts` using the existing object shape and property order:

```ts
{
  title: "Component Title",
  Component: ComponentDemo,
  url: "https://smoothui.dev/docs/components/<name>",
},
```

Use the docs frontmatter `title` when available, otherwise the registry title, then a readable title derived from the registry name. The URL must use the registry name, not the display title. Verify the docs URL returns HTTP 200; if it does not, find the actual docs slug. Avoid duplicate URLs. Keep the list's established ordering/style; do not reorder unrelated entries.

## Verify and report

Run:

```sh
pnpm exec tsc --noEmit
pnpm lint
pnpm format
```

Review the final diff and ensure the formatter did not cause unrelated content changes. If lint reports existing issues outside the changed files, distinguish those from new failures. Remove any temporary registry, tree, or demo files created during investigation.

Report the input mode, selected upstream demo file if applicable, registry name, installed path, showcase file and export, registration URL and HTTP status, and verification results. Mention optional props/default data/lint fixes as applicable. Do not commit.
