# AI Interaction Log — HW1 Personal Website

**Student:** Nischal Sadashivaiah (中文名: Raj) · M1561031
**AI tool:** Claude (Anthropic), used in Claude Cowork
**Live site:** https://nischal-sadashivaiah.vercel.app

---

## Prompt 1 — Requirements and specification

**My prompt:** I pasted the full homework handout (deadline, file naming, deliverables, the four required sections, the design rules) and asked the AI to help me build the site.

**AI output:** Before writing any code, it asked me four questions: where to host (Vercel / Netlify / GitHub Pages), which project to feature as research, which visual style, and which contact links to make public. It also said it needed my Chinese name and LinkedIn URL.

**My decisions:**
- Hosting: **Vercel**.
- Research: **only my published NIDS paper**. The AI suggested also featuring my current lab project. I said no, because the handout asks for research I *actively took part in*, and the published paper is the strongest proof of that.
- Style: **clean academic** instead of a dark "tech" theme, because the main reader is a professor.
- Contact: **Gmail and LinkedIn only**. No phone number or home address, following the handout's privacy rule.

**What changed:** The requirements were settled before any code was written, so the first draft didn't need to be thrown away.

---

## Prompt 2 — Chinese name

**My prompt:** I told the AI that I don't have a Chinese name yet.

**AI output:** It suggested the phonetic transliteration 尼夏爾・薩達希瓦亞 (Ní-xià-ěr · Sà-dá-xī-wǎ-yà) in Traditional characters, and told me to confirm it with a native speaker.

**My judgment:** I **rejected** the suggestion. A long machine transliteration is not a name I actually use, and nobody at school would recognise it. I use the name **Raj**, so the site shows 中文名：Raj. An AI can suggest a name, but only I can decide what my name is.

---

## Prompt 3 — First full draft (HTML/CSS/JS + visuals)

**AI output:** It produced a single-page site: a sticky navigation bar, the About section (EN/CN name, student ID, program), an Education & Experience timeline, a Research card, and Contact links. It also made two SVG visuals: an "NS" monogram with a network-graph texture, and a diagram of the intrusion detection pipeline (traffic → features → ML classifier → normal / alert). It supports dark mode automatically and includes a skip-to-content link for accessibility.

**My review:**
- I checked every factual claim. The AI did **not** make up an accuracy number, dataset name, or graduation year. It kept the paper description general, and I will add the specific model and dataset myself.
- I kept the pipeline diagram because it explains the research in 5 seconds, which fits the "understand me in 2 minutes" goal.

---

## Prompt 4 — Testing and debugging (screenshots at desktop and mobile widths)

**What we did:** We rendered the page in a headless browser at 1280 px (desktop) and 390 px (phone), in both light and dark mode, and looked at the screenshots.

**Bugs found:**
1. **The hidden LinkedIn row was still showing.** I had marked it `hidden` until I had the URL (it is now filled in: linkedin.com/in/nischal-s), but the CSS rule `display:flex` on the list items overrode the `hidden` attribute. This would have been a **broken link**, which the rubric penalizes. Fix: `[hidden]{display:none !important}`.
2. **"Chang Gung University" broke in the middle of a word** on the phone ("Universit / y") because of `word-break: break-all`. Fix: allow wrapping only on the long email address.
3. **The pipeline diagram was unreadable on a phone.** The wide 880 px diagram shrank to about 4 px text. Fix: a second, **vertical** version of the diagram served with `<picture>` on screens ≤ 600 px.

**What changed:** All three were fixed and re-tested. The page has no horizontal scrolling at 390 px and no console errors.

---

## Prompt 5 — Deployment and live checks

**AI output:** The site was deployed to Vercel production. Then we checked the live site:
- The main page and all 6 assets return HTTP 200.
- The external link (cgu.edu.tw) returns 200.
- On a phone-sized screen: the hamburger menu opens, "Research" scrolls to the right section, and the menu closes after tapping.

**My judgment:** The deployment gave two URLs. The preview URL redirected (302) to a Vercel login, so I submit the public production URL `nischal-sadashivaiah.vercel.app`, which returns 200 without logging in.

**Later iteration (content update):** I asked the AI to add my GitHub project and to change my contact email. It read the README of my repo **FinSentiment Portal** (github.com/NischalRaj16/finsentiment-portal) and wrote a project card with facts taken only from that README. It also drew an architecture diagram with a mobile (vertical) version, like the research diagram. It renamed the section to "Research & Projects" and added my GitHub profile to Contact. I replaced the contact email with nischal20030224@gmail.com. The GitHub repo, the demo video and my profile all return HTTP 200.

**Redesign iteration (visual direction):** I asked for a design that looks "more attractive and more tech" with a professional light colour scheme. The AI replaced the academic serif/burgundy style with a light slate-and-white palette with blue→cyan accents. It added an animated network-graph background in the hero (it pauses when scrolled away and stays still for users who turn on reduced motion), a code-style `profile.py` card, monospace section labels (01 / 02 / 03), a timeline with cards, contact cards, and a gentle fade-in when scrolling. I kept all content the same, removed the old dark mode so the colours stay light and consistent, and checked the layout again on desktop and phone. There is no horizontal scrolling and there are no console errors, and every deployed file matches the source.

**Second redesign (trending UI/UX):** I said the design felt too white and asked for more personal colours, a more advanced and modern UI/UX, and a modern custom cursor. The AI rebuilt the visual layer:
- a violet, pink, amber and cyan palette on moving "aurora" background blobs
- a floating glass pill navigation bar and a scroll-progress bar
- a colourful bento grid of tiles for the About facts
- a typing effect that cycles through focus areas
- a skills marquee strip and cards that tilt in 3D
- animated gradient borders on the research cards and a gradient call-to-action panel for Contact
- magnetic buttons and a custom cursor (a dot plus a trailing ring that grows on links and shows "View / Code / Play / Mail" labels)

**My review and fixes:**
- The gradient text showed a visible seam as it animated, so I switched it to a looping gradient.
- The bento grid left an empty cell, so I made the Publications tile wider.
- The email address wrapped in the middle ("co / m"), so I added a line-break point before "@".

**Accessibility checks:** The custom cursor, tilt and magnetic effects turn off on touch screens and for users who ask for reduced motion (verified: the cursor is hidden on a mobile viewport). There is no horizontal scrolling and there are no console errors.

**Third iteration (Illustrative design + Glassmorphism):** I asked for two specific UI/UX styles. The AI drew original SVG illustrations in a flat, outlined style:
- a hero scene with a laptop showing code and a chart, a security shield (my NIDS research), an AI chip, an IoT sensor, my published paper and a plant, linked by animated network lines
- small spot illustrations for Education (a graduation cap and books) and Research (a network with a magnifier)
- a paper-plane-and-envelope illustration in the Contact panel

For the glass effect it added a multi-colour gradient background behind frosted-glass panels (a semi-transparent white gradient, 22px blur, a white edge highlight and a light sheen) on the tiles, cards, diagram frames, navigation bar, skills strip and three floating glass badges over the hero illustration. The research cards now use a masked gradient ring, so their glass interior stays see-through.

**What I caught:**
- The glass "sheen" layer sat on top of the text and washed out the card titles and icons. I moved it behind the content.
- The IoT sensor overlapped the plant in the illustration, so I moved it.
- The page had a 1px horizontal scroll, which I clipped.
- A network hiccup during my live check saved a truncated copy of one illustration locally. I re-downloaded the correct file, so the submitted source matches the live site.

The new styles are kept in a separate `glass.css`, so the change is easy to review.

**Colour change (palette decision):** I asked to change the colours. The AI offered four palettes (Ocean Teal & Coral, Midnight Indigo & Neon, Sunset Orange & Rose, Forest Emerald & Gold), and I chose **Ocean Teal & Coral**: teal, sky blue and coral with mint accents, on an aqua, mint and peach glass background.

The AI remapped every colour in one pass across the CSS, the JavaScript canvas and all SVG illustrations and diagrams, so nothing kept the old purple or pink. I reviewed the result:
- The animated name gradient passed from coral into blue and looked muddy in the middle, so I made it cool-toned (teal, sky and cyan) and kept coral as an accent (the Student ID tile, AI chip, sparkles and underline).
- The page used teal-like colours for three different accents, so I set the tile accents to distinct teal, sky, coral, deep cyan and mint.

**Final polish and quality assurance:** I asked for a final touch. The AI ran an automated accessibility audit (axe-core, WCAG 2 A/AA plus best practices) on desktop and mobile.

It found two issues, and I approved both fixes:
1. The white text on the blue "ID" badge had a contrast ratio of 4.09:1, below the required 4.5:1. The badge was darkened to pass.
2. The new back-to-top button sat outside any page landmark, so it was moved into the footer.

After the fixes, the audit reports **0 violations**. The AI also added:
- sharing and search details (description, canonical URL, Open Graph and Twitter tags, robots.txt and sitemap.xml)
- a glass back-to-top button
- a full footer with navigation, social links and a "last updated" date
- a styled 404 page for broken URLs (verified: a missing page returns HTTP 404 with the custom design)
- print styles

The final checks passed: every file returns HTTP 200 and matches the source, all in-page links point to existing sections, and there is no horizontal scrolling or console error at 1280px or 390px.
