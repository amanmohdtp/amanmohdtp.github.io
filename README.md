<p align="center"><img src="logo.png" width="72" alt="PtsJs Animations logo"></p>

# PtsJs Animations

A growing gallery of interactive and cinematic web animations, built with [Pts](https://github.com/williamngan/pts) and plain JavaScript. Browse, search, play with them full screen, change their text, and copy the code.

**Live gallery: https://amanmohdtp.github.io/pts-animations/**

## How to use it

1. Browse the gallery, 20 animations per page, or use the search box at the top.
2. Tap the full screen icon on a card to play. Move, click, hold, drag or scroll.
3. If a piece has text, edit it in the boxes at the bottom of the full screen view.
4. Tap **View code** to read the source and press **Copy**.
5. Share one piece with a direct link, for example `https://amanmohdtp.github.io/pts-animations/#Cloud%20Go`.

## What is inside

| Kind | Examples |
| --- | --- |
| Cinematic and anime | Rainy Neon City, Sunset Hills, Starry Lake, Lighthouse Storm, Cloud Go (clouds spell a word, then you fly into the sky) |
| Text effects | Melting Text, Beach Wave (words written in sand and washed away), Neon Sign, Scramble Reveal, Dot Matrix Ticker, Particle Type |
| Image and emoji | Cat Pixels, Cat Underwater, Cat Spotlight, ASCII Cat, Rocket Launch, Butterfly Garden, Jelly Drift, Emoji Campfire, Moon Cycle |
| Generative art | Silk Currents, Kaleidoscope, Spirograph, Phyllotaxis, Spiral Galaxy, Dot Sphere, Life Garden, Truchet Maze |
| Playful and physics | Gravity Well, Confetti Cannon, Soap Bubbles, Pendulum Wave, Bouncy Logo |

Every card says where the piece fits in a real website: hero background, loading screen, 404 page, intro, footer and more.

## Good to know

- Previews play on their own. Interaction is only enabled in full screen, so scrolling on a phone never gets stuck.
- Works on desktop and mobile. Animations pause when they are off screen to stay smooth.
- Emoji pieces use your device's own emoji, so they look like Apple emoji on iPhone and Mac.
- Fonts (Syne, Fraunces, JetBrains Mono, Anton, Caveat, Fredoka) come from Google Fonts.

## Project layout

- `index.html` and `app.js`: the gallery (search, pages, full screen, code viewer).
- `core.js`: shared helpers.
- `scenes1.js` to `scenes10.js`: the animations, grouped by theme. Add `scenes11.js`, `scenes12.js` and so on and they load automatically.
- `cat.png`: the picture used by the cat animations. Replace it with your own image.

## Run it yourself

No build step. Serve the folder (opening `index.html` directly will block the image pieces):

```
npx serve .
```

To host it free, push the files to a GitHub repository and turn on **Settings, Pages, Deploy from branch, main, root**.

## Credits

Vector math by [Pts](https://github.com/williamngan/pts) from William Ngan. Fonts from Google Fonts.
