# Recipe Secrets — Website

A 5-page static marketing site for Recipe Secrets, a modern Filipino restaurant in Manila. Plain HTML/CSS/vanilla JS, no build step, no backend.

## Preview locally

From this folder, run any static file server, e.g.:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000` in your browser. (Opening `index.html` directly as a `file://` URL also works, but some browsers restrict `fetch`/relative-path edge cases — a local server is safer.)

## Project structure

```
recipe_website/
  index.html, about.html, specials.html, reservation.html, contact.html
  css/style.css       — all shared styles
  js/main.js          — nav, sticky header, scroll animations, form validation, specials rendering
  data/specials.js     — edit this to add/remove/update specials (used by Home preview + Specials page)
  images/               — downloaded Unsplash photos (WebP, compressed)
  README.md
```

## Editing the specials menu

Open `data/specials.js` and edit the `SPECIALS` array. Each entry:

```js
{
  id: "unique-slug",
  name: "Dish Name",
  description: "Short description.",
  price: "₱000",
  image: "images/your-image.webp",
  alt: "Descriptive alt text"
}
```

No HTML editing needed — both the Home page preview (first 3 items) and the full Specials page pull from this one file.

## Connecting the contact/reservation forms (Formspree)

Both `reservation.html` and `contact.html` have:

```html
<form data-validate novalidate action="https://formspree.io/f/your-form-id" method="POST">
```

To make them live:
1. Create a free account at [formspree.io](https://formspree.io) and create a form.
2. Copy the form endpoint it gives you (looks like `https://formspree.io/f/abcd1234`).
3. Replace `https://formspree.io/f/your-form-id` in **both** files with your real endpoint.
4. Formspree will email you each submission. You can customize the redirect/thank-you behavior in your Formspree dashboard.

Client-side validation (required fields, valid email/phone, no past dates, reservation times restricted to 11:00 AM–10:00 PM, party size 1–20) runs before the browser ever submits to Formspree — invalid submissions are blocked and never leave the page.

## Deploying to GitHub Pages

1. Push this folder's contents to a GitHub repository (as the repo root, or a `/docs` folder).
2. In the repo, go to **Settings → Pages**.
3. Under "Build and deployment", set **Source** to "Deploy from a branch", pick your branch (e.g. `main`) and folder (`/ (root)` or `/docs`).
4. Save. GitHub will give you a URL like `https://<username>.github.io/<repo>/` within a minute or two.
5. No build step is required — it's all static files.

## TODOs before launch

Search the codebase for `<!-- TODO -->` comments — everything below is placeholder content and needs your real details:

- **Address** (header hero meta, footer, Contact page info card) — currently `123 Jupiter Street, Makati, Manila`
- **Phone number** — currently `+63 2 8123 4567`
- **Email** — currently `hello@recipesecrets.ph`
- **Opening hours** — currently `Tue–Sun, 11:00 AM–10:00 PM`
- **Social links** (footer IG/FB/TikTok icons) — currently placeholder `#` links
- **Formspree endpoints** — both forms use a placeholder `your-form-id`, see above
- **Google Map embed** on Contact page — currently centered on Makati generally; once you have a real address, get an exact embed by searching the address on [Google Maps](https://www.google.com/maps), clicking Share → Embed a map, and swapping the `src` of the `<iframe>` in `contact.html`
- **Restaurant story / chef & team bios** on About page — currently generic placeholder copy
- **Specials menu** — currently 6 sample dishes in `data/specials.js`, replace with your real current specials

## Photo credits

All photos are free-to-use stock photography sourced from Unsplash (`images.unsplash.com`), downloaded locally and re-encoded as compressed WebP at the exact dimensions used on the page (no hotlinking, nothing breaks if Unsplash changes). Each file in `/images` corresponds to an Unsplash photo; to find a specific photographer's credit, visit `https://unsplash.com/photos/<the-id-portion-of-the-filename-shown-below>`:

| File | Unsplash photo ID |
|---|---|
| hero-home.webp | 1517248135467-4c7edcad34c4 |
| hero-about.webp | 1577219491135-ce391730fb2c |
| hero-specials.webp | 1498654896293-37aacf113fd9 |
| hero-reservation.webp | 1551024601-bec78aea704b |
| hero-contact.webp | 1481833761820-0509d3217039 |
| about-chef.webp | 1551218808-94e220e084d2 |
| about-kitchen.webp | 1555396273-367ea4eb4db5 |
| about-dining.webp | 1559339352-11d035aa65de |
| special-1.webp | 1467003909585-2f8a72700288 |
| special-2.webp | 1529193591184-b1d58069ecdd |
| special-3.webp | 1546069901-ba9599a7e63c |
| special-4.webp | 1562967914-608f82629710 |
| special-5.webp | 1563729784474-d77dbb933a9e |
| special-6.webp | 1544145945-f90425340c7e |
| gallery-1.webp | 1414235077428-338989a2e8c0 |
| gallery-2.webp | 1424847651672-bf20a4b0982b |
| gallery-3.webp | 1540189549336-e6e99c3679fe |
| gallery-4.webp | 1512621776951-a57141f2eefd |
| gallery-5.webp | 1544025162-d76694265947 |
| gallery-6.webp | 1556910103-1c02745aae4d |

Total image payload: ~3.7 MB across 20 images (all lazy-loaded below the fold except each page's hero).

## What's been tested

- All 5 pages load (HTTP 200), with correct unique `<title>`/meta description, no console errors, and no broken images.
- Nav highlights the current page correctly on every page; mobile hamburger menu opens/closes and navigates.
- Scroll-reveal animations fire correctly as sections enter the viewport; disabled automatically when `prefers-reduced-motion` is set.
- Reservation form: blocks empty submission, rejects past dates, rejects times outside 11:00 AM–10:00 PM, rejects party sizes outside 1–20, accepts valid input.
- Contact form: blocks empty submission, validates email format.
- Responsive from 375px mobile through 1440px+ desktop — checked header/nav, hero, cards, gallery grid, About's alternating split sections, and both forms' side-image layouts.
- Image aspect ratios render correctly at every breakpoint (desktop and mobile) across hero, gallery, specials, and About/form side images.
