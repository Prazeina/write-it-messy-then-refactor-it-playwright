# Playwright Login Automation - POM Practice

A small but **professional** Playwright test suite, built from scratch one layer at a time. It tests the login flow of [practicetestautomation.com](https://practicetestautomation.com/practice-test-login/) using the **Page Object Model**, **custom fixtures**, and **data-driven** tests.

## Structure

```
pages/LoginPage.js     # Page Object — locators + actions
fixtures/test.js       # Custom fixture — setup, written once
tests/login.spec.js    # The tests — a data-driven loop
test-data/users.json   # Test data — separate from logic
```

| Folder         | Responsibility                                  |
| -------------- | ----------------------------------------------- |
| `pages/`     | *How* — locators and actions for each screen |
| `tests/`     | *What* — the behaviors and assertions        |
| `fixtures/`  | *Setup* — repeated preparation, reused       |
| `test-data/` | *Data* — credentials and inputs              |

## Getting started

```bash
npm install          # install dependencies
npx playwright install   # install browsers (first time only)
```

## Running tests

```bash
npm test                       # run all tests (headless)
npx playwright test --headed   # watch them run in a browser
npx playwright test --ui       # interactive UI mode
npx playwright show-report     # open the HTML report
```

## What it covers

- ✅ Valid login lands on the success page
- ✅ Invalid username / password shows the right error
- ✅ Data-driven: one test, many credential sets (from `users.json`)

## Concepts practiced

Page Object Model · custom fixtures (`base.extend` + `use`) · data-driven testing ·
web-first (auto-retrying) assertions · role-based locators · positive & negative flows.
