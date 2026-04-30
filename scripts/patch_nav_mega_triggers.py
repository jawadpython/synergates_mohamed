# -*- coding: utf-8 -*-
"""Add nav-mega-trigger + data-mega-key to desktop nav links (run from repo root)."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent

REPLACEMENTS: list[tuple[str, str]] = [
    (
        'href="index.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.home"',
        'href="index.html" id="mega-trigger-home" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="home" data-i18n="common.home"',
    ),
    (
        'href="index.html" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.home"',
        'href="index.html" id="mega-trigger-home" class="nav-link nav-mega-trigger text-blue-600 font-medium whitespace-nowrap" data-mega-key="home" data-i18n="common.home"',
    ),
    (
        'href="index.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Accueil</a>',
        'href="index.html" id="mega-trigger-home" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="home">Accueil</a>',
    ),
    (
        'href="projects.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.projects"',
        'href="projects.html" id="mega-trigger-projects" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="projects" data-i18n="common.projects"',
    ),
    (
        'href="projects.html" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.projects"',
        'href="projects.html" id="mega-trigger-projects" class="nav-link nav-mega-trigger text-blue-600 font-medium whitespace-nowrap" data-mega-key="projects" data-i18n="common.projects"',
    ),
    (
        'href="projects.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Projets</a>',
        'href="projects.html" id="mega-trigger-projects" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="projects">Projets</a>',
    ),
    (
        'href="about.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.about"',
        'href="about.html" id="mega-trigger-about" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="about" data-i18n="common.about"',
    ),
    (
        'href="about.html" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.about"',
        'href="about.html" id="mega-trigger-about" class="nav-link nav-mega-trigger text-blue-600 font-medium whitespace-nowrap" data-mega-key="about" data-i18n="common.about"',
    ),
    (
        'href="about.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">À propos</a>',
        'href="about.html" id="mega-trigger-about" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="about">À propos</a>',
    ),
    (
        'href="blog.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.blog"',
        'href="blog.html" id="mega-trigger-blog" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="blog" data-i18n="common.blog"',
    ),
    (
        'href="blog.html" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.blog"',
        'href="blog.html" id="mega-trigger-blog" class="nav-link nav-mega-trigger text-blue-600 font-medium whitespace-nowrap" data-mega-key="blog" data-i18n="common.blog"',
    ),
    (
        'href="blog.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Blog</a>',
        'href="blog.html" id="mega-trigger-blog" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="blog">Blog</a>',
    ),
    (
        'href="contact.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.contact"',
        'href="contact.html" id="mega-trigger-contact" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="contact" data-i18n="common.contact"',
    ),
    (
        'href="contact.html" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.contact"',
        'href="contact.html" id="mega-trigger-contact" class="nav-link nav-mega-trigger text-blue-600 font-medium whitespace-nowrap" data-mega-key="contact" data-i18n="common.contact"',
    ),
    (
        'href="contact.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">Contact</a>',
        'href="contact.html" id="mega-trigger-contact" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="contact">Contact</a>',
    ),
    (
        'href="faq.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-i18n="common.faq"',
        'href="faq.html" id="mega-trigger-faq" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="faq" data-i18n="common.faq"',
    ),
    (
        'href="faq.html" class="nav-link text-blue-600 font-medium whitespace-nowrap" data-i18n="common.faq"',
        'href="faq.html" id="mega-trigger-faq" class="nav-link nav-mega-trigger text-blue-600 font-medium whitespace-nowrap" data-mega-key="faq" data-i18n="common.faq"',
    ),
    (
        'href="faq.html" class="nav-link text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap">FAQ</a>',
        'href="faq.html" id="mega-trigger-faq" class="nav-link nav-mega-trigger text-gray-700 hover:text-gray-900 font-medium transition-colors whitespace-nowrap" data-mega-key="faq">FAQ</a>',
    ),
]


def main() -> None:
    for p in sorted(ROOT.glob("*.html")):
        t = p.read_text(encoding="utf-8")
        orig = t
        for old, new in REPLACEMENTS:
            t = t.replace(old, new)
        if t != orig:
            p.write_text(t, encoding="utf-8")
            print("patched", p.name)


if __name__ == "__main__":
    main()
