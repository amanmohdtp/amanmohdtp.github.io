# Pts Motion Lab
Nine situation-based generative animations built on [Pts](https://github.com/williamngan/pts): hero, cursor, loader, section divider, success state, idle state, 404 and more.
Static site — no build step.

## Run
`npx serve .` (or open `index.html`).

## Deploy
Push to GitHub → Settings → Pages → deploy from `main` / root. Works on Netlify/Vercel as-is.

## Add a scene
In `scenes.js`: `add('Name','Where you'd use it','hint',(S,F)=>({init(){},frame(t){ /* draw */ }}))`.
`PTR` holds pointer x/y and `PTR.click`. Keys 1–9 / arrows switch scenes.
