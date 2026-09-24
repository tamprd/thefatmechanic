# thefatmechanic.com.au

Static HTML/CSS/JS. No build step, no WordPress.

## Edit content
Everything day-to-day lives in `assets/js/config.js`:
socials, TikTok videos, events, merch, contact email/form, workshop link, Desk Frog credit link.
Blank values ("") hide that item automatically.

## Add a TikTok video
Paste the full video link (…/@thefatmechanic/video/123…) into `videos`.
Leave `thumb` blank and the site pulls the thumbnail from TikTok.

## Deploy (Vercel)
1. Push this folder to a GitHub repo.
2. Import into Vercel. Framework preset: Other. No build command, output dir = root.
3. Add thefatmechanic.com.au as the domain and point DNS at Vercel.
`vercel.json` redirects the old WordPress URLs (/the-story-so-far, /merch-store, /shop …).

## Local preview
python3 -m http.server 8000   then open http://localhost:8000

## Swap images
assets/img/ — hero-adam-oscar.webp (1600w) + hero-adam-oscar-sm.webp (900w), card-*.webp, real-*.webp.
Replace with same filenames. WebP or change the paths in index.html.
