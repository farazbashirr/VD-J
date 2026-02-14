const initGsapAnimations = () => {
    if (typeof gsap === 'undefined') {
        return;
    }

    const base = { duration: 0.9, ease: 'power2.out', stagger: 0.15 };
    const page = document.body.dataset.page;

    if (page === 'welcome') {
        const tl = gsap.timeline({ defaults: base });
        tl.from('.hero .eyebrow', { y: 30, opacity: 0 })
            .from('.hero h1', { y: 40, opacity: 0 })
            .from('.hero .lead', { y: 40, opacity: 0 })
            .from('.love-lines p', { y: 30, opacity: 0, stagger: 0.1 })
            .from('.hero-actions', { y: 30, opacity: 0 });
    }

    if (page === 'valentine') {
        const tl = gsap.timeline({ defaults: base });
        tl.from('.valentine-card', { y: 60, opacity: 0 })
            .from('.valentine-card h1', { y: 30, opacity: 0 })
            .from('.valentine-card p', { y: 30, opacity: 0 })
            .from('.choice-buttons .btn', { scale: 0.7, opacity: 0, stagger: 0.2 })
            .from('.choice-hearts', { opacity: 0 }, '<');
    }

    if (page === 'gifts') {
        const tl = gsap.timeline({ defaults: base });
        tl.from('.gifts-hero', { y: 60, opacity: 0 })
            .from('.gift-box', { y: 50, opacity: 0, stagger: 0.2 })
            .from('#finalMessage', { y: 20, opacity: 0 });
    }
};

document.addEventListener('DOMContentLoaded', initGsapAnimations);
