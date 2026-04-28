import re
from pathlib import Path
ROOT = Path(__file__).resolve().parent.parent
for p in [
    "index.html", "about.html", "contact.html", "blog.html", "blog-detail.html",
    "faq.html", "projects.html", "solutions.html", "solution-detail.html", "controle-acces.html",
]:
    path = ROOT / p
    t = path.read_text(encoding="utf-8")
    t = re.sub(
        r"^\s*(<a href=\"solutions\.html\" id=\"smega-trigger\"[^>]*>Solutions</a>)",
        r"                    \1",
        t,
        flags=re.M,
    )
    t = t.replace("Solutions</a>\n\n\n", "Solutions</a>\n")
    t = t.replace("Solutions</a>\n\n", "Solutions</a>\n")
    t = re.sub(
        r"\n\s*(<details class=\"smobile)",
        r"\n                \1",
        t,
    )
    path.write_text(t, encoding="utf-8")
    print("fixed", p)
