# Kwa-Sukela Release Checklist

Use this checklist **every time before you announce a release**.

## 1) Repository state
- [ ] Confirm you are on the correct branch (`main` unless intentionally using a release branch).
- [ ] Confirm there are no unintended local changes.
- [ ] Confirm the latest intended commit is present.

## 2) Core file presence (must-have)
- [ ] `index.html`
- [ ] `vr-forest.html`
- [ ] `assets/vr-generated/dr-sasa-portrait.svg`
- [ ] `assets/vr-generated/forest-night-texture.svg`
- [ ] `assets/vr-generated/scroll-1.svg`
- [ ] `assets/vr-generated/scroll-2.svg`
- [ ] `assets/vr-generated/scroll-3.svg`
- [ ] `assets/vr-generated/scroll-4.svg`
- [ ] `assets/vr-generated/scroll-5.svg`

## 3) Quick functional smoke checks
- [ ] VR Village shows the **Dr Sasa's Quest — Play Game** button and it opens `vr-forest.html`.
- [ ] Quest starts successfully and decrements Story Credits.
- [ ] Scroll collection works and opens modal content.
- [ ] Hidden relic interaction can be triggered.
- [ ] Final speech + certificate download flow appears after all 5 scrolls.
- [ ] Courses page opens and each Enrol card maps to the correct course.

## 4) Credits/token system checks
- [ ] Credits visible in HUD and start overlay.
- [ ] Depletion gate appears when insufficient credits.
- [ ] Refill timer displays and updates.
- [ ] Daily bonus does not exceed max credits.

## 5) Packaging checks
- [ ] Generate release ZIP excluding `.git` and `node_modules`.
- [ ] Verify ZIP includes `vr-forest.html` and all `assets/vr-generated/*` files.
- [ ] Verify ZIP opens and file sizes are non-zero.

## 6) GitHub publish checks
- [ ] Push commit(s) to remote successfully.
- [ ] Open repo on GitHub and verify changed files in the latest commit.
- [ ] Test public download URL:
  - `https://github.com/zintsomiapp-cmyk/kwa-sukela/archive/refs/heads/main.zip`
- [ ] Re-download ZIP from GitHub and verify required files are inside.

## 7) Release note template (copy/paste)
```
Release: <version/date>
Included:
- <feature 1>
- <feature 2>
- <fixes>

Validation:
- VR quest launch: PASS/FAIL
- Credits system: PASS/FAIL
- Course mapping: PASS/FAIL
- ZIP contents verified: PASS/FAIL

Public download:
https://github.com/zintsomiapp-cmyk/kwa-sukela/archive/refs/heads/main.zip
```

## 8) Rollback readiness
- [ ] Note previous stable commit hash.
- [ ] Confirm rollback command is known (`git revert` or reset strategy).
- [ ] Keep a copy of last known good ZIP artifact.
