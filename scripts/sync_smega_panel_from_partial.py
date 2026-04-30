# -*- coding: utf-8 -*-
"""Replace smega + nav mega panels block in each *.html from partials (8-space indent for smega)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SMEGA = (ROOT / "partials" / "smega_panel.html").read_text(encoding="utf-8")
if not SMEGA.endswith("\n"):
    SMEGA += "\n"
NMEGA = (ROOT / "partials" / "nav_mega_simple_panels.html").read_text(encoding="utf-8")
if not NMEGA.endswith("\n"):
    NMEGA += "\n"
BLOCK = SMEGA + NMEGA


def extract_range(text: str) -> tuple[int, int] | None:
    start = text.find('<div class="smega-panel" id="smega-panel"')
    if start < 0:
        return None
    mobile = text.find('<div id="mobile-menu"', start)
    if mobile < 0:
        return None
    return (start, mobile)


def main() -> None:
    for p in sorted(ROOT.glob("*.html")):
        t = p.read_text(encoding="utf-8")
        r = extract_range(t)
        if not r:
            print("skip (no smega-panel to mobile-menu):", p.name)
            continue
        start, end = r
        t2 = t[:start] + BLOCK + t[end:]
        p.write_text(t2, encoding="utf-8")
        print("synced", p.name)


if __name__ == "__main__":
    main()
