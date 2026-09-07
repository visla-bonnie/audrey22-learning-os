# Audrey #22 Learning OS — V2

A static web app for daily Grade 7 learning practice, review, skill tracking, and school milestone awareness.

## What is included

### New in V2

- Personalized ERB baseline from Audrey's Spring 2026 Grade 6 CTP report.
- Dashboard shows National Norm (NN) and Independent School Norm (IN) for all reported subtests.
- Daily practice automatically gives extra weight to lower ERB areas: Verbal Reasoning, Writing Concepts & Skills, Quantitative Reasoning, Mathematics, Reading Comprehension, and Writing Mechanics.
- New original ERB-style drills for verbal reasoning, writing concepts/skills, writing mechanics, and quantitative reasoning.
- Vocabulary remains in maintenance mode because it is Audrey's strongest ERB area on this report.


- Daily balanced practice across Math, Reading, English, Science, Social Studies, and Reasoning.
- Dynamic Math generator covering Grade 7 foundations, placement-style skills, and advanced topics (functions, systems, exponents/polynomials, quadratics).
- Original Reading passages with main-idea, inference, evidence, vocabulary, and author-purpose questions.
- English grammar, sentence structure, punctuation, vocabulary, and writing-logic questions.
- Science and Social Studies question banks focused on reasoning, not only memorization.
- Automatic mistake review using spaced review intervals.
- Skill mastery tracker.
- Parent Radar for entering current Hillbrook topics, Zhang/Think Academy work, milestone dates, and placement intelligence.
- 7th Grade → College roadmap with checkboxes.
- Local browser storage: progress stays on that device/browser.
- Export progress to JSON.
- PWA/offline cache when hosted over HTTPS (for example GitHub Pages).

## Run locally

The simplest method is to open `index.html` in a browser. Most features work directly. For service-worker/offline support, serve the folder through a local web server.

Example with Python:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Deploy to GitHub Pages

1. Create a new GitHub repository, for example `audrey22-learning-os`.
2. Upload all files in this folder to the repository root.
3. In GitHub: **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select `main` and `/ (root)`, then Save.
6. GitHub will provide the public Pages URL.

## Important V2 design choice

This version has no cloud backend or AI API. That makes it easy to host, private, and inexpensive. The parent enters current school/tutor topics manually; the local training engine changes the daily mix using those inputs.

A future V2 can add photo/worksheet ingestion, teacher-material parsing, cloud sync, AI-generated fresh questions, and separate parent/student accounts.
