BLUE HUES HOME V27 — HERO TILE 50/50 OVERLAP

Replace only root custom.css. No HTML or React JavaScript changes.
Based on V26, preserving fixed-header flow, responsive section widths,
height caps, newsletter and all other sections.

DESKTOP: transparent ivory tile (66% opacity) with original Libre Caslon
text, no dark photo overlay. Its vertical CENTER lies at the hero bottom;
half its height overlays the leaf, the other half extends below.
A 320px reserved gap below the hero keeps the Artisanal section clear.

TABLET/MOBILE: tile remains inside the image to maintain readability.

TUNING:
- Card transparency: rgba(248,249,242,.66)
- Card bottom placement: .bh-home-hero-inner top:100% and
  transform:translate(-50%,-50%)
- Reserved space below: section.bh-home-hero margin-bottom:320px
- Card width: .bh-home-hero-copy width and max-width

If you need different card height on a particular screen, adjust reserved
margin-bottom as appropriate (half the card's rendered height plus gap).
Test at 100% and 75% zoom and at desktop 1258px and 1440px widths.
