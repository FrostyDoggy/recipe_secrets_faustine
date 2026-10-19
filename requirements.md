# Task: Build a website for "Recipe Secrets" restaurant

## Goal
A simple, polished, mobile-friendly marketing website for Recipe Secrets, a [cuisine type, e.g. modern Filipino] restaurant in [city]. It must be easy for a non-developer to update text, prices, and specials later.

## Pages (exactly 5)
1. **Home**: hero section with restaurant name, tagline, and a "Reserve a Table" call-to-action; short intro; preview of 2–3 current specials; opening hours and location summary.
2. **About**: the restaurant's story, chef/team section, and our philosophy on food.
3. **Specials**: list of current specials (name, short description, price, optional image). Store the specials in a single data file (e.g. `specials.json` or a JS array) so they can be edited without touching page markup.
4. **Reservation**: form with name, email, phone, date, time, number of guests (1–20), and special requests. Client-side validation: required fields, no past dates, times only within opening hours.
5. **Contact**: address, phone, email, opening hours, embedded Google Map, and a simple contact form (name, email, message).

A shared header with navigation (highlighting the current page) and a shared footer (hours, address, social links) must appear on every page.

## Tech stack & hosting constraints
- Hosting target: a free static host ([GitHub Pages / Netlify / Vercel], pick one). **No server, no database.**
- Use **plain HTML, CSS, and vanilla JavaScript**. No frameworks, no build step. (If you believe static-exported Next.js is clearly better for this, explain why in your plan before using it.)
- Forms must work without a backend: use [Formspree / Netlify Forms / Web3Forms] to deliver submissions by email. Put the form endpoint in one clearly labeled config spot.
- No paid services or API keys required to run the site.

## Design (top priority: the site should look stunning)
Visual appeal is the most important quality of this site. It should feel like a premium, award-worthy restaurant website, not a template. Use rich, mouth-watering food photography throughout.

**Overall style**
- Warm, elegant, appetizing aesthetic. Colors: [brand colors, or "choose a rich palette, e.g. deep charcoal, warm cream, and a gold or terracotta accent"].
- Typography: an elegant Google Fonts display serif for headings (e.g. Playfair Display or Cormorant) paired with a clean sans-serif for body text. Use large, confident heading sizes.
- Generous whitespace, strong visual hierarchy, and consistent spacing.

**Images (use them heavily)**
- Every page opens with a full-width hero image with a dark gradient overlay so text stays readable.
- Home: full-screen hero (food or dining room), an image-led specials preview, and a photo gallery grid (6–9 images) of dishes and ambiance.
- About: large images of the chef, kitchen, and dining room alongside the story text, in alternating left/right layouts.
- Specials: each special shown as a card with a large, high-quality dish photo, name, description, and price.
- Reservation and Contact: a background or side image (table setting, restaurant interior) so these pages don't feel like plain forms.
- Source free, high-resolution images from Unsplash or Pexels. **Download them into an `/images` folder** rather than hot-linking, so nothing breaks later. Check that every image actually loads, and list photo credits in the README.
- Optimize for speed: compress images, use WebP where possible, set width/height to avoid layout shift, and lazy-load everything below the fold.
- Every image needs descriptive alt text.

**Polish and motion**
- Subtle fade-in/slide-up animations as sections scroll into view (vanilla JS IntersectionObserver, no libraries).
- Hover effects: images zoom slightly on cards and gallery items; buttons have smooth color transitions.
- A sticky header that turns solid on scroll.
- Respect `prefers-reduced-motion` and turn animations off for users who request it.

**Responsiveness**
- Fully responsive from 375px phones to large desktops, with a hamburger menu on mobile. Images and galleries must reflow cleanly, never stretch or distort.
## Quality requirements
- Semantic HTML, accessible (labels on all inputs, keyboard-navigable menu, sufficient color contrast).
- Basic SEO: unique `<title>` and meta description per page, Open Graph tags, favicon.
- One shared stylesheet and one shared script; no duplicated CSS across pages.
- No console errors.

## Content to use
- Address: [ ]  Phone: [ ]  Email: [ ]
- Hours: [e.g. Tue–Sun 11am–10pm, closed Mondays]
- Social links: [ ]
- Where I haven't provided content, write realistic placeholder text and mark it with `<!-- TODO -->` comments.

## How to work
1. First, show me a short plan: file structure, design approach, and form service choice. Wait for my OK.
2. Build the shared layout (header, footer, styles), then each page.
3. When finished, give me:
   - A README with how to preview locally, how to deploy to [chosen host] step by step, how to edit specials, and how to connect the form service.
   - A list of every TODO/placeholder I need to replace.

## Done means
All 5 pages are linked and working, forms validate and submit to the form service, the site works on mobile and desktop, and it deploys to [chosen host] with no build step.