// Mobile Menu Toggle & i18n
document.addEventListener('DOMContentLoaded', async function() {
    // Initialize i18n first (load translations, apply to DOM)
    if (window.i18n) {
        try {
            await window.i18n.init();
        } catch (err) {
            if (typeof console !== 'undefined' && console.warn) console.warn('i18n init failed', err);
        }
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
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        if (navbar.classList.contains('nav-over-hero')) {
            if (currentScroll > 60) {
                navbar.classList.add('nav-scrolled');
            } else {
                navbar.classList.remove('nav-scrolled');
            }
        } else if (currentScroll > 100) {
            navbar.classList.add('shadow-lg');
        } else {
            navbar.classList.remove('shadow-lg');
        }
        
        lastScroll = currentScroll;
    });
    
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
            hero.addEventListener('mousemove', function(e) {
                const r = hero.getBoundingClientRect();
                const x = ((e.clientX - r.left) / r.width) * 100;
                const y = ((e.clientY - r.top) / r.height) * 100;
                hero.style.setProperty('--hero-mx', x + '%');
                hero.style.setProperty('--hero-my', y + '%');
            });
            hero.addEventListener('mouseleave', function() {
                hero.style.setProperty('--hero-mx', '50%');
                hero.style.setProperty('--hero-my', '38%');
            });
        }
        const progress = document.getElementById('home-wow-scroll-progress');
        const toTop = document.getElementById('home-wow-to-top');
        function onWowScroll() {
            const scrollY = window.scrollY || window.pageYOffset;
            const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
            const pct = (scrollY / max) * 100;
            if (progress) progress.style.width = pct + '%';
            if (toTop) {
                if (scrollY > 420) toTop.classList.add('is-visible');
                else toTop.classList.remove('is-visible');
            }
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
