// script.js — Kareem Mohamed Portfolio

// ── Cursor Glow ──
const cursorGlow = document.getElementById('cursorGlow');
document.addEventListener('mousemove', (e) => {
    cursorGlow.style.left = e.clientX + 'px';
    cursorGlow.style.top = e.clientY + 'px';
});

// ── Mobile Menu Toggle ──
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        navLinks.classList.remove('active');
    });
});

// ── Theme Toggle ──
const themeToggleBtn = document.getElementById('theme-toggle');
const themeIcon = themeToggleBtn.querySelector('i');

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateIcon(savedTheme);
} else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
    document.documentElement.setAttribute('data-theme', 'light');
    updateIcon('light');
}

themeToggleBtn.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'light' ? null : 'light';
    if (next) {
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('theme', next);
    } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.removeItem('theme');
    }
    updateIcon(next || 'dark');
});

function updateIcon(theme) {
    if (theme === 'light') {
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
}

// ── Smooth Scroll ──
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

// ── Scroll Fade-in Animations ──
const fadeEls = document.querySelectorAll(
    '.project-card, .timeline-content, .cert-card, .contact-card, .skill-group, .about-text p, .hero-stats'
);
fadeEls.forEach(el => el.classList.add('fade-up'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, 80);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

fadeEls.forEach(el => observer.observe(el));

// ── Active nav link on scroll ──
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 100;
    sections.forEach(section => {
        const top = section.offsetTop;
        const height = section.offsetHeight;
        const id = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-links a[href="#${id}"]`);
        if (navLink) {
            if (scrollY >= top && scrollY < top + height) {
                navLink.style.color = 'var(--text)';
            } else {
                navLink.style.color = '';
            }
        }
    });
});