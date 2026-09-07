# Audrey #22 Learning OS — V3.1

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
