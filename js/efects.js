/* stained glass hero */
const vitral = document.querySelector('.vitral');

if (vitral) {
    const glass = ['--glass-blue', '--glass-violet', '--glass-gold', '--glass-red'];
    // ponytail: fixed pane count, overflow clips the rest; size it from the viewport if 4k screens show gaps
    for (let i = 0; i < 220; i++) {
        const pane = document.createElement('span');
        pane.style.background = `var(${glass[Math.floor(Math.random() * glass.length)]})`;
        pane.style.animationDelay = `${-Math.random() * 9}s`;
        if (Math.random() < 0.2) pane.style.gridColumn = 'span 2';
        if (Math.random() < 0.15) pane.style.gridRow = 'span 2';
        vitral.appendChild(pane);
    }

    // light follows the cursor
    vitral.parentElement.addEventListener('pointermove', (e) => {
        const box = vitral.getBoundingClientRect();
        vitral.style.setProperty('--x', `${e.clientX - box.left}px`);
        vitral.style.setProperty('--y', `${e.clientY - box.top}px`);
    });
}

/* episode title cards: play once when a section scrolls into view */
const scenes = document.querySelectorAll('.ep-scene');

if ('IntersectionObserver' in window) {
    document.documentElement.classList.add('ep-ready');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    scenes.forEach((scene) => observer.observe(scene));
}
