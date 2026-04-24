// Mobile Menu Toggle & i18n
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize i18n first (load translations, apply to DOM)
    if (window.i18n) {
        try {
            await window.i18n.init();
        } catch (err) {
            if (typeof console !== 'undefined' && console.warn) console.warn('i18n init failed', err);
        }
    }
    document.documentElement.classList.add('i18n-ready');
    if (window.i18n) {
        // Language toggle: use delegation so all EN/FR buttons (nav + mobile) work on every page/section
        document.addEventListener('click', function(e) {
            const btn = e.target.closest('[data-lang-btn]');
            if (btn && window.i18n) {
                const lang = btn.getAttribute('data-lang-btn');
                if (lang) window.i18n.setLanguage(lang);
            }
        });
    }
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between bars and times
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                if (mobileMenu.classList.contains('hidden')) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                } else {
                    icon.classList.remove('fa-bars');
                    icon.classList.add('fa-times');
                }
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu?.querySelectorAll('a');
    if (mobileMenuLinks) {
        mobileMenuLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn?.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                const target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // Contact Form Handling
    const contactFormSection = document.getElementById('contact-form');
    const contactForm = contactFormSection ? contactFormSection.querySelector('form') : null;
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;
            const formMessage = document.getElementById('form-message');
            
            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                company: document.getElementById('company').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Disable button and show loading
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
            
            try {
                const response = await fetch('api/contact.php', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(formData)
                });
                
                const result = await response.json();
                
                if (formMessage) {
                    formMessage.classList.remove('hidden', 'bg-red-100', 'text-red-700', 'border-red-300', 'bg-green-100', 'text-green-700', 'border-green-300');
                    
                    if (result.success) {
                        formMessage.classList.add('bg-green-100', 'text-green-700', 'border', 'border-green-300');
                        const msg = (window.i18n && window.i18n.t) ? window.i18n.t('contact.formSuccess') : 'Thank you for your consultation request! Our team will contact you within 24 hours to schedule your free consultation.';
                        formMessage.innerHTML = `<div class="flex items-center"><i class="fas fa-check-circle mr-2"></i><span>${msg}</span></div>`;
                        contactForm.reset();
                    } else {
                        formMessage.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-300');
                        const errorMsg = result.error || 'An error occurred. Please try again.';
                        formMessage.innerHTML = `<div class="flex items-center"><i class="fas fa-exclamation-circle mr-2"></i><span>${errorMsg}</span></div>`;
                    }
                    
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                    setTimeout(() => { formMessage.classList.add('hidden'); }, 6000);
                }
            } catch (error) {
                if (formMessage) {
                    formMessage.classList.remove('hidden', 'bg-green-100', 'text-green-700', 'border-green-300');
                    formMessage.classList.add('bg-red-100', 'text-red-700', 'border', 'border-red-300');
                    formMessage.innerHTML = `<div class="flex items-center"><i class="fas fa-exclamation-circle mr-2"></i><span>Connection error. Please try again or email us directly at info@synergates.ma</span></div>`;
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }
    
    // Navbar scroll effect — rAF + passive to avoid janking main-thread scroll
    const navbar = document.querySelector('nav');
    if (navbar) {
        let navScrollRaf = 0;
        let navScrolledState = null;
        let navShadowState = null;
        function applyNavScroll() {
            navScrollRaf = 0;
            const currentScroll = window.pageYOffset;
            if (navbar.classList.contains('nav-over-hero')) {
                const on = currentScroll > 60;
                if (on !== navScrolledState) {
                    navScrolledState = on;
                    if (on) navbar.classList.add('nav-scrolled');
                    else navbar.classList.remove('nav-scrolled');
                }
            } else {
                const shadow = currentScroll > 100;
                if (shadow !== navShadowState) {
                    navShadowState = shadow;
                    if (shadow) navbar.classList.add('shadow-lg');
                    else navbar.classList.remove('shadow-lg');
                }
            }
        }
        function onNavScroll() {
            if (navScrollRaf) return;
            navScrollRaf = requestAnimationFrame(applyNavScroll);
        }
        window.addEventListener('scroll', onNavScroll, { passive: true });
        applyNavScroll();
    }
    
    // Subtle reveal motion for opted-in sections
    const revealTargets = document.querySelectorAll('.reveal-up');
    if (revealTargets.length > 0) {
        const revealObserver = new IntersectionObserver(function(entries, obs) {
            entries.forEach(function(entry) {
                if (!entry.isIntersecting) return;
                entry.target.classList.add('is-visible');
                obs.unobserve(entry.target);
            });
        }, {
            threshold: 0.12,
            rootMargin: '0px 0px -60px 0px'
        });
        revealTargets.forEach(function(el) { revealObserver.observe(el); });
    }

    /* Homepage wow: hero spotlight follows pointer, scroll progress, back-to-top */
    if (document.body.classList.contains('home-wow')) {
        const hero = document.querySelector('.home-wow-hero');
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (hero && !reduceMotion) {
            hero.style.setProperty('--hero-mx', '50%');
            hero.style.setProperty('--hero-my', '38%');
            var heroSpotRaf = 0;
            var pendingX = 50;
            var pendingY = 38;
            hero.addEventListener('mousemove', function(e) {
                const r = hero.getBoundingClientRect();
                pendingX = ((e.clientX - r.left) / r.width) * 100;
                pendingY = ((e.clientY - r.top) / r.height) * 100;
                if (heroSpotRaf) return;
                heroSpotRaf = requestAnimationFrame(function() {
                    heroSpotRaf = 0;
                    hero.style.setProperty('--hero-mx', pendingX + '%');
                    hero.style.setProperty('--hero-my', pendingY + '%');
                });
            });
            hero.addEventListener('mouseleave', function() {
                hero.style.setProperty('--hero-mx', '50%');
                hero.style.setProperty('--hero-my', '38%');
            });
        }
        const progress = document.getElementById('home-wow-scroll-progress');
        const toTop = document.getElementById('home-wow-to-top');
        let wowScrollRaf = 0;
        function onWowScroll() {
            if (wowScrollRaf) return;
            wowScrollRaf = requestAnimationFrame(function() {
                wowScrollRaf = 0;
                const scrollY = window.scrollY || window.pageYOffset;
                const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
                const pct = (scrollY / max) * 100;
                if (progress) progress.style.width = pct + '%';
                if (toTop) {
                    if (scrollY > 420) toTop.classList.add('is-visible');
                    else toTop.classList.remove('is-visible');
                }
            });
        }
        window.addEventListener('scroll', onWowScroll, { passive: true });
        onWowScroll();
        if (toTop) {
            toTop.addEventListener('click', function(e) {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
});

/* Homepage hero slideshow + vertical pagination (4 dots; 10s timer in active ring).
   Timer only freezes while the tab is hidden (no hover pause — avoids stuck state when
   mouseleave never fires). slideEndsAt + watchdog recover from throttling / bfcache. */
document.addEventListener('DOMContentLoaded', function() {
    try {
        const slidesContainer = document.querySelector('.home-hero-slides');
        if (!slidesContainer) return;
        const slides = Array.prototype.slice.call(slidesContainer.querySelectorAll('.home-hero-slide'));
        const nav = document.querySelector('.home-hero-pag');
        const btns = nav ? Array.prototype.slice.call(nav.querySelectorAll('.home-hero-pag-btn')) : [];
        if (slides.length < 2 || btns.length < 2) return;

        const AUTOPLAY_MS = 10000;
        /* ~8 Hz is enough for the 10s ring + second counter; 20 Hz was main-thread heavy */
        const TICK_MS = 120;
        const WATCHDOG_MS = 1500;
        const TIMER_R = 17;
        const TIMER_CIRC = 2 * Math.PI * TIMER_R;

        let current = 0;
        for (let i = 0; i < slides.length; i++) {
            if (slides[i].classList.contains('is-active')) { current = i; break; }
        }
        const count = Math.min(slides.length, btns.length);
        current = Math.min(current, count - 1);
        slides.forEach(function(s, i) {
            if (i === current) s.classList.add('is-active');
            else s.classList.remove('is-active');
        });
        btns.forEach(function(b, i) {
            b.classList.toggle('is-active', i === current);
            b.setAttribute('aria-selected', i === current ? 'true' : 'false');
        });

        var slideEndsAt = performance.now() + AUTOPLAY_MS;
        var tabFrozenRemaining = null;

        function syncAria() {
            btns.forEach(function(btn, i) {
                btn.setAttribute('aria-selected', i === current ? 'true' : 'false');
            });
        }

        function scheduleFromNow() {
            var t = performance.now();
            slideEndsAt = t + AUTOPLAY_MS;
            if (document.hidden) {
                tabFrozenRemaining = AUTOPLAY_MS;
            } else {
                tabFrozenRemaining = null;
            }
        }

        function advanceSlide() {
            var next = (current + 1) % count;
            slides[current].classList.remove('is-active');
            btns[current].classList.remove('is-active');
            current = next;
            slides[current].classList.add('is-active');
            btns[current].classList.add('is-active');
            syncAria();
        }

        function updateCountdown(remainingMs) {
            var btn = btns[current];
            if (!btn) return;
            var numEl = btn.querySelector('.home-hero-pag-num');
            var prog = btn.querySelector('.home-hero-pag-progress');
            var r = remainingMs;
            if (!Number.isFinite(r)) r = AUTOPLAY_MS;
            r = Math.min(AUTOPLAY_MS, Math.max(0, r));
            var t = AUTOPLAY_MS <= 0 ? 0 : Math.min(1, r / AUTOPLAY_MS);
            var maxSec = Math.max(1, Math.ceil(AUTOPLAY_MS / 1000));
            if (numEl) {
                var sec = Math.max(1, Math.min(maxSec, Math.ceil(r / 1000 - 1e-9)));
                numEl.textContent = String(sec);
            }
            if (prog) {
                prog.style.strokeDashoffset = String(TIMER_CIRC * (1 - t));
            }
        }

        function setActive(idx) {
            idx = ((idx % count) + count) % count;
            if (idx === current) {
                scheduleFromNow();
                return;
            }
            slides[current].classList.remove('is-active');
            btns[current].classList.remove('is-active');
            current = idx;
            slides[current].classList.add('is-active');
            btns[current].classList.add('is-active');
            syncAria();
            scheduleFromNow();
        }

        function runCatchUpWhileOverdue(now) {
            if (!Number.isFinite(slideEndsAt)) {
                slideEndsAt = now + AUTOPLAY_MS;
                return now;
            }
            var g = 0;
            while (now >= slideEndsAt && g < 48) {
                g += 1;
                advanceSlide();
                slideEndsAt += AUTOPLAY_MS;
                now = performance.now();
            }
            return now;
        }

        function step() {
            try {
                var now = performance.now();
                var remaining;

                if (document.hidden) {
                    if (tabFrozenRemaining === null) {
                        tabFrozenRemaining = Math.max(0, slideEndsAt - now);
                    }
                    remaining = tabFrozenRemaining;
                } else {
                    if (tabFrozenRemaining !== null) {
                        slideEndsAt = now + tabFrozenRemaining;
                        tabFrozenRemaining = null;
                    }
                    if (!Number.isFinite(slideEndsAt)) {
                        slideEndsAt = now + AUTOPLAY_MS;
                    }
                    now = runCatchUpWhileOverdue(now);
                    remaining = slideEndsAt - now;
                    if (!Number.isFinite(remaining)) {
                        slideEndsAt = now + AUTOPLAY_MS;
                        remaining = AUTOPLAY_MS;
                    }
                }

                updateCountdown(remaining);
            } catch (e) {
                slideEndsAt = performance.now() + AUTOPLAY_MS;
                tabFrozenRemaining = document.hidden ? AUTOPLAY_MS : null;
            }
        }

        function watchdog() {
            if (document.hidden) return;
            try {
                var now = performance.now();
                if (!Number.isFinite(slideEndsAt) || now > slideEndsAt + WATCHDOG_MS) {
                    runCatchUpWhileOverdue(now);
                    now = performance.now();
                    if (now >= slideEndsAt) {
                        slideEndsAt = now + AUTOPLAY_MS;
                    }
                }
            } catch (e) {
                slideEndsAt = performance.now() + AUTOPLAY_MS;
            }
            step();
        }

        btns.forEach(function(btn) {
            var prog = btn.querySelector('.home-hero-pag-progress');
            if (prog) {
                prog.style.strokeDasharray = String(TIMER_CIRC);
            }
        });

        scheduleFromNow();
        btns.forEach(function(btn, idx) {
            if (idx >= count) {
                btn.hidden = true;
                return;
            }
            btn.addEventListener('click', function() {
                if (idx === current) {
                    scheduleFromNow();
                    return;
                }
                setActive(idx);
            });
        });

        document.addEventListener('visibilitychange', function() {
            step();
        });

        window.addEventListener('pageshow', function() {
            step();
        });

        window.setInterval(step, TICK_MS);
        window.setInterval(watchdog, 1000);
        step();
    } catch (err) {
        if (typeof console !== 'undefined' && console.error) console.error('hero slides init failed', err);
    }
});
