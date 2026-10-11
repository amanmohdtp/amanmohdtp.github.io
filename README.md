# PtsJs Animations
Gallery of interactive generative animations built on [Pts](https://github.com/williamngan/pts). White landing page, live previews, full-screen play mode, copyable source.
Static site, no build step: `npx serve .` or push to GitHub Pages / Netlify / Vercel.

Add one: `add(name, use, hint, (S,F)=>({init(){}, frame(t){ /* S.size, F.ctx, PTR */ }}))` in a scenes file, or add a preset to `scenes3.js`.

## Deploy checklist (GitHub Pages)
Repo root must contain: `index.html`, `scenes.js`, `scenes2.js`, `scenes3.js`, `app.js` — not inside a sub-folder.
Settings → Pages → Deploy from branch → `main` / `(root)`. If something fails, a red message at the bottom of the page names the missing file.
