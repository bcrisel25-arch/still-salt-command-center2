# Still Salt Command Center — FUNCTION CORE / NO DESIGN BUILD

This package intentionally has **no final app design**.

The previous visual shell was rejected because it could confuse the next builder. This package is only the connected skeleton:

- required element IDs
- correct button wiring
- backend routes
- Chrome extension bridge
- results / launchpad panel
- product scoring/import/export
- website launcher
- voice/text command launcher
- state hooks the next builder can style/animate

## Do not use the current page appearance as a design reference

The current HTML/CSS is a plain wireframe. It is not the final visual direction.

The next builder must create the visual design from the locked reference images and `DESIGN_LOCK.md` only.

## Correct main buttons

Bottom dock contains:

1. TikTok SCAN
2. Mute INCOGNITO
3. Results LAUNCHPAD
4. Amazon SCAN

## Critical behavior lock

Results / Launchpad mode:

- center panel opens
- orb docks to the side
- orb remains active
- orb still listens/responds/speaks unless muted
- minimize closes panel and returns orb to normal center state

Mute / Incognito mode:

- voice disabled
- silent text chat active

## What the next builder should do

1. Keep all connected IDs.
2. Replace only visual styling and motion.
3. Build one dashboard configuration only.
4. Design the giant two-layer orb from the reference images.
5. Design correct side columns from the locked spec.
6. Design correct button locations and states.
7. Add animation/motion after the structure is proven.
