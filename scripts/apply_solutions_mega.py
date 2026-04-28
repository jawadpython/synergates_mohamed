# -*- coding: utf-8 -*-
"""One-off: patch nav with Solutions mega menu. Run from repo root: python scripts/apply_solutions_mega.py"""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
PANEL = (ROOT / "partials" / "mega_solutions" / "panel.html").read_text(encoding="utf-8")
MOBILE_I18N = (ROOT / "partials" / "mega_solutions" / "mobile_inactive_data_i18n.html").read_text(encoding="utf-8")
MOBILE_NO_I18N = (ROOT / "partials" / "mega_solutions" / "mobile_inactive_no_i18n.html").read_text(encoding="utf-8")

TRIGGERS = {
    "inactive_i18n": (
        '                        <a href="solutions.html" class="nav-link nav-solutions-trigger '
        'text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" '
        'data-i18n="common.solutions">Solutions</a>'
    ),
    "active_i18n": (
        '                        <a href="solutions.html" class="nav-link nav-solutions-trigger '
        'text-blue-600 font-medium whitespace-nowrap" data-i18n="common.solutions">Solutions</a>'
    ),
    "inactive_plain": (
        '                        <a href="solutions.html" class="nav-link nav-solutions-trigger '
        'text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Solutions</a>'
    ),
}


def wrap_desktop(trigger: str) -> str:
    return (
        '                    <div class="nav-solutions-mega">\n'
        f"{trigger}\n"
        f"{PANEL}"
        "                    </div>\n"
    )


def mobile_block(body: str, classes: str) -> str:
    return body.replace("__CLASSES__", classes)


CONFIG = [
    # file, desktop_key, mobile_old, mobile_classes, mobile_template ("i18n"|"plain")
    (
        "index.html",
        "inactive_i18n",
        '                <a href="solutions.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-sm",
        "i18n",
    ),
    (
        "about.html",
        "inactive_i18n",
        '                <a href="solutions.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-sm",
        "i18n",
    ),
    (
        "contact.html",
        "inactive_i18n",
        '                <a href="solutions.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-sm",
        "i18n",
    ),
    (
        "blog.html",
        "inactive_i18n",
        '                <a href="solutions.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-sm",
        "i18n",
    ),
    (
        "blog-detail.html",
        "inactive_i18n",
        '                <a href="solutions.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-sm",
        "i18n",
    ),
    (
        "faq.html",
        "inactive_i18n",
        '                <a href="solutions.html" class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-md",
        "i18n",
    ),
    (
        "projects.html",
        "inactive_i18n",
        '                <a href="solutions.html" class="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-md",
        "i18n",
    ),
    (
        "solutions.html",
        "active_i18n",
        '                <a href="solutions.html" class="block px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-md nav-solutions-mobile-accordion--current",
        "i18n",
    ),
    (
        "solution-detail.html",
        "active_i18n",
        '                <a href="solutions.html" class="block px-4 py-3 text-blue-600 bg-blue-50 rounded-lg font-medium" data-i18n="common.solutions">Solutions</a>',
        "nav-solutions-mobile-accordion--py-md nav-solutions-mobile-accordion--current",
        "i18n",
    ),
    (
        "controle-acces.html",
        "inactive_plain",
        '                <a href="solutions.html" class="block px-4 py-2.5 text-gray-700 hover:text-gray-900 text-sm">Solutions</a>',
        "nav-solutions-mobile-accordion--py-sm",
        "plain",
    ),
]

DESKTOP_OLD = {
    "inactive_i18n": '                    <a href="solutions.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.solutions">Solutions</a>',
    "active_i18n": '                    <a href="solutions.html" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.solutions">Solutions</a>',
    "inactive_plain": '                    <a href="solutions.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Solutions</a>',
}


def main() -> None:
    for name, dkey, m_old, m_cls, m_tpl in CONFIG:
        path = ROOT / name
        text = path.read_text(encoding="utf-8")
        d_old = DESKTOP_OLD[dkey]
        d_new = wrap_desktop(TRIGGERS[dkey])
        if d_old not in text:
            raise SystemExit(f"{name}: desktop pattern not found")
        text = text.replace(d_old, d_new, 1)
        m_new = mobile_block(MOBILE_I18N if m_tpl == "i18n" else MOBILE_NO_I18N, m_cls)
        if m_old not in text:
            raise SystemExit(f"{name}: mobile pattern not found")
        text = text.replace(m_old, m_new, 1)
        path.write_text(text, encoding="utf-8")
        print("patched", name)


if __name__ == "__main__":
    main()
