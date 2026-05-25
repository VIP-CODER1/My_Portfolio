# Plan: Modernize My_Portfolio into a 3D-modern experience (framer-motion + R3F)

## Goal
Convert four isolated per-section `<Canvas>` instances into a single scroll-driven 3D world built around `boy3.glb`, with Lenis smooth scroll, drei `<View>` portals, a Vite build, and a `prefers-reduced-motion`-safe performance budget.

## Surface area
- `package.json` — CRA scripts, dep cleanup (3 dead packages)
- `public/index.html` → `index.html` (root, post-Vite)
- `src/App.js` — section composition + new providers + global `<SceneCanvas/>`
- `src/components/Hero.jsx` — delete `ComplexShape` (L70–134), inner `<Canvas>` (~L430), tsparticles bg (L156–214)
- `src/components/About.jsx` — delete sphere `<Canvas>` (L20–42, L142–146)
- `src/components/Projects.jsx` — CSS tilt block (L101–109); FlowScrape entry just added (L11–19) — leave intact
- `src/components/Contact.jsx` — delete floating spheres (L10–27, L260–287)
- `src/components/Navbar.jsx` — anchor `scrollIntoView` → `lenis.scrollTo` (L161–202 area)
- `src/contexts/ThemeContext.js` — wrap setter in View Transitions API
- `src/index.css` — grain overlay, `prefers-reduced-motion` overrides
- `tailwind.config.js` — `motion-safe` variants already on; add minimal tokens
- New: `vite.config.js`, `src/three/{SceneCanvas,CameraRig,HeroScene,ProjectsScene,SkillsOrbScene,ContactScene}.jsx`, `src/components/{CustomCursor,Loader,ProjectModal}.jsx`, `src/contexts/{CursorContext,LoadingContext}.js`, `src/hooks/{useLenis,useMagnetic,useReducedMotionSafe}.js`

## Constraints
- **Performance**: Lighthouse ≥ 85 desktop / ≥ 70 mobile; single WebGL context only; total 3D bundle ≤ 1 MB JS + ≤ 1 MB GLB (boy3.glb is 1.3 MB → Draco-compress to ~600 KB).
- **Compatibility**: Modern evergreen browsers; mobile iOS Safari ≥ 16. WebGL2 required for full scene; fallback poster below `md` and on `prefers-reduced-motion: reduce`.
- **Accessibility**: WCAG 2.3.3 — every scroll-tied transform gated behind `useReducedMotion()`. Custom cursor never hides the native pointer below `md`.
- **Must NOT change**: project content (the FlowScrape entry at `Projects.jsx:11-19` and all GitHub/live links), EmailJS env wiring (only rename `REACT_APP_*` → `VITE_*`), public asset paths.
- **No test suite exists** (verified — no `*.test.*` in `src/`), so Vitest setup is deferred — not a migration blocker.

## Chosen approach
**One shared `<Canvas>` + drei `<View>` portals + Lenis smooth scroll + Vite build.**

Considered:
- **Per-section Canvases (status quo, polished)** — rejected: 4 WebGL contexts is the root cause of jank, and most browsers cap at ~8 contexts before evicting; also blocks any cross-section camera continuity.
- **`<ScrollControls>` from drei** — rejected: forces all DOM into `<Html>` inside the Canvas, which means rewriting every Tailwind section and losing framer-motion's `useInView` ergonomics.
- **Stay on CRA** — rejected: officially sunset Feb 2025 by React team; HMR for shader/material work is materially worse; Vite migration is ~2 hours given there are no tests to port.

Why `<View>` + Lenis wins: keeps the existing Tailwind/framer-motion layout intact, gives one WebGL context with N viewports via `gl.scissor`, and Lenis is the de-facto smooth-scroll choice in 2025 (Locomotive is in maintenance; the Locomotive team uses Lenis).

## Steps

### 1. Quick wins + dep cleanup (~2h, no architecture change)
- **Files**: `package.json`, `src/components/Hero.jsx` (L115, L280-300, L430), `src/index.css`, `src/contexts/ThemeContext.js`
- **Change**: `npm uninstall react-tsparticles @tsparticles/all react-spring @react-spring/web @react-spring/parallax react-use-gesture` (all confirmed dead). Wrap `ComplexShape` in tighter `<Float>`; add `<ContactShadows>` + `<Environment preset="city"/>` to existing Hero scene; SplitText per-char reveal on hero name; View Transitions API in theme toggle; SVG grain overlay; `html { scroll-behavior: smooth }` with Navbar offset.
- **Verify**: `npm run build` succeeds; bundle size drops ≥ 100 KB gz; visual check that Hero feels richer.
- **Rollback**: `git revert` — no API changes.

### 2. CRA → Vite migration (~2h, mechanical)
- **Files**: new `vite.config.js`, move `public/index.html` → `index.html` (root, drop `%PUBLIC_URL%`), `package.json` scripts (`dev`/`build`/`preview`), rename `.env` `REACT_APP_EMAILJS_*` → `VITE_EMAILJS_*`, update `src/components/Contact.jsx` to read `import.meta.env.VITE_*`.
- **Change**: `npm install -D vite @vitejs/plugin-react vite-plugin-svgr` and `npm uninstall react-scripts cra-template`.
- **Verify**: `npm run dev` boots; EmailJS form submits in dev; production build serves the same routes; `public/boy3.glb` loads at `/boy3.glb`.
- **Rollback**: revert commit; `react-scripts` is in lockfile via `git checkout package-lock.json`.

### 3. Foundation layer: Lenis + cursor + loader + magnetic (~1 day)
- **Files**: `src/App.js` (wrap with `LoadingProvider` + `CursorProvider`, mount `<Loader/>` + `<CustomCursor/>`), `src/components/Navbar.jsx` (swap `scrollIntoView` for `lenis.scrollTo`), new `src/hooks/useLenis.js`, `src/hooks/useMagnetic.js`, `src/hooks/useReducedMotionSafe.js`, new `src/components/{CustomCursor,Loader}.jsx`, new `src/contexts/{CursorContext,LoadingContext}.js`.
- **Change**: `npm install @studio-freight/lenis clsx`. Bridge Lenis RAF into framer-motion's `frame` scheduler (research flagged this as the integration gotcha). `<Loader>` reads drei `useProgress()`. Magnetic hook on Hero CTAs + Navbar links. Honor `useReducedMotion()` in cursor (snap, no spring) and loader (instant).
- **Verify**: scroll is smooth at 120 Hz; Navbar anchors animate via Lenis; cursor follows with spring on desktop, hidden on touch; loader exits when `useProgress().progress === 100`.
- **Rollback**: revert — none of the existing components depend on the new providers (they're additive wrappers).

### 4. Shared Canvas + scroll-driven camera + Hero centerpiece (~1.5 days)
- **Files**: new `src/three/SceneCanvas.jsx` (single fixed-inset Canvas, `pointer-events-none`, `frameloop="demand"`, `dpr={[1,2]}`, wrapped in `<PerformanceMonitor>`), `src/three/CameraRig.jsx` (4 keyframes, lerp on Lenis progress), `src/three/HeroScene.jsx` (`useGLTF('/boy3.glb')` + `<Float>` + rim lights). Mount in `src/App.js` above `<Navbar/>`. Place `<View track={heroRef}>` in `src/components/Hero.jsx` and delete `ComplexShape` (L70–134), `Scene3D` inner Canvas (~L430), tsparticles imports and JSX (L6–7, L156–214).
- **Change**: pre-compress GLB: `npx gltf-pipeline -i public/boy3.glb -o public/boy3.draco.glb -d` (target ≤ 700 KB), update path.
- **Verify**: DevTools shows exactly **one** `<canvas>` in DOM; scrolling rotates/dollies camera; tsparticles fully removed (`grep -r tsparticles src/` empty).
- **Rollback**: keep `boy3.glb` original alongside; revert removes new `src/three/*` and restores Hero JSX.

### 5. Projects + About + Contact ported to `<View>` (~1.5 days)
- **Files**: `src/components/Projects.jsx` (delete CSS tilt L101–109; extract modal → new `src/components/ProjectModal.jsx`), `src/components/About.jsx` (delete sphere Canvas L20–42, L142–146), `src/components/Contact.jsx` (delete floating spheres L10–27, L260–287). New `src/three/{ProjectsScene,SkillsOrbScene,ContactScene}.jsx`.
- **Change**: ProjectsScene = `RoundedBox` planes textured with project images via drei `useTexture`, hover tilts the mesh; SkillsOrbScene = icosahedron cluster with `<Html occlude>` icons (cap at 12 per research note); ContactScene = single distort sphere reacting to input focus.
- **Verify**: all per-section `<Canvas>` removed (`grep -rn '<Canvas' src/` returns only `SceneCanvas.jsx`); Projects hover tilts the 3D mesh, not the DOM card; FlowScrape entry still first in `projects` array.
- **Rollback**: revert per file; the View portal is additive and components still render without 3D.

### 6. Perf + a11y hardening + mobile fallback (~0.5 day)
- **Files**: `src/three/SceneCanvas.jsx` (PerformanceMonitor `onDecline` → drop DPR), `src/App.js` (lazy-load `SceneCanvas` with `React.lazy`), new `src/three/MobileFallback.jsx`, `src/index.css` (`prefers-reduced-motion` overrides).
- **Change**: below `md` or with reduced-motion preference, render static poster image and skip Canvas mount entirely; ensure all `useFrame` paths call `invalidate()` since `frameloop="demand"`.
- **Verify**: Lighthouse desktop ≥ 85 / mobile ≥ 70; throttled iPhone SE emulation shows poster, no Canvas; OS-level reduced-motion produces a static framing.
- **Rollback**: remove `<PerformanceMonitor>` wrapper and the lazy boundary — Canvas reverts to eager full-quality.

## Risks
- **Lenis × framer-motion double-RAF jank** — bridge Lenis to framer's `frame` scheduler (research source: motion#3065); single-RAF source.
- **GLB still > budget after Draco** — fallback: run `gltfjsx --transform` (Meshopt) or accept a 1.3 MB asset and defer-load behind `<Suspense>` after first paint.
- **Vite migration breaks EmailJS in prod** — smoke-test `npm run preview` against real EmailJS keys before merging the migration PR.
- **Mobile WebGL2 / GPU thermal throttling** — `MobileFallback` poster below `md` + `<PerformanceMonitor>` DPR clamp; no animation downgrade for desktop.
- **Motion-sickness from scroll-driven camera** — `useReducedMotion()` short-circuits `CameraRig` to static framing; ship a manual "Reduce motion" toggle in Navbar if user reports issues.
- **drei `<Html occlude>` cost** — cap skill orbs at 12 per research note; profile before shipping.

## Done when
- DevTools shows exactly **one** `<canvas>` element in the DOM across all sections.
- Scrolling the page drives camera motion smoothly at 60 FPS on a 2020 MacBook Air.
- Lighthouse Performance ≥ 85 (desktop) and ≥ 70 (mobile, throttled iPhone SE).
- With OS-level `prefers-reduced-motion: reduce`, page is fully usable with zero scroll-driven motion and no Canvas mounted on mobile.
- Bundle: `npm run build` reports JS chunks summing ≤ ~600 KB gz (excluding GLB).
- Manual: EmailJS form still sends; FlowScrape card is first in the Projects grid with its links intact.

---

## Out of scope (explicit cuts)
No React Router, no Storybook, no Vitest setup, no shader-based post-processing pass, no real-time multiplayer cursors, no headless CMS for projects, no i18n. These were considered and dropped to keep the plan to ~5 days of focused work.

## Research appendix — references the plan rests on
- **drei `<View>`** — http://drei.docs.pmnd.rs/portals/view — single Canvas, multiple DOM-tracked viewports via `gl.scissor`.
- **R3F Scaling Performance** — https://r3f.docs.pmnd.rs/advanced/scaling-performance — `frameloop="demand"` + `<PerformanceMonitor>` adaptive quality.
- **React.dev "Sunsetting CRA"** (Feb 2025) — https://react.dev/blog/2025/02/14/sunsetting-create-react-app
- **Lenis** — https://github.com/darkroomengineering/lenis — canonical smooth-scroll in 2025; Locomotive Scroll is in maintenance.
- **Lenis × framer-motion gotcha** — motion#3065; bridge Lenis RAF into framer's `frame` scheduler.
- **WCAG 2.3.3** — https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html — honor `prefers-reduced-motion`.
- **CC0 GLTF sources** — Quaternius (https://quaternius.com), Poly Pizza (https://poly.pizza), Kenney (https://kenney.nl).
- **Reference R3F portfolios** — github.com/adrianhajdin/3d-portfolio, github.com/Ali-Sanati/awwwards-portfolio, github.com/KpG782/3D_Portfolio (Bruno Simon's repo is vanilla Three.js, not R3F).

---

## Experience (content for the portfolio)

### SDE Intern — Refold AI
**Jan 2026 – June 2026 · Bengaluru, Karnataka, India**
- Developed scalable backend services and REST APIs for Kantata, enabling seamless ERP integrations across systems like NetSuite, Oracle, and Sage Intacct.
- Developed optimized and interactive frontend interfaces using React.js, TypeScript, Next.js and Lottie React, enhancing animations, performance, and overall user experience.
- Built and integrated a connectors-based workflow automation and MCP server to automate Slack notifications, send Google Calendar invites, and persist structured booking data into Google Sheets.

### Software Developer Intern — Patrol 6
**Sept 2025 – Oct 2025 · Greater Seattle Area, US (Remote)**
- Designed and implemented the Patrol 6 patrol-report feature and its user interface using TypeScript, React.js, Node.js, and PostgreSQL.
- Diagnosed and resolved authentication and authorization issues, ensuring secure and seamless user access.

### Full Stack Developer Intern — M-Core Pvt. Ltd.
**May 2025 – Aug 2025 · Hyderabad, Telangana, India**
- Built user-friendly interfaces for the M-Core waste management platform using JavaScript, React.js, Node.js, Express.js, and MongoDB, reducing navigation issues by 70%.
- Integrated real-time metal pricing APIs and optimized backend workflows, improving pricing accuracy and reducing response time by 30%.

### Web Developer Intern — INDOLIKE
**Jan 2025 – Feb 2025 · Remote**
- Designed and maintained responsive web pages using JavaScript and React.js, improving the user experience.
- Refined website load times by optimizing CSS and JavaScript, resulting in a 20% improvement in page speed.

---

## Education

### IIIT Manipur — B.Tech, Computer Science
**College period:** July 2022 – May 2026
**CGPA:** 7.85

> Action item: once you share these, wire the experience + education blocks into `src/components/About.jsx` (replace/augment the existing `timeline` array at L55–80) and consider a dedicated `<Experience/>` section component if the list grows.

---

## Plan: Thread-based scroll Experience timeline

### Goal
Replace the static left/right alternating timeline at `src/components/About.jsx:297–342` with a scroll-drawn SVG "thread" — a serpentine path that draws itself as the user scrolls past the Experience section, with each experience/education card anchored to a node that lights up as the line crosses it.

### Surface area
- `src/components/About.jsx` — current `timeline` array (L55–80) and Timeline JSX (L297–342) are replaced
- New `src/components/ExperienceThread.jsx` — sticky-section wrapper + `<motion.svg>` + serpentine `<motion.path>` driven by `useScroll`
- New `src/components/ExperienceCard.jsx` — single card + node; owns its own `useScroll` for "fill on scroll" effect
- New `src/data/experience.js` — exported `experience` array (4 internships + 1 education) sourced from the **Experience** + **Education** sections above in this file
- New `src/hooks/useReducedMotionSafe.js` — small wrapper around framer-motion `useReducedMotion()` (also used by the wider Phase 3 in this plan — single owner here)
- `src/index.css` — add `@media (prefers-reduced-motion: reduce)` block
- No changes to `App.js`, no new deps

### Constraints
- **Stack**: framer-motion 11.13 already installed; do not pull in GSAP or Lenis for this feature (Lenis is on the larger roadmap but `useScroll` works without it).
- **No new WebGL context** — this is SVG, not R3F (research verdict: R3F thread adds ~150 KB + DOM-overlay headaches with sticky cards, gains nothing visually).
- **Sticky must work** — no ancestor in the section chain may have `overflow:hidden`; the existing `About.jsx:104` section uses `overflow-hidden`. Must change to `overflow-x-clip` or removed for the Experience subtree.
- **Accessibility (WCAG 2.3.3)** — `useReducedMotion()` short-circuits `pathLength` to `1` (fully drawn, no animation) and disables card slide-ins.
- **Mobile** — below `md`, cards stack in one column; thread becomes a straight vertical line (no serpentine), reducing layout-shift risk.
- **Must NOT change**: the existing skills grid (L205–255), tech stack section (L257–295), profile/hero area (L122–203), or Hero/Projects/Contact components.

### Chosen approach
**Sticky-wrapper + framer-motion `<motion.path>` driven by `useScroll`.**

Considered:
- **drei `<Line>` / `<CatmullRomLine>` inside a per-section Canvas** — rejected: adds a 5th WebGL context (the wider plan is trying to *delete* per-section Canvases), plus z-index fights with the sticky DOM cards.
- **GSAP ScrollTrigger + DrawSVG** — rejected: framer-motion is already a dependency; adding GSAP duplicates the scroll-driver and breaks the "single RAF source" rule from Phase 1 of the wider plan.
- **Hard-coded straight vertical line with reveal-on-scroll cards (current pattern, polished)** — rejected: it's just a polish of what's already there, doesn't deliver the "thread" effect the user asked for.

Why the SVG-path approach wins: zero new deps, framer-motion `pathLength` is a normalized 0→1 prop on `motion.path` (research source [1]), per-node `useScroll({ target, offset })` gives free node-activation, and the whole component is server-renderable + a11y-friendly.

### Steps

1. **Extract experience data into a dedicated module** (~30 min)
   - **Files**: new `src/data/experience.js`; `src/components/About.jsx` (delete `timeline` array L55–80, remove its imports if unused).
   - **Change**: export `experience` array with 5 entries (`{ kind: 'work'|'edu', org, role, period, location, bullets[], icon }`) using the content already captured in this file's Experience + Education sections.
   - **Verify**: `import { experience } from '../data/experience'` resolves; `experience.length === 5`.
   - **Rollback**: revert the file; About.jsx still renders without the timeline subtree.

2. **Build `ExperienceCard` (node + card pair)** (~2h)
   - **Files**: new `src/components/ExperienceCard.jsx`.
   - **Change**: receives `{ entry, index, total }`. Layout: on `md:` up alternates left/right of the central thread (CSS grid `grid-cols-[1fr_auto_1fr]` with a `48px` gutter column that holds the node); below `md` everything is right-of-thread in a single column. Own `useScroll({ target: nodeRef, offset: ["start 0.85", "start 0.4"] })` → node `scale` 0.6→1.2, `backgroundColor` gray→orange, `boxShadow` glow 0→`0 0 24px #ff6b35`. Card body has its own `whileInView` slide-in (slide direction from `index % 2` on desktop; always slide-right on mobile).
   - **Verify**: in Storybook-less env, manual scroll test — node fills as it crosses ~60% viewport mark; reduced-motion mode renders node fully filled with no transition.
   - **Rollback**: delete the file.

3. **Build `ExperienceThread` (sticky wrapper + serpentine SVG path)** (~3h)
   - **Files**: new `src/components/ExperienceThread.jsx`.
   - **Change**: outer `<section>` with `min-h-[300vh]` (or computed `100vh + entries.length * 100vh`); inside, a `sticky top-0 h-screen flex` container holds an absolutely-positioned full-height `<motion.svg>` behind the cards. The SVG `d` is built from a small helper `buildSerpentinePath({ count, width, height })` returning `M ... C ... S ... ...` segments alternating between two column anchors (research source [6]). `useScroll({ target: outerRef, offset: ["start end", "end end"] })` + `useTransform(scrollYProgress, [0, 1], [0, 1])` → `pathLength` on `<motion.path>`. Stroke: `url(#thread-gradient)` (linear gradient orange→yellow, matches existing palette), `strokeWidth={3}`, `strokeLinecap="round"`. On `<md` the helper returns a straight vertical `M cx 0 V height` path instead of bezier.
   - **Verify**: in DevTools, the SVG path's `stroke-dashoffset` (framer-motion's compiled form of `pathLength`) animates from full length to 0 as you scroll through the section; sticky container stays pinned; ancestor section's `overflow-hidden` was swapped to `overflow-x-clip` so sticky still works.
   - **Rollback**: delete the file; About.jsx still has its old timeline if Step 5 not yet done.

4. **A11y + reduced-motion** (~30 min)
   - **Files**: new `src/hooks/useReducedMotionSafe.js`, edit `src/components/ExperienceThread.jsx` + `src/components/ExperienceCard.jsx`, edit `src/index.css`.
   - **Change**: hook is `() => useReducedMotion() ?? false` (framer-motion can return `null` on SSR). When `true`: `<motion.path>` renders with no `pathLength` style (fully drawn at all times), nodes render in their "active" state, cards skip the slide-in `initial`. Add CSS fallback `@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }`.
   - **Verify**: DevTools → Rendering tab → emulate `prefers-reduced-motion: reduce` → reload → thread is fully drawn from first paint, no scroll-tied animation, all nodes already orange.
   - **Rollback**: keep the hook (harmless), revert the component branches.

5. **Wire into About.jsx, replacing the existing timeline** (~30 min)
   - **Files**: `src/components/About.jsx` — delete L297–342 (`{/* Timeline */}` motion.div block), import + render `<ExperienceThread />` in its place; also change the outer section `className` at L104 from `overflow-hidden` → `overflow-x-clip overflow-y-visible` (research sources [8][9]: `overflow-hidden` on an ancestor silently breaks sticky).
   - **Verify**: section renders without console errors; existing skills + tech stack subtrees unchanged; the Experience thread occupies the bottom of the About section with the 5 cards.
   - **Rollback**: revert About.jsx; the new components are unused but cause no error.

6. **Polish + cross-browser check** (~30 min)
   - **Files**: minor tweaks to `ExperienceThread.jsx` (Safari sometimes needs an explicit `vector-effect="non-scaling-stroke"` on the path so stroke width is preserved across viewBox scaling; iOS Safari ≤ 15 doesn't support `overflow:clip` — accept that as a known-issue mobile fallback or guard with `@supports`).
   - **Verify**: Chrome, Firefox, Safari desktop + iOS Safari 16+ all show the drawing thread; below `md` the straight vertical variant kicks in.
   - **Rollback**: revert tweaks; functionality intact, only cross-browser polish lost.

### Risks
- **Sticky breaks because an ancestor has `overflow:hidden`** — `About.jsx:104` is the known one; Step 5 changes it to `overflow-x-clip`. Risk mitigated, but worth a manual scroll-test on Safari (where `overflow:clip` is 16+).
- **Serpentine path math wrong on extreme aspect ratios** — mitigation: confine the SVG to its own `viewBox` and let it scale uniformly; recompute path `d` only on `resize` via `useLayoutEffect` if responsive width drift becomes visible (defer until observed).
- **framer-motion `useScroll` reading `window.scrollY` vs future Lenis** — when Lenis lands (Phase 1 of the wider plan), framer-motion `useScroll` continues to work with the native scroll Lenis dispatches; only if Lenis is later wrapped in a custom scroll container does the `container` option of `useScroll` need wiring.
- **Reduced-motion users miss the visual narrative** — mitigation: the static-but-fully-drawn thread still communicates the timeline structure; no information is locked behind the animation.
- **Node "fill" janks if too many cards** — each card spawns its own `useScroll`; with 5 cards the cost is negligible. If the list grows past ~20, batch into one parent `useScroll` and interpolate per-node thresholds.

### Done when
- Scrolling the About section visibly *draws* the orange→yellow thread from the first node to the last as you pass through it.
- Each of the 5 cards (Refold AI, Patrol 6, M-Core, INDOLIKE, IIIT Manipur) has a node that scales up and lights orange as the thread crosses it.
- DevTools shows zero `<Canvas>` added by this feature (SVG only).
- With OS-level `prefers-reduced-motion: reduce`, the section is fully readable, thread is statically fully-drawn, no scroll-tied or entrance animations fire.
- Below `md` viewport, the thread is straight vertical and cards stack right-of-thread.
- The existing Skills, Tech Stack, profile, and hero subtrees in `About.jsx` are untouched.

### Out of scope (explicit cuts)
- No R3F 3D thread (research verdict: not worth the cost).
- No GSAP, no Lenis pulled in for this feature alone (Lenis is on the wider Phase 1).
- No drag-to-rewind, no zoom-into-card animation, no per-card detail modals (defer until requested).
- No CMS-backed experience data — `src/data/experience.js` is the source of truth.

### Hand-off
Per the project's planning skill, once approved, implementation runs through `/feature-implementation` (or just inline since this is ~6 hours total). Want me to start with Step 1 (data extraction) right now?

### Research references this plan rests on
- framer-motion `pathLength` on `motion.path` — https://motion.dev/docs/react-svg-animation
- `useScroll` with `target` ref + `offset` grammar — https://www.framer.com/motion/use-scroll/
- Sticky + `useScroll` composition — https://www.frontend.fyi/course/motion/06-scroll-animations/08-scroll-animations-with-position-sticky
- Serpentine bezier path math — https://tympanus.net/codrops/2025/12/17/building-responsive-scroll-triggered-curved-path-animations-with-gsap/
- `overflow:hidden` breaks sticky → use `overflow:clip` — https://benfrain.com/yes-you-can-use-position-sticky-and-overflow-together/ , https://www.terluinwebdesign.nl/en/blog/position-sticky-not-working-try-overflow-clip-not-overflow-hidden/
- WCAG 2.3.3 Animation from Interactions — https://www.w3.org/WAI/WCAG21/Understanding/animation-from-interactions.html
- R3F scroll-rig (rejected alternative, for reference) — https://github.com/14islands/r3f-scroll-rig
