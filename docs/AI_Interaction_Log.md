# AI Interaction Log — HW1 Personal Website

**Student:** Nischal Sadashivaiah (中文名：拉吉 / Raj) · M1561031
**AI tool:** Claude (Anthropic)
**Live site:** https://nischal-sadashivaiah.vercel.app · **Source:** https://github.com/NischalRaj16/nischal-portfolio-2

---

## Prompt 1 — Turn the handout into a specification

**My prompt:** I pasted the full homework handout and asked the AI to help me build the site.

**AI output:** Before writing any code, it asked four questions: hosting, which research to feature, visual style, and which contact details to make public.

**My decisions:**
- Vercel for hosting.
- The published NIDS paper as the featured research, because it is the clearest evidence of research I actively took part in.
- Only professional contact details (email, LinkedIn). No phone number or home address.

**What changed:** The requirements were fixed before any code was written, so nothing had to be rebuilt.

---

## Prompt 2 — First build, and correcting the content

**AI output:** A responsive single-page site with About, Education, Research and Contact sections, plus an SVG diagram of the intrusion detection pipeline. It was deployed to Vercel.

**My judgment and edits:**
- **Chinese name:** the AI suggested a long phonetic transliteration (尼夏爾・薩達希瓦亞). I rejected it because it is not a name I use, and chose **拉吉 (Raj)**, the name I go by.
- **Research content:** the AI deliberately kept the paper description general instead of inventing numbers. I then replaced the placeholder with my real contribution: data preprocessing and feature engineering in Python, TensorFlow and XGBoost models, evaluation with confusion matrix, precision, recall and F1, and about 95% accuracy on DoS and 89% on port scanning.
- **Other content:** I added my LinkedIn, my GitHub project (FinSentiment Portal) and my preferred email.

---

## Prompt 3 — Test it like a user (debugging)

**My prompt:** I asked the AI to render the site at desktop (1280px) and phone (390px) widths and check the screenshots.

**Bugs found and fixed:**
1. **Hidden LinkedIn row still visible.** A CSS `display:flex` rule overrode the `hidden` attribute, which would have shown a broken link. Fixed with `[hidden]{display:none!important}`.
2. **University name broke mid-word on phones.** Caused by `word-break: break-all`. Fixed by limiting wrapping to the email address.
3. **Pipeline diagram unreadable on phones.** The 880px-wide diagram shrank to about 4px text. Fixed by serving a vertical version with `<picture>` on small screens.

**Lesson:** the code looked correct when read, and these bugs only appeared on a real screen size.

---

## Prompt 4 — Redesign through several iterations (visual direction)

**My prompts, in order:**
1. "Make it more attractive and more tech, with a professional light colour scheme."
2. "Not only white. Use personal colours and a modern, trending UI/UX, including the cursor."
3. "Use Illustrative Design and Glassmorphism."
4. "Change the colours." The AI offered four palettes, and I chose **Ocean Teal & Coral**.

**AI output:**
- original SVG illustrations (a laptop, security shield, AI chip, IoT sensor and paper, plus section illustrations)
- frosted-glass cards over a soft colour-mesh background
- bento tiles for the About facts, a skills marquee and tilt cards
- a custom cursor, and the full palette swap across CSS, JS and SVGs

**What I caught and changed:**
- The glass "sheen" layer sat on top of the text and washed out titles, so I moved it behind the content.
- The animated name gradient had a visible seam, and later turned muddy when coral blended into blue. I switched it to a cool teal–blue loop and kept coral as an accent.
- The bento grid left an empty cell, and the email wrapped mid-word.
- An illustration element overlapped another, and the page had a 1px sideways scroll.
- I made sure motion effects (cursor, tilt, animations) turn off on touch screens and for users who prefer reduced motion.

---

## Prompt 5 — Final quality check and publishing

**My prompt:** "Give it a final touch."

**AI output:**
- an automated accessibility audit (axe-core, WCAG 2 A/AA)
- share and search tags, a footer, a back-to-top button and a custom 404 page
- a final check of every link and file on the live site

**Issues found and fixed:**
- White text on a blue badge had a contrast ratio of 4.09:1 (below 4.5:1), so the badge was darkened.
- The back-to-top button sat outside any page landmark, so it was moved into the footer.

The final audit reports **0 violations**. A broken URL returns a proper 404 page.

**My decisions:**
- I removed the "built with generative AI" line from the site footer, because I wanted the public site to present my work under my name. My AI use is documented in this log as the assignment requires.
- I published the code in my own GitHub repository, with commits under my name and account email.
