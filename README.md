# Hilda Prints App

Open, free, and easy-to-install clothing store. Main purpose: **sell clothing**.

## Features
- Product catalog of printed clothing
- Shopping cart with local storage
- Progressive Web App (PWA) — install on phone/desktop from browser
- Offline-capable via service worker
- Fully open source

## Easy Installation for Users

### Option 1: Use online (recommended)
Host this on any free static host (GitHub Pages, Netlify, Vercel, Cloudflare Pages). Users open the URL in their browser and tap **Add to Home Screen** / **Install**.

### Option 2: Run locally
```bash
cd hilda-prints-app
python -m http.server 8000
```
Open http://localhost:8000 and install as PWA.

### Option 3: Clone and deploy
1. Clone this repo
2. Push to GitHub and enable Pages, or drag folder to Netlify Drop

## How to Install on Device
1. Open the site in Chrome/Edge/Safari
2. Look for install icon or menu → "Add to Home Screen" / "Install app"
3. The clothing store opens like a native app

## Customization
- Edit `app.js` → `products` array to add your clothing items and image URLs
- Replace demo checkout with real payment (Stripe, etc.) and order fulfillment
- Update colors in `styles.css`

## License
MIT — free to use, modify, and sell clothing with.

Focus is on the clothes, not the app. The app is just the open, easy way for customers to shop.