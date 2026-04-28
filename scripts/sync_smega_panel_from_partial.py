# -*- coding: utf-8 -*-
"""Replace smega panel block in each *.html with partials/smega_panel.html (8-space indent)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PANEL = (ROOT / "partials" / "smega_panel.html").read_text(encoding="utf-8")
if not PANEL.endswith("\n"):
    PANEL += "\n"


def extract_range(text: str) -> tuple[int, int] | None:
    start = text.find('<div class="smega-panel" id="smega-panel"')
    if start < 0:
        return None
    j = start
    depth = 0
    while j < len(text):
        a = text.find("<div", j)
        b = text.find("</div>", j)
        if b < 0:
            return None
        if a != -1 and a < b:
            depth += 1
            j = a + 4
        else:
            depth -= 1
            j = b + len("</div>")
            if depth == 0:
                return (start, j)
    return None


def main() -> None:
    for p in sorted(ROOT.glob("*.html")):
        t = p.read_text(encoding="utf-8")
        r = extract_range(t)
        if not r:
            print("skip (no smega-panel):", p.name)
            continue
        start, end = r
        t2 = t[:start] + PANEL + t[end:]
        p.write_text(t2, encoding="utf-8")
        print("synced", p.name)


if __name__ == "__main__":
    main()
