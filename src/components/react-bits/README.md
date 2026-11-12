# React Bits components

## DecryptedText

Downloaded 2026-11-12 using the skill helper from https://reactbits.dev/r/DecryptedText-TS-CSS.json.
`DecryptedText.tsx` is the unmodified upstream source (including its longer internal animation engine), covered by adjacent `LICENSE.md`.
It uses the existing Motion dependency. `../ProtectedPlaceholder.tsx` owns the public placeholder text and view/loop settings;
no private data is passed to the animation. The upstream component handles reduced motion and visibility.

Official React Bits component, downloaded 2026-11-12 from:

- https://reactbits.dev/backgrounds/gradient-ascii
- https://reactbits.dev/r/GradientASCII-TS-CSS.json
- https://github.com/DavidHDev/react-bits

`GradientASCII.css` is unmodified. `GradientASCII.tsx` adds optional `introDuration` (seconds, default2.4) to the existing intro clock; the shader and daily speed remain upstream. `SiteBackground` enables a3.2s intro with daily speed0.35. The original TSX SHA256 is `99B516C3A8A8392C7D20114D22537F9FF2040D35AA79F16D6A6A17F409777C2E`.
The adjacent `LICENSE.md` is the upstream MIT + Commons Clause license, downloaded from the author's repository. No additional runtime dependencies are required beyond React and browser WebGL2.

Site-specific theme, animation strength and mounting belong to `../SiteBackground.tsx` and the `.site-background` rule in `../../styles/global.css`. Do not put portfolio-specific configuration into the upstream renderer. Without WebGL2, the site retains its CSS background and content.

## AnimatedContent

Downloaded 2026-11-12 using the global `design--react-bits/scripts/rb-add.mjs` skill helper, with the project's TS-CSS variant:

- https://reactbits.dev/r/AnimatedContent-TS-CSS.json

`AnimatedContent.tsx` is unmodified upstream source; it requires `gsap@^3.13.0`. `../SectionReveal.tsx` owns the shared once-only100px/0.8s section entry settings, and explicitly keeps server-rendered content visible without JavaScript. Terminal animation remains separate.

## TechText hero and ASCIIText section headings

Official TS-CSS sources downloaded 2026-11-12 through the same global skill:

- https://reactbits.dev/r/TechText-TS-CSS.json
- https://reactbits.dev/r/ASCIIText-TS-CSS.json

TechText uses Canvas2D without additional runtime dependencies. Its CSS is unmodified; the TSX has a local multiline extension: explicit newline layout, per-glyph baseline, pixel lineHeight and two-dimensional hit testing. Both hero lines share one canvas and the existing selection-frame easing, click kick and spring drag return. `../HeroTitle.tsx` supplies the original text, green/left alignment and semantic h1. The default idle sweep is disabled; intro is none and guides are off. The upstream source was rechecked against the registry on 2026-11-13 and remains single-line (SHA256 DAEB82A3D54CCA43865437ED35D4059381B9A6E99D95403A37E270ABC637C05C).

`../AsciiSectionTitle.tsx` is the sole ASCIIText adapter for the six shared SectionHeading consumers. It preserves real h2 text, original type size/line height, fixed green hue, fine character detail, wave, hover scramble and click ripple. The only local renderer change is the minimum cell size: 1.25px instead of3px, needed for26–34px Chinese strokes. Existing default8px and all values>=3px behave unchanged. Site-specific sizing/colors remain outside the renderer, in `../useTitleTheme.ts` and `../../styles/titles.css`. No new dependency is required.

Both adapters wait for the existing Chinese font, preserve plain server-rendered headings without JavaScript and use plain headings for reduced motion. ASCIIText's native fallback handles absent WebGL2; TechText remains Canvas2D.
