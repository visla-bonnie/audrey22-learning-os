# Audrey #22 Learning OS — V3.4

A static web app for Audrey's daily Grade 7 mastery training. V3 is **automatic by default**: it does not require parent-entered school topics to generate useful daily practice.

## V3 training engine

- California / common Grade 7 core skills
- Audrey's Spring 2026 ERB CTP priorities
- Transfer-readiness practice (ISEE-style skill domains; original questions)
- Reading, writing, grammar, vocabulary and verbal reasoning
- Science reasoning and broad middle-school science
- California Grade 7 world-history foundations + general social-studies reasoning
- Dynamic math generation, including core, placement and advanced extension
- Spaced mistake review and skill tracking
- Optional Hillbrook and Zhang/Think Academy topic inputs that re-weight the automatic plan

## Important content note

The app does **not** copy proprietary question banks from ERB, NoRedInk, Khan Academy, Kahoot, ISEE/SSAT, or other commercial products. It uses public standards, published skill descriptions, and common assessment domains to generate and organize original practice questions.

## GitHub Pages

Upload all files in this folder to the root of the existing `audrey22-learning-os` repository. Keep the same GitHub Pages URL.


## V3.1 hotfix
- Fixed Daily Training tab so it creates/resumes today's workout and immediately renders the current question.
- Training view now always renders the active question instead of only drawing the session shell.
- Updated service worker caching so GitHub Pages updates activate more reliably.


## V3.3 training navigation fix
- Daily workout now follows the visible subject order: Math → Reading → English → Science → Social Studies → Transfer Prep → Boss Challenge → Review.
- The subject labels are real clickable tabs, with per-section progress counts.
- Tapping a subject jumps to the first unfinished question in that section.
- Current question metadata now shows both global progress and section progress.
- Existing V3.1 daily session is rebuilt once so old shuffled ordering cannot survive the upgrade; other progress and Parent Radar data are preserved.


## V3.3 UI hotfix
- Daily Training subject names are real clickable buttons, not plain text.
- Clicking Math/Reading/English/etc. jumps directly to that subject's next unanswered question.
- Daily session order is Math → Reading → English → Science → Social Studies → Transfer Prep → Boss Challenge → Review.
- Old service-worker caching is retired to prevent stale GitHub Pages versions after uploads.


## V3.4 — Fresh 25 + Mistake Book

- Daily Training is fixed at **25 fresh questions**: 8 Math, 4 Reading, 4 English, 3 Science, 3 Social Studies, 2 Transfer Prep, and 1 Boss Challenge.
- No duplicate question appears inside the same daily set.
- Exact static questions and reading passages are rotated away for the previous 7 days whenever the bank allows; dynamic math also blocks recent exact prompts.
- **Mistake review is separate from the fresh 25**, so deliberate repetition never steals a new-practice slot.
- Every wrong answer is saved permanently in **Audrey #22 Mistake Book** with the last wrong answer, correct answer, explanation, miss count, and mastery status.
- `Practice Active Mistakes` lets Audrey deliberately repeat unresolved mistakes; `Start Due Reviews` keeps the 1/3/7/14/30-day spaced-review schedule.
- Existing V3 progress and Parent Radar data are preserved.
