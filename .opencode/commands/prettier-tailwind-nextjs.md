---
description: Add Prettier with automatic Tailwind CSS class sorting to a Next.js project
agent: build
---

Set up Prettier with `prettier-plugin-tailwindcss` for automatic Tailwind class sorting in the current Next.js project, then format the codebase once.

Optional overrides from the user: $ARGUMENTS

## 1. Detect the package manager

Check which lockfiles exist and pick the matching one:

| Lockfile                       | Use   |
| ------------------------------ | ----- |
| `pnpm-lock.yaml`               | `pnpm` |
| `bun.lockb` / `bun.lock`       | `bun`  |
| `yarn.lock`                    | `yarn` |
| `package-lock.json`            | `npm`  |
| none of the above              | `pnpm` (fallback) |

If `$ARGUMENTS` contains `--pm <name>`, that wins.

## 2. Install the dev dependencies

Run the equivalent of (substitute the detected manager):

```
<pkg-manager> add -D prettier prettier-plugin-tailwindcss
```

Use `--save-exact`? No. Keep semver ranges so they pick up patch updates.

If Prettier or the plugin is already in `devDependencies`, skip the install and just report the versions found.

## 3. Detect the Tailwind stylesheet

`tailwindStylesheet` must point at the real CSS entry that Tailwind scans sources from — without it the plugin can't resolve custom classes, theme values, or variants, and sorting degrades to plain Prettier behavior.

Look for these, in order:

1. `./src/styles/global.css`
2. `./src/app/globals.css`
3. `./app/globals.css`
4. `./styles/globals.css`
5. `./src/index.css`
6. `./globals.css`

Verify the candidate actually contains Tailwind (`@import "tailwindcss"`, `@tailwind` directives, or `@theme`) before accepting it. If none qualify, use `./src/styles/global.css`.

If `$ARGUMENTS` contains `--stylesheet <path>`, that wins.

## 4. Write `.prettierrc.json`

Create the file with:

```json
{
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "<DETECTED_STYLESHEET>",
  "tailwindFunctions": ["cn", "cva", "clsx", "cx"]
}
```

Replace `<DETECTED_STYLESHEET>` with the result of step 3.

Notes:
- `tailwindFunctions` is required whenever classes are assembled by helper functions. Grep the repo for `cn(`, `cva(`, `clsx(`, `cx(` and keep only the helpers actually imported, plus the four defaults if you prefer staying forgiving.
- Check whether a `.prettierrc`, `prettier.config.*`, or a `prettier` key in `package.json` already exists. If it does, merge into it instead of creating a second config file — two Prettier configs silently conflict.
- Do not override the user's existing formatting choices (quote style, semicolons, tab width) if they set them. Add only the three keys above.

## 5. Write `.prettierignore`

```
.next
node_modules
out
build
dist
coverage
.vercel
next-env.d.ts
*.tsbuildinfo
pnpm-lock.yaml
yarn.lock
bun.lock
bun.lockb
package-lock.json
```

Add any other generated or vendored directory you find at the repo root (`public/generated`, `.turbo`, `storybook-static`, `*.min.*`).

## 6. Add npm scripts

In `package.json` `scripts`, add these two only if the key is absent:

```json
"format": "prettier --write .",
"format:check": "prettier --check ."
```

Preserve every other script untouched.

## 7. Format once

```
<pkg-manager> run format
```

Then run `format:check` to confirm the tree is now clean, and `tsc --noEmit` plus the project's lint command to confirm sorting did not break anything. Class reordering is semantics-preserving in Tailwind v4 for the utilities the plugin reorders, but verify — `!` / `!important` prefixes and conflicting arbitrary values can still surface ordering bugs.

## 8. Report

Tell the user:
- The generated `.prettierrc.json`, `.prettierignore`, and the two scripts.
- The detected package manager and stylesheet.
- How many files the first format pass rewrote, and flag any file where class reordering changed the rendered result.
- That editors need a restart or a "Format on save" re-trigger to pick up the new config.
- Suggest wiring `format` into a pre-commit hook or CI check if `format:check` is not already enforced anywhere.

Do not commit anything.