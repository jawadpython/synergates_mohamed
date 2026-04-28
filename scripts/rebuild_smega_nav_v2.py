# -*- coding: utf-8 -*-
"""Rebuild Solutions mega: trigger in bar + panel as direct child of nav; mobile `smobile` block.

Handles:
- Legacy pages with <div class="nav-solutions-mega"> (v1) — strip wrapper, inject trigger
- Default pages with a plain <a href="solutions.html" class="nav-link ..."> — replace with trigger

Run from repo root:  python scripts/rebuild_smega_nav_v2.py
"""
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PANEL = (ROOT / "partials" / "smega_panel.html").read_text(encoding="utf-8")
SMOBILE = (ROOT / "partials" / "smobile_solutions.html").read_text(encoding="utf-8")

TRIGGERS = {
    "i18n_gray": '                    <a href="solutions.html" id="smega-trigger" class="nav-link smega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.solutions">Solutions</a>\n',
    "i18n_blue": '                    <a href="solutions.html" id="smega-trigger" class="nav-link smega-trigger text-blue-600 font-medium whitespace-nowrap" data-i18n="common.solutions">Solutions</a>\n',
    "plain_gray": '                    <a href="solutions.html" id="smega-trigger" class="nav-link smega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Solutions</a>\n',
}

# Desktop single-line match (per trigger kind)
RE_DESK = {
    "i18n_gray": re.compile(
        r"^[ \t]*<a href=\"solutions.html\" class=\"nav-link text-gray-700[^>]*data-i18n=\"common.solutions\"[^>]*>Solutions</a>\s*$",
        re.M,
    ),
    "i18n_blue": re.compile(
        r"^[ \t]*<a href=\"solutions.html\" class=\"nav-link text-blue-600[^>]*data-i18n=\"common.solutions\"[^>]*>Solutions</a>\s*$",
        re.M,
    ),
    "plain_gray": re.compile(
        r"^[ \t]*<a href=\"solutions.html\" class=\"nav-link text-gray-700[^>]*>Solutions</a>\s*$",
        re.M,
    ),
}

CONFIG = {
    "index": ("i18n_gray", "smobile--py-sm"),
    "about": ("i18n_gray", "smobile--py-sm"),
    "contact": ("i18n_gray", "smobile--py-sm"),
    "blog": ("i18n_gray", "smobile--py-sm"),
    "blog-detail": ("i18n_gray", "smobile--py-sm"),
    "faq": ("i18n_gray", "smobile--py-md"),
    "projects": ("i18n_gray", "smobile--py-md"),
    "solutions": ("i18n_blue", "smobile--py-md smobile--is-current"),
    "solution-detail": ("i18n_blue", "smobile--py-md smobile--is-current"),
    "controle-acces": ("plain_gray", "smobile--py-sm"),
}


def replace_mega_with_trigger(text: str, trigger: str) -> str:
    key = '<div class="nav-solutions-mega">'
    start = text.find(key)
    if start < 0:
        return text
    pos = start + len(key)
    depth = 1
    while pos < len(text) and depth:
        a = text.find("<div", pos)
        b = text.find("</div>", pos)
        if b < 0:
            return text
        if a != -1 and a < b:
            depth += 1
            pos = a + 4
        else:
            depth -= 1
            pos = b + len("</div>")
    return text[:start] + trigger + text[pos:]


def apply_desktop_trigger_v2(text: str, tkey: str) -> str:
    if '<div class="nav-solutions-mega">' in text:
        return replace_mega_with_trigger(text, TRIGGERS[tkey])
    trigger = TRIGGERS[tkey]
    rx = RE_DESK[tkey]
    m = rx.search(text)
    if not m:
        print("  warn: no desktop solutions nav link for", tkey)
        return text
    return text[: m.start()] + trigger + text[m.end() :]


def replace_details_mobile(text: str, sm_ex: str) -> str:
    s = SMOBILE.replace("SMOBILE_EX", sm_ex)
    i = text.find('<details class="nav-solutions-mobile-accordion')
    if i < 0:
        return text
    d = 1
    j = text.find(">", i) + 1
    while j < len(text) and d:
        op = text.find("<details", j)
        cl = text.find("</details>", j)
        if cl < 0:
            return text
        if op != -1 and op < cl:
            d += 1
            j = op + 8
        else:
            d -= 1
            j = cl + len("</details>")
            if d == 0:
                return text[:i] + s + text[j:]
    return text


def replace_first_mobile_solutions_block(text: str, sm_ex: str) -> str:
    s = SMOBILE.replace("SMOBILE_EX", sm_ex)
    if '<details class="smobile' in text and 'id="smobile-solutions"' in text:
        return text
    start = text.find('id="mobile-menu"')
    if start < 0:
        print("  warn: no #mobile-menu")
        return text
    window = text[start : start + 6000]
    m = re.search(r'<a href="solutions.html" class="block px-4[^>]*>Solutions</a>', window)
    if not m:
        print("  warn: no first mobile block link to solutions.html")
        return text
    abs_s = start + m.start()
    abs_e = start + m.end()
    return text[:abs_s] + s.rstrip() + "\n" + text[abs_e:]


def insert_panel_before_mobile(text: str) -> str:
    if 'id="smega-panel"' in text:
        return text
    m = re.search(r"\n(\s*<div id=\"mobile-menu\"[^>]*>)", text)
    if not m:
        print("  warn: no mobile-menu anchor")
        return text
    return text[: m.start()] + "\n" + PANEL + text[m.start() :]


def process(name: str) -> None:
    if name not in CONFIG:
        return
    tkey, sm_ex = CONFIG[name]
    path = ROOT / f"{name}.html"
    t = path.read_text(encoding="utf-8")
    if 'id="smega-panel"' in t and 'id="smega-trigger"' in t and "nav-solutions-mega" not in t:
        print("already v2:", name)
        return
    t = apply_desktop_trigger_v2(t, tkey)
    t = insert_panel_before_mobile(t)
    t = replace_details_mobile(t, sm_ex)
    t = replace_first_mobile_solutions_block(t, sm_ex)
    path.write_text(t, encoding="utf-8")
    print("patched", name)


def main() -> None:
    for n in CONFIG:
        process(n)


if __name__ == "__main__":
    main()
