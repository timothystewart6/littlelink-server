## 🧬 DNA Helix Layout

An optional layout for [littlelink-server](https://github.com/timothystewart6/littlelink-server)
that renders your links as the base pairs of a DNA double helix you scroll through,
instead of a vertical list of buttons.

Live example: **[socials.batesyboy.com](https://socials.batesyboy.com)**

It is entirely opt-in. Set `LAYOUT=dna` to turn it on. Leave it unset, or set
`LAYOUT=list`, and you get the stock page exactly as it was — the upstream rendering
tests pass untouched.

---

## The brief

> *"I want the link tablets to appear like the rungs of a ladder of a DNA strand. I want
> it so the strand scrolls up and down with the mousewheel or scroll action. Make it look
> as realistic and stylised as possible, and make it loop around so when you get to the
> end of the list it keeps going back into the start of the list."*

Plus, as it developed:

- it has to work on a phone, with a swipe standing in for the scroll
- a profile panel behind the avatar, for a longer bio than the one-liner
- particles around the strand to sell the three-dimensionality — "dust particles or blobs
  of pulsing information and triggering neurons or filaments"
- the scene controls tucked behind a gear icon rather than always on screen

The constraint that shaped everything: **it is still a links page.** However pretty it
gets, the links have to work, be crawlable, be keyboard-navigable, and survive a
right-click-copy. That ruled out the obvious implementation before it started.

---

## What it looks like

Three render styles ship, switchable with `HELIX_STYLE`:

| Style | Treatment |
| --- | --- |
| `bio` | Bioluminescent cyan gel strand, buttons as tinted glass. The default. |
| `chroma` | Violet strand, buttons in their full brand colours. |
| `clinical` | White/ice strand, monochrome buttons, brand colour on hover only. |

The scene commits to a dark treatment whatever `THEME` is set to, because the strands are
lit objects in a dark field and a light version of that is not the same idea.

---

## How it works

### The motion is a screw, not a scroll

The helix translates vertically **and** rotates about its own axis, at exactly the rate
its pitch implies. Two things follow, and both are the point rather than side effects:

1. **The base pair nearest the centre of the viewport is always face-on and readable.**
   Rotation is measured from the centre of the screen, so whatever you are aiming at is
   never edge-on. Everything above and below twists away.

2. **The backbone is stationary in screen space** while the nucleotides and the rungs
   slide along it. This surprises people, but it is correct: a corkscrew rotating at
   exactly the rate that advances it looks static. It is the barber-pole effect. The
   motion you see is the beads and the buttons travelling along a fixed curve, and that
   is what a real screw motion looks like.

For `N` links at scroll position `p`, link `i` sits at:

```text
d     = wrap(i - p)          // signed, wrapped into [-N/2, N/2)
y     = d × RISE
angle = d × TWIST            // TWIST = 2π × TURNS / N
z     = -DEPTH × t^1.6       // t = |y| / FADE — recedes toward the ends

transform: translate3d(0, y, z) rotateY(angle)
```

### The loop has no seam

`wrap()` is what makes the list endless — run off one end and you come back on the other,
in both directions, forever.

For that to be invisible, the twist across one full list length has to be a **whole number
of revolutions**. Wrapping shifts a button by exactly `N` steps, so its angle changes by
`N × TWIST = 2π × TURNS`. If `TURNS` were fractional the strand would visibly jump at the
wrap point. This is why `HELIX_TURNS` is constrained to integers, and there is a unit test
pinning the invariant:

```ts
it('makes a full list length a whole number of revolutions', () => {
  for (const turns of [1, 2, 3, 4, 5, 6]) {
    for (const count of [3, 7, 21, 40]) {
      const revolutions = (twistPerStep(turns, count) * count) / (2 * Math.PI);
      expect(revolutions).toBeCloseTo(Math.round(revolutions), 10);
    }
  }
});
```

Base pairs also fade out well before they could reach the wrap point, so the join is never
on screen even in principle.

### The links stay in the DOM

The tempting implementation is to draw the whole thing to canvas. That would have been
easier and it would have been wrong: a links page rendered to canvas has no links in it.
No crawling, no keyboard navigation, no "copy link address", nothing for a screen reader.

So the work is split:

| Layer | Technology | Why |
| --- | --- | --- |
| Out-of-focus background helices, dust | Canvas, CSS-blurred | Depth field |
| Backbone, both strands, depth-sorted | Canvas, painter's algorithm | Correct occlusion, gel texture |
| Bloom | Canvas — the layer above re-drawn blurred in `screen` blend | Free bloom, no second render pass |
| **The rungs** | **Real `<a>` elements**, CSS 3D transforms | Keeps every link a link |
| Near strand | Canvas, `screen` blend | Strand passes in front of the buttons |

Canvas and DOM stay registered because the canvas projection replicates the browser's own
perspective division — same `perspective` distance, same formula.

### The perspective sign that took two goes

CSS `rotateY(a)` maps a rung's local `+x` end to `z = −x·sin a`. The canvas backbone has to
use the same convention. The first implementation had it inverted, with this result: as a
button rotated toward you, its near edge got *smaller* while the strand beside it got
brighter. Subtly, insistently wrong, and much easier to feel than to see.

`helixMath.strandPoint()` owns the convention now and a test pins it:

```ts
it('matches the CSS rotateY depth convention', () => {
  const a = Math.PI / 4;
  const d = a / twist;
  const point = strandPoint(d, 0, twist, view);
  expect(point.z).toBeCloseTo(-view.radius * Math.sin(a) + place(d, twist, view).z, 8);
});
```

Buttons are also depth-shaded: the near edge takes a highlight and the far edge a shadow,
strongest when side-on and fading to nothing when face-on.

### Brand colours, without touching any button

littlelink-server defines around 150 buttons, each styled by a class in `brands.css`. None
of those definitions changed, and none of them know the helix exists.

Instead, on mount, the helix creates a **detached probe element** carrying the same classes
and inline styles as each button, measures its computed background colour, and discards it.
That colour becomes `--hx-bc` on the rung.

The probe is necessary rather than fussy: reading the colour off the live button returns
whatever the helix stylesheet has *already painted over it*. The first version did exactly
that and every button came out the same shade of blue. Buttons with gradient backgrounds
(Instagram, Messenger) report a transparent background colour, so the middle gradient stop
is used as a fair representative of the brand.

### The particle field

Three effects, each cheap:

- **Motes** orbit the same vertical axis as the helix, on their own radii and at their own
  rates — wider orbits turning more slowly, as an orbit should. Because they sit at every
  depth, some pass *in front* of the strand and some behind it. That interleaving is what
  actually reads as volume; without it the strand is a glowing ribbon.
- **Pulses** run along a backbone like a signal down an axon, bright head, short tail.
- **Sparks** arc briefly between two motes that drift close together on screen, flash, and
  fade.

Scrolling swirls the whole field, with outer motes lagging the inner ones.

The field is seeded, so it looks the same on every load, but each property is drawn from
the generator independently. The first attempt derived orbit radius and height from one
shared golden-ratio sequence, which correlated them and laid the entire field out along a
diagonal stripe. There is a regression test that computes the correlation coefficient
between orbit and height and asserts it stays near zero.

---

## How it plugs into littlelink-server

Upstream is Next.js (App Router). The design goal was a fork that stays cheap to rebase, so
the changes are additive and sit beside the existing code rather than through it.

### New files

| File | Role |
| --- | --- |
| `src/config/helixConfig.ts` | Parses `LAYOUT`, `HELIX_*`, `BIO_*`; clamps every value |
| `src/components/Helix/helixMath.ts` | Pure geometry — wrap, twist, placement, projection |
| `src/components/Helix/helixParticles.ts` | Particle state and its update step, canvas-free |
| `src/components/Helix/Helix.tsx` | The scene: canvas backbone, DOM rungs, input |
| `src/components/Helix/HelixControls.tsx` | The gear button and Sequencer panel |
| `src/components/Dossier/Dossier.tsx` | Long-form profile panel behind the avatar |
| `src/components/Home/Shell.tsx` | Page chrome; picks list or helix |

### Changed files

- `src/components/Home/Home.tsx` — the ~150 button definitions are untouched. The
  surrounding chrome moved out into `Shell`, so `Home` now renders
  `<Shell config={config}>{…buttons…}</Shell>` and `Shell` decides which layout receives
  them. Children pass straight through, so each layout still reads each button's `order`.
- `src/components/Sort/Sort.tsx` — now exports `sortNodes()` so both layouts share one
  ordering rule rather than duplicating it.
- `src/config/envNames.ts`, `.env.example`, `docker-compose.yml`,
  `scripts/sync-compose-env.mjs` — the new environment variables, kept in sync so
  `compose-env:check` passes.

The geometry and particle maths live in their own modules specifically so they can be unit
tested without a canvas or a DOM. 181 tests pass, including the two invariants above.

---

## Configuration

Everything is optional and defaulted. Unset `LAYOUT` and none of it applies.

| Variable | Default | Notes |
| --- | --- | --- |
| `LAYOUT` | `list` | `dna` enables the helix. Any other value keeps the stock list. |
| `HELIX_STYLE` | `bio` | `bio`, `chroma` or `clinical`. |
| `HELIX_TURNS` | `2` | Whole turns across the whole list, 1–6. **Whole numbers only** — see the seamless loop above. |
| `HELIX_RADIUS` | `172` | 90–320, in pixels. Reduced automatically to fit narrow viewports. |
| `HELIX_RISE` | `90` | 50–190. Vertical gap between base pairs. Scaled on short viewports. |
| `HELIX_DRIFT` | `true` | Slow idle rotation. Pauses while the pointer is over a link, and for visitors who prefer reduced motion. |
| `HELIX_PARTICLES` | `subtle` | `off`, `subtle` or `rich`. |
| `HELIX_CONTROLS` | `false` | `true` adds a gear button letting visitors change the scene live. Nothing persists; a reload returns to your configured values. |
| `BIO_LONG` | unset | Long-form bio. When set, the avatar becomes a button that opens a profile panel. Paragraphs separated by a blank line; `\n\n` also accepted, which is easier in a `.env`. Works in **both** layouts. |
| `BIO_TAGS` | unset | Comma-separated role chips for the panel header. |

### Example

```yaml
services:
  little-link:
    image: ghcr.io/timothystewart6/littlelink-server:latest
    environment:
      - LAYOUT=dna
      - HELIX_STYLE=chroma
      - HELIX_TURNS=2
      - HELIX_PARTICLES=subtle
      - HELIX_CONTROLS=true
      - BIO_TAGS=Systems Engineer,Speaker,Photographer
      - BIO_LONG=The first paragraph shows as a lede.\n\nThen the rest.
      # ...your usual NAME, BIO, and link variables
```

### Running this fork

The helix is not in an upstream release, so build from the branch. Docker can do that
straight from the git URL — nothing to clone:

```yaml
services:
  little-link:
    image: littlelink-server:dna
    build:
      context: https://github.com/b8z-io/littlelink-server.git#feat/dna-helix-layout
      dockerfile: Dockerfile
```

Then `docker compose up -d --build`. To rebuild after new commits land on the branch:
`docker compose build --no-cache && docker compose up -d`.

---

## Interaction notes

- **Wheel, drag, swipe and arrow keys** all drive the same inertia. It is built on pointer
  events, so mouse, trackpad, touch and pen are one code path.
- **Tabbing** to a link scrolls the strand to bring it into view, so keyboard focus is
  never off-screen.
- **Edge-on buttons are not clickable.** A rung turned past roughly 70° has its pointer
  events disabled, so you cannot mis-click a sliver of something you cannot read.
- **A drag never opens a link.** Movement past a small threshold suppresses the click that
  would otherwise follow.
- **Reduced motion** is respected: no drift, no particle motion, no transitions.

---

## Two bugs worth knowing about

Both are the kind that look like nothing in review and are obvious the moment you use the
page, and both are the sort of thing anyone building this would hit.

### Pointer capture ate every click

To let a drag continue when the pointer leaves the strand, the stage called
`setPointerCapture()` on `pointerdown`. That is the conventional thing to do and it broke
every link on the page.

Pointer capture **retargets the `click` that follows to the capturing element.** So every
click landed on the stage, never on the anchor underneath, and nothing opened. The page
looked perfect and did nothing.

The fix is to capture only once the pointer has moved past a small slop threshold — so a
plain click is never captured and reaches the link, while a real drag still tracks outside
the element.

### The stock stylesheet styles bare `<button>`

`brands.css` includes `button` as a bare element selector in its link-button rule, which
gives every `<button>` on the page `width: min(300px, 100%)` and `min-height: 48px`.

Any chrome you add — a control panel, a close button — inherits that and comes out 300px
wide and 48px tall. The gear panel's chips stacked vertically, and the profile panel's
close button rendered as an oval. The fix is an explicit reset on your own buttons; the
cause is easy to stare straight past.

---

## Credit

Built on [timothystewart6/littlelink-server](https://github.com/timothystewart6/littlelink-server),
which is itself a server-side take on [LittleLink](https://littlelink.io). All the heavy
lifting of brand buttons, icons, configuration and container plumbing is upstream's — this
layout borrows all of it and changes none of it.
