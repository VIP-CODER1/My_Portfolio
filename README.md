# Vipul Kumar — Portfolio

A modern, animated developer portfolio built with **React**, **Tailwind CSS**, **Framer Motion**, and **react-three-fiber**. Showcases my work as a Computer Science student at IIIT Manipur and as a Full-Stack / SDE Intern across Refold AI, Patrol 6, M-Core, and INDOLIKE.

🌐 **Live**: https://my-portfolio-flax-xi-77.vercel.app/

---

## ✨ Highlights

- **Scroll-drawn Experience timeline** — a serpentine SVG "thread" draws itself as you scroll past the Experience & Education section, with each card's node lighting up as the line crosses it.
- **3D scenes** — hero and accent geometry rendered with `@react-three/fiber` + `@react-three/drei`.
- **Smooth animated transitions** — `framer-motion` for entrance, hover, and scroll-driven motion throughout.
- **Dark / Light theme toggle** with persisted preference.
- **Accessibility-aware** — respects `prefers-reduced-motion` (timeline draws instantly, no auto-animation, no scroll-tied transforms).
- **Responsive across mobile, tablet, and desktop** — alternating two-column timeline on `md+`, stacked single-column below.
- **Contact form** wired to Formspree — no backend required.

---

## 🗂️ Sections

In page order:

1. **Hero** — intro, name, role, primary CTAs.
2. **Experience & Education** — scroll-driven timeline with 4 internships + B.Tech at IIIT Manipur.
3. **Skills & Tech Stack** — calibrated to actual internship work (React/Next, Node/Express, REST APIs, SQL + NoSQL, TS/JS, integrations, DSA).
4. **Projects** — featured work with live demos and source links.
5. **About** — short bio.
6. **Contact** — email + social links + working contact form.

---

## 🛠️ Tech Stack

**Frontend**
- React 18
- Tailwind CSS
- Framer Motion (animation, scroll-driven transforms)
- Lucide React (icons)

**3D / Visual**
- three.js
- @react-three/fiber
- @react-three/drei

**Tooling**
- Create React App (react-scripts 5)
- PostCSS + Autoprefixer

**Services**
- Formspree (contact form delivery)
- Vercel (hosting)

---

## 📚 Featured Projects

| Project | Stack | Links |
|---|---|---|
| **FlowScrape** — AI workflow automation & orchestration platform with visual workflow builder, Stripe-based credit billing, Clerk auth, and an MCP server module. | TypeScript, Next.js, Prisma, Supabase (PostgreSQL), Clerk, Stripe, Puppeteer, Tailwind, Shadcn | [Live](https://flow-scrape-ai.vercel.app) · [Code](https://github.com/VIP-CODER1/FlowScrape-AI) |
| **GharBazaar** — MERN real-estate platform with listings, advanced search, admin dashboard, and responsive UI. | React, Node, MongoDB, Express, Tailwind | [Live](https://gharbazaar-nfji.onrender.com/) · [Code](https://github.com/VIP-CODER1/GharBazaar) |
| **TaskTracker with OpenAI** — task manager with AI-driven categorization and real-time collaboration. | React, Node, MongoDB, OpenAI API, Socket.io | [Code](https://github.com/VIP-CODER1/Task-Tracker-with-OpenAI) |
| **VIP-GYM-CLUB** — gym management system: members, workouts, payments, trainer dashboard. | React, Node, MongoDB, Express, JWT | [Code](https://github.com/VIP-CODER1/VIP-GYM-CLUB) |
| **SmartImage Compressor** — client-side image compression with batch processing and quality preview. | HTML5, JavaScript, Canvas API, CSS3 | [Live](https://vip-coder1.github.io/Image_Compressor/) · [Code](https://github.com/VIP-CODER1/Image_Compressor) |

---

## 💼 Experience (in short)

- **SDE Intern — Refold AI** · Jan 2026 – June 2026 · Bengaluru
  Backend services & REST APIs for Kantata ERP integrations (NetSuite, Oracle, Sage Intacct); MCP server + connectors-based workflow automation (Slack, Google Calendar, Sheets); frontend in React, TypeScript, Next.js, Lottie React.
- **Software Developer Intern — Patrol 6** · Sept 2025 – Oct 2025 · Remote (Seattle)
  Built the patrol-report feature in TypeScript, React, Node, and PostgreSQL; resolved auth/authz issues.
- **Full Stack Developer Intern — M-Core Pvt. Ltd.** · May 2025 – Aug 2025 · Hyderabad
  MERN-stack waste-management platform; integrated real-time metal pricing APIs (–30% response time).
- **Web Developer Intern — INDOLIKE** · Jan 2025 – Feb 2025 · Remote
  Responsive React UIs and CSS/JS perf tuning (+20% page speed).

**Education**: B.Tech, Computer Science · IIIT Manipur · 2022 – 2026 · CGPA 7.85

---

## 🚀 Run Locally

### Prerequisites
- Node.js 18+
- npm

### Setup

```bash
git clone https://github.com/VIP-CODER1/portfolio.git
cd portfolio
npm install
npm start
```

Visit `http://localhost:3000`.

### Build for production

```bash
npm run build
```

Output goes to `build/`.

---

## 📁 Project Structure

```
src/
├── App.js                  # Top-level layout & section composition
├── components/
│   ├── Hero.jsx
│   ├── Experience.jsx      # Wrapper section for the timeline
│   ├── ExperienceThread.jsx# Scroll-driven serpentine SVG thread
│   ├── ExperienceCard.jsx  # Single card + animated node
│   ├── Skills.jsx          # Skills & Tech Stack
│   ├── Projects.jsx
│   ├── About.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── Navbar.jsx
├── contexts/
│   └── ThemeContext.js     # Light / dark theme + persistence
├── data/
│   └── experience.js       # Source of truth for the timeline
├── hooks/
│   └── useReducedMotionSafe.js
├── assets/                 # Images, profile photo, project thumbnails
└── index.css
```

---

## ♿ Accessibility

- All scroll-tied animations are gated behind `useReducedMotion()` — with OS-level *Reduce motion* enabled, the timeline renders fully drawn from first paint and entrance animations are skipped.
- Semantic section landmarks (`<section id="...">`) so the Navbar anchor links work with screen readers and keyboard navigation.
- Color contrast tuned for the dark theme; light theme available via the navbar toggle.

---

## 👨‍💻 Author

**Vipul Kumar**
- GitHub: [@VIP-CODER1](https://github.com/VIP-CODER1)
- LinkedIn: [vip-coder](https://www.linkedin.com/in/vip-coder/)
- X / Twitter: [@VIP_coder](https://x.com/VIP_coder)
- Email: vipulmth1@gmail.com

---

## 📝 License

MIT — see `LICENSE` for details.

---

Thanks for visiting!
