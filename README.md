# PtsJs Animations
Gallery of interactive generative animations built on [Pts](https://github.com/williamngan/pts). White landing page, live previews, full-screen play mode, copyable source.
Static site, no build step: `npx serve .` or push to GitHub Pages / Netlify / Vercel.

Add one: `add(name, use, hint, (S,F)=>({init(){}, frame(t){ /* S.size, F.ctx, PTR */ }}))` in a scenes file, or add a preset to `scenes3.js`.
