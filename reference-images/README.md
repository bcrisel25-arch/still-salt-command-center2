# Locked Reference Images — Included in this ZIP

These images are now inside `/reference-images/`. The next builder must inspect these files before visual work.

## Source-of-truth references

| File | Use |
|---|---|
| `dashboard-idle-lock.png` | Main dashboard layout direction: Still Salt Command Center, center two-layer orb, side panels, bottom scan/mute buttons. |
| `talking-orb-lock.png` | Talking mode lock: only the active two-layer orb with the small electric chat box underneath. |
| `incognito-lock.png` | Silent / incognito mode lock: text-only secure chat, muted/offline orb behavior. |
| `boot-tiny-orb-start-lock.png` | Boot start lock: black screen with tiny centered Still Salt orb. No green cross. No written “Rise and shine.” |
| `boot-tunnel-reference.png` | 10-second boot hallway/tunnel direction: blue/orange data tunnel with panels, tasks, updates, metrics flying by. |
| `dashboard-energy-style-reference.png` | Energy/color reference only: blue/orange electricity intensity. Do not copy any wrong inner text from this image if it conflicts with the SS orb lock. |

## Hard rule

The current HTML/CSS in the repo is a no-design functional skeleton. The final visual design must come from these reference images and `DESIGN_LOCK.md`, not from the plain temporary UI.

## Rejected direction

Do not use the green plus/cross activation concept. It was removed. Boot starts with a tiny Still Salt orb only.
