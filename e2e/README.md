# End-to-end tests (Playwright)

These tests open a real browser and use the app like a commuter would.
Run every command from the **project root** (`nsw-commute-board/`).

## First-time setup

```bash
# Install Playwright (reads the root package.json)
npm install

# Download the Chromium browser Playwright uses (one-time, ~150–200 MB)
npx playwright install chromium
```

Both servers (React on 5173, Express on 4000) are started automatically by
`playwright.config.ts`. If they're already running in your terminals, Playwright reuses them.

## Everyday commands

| Command | What it does | When to use it |
|---|---|---|
| `npm run test:e2e` | Runs all tests in the background (no browser window) | Quick check before committing |
| `npm run test:e2e:ui` | Opens **UI mode**: timeline of every step, screenshots, network and console | ⭐ Best way to see what happened |
| `npm run test:e2e:headed` | Runs with a **visible** browser | Watch the test type and click |
| `npm run test:e2e:debug` | Opens the browser **paused** with the Playwright Inspector | Step through one action at a time |
| `npm run test:e2e:report` | Opens the HTML report from the last run that used `--reporter=html` | Review results after a run |

## Useful options

Pass extra options to any script after `--`:

```bash
# Run only one file
npm run test:e2e -- e2e/report-issue.spec.ts

# Run only the test that starts on line 3 of a file
npm run test:e2e -- e2e/report-issue.spec.ts:3

# Run only tests whose name contains "validation"
npm run test:e2e -- -g "validation"

# Debug one test (paused, step by step)
npm run test:e2e:debug -- e2e/report-issue.spec.ts:3

# Record a full trace of every step (screenshots, network, console)
npm run test:e2e -- --trace on

# Create an HTML report, then open it
npm run test:e2e -- --reporter=html
npm run test:e2e:report
```

## Debug mode controls (Playwright Inspector)

| Button | Shortcut | What it does |
|---|---|---|
| ⤼ Step over | F10 | Run **one line**, then pause again |
| ▶ Resume | F8 | Run to the end (or the next `await page.pause()`) |
| 🎯 Pick locator | — | Click an element to get the code that finds it |

On a Mac, add **fn** if the F-keys control volume or brightness.

To stop at a specific point, add `await page.pause();` to the test and run
`npm run test:e2e:headed`. Remove it before committing, or the test will hang.

## Debugging in VS Code

1. Click in the margin next to a line number to add a breakpoint (🔴).
2. Open the 🧪 **Testing** sidebar and tick **Show browser** in the Playwright section.
3. Right-click a test → **Debug Test**.
4. Use the debug toolbar: Continue (F5), Step Over (F10), Stop (Shift + F5).

## Reading a failure

```
✘ report form shows validation errors from the server
  waiting for getByRole('button', { name: 'Send report' })
> 33 |   await page.getByRole('button', { name: 'Send report' }).click();
```

- `✘` line: **which test** failed
- `waiting for …`: **what** it couldn't find
- `> 33`: **the exact line** in the test file

Then open `npm run test:e2e:ui` and click the red step to see the page at that moment.

## Tests in this folder

| File | Covers |
|---|---|
| `report-issue.spec.ts` | Search → station → report an issue → report listed as Open; server validation errors shown under each field |
