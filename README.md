# Ishu Henna Heaven — Luxury Mehendi Artist Website

A premium, fully responsive 4-page website for a bridal & luxury mehendi artist, built with HTML5, CSS3, Bootstrap 5, vanilla JavaScript and AOS scroll animations.

**Theme:** Luxury · Elegant · Royal · Modern — black & gold palette, Cinzel/Poppins/Great Vibes typography.

---

## 1. Project Overview

| Page | File | Purpose |
|---|---|---|
| Home | `index.html` | Hero, about preview, why-choose-us, featured services, stats, testimonials, gallery preview, CTA |
| About | `about.html` | Artist bio, mission/vision, timeline, 9 service cards, working process, FAQ |
| Gallery | `gallery.html` | Filterable masonry gallery (7 categories), lightbox, load more, Instagram strip |
| Contact | `contact.html` | Booking form, contact info, business hours, map, socials |

All pages share one navbar and footer, and load the same two stylesheets and one script file for consistency.

---

## 2. Folder Structure

```
Ishu-Henna-Heaven/
│
├── index.html
├── about.html
├── gallery.html
├── contact.html
│
├── css/
│   ├── style.css          → design tokens, layout, components
│   └── responsive.css     → breakpoints (desktop → mobile)
│
├── js/
│   └── script.js          → loading screen, navbar, counters, typing effect,
│                             gallery filter, lightbox, form validation, etc.
│
├── images/
│   ├── hero.jpg            → (placeholder — replace with real photo)
│   ├── logo.png             → (placeholder — replace with real logo)
│   ├── gallery/              → gallery photography goes here
│   ├── services/             → service card photography goes here
│   └── backgrounds/          → texture/background images go here
│
├── image-prompts.md        → AI image-generation prompts for every image slot
└── README.md
```

> **Note on images:** Every image slot in this build uses a lightweight CSS/SVG "luxury placeholder" (gold-on-black gradient + icon + filename label) instead of a real photo, since no copyrighted stock imagery was used. Each placeholder is labelled with the exact filename it expects (e.g. `bridal-1.jpg`) — drop a same-named file into the right `images/` subfolder and it's ready to swap in (see Section 5).

---

## 3. Installation

No build step or server required — this is a static site.

1. Download / clone the `Ishu-Henna-Heaven` folder.
2. Open `index.html` directly in a browser, **or** serve it locally for the most accurate experience (recommended, since some browsers restrict `fetch`/map embeds on `file://`):

   ```bash
   # Python 3
   cd Ishu-Henna-Heaven
   python3 -m http.server 8000
   # then visit http://localhost:8000
   ```

   or with Node:
   ```bash
   npx serve .
   ```

All third-party libraries (Bootstrap 5, Bootstrap Icons, Google Fonts, AOS) are loaded via CDN — an internet connection is needed the first time each page loads.

---

## 4. Customization Guide

### Change the business name / tagline
Search and replace **"Ishu Henna Heaven"** and the tagline `Turning Beautiful Moments into Timeless Mehendi Art` across all 4 HTML files (also present in `<title>`, meta tags, schema JSON-LD, and the hero section's `data-text` attribute in `index.html`).

### Change colors
All colors are CSS variables defined once at the top of `css/style.css`:

```css
:root {
  --gold: #D4AF37;
  --gold-light: #F5E6A9;
  --black: #000000;
  --bg-dark: #111111;
  --white: #FFFFFF;
}
```
Update these values and the whole site re-themes automatically.

### Change fonts
Fonts are loaded via Google Fonts `<link>` tags in each page's `<head>` and referenced as CSS variables in `style.css`:
```css
--font-heading: 'Cinzel', serif;
--font-body: 'Poppins', sans-serif;
--font-script: 'Great Vibes', cursive;
```
To swap a typeface, update the Google Fonts `<link>` URL in every HTML file's `<head>` and the matching variable in `style.css`.

### Update contact details
Update in **all 4 files** (footer is duplicated per page) and in `contact.html`'s info cards:
- Phone: search `+91 12345 67890` and `tel:+911234567890`
- Email: search `hello@ishuhennaheaven.com`
- Address: search `Nungambakkam, Chennai`
- WhatsApp number: search `wa.me/911234567890` (update the digits after `wa.me/` — country code + number, no `+` or spaces)
- Google Map: in `contact.html`, replace the iframe `src` query (`Chennai,Tamil%20Nadu,India`) with your own address, or paste an embed URL generated from Google Maps → Share → Embed a map.

### Update social links
Search and replace the placeholder URLs (found in every footer + the contact page + `About` schema):
```
https://instagram.com/yourusername
https://facebook.com/yourpage
https://wa.me/911234567890
https://pinterest.com/yourprofile
https://youtube.com/@yourchannel
https://threads.net/@yourusername
```

### Edit services / gallery categories
- Service cards live in `about.html` inside `<section id="services">`.
- Gallery items live in `gallery.html` inside `<div id="galleryGrid">` — each item needs a `data-category` attribute matching one of the filter buttons (`bridal`, `arabic`, `portrait`, `traditional`, `festival`, `minimal`, `guests`) and a `data-title`.

### Edit testimonials
Found in `index.html` inside `#testimonialCarousel` — duplicate a `.carousel-item` block and add a matching indicator `<button>`.

---

## 5. How to Replace Placeholder Images

1. Generate or shoot real photography (see `image-prompts.md` for ready-to-use AI prompts matching the black-and-gold brand).
2. Save the file using the **exact filename** shown on each placeholder's bottom-left label (e.g. `bridal-1.jpg`) into the matching folder:
   - Gallery photos → `images/gallery/`
   - Service card photos → `images/services/`
   - Hero/background textures → `images/backgrounds/`
   - Logo → `images/logo.png`
3. In the HTML, replace the placeholder `<div class="img-placeholder">...</div>` block with a standard `<img>` tag, e.g.:

   ```html
   <!-- Before -->
   <div class="img-placeholder">
     <i class="bi bi-gem"></i>
     <span class="ph-label">bridal-1.jpg</span>
   </div>

   <!-- After -->
   <img src="images/gallery/bridal-1.jpg" alt="Royal bridal mehendi design on bride's hands" loading="lazy" class="w-100 h-100" style="object-fit:cover;">
   ```
4. Keep the `alt` text descriptive for SEO and accessibility.

---

## 6. How to Deploy on GitHub Pages

1. Create a new GitHub repository (e.g. `ishu-henna-heaven`).
2. Push this folder's contents to the repository root:
   ```bash
   git init
   git add .
   git commit -m "Initial commit — Ishu Henna Heaven website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/ishu-henna-heaven.git
   git push -u origin main
   ```
3. In the repository, go to **Settings → Pages**.
4. Under **Build and deployment → Source**, select **Deploy from a branch**.
5. Choose **Branch: main**, folder **/ (root)**, then **Save**.
6. Your site will be live within a few minutes at:
   `https://<your-username>.github.io/ishu-henna-heaven/`
7. Update the `<link rel="canonical">` and Open Graph `og:url` tags in each HTML file to match your final live URL for best SEO.

---

## 7. Features Included

- Fully responsive layout (mobile, tablet, desktop) — separate `responsive.css`
- Sticky + transparent-to-solid navbar on scroll
- Animated loading screen
- Typing-effect hero tagline
- Animated stat counters (Intersection Observer based)
- AOS scroll-reveal animations throughout
- Custom-built lightbox gallery with keyboard navigation (Esc / ← / →)
- Filterable + "Load More" gallery grid
- Bootstrap testimonial carousel with custom gold indicators
- Client-side contact form validation with success message
- Back-to-top button + floating WhatsApp button
- SEO: meta description/keywords, Open Graph, Twitter Card, canonical URLs, JSON-LD schema (LocalBusiness + BreadcrumbList)
- Accessibility: skip link, ARIA labels, visible focus states, keyboard-operable gallery/lightbox, `prefers-reduced-motion` support, `loading="lazy"` ready for real images

---

## 8. Credits & Notes

- No copyrighted or third-party stock photography is included — see `image-prompts.md` for AI prompts to generate on-brand imagery, or replace with your own studio photography.
- Built with Bootstrap 5, Bootstrap Icons, AOS, and Google Fonts (Cinzel, Poppins, Great Vibes) via CDN.
