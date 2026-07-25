# Robyn Sultana — Anime Illustrator Portfolio

A modern, scalable portfolio website built with **React + Vite + Tailwind CSS + GSAP** for showcasing 2D anime illustrations and custom commission work.

## 🎨 Features

- **Modern, responsive design** with mobile-first approach
- **Cloudinary integration** for dynamic artwork management (Cloud Name: `syivlqwt`)
- **Gallery system** with filtering & sorting by category
- **Commission tracking** system with pricing tiers
- **Custom cursor** with hover animations (coming soon)
- **GSAP animations** for scroll reveals and micro-interactions (coming soon)
- **Lightbox** for full-size image viewing (coming soon)
- **SEO & Accessibility** ready

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation & Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

The site will be available at `http://localhost:5173`

---

## ⚙️ Configuration

### 1. **Illustrator Information** (`src/config/illustrator.js`)

This file controls all personal information across the entire site. Edit here once, and it updates everywhere:

```javascript
export const illustratorInfo = {
  name: "Robyn Sultana",
  title: "2D Anime Illustrator",
  shortBio: "...",
  longBio: "...",
  tools: ["Clip Studio Paint", "Procreate", ...],
  socials: {
    twitter: "https://twitter.com/...",
    instagram: "https://instagram.com/...",
    pixiv: "https://pixiv.net/...",
    kofi: "https://ko-fi.com/...",
    email: "contact@example.com"
  },
  avatar: { cloudinaryPublicId: "...", alt: "..." }
};
```

**Used in:** About section, Navbar, Footer, meta tags, contact forms

### 2. **Commission Pricing** (`src/config/pricing.js`)

Manage all commission-related info without touching component code:

```javascript
export const commissionTiers = [
  { id: "sketch", name: "Sketch", basePrice: "$TBD", turnaround: "3-5 days", ... },
  { id: "flat-color", name: "Flat Color", basePrice: "$TBD", turnaround: "5-7 days", ... },
  { id: "full-illustration", name: "Full Illustration", basePrice: "$TBD", turnaround: "7-14 days", ... }
];

export const commissionInfo = {
  openSlots: 5,
  currentOpenCommissions: 3,
  acceptingCommissions: true,
  processSteps: [...],
  paymentMethods: ["PayPal", "Stripe", "Ko-fi"]
};
```

**Used in:** Hire Me / Commission section, commission info page

### 3. **Cloudinary Setup** (`.env.local`)

This file is already configured with your Cloudinary cloud name. If you need to update it:

```env
VITE_CLOUDINARY_CLOUD_NAME=syivlqwt
VITE_SITE_TITLE=Robyn Sultana - Anime Illustrator
VITE_SITE_DESCRIPTION=2D anime character illustrations and custom commissions
```

---

## 📊 Artwork Management (The Most Important Part!)

All artwork data lives in **`src/data/artworks.json`**. This is the single source of truth:

✅ **Gallery page** pulls from here (with filters/sort)  
✅ **Home featured section** pulls from here  
✅ **Collections/Cards section** can group by category  
✅ **No code changes needed** when adding new art

### Artwork Entry Schema

```json
{
  "id": "unique-id-kebab-case",
  "title": "Artwork Title",
  "category": "original|fanart|commissions|sketches",
  "tags": ["tag1", "tag2", "tag3"],
  "cloudinaryPublicId": "portfolio/artwork-filename",
  "width": 1000,
  "height": 1200,
  "date": "2024-12-15",
  "featured": true
}
```

### 🎯 How to Add New Artwork

1. **Upload to Cloudinary** → Note the public ID (e.g., `portfolio/my-new-art`)
2. **Open `src/data/artworks.json`** → Add this entry:

```json
{
  "id": "my-new-art",
  "title": "Beautiful New Illustration",
  "category": "original",
  "tags": ["character", "portrait", "fantasy"],
  "cloudinaryPublicId": "portfolio/my-new-art",
  "width": 1000,
  "height": 1200,
  "date": "2024-12-20",
  "featured": false
}
```

3. **Save** → That's it! The artwork automatically appears in:
   - ✅ Gallery page (filterable by category)
   - ✅ Featured grid (if you set `"featured": true`)
   - ✅ Collections cards

### Field Explanations

| Field | Type | Purpose | Example |
|-------|------|---------|---------|
| `id` | string | Unique identifier (kebab-case) | `"hero-1"` |
| `title` | string | Display name | `"Sakura's Bloom"` |
| `category` | string | Filter category | `"original"` \| `"fanart"` \| `"commissions"` \| `"sketches"` |
| `tags` | array | Search/filter tags | `["character", "magic", "portrait"]` |
| `cloudinaryPublicId` | string | Cloudinary path | `"portfolio/artwork-name"` |
| `width` | number | Image width (px) | `1000` |
| `height` | number | Image height (px) | `1200` |
| `date` | string | Upload date (ISO) | `"2024-12-15"` |
| `featured` | boolean | Show in featured section? | `true` \| `false` |

---

## 🌐 Cloudinary Integration

### URL Generation (`src/utils/cloudinary.js`)

Helper functions for responsive, optimized image URLs:

```javascript
import {
  cloudinaryImage,      // Basic URL with transforms
  cloudinarySrcSet,     // Responsive srcSet for <img>
  cloudinaryThumb,      // Thumbnail (400px)
  cloudinaryPlaceholder, // Blurred placeholder
  cloudinaryDisplay     // Full-size (1200px)
} from '@/utils/cloudinary';

// Usage in components:
const url = cloudinaryImage(artwork.cloudinaryPublicId, {
  width: 800,
  quality: 'auto',
  fetch_format: 'auto'
});

const srcSet = cloudinarySrcSet(artwork.cloudinaryPublicId, [400, 800, 1200]);
```

### Transform Options

All URLs automatically include:
- ✅ **Auto format** (WebP for supported browsers)
- ✅ **Auto quality** (optimized for bandwidth)
- ✅ **Responsive sizing** (width-based)
- ✅ **Caching** (fast delivery)

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx                # Navigation with router links
│   ├── Footer/
│   │   ├── Footer.jsx
│   │   └── CcReserveDevFooter.jsx
│   ├── Hero.jsx                  # (future)
│   ├── FeaturedWork.jsx          # (future)
│   ├── CardsGathered.jsx         # (future)
│   ├── About.jsx                 # (future)
│   ├── WhyCommission.jsx         # (future)
│   ├── HireMe.jsx                # (future)
│   ├── PromoBanner.jsx           # (future)
│   ├── CustomCursor.jsx          # (future)
│   └── Lightbox.jsx              # (future)
├── config/
│   ├── illustrator.js            # 👤 Illustrator info (EDIT HERE)
│   └── pricing.js                # 💰 Commission pricing (EDIT HERE)
├── data/
│   └── artworks.json             # 🖼️ Artwork catalog (EDIT HERE)
├── pages/
│   ├── Home.jsx                  # Home route (/)
│   └── Gallery.jsx               # Gallery route (/gallery)
├── hooks/                        # Custom React hooks (future)
├── utils/
│   └── cloudinary.js             # Cloudinary URL helpers
├── App.jsx                       # Router setup
├── App.css
├── index.css                     # Tailwind + global styles
└── main.jsx                      # Entry point
```

---

## 🗺️ Routes & Navigation

| Route | Component | Purpose |
|-------|-----------|---------|
| `/` | `Home.jsx` | Main landing page (Hero, Featured, About, Commission, etc.) |
| `/gallery` | `Gallery.jsx` | Full artwork catalog with filters |
| `/gallery?category=fanart` | `Gallery.jsx` | Deep-linked category view |
| `/#about` | Home + scroll | Anchor link to About section |
| `/#commission` | Home + scroll | Anchor link to Commission section |

### Navbar Links (Configurable)
Edit `src/components/Navbar.jsx` → `navLinks` array to change navigation items

---

## 🎯 Implementation Phases

### ✅ Phase 1 — Complete (Current)
- [x] Project structure & routing (react-router)
- [x] Config files (illustrator, pricing) — **EDIT THESE**
- [x] Artwork data schema with 20 dummy entries — **POPULATE THIS**
- [x] Cloudinary integration setup
- [x] Basic pages (Home skeleton & Gallery with filters)
- [x] Navbar with router links
- [x] Environment variables

### ⏳ Phase 2 — Data Layer (Next)
- Refine artworks.json schema
- Add artwork validation
- Create data import/export helpers

### ⏳ Phase 3 — Home Page Sections
- Hero interactive viewer
- Featured work grid
- Cards gathered (collections)
- About section
- Why commission cards
- Hire me / commission info
- Promo banner

### ⏳ Phase 4 — Gallery Advanced
- Advanced filtering
- Tag-based search
- Sorting options

### ⏳ Phase 5 — Custom Cursor
- Dot/ring cursor design
- Hover scale animations
- Interaction feedback

### ⏳ Phase 6 — GSAP Animations
- Scroll reveal animations
- Hover tweens for buttons
- Stagger effects on cards

### ⏳ Phase 7 — Image Lightbox
- Full-size modal viewer
- Previous/Next navigation
- Keyboard controls

### ⏳ Phase 8 — Accessibility & Responsive
- Mobile-first polish
- Keyboard navigation
- prefers-reduced-motion support
- WCAG compliance

### ⏳ Phase 9 — Deployment
- Production build optimization
- README finalization
- Deploy to Vercel/Netlify

---

## 🎨 Customization Guide

### Change Illustrator Info
**File:** `src/config/illustrator.js`

```javascript
export const illustratorInfo = {
  name: "YOUR NAME",
  title: "YOUR TITLE",
  shortBio: "SHORT BIO",
  longBio: "LONGER BIO...",
  tools: ["Tool1", "Tool2"],
  socials: {
    twitter: "https://...",
    instagram: "https://...",
    pixiv: "https://...",
    kofi: "https://..."
  }
};
```

### Change Commission Pricing
**File:** `src/config/pricing.js`

Just update the `basePrice` and `turnaround` fields — no layout changes needed.

### Change Colors
**File:** `src/index.css`

Edit the `:root` CSS variables:

```css
:root {
  --accent: #aa3bff;
  --accent-bg: rgba(170, 59, 255, 0.1);
  --text: #6b6375;
  /* ... more colors */
}
```

### Add Custom Cursor (Already Done!)
You added a custom cursor via CSS in `src/index.css`:

```css
:root {
  cursor: url('/assets/cursor.png'), auto;
}
```

---

## 🚀 Building & Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
```

Output is in `dist/` — ready to deploy.

### Deploy To:
- **Vercel** (easiest for React): `npm i -g vercel` → `vercel`
- **Netlify**: Connect GitHub repo, auto-deploys on push
- **GitHub Pages**: Configure in `vite.config.js`
- **Any static host**: Upload `dist/` folder

---

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Images not showing | Check Cloudinary cloud name in `.env.local` & verify `cloudinaryPublicId` in artworks.json |
| Gallery filters not working | Ensure category matches entries in artworks.json |
| Navbar links broken | Make sure routes are defined in `src/App.jsx` |
| Styles look wrong | Run `npm run dev` and clear browser cache |
| Env vars not loading | Restart dev server after editing `.env.local` |

---

## 📦 Tech Stack

- **React 19.2.7** — UI framework
- **React Router 6** — Client-side routing
- **Vite 8.1.1** — Build tool
- **Tailwind CSS 4.3.3** — Styling
- **GSAP 3+** — Animations (coming soon)
- **Cloudinary** — Image CDN & transforms

---

## 📝 Next Steps

1. **Update `src/config/illustrator.js`** with real name, bio, and social links
2. **Update `src/config/pricing.js`** with your commission pricing
3. **Upload artworks to Cloudinary** and update `src/data/artworks.json` with real URLs
4. **Test Gallery** at `/gallery` → filters should work
5. **Ready for Phase 2!**

---

**Built with ❤️ for anime art. Let's make it beautiful! 🎨**
