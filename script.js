const HEART_CLASS = 'floating-heart';

const initPreloader = () => {
    const loader = document.getElementById('preloader');
    if (!loader) {
        return;
    }

    window.addEventListener('load', () => {
        setTimeout(() => loader.classList.add('hide'), 650);
    });
};

const spawnHearts = (container, count = 16, compact = false) => {
    if (!container) {
        return;
    }

    container.innerHTML = '';
    const total = compact ? count : Math.max(count, window.innerWidth < 600 ? 10 : count);

    for (let i = 0; i < total; i += 1) {
        const heart = document.createElement('span');
        heart.className = HEART_CLASS;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${12 + Math.random() * 10}s`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heart.style.opacity = (0.3 + Math.random() * 0.7).toFixed(2);
        heart.style.transform = `scale(${0.6 + Math.random() * 0.8})`;
        container.appendChild(heart);
    }
};

const initFloatingHearts = () => {
    const containers = document.querySelectorAll('.floating-hearts, .modal-hearts, .choice-hearts');
    containers.forEach((container) => {
        const compact = container.classList.contains('modal-hearts') || container.classList.contains('choice-hearts');
        spawnHearts(container, compact ? 12 : 20, compact);
    });
};

const initValentinePage = () => {
    const container = document.querySelector('.choice-buttons');
    const noButton = document.getElementById('noButton');

    if (!container || !noButton) {
        return;
    }

    const yesButton = document.getElementById('yesButton');
    yesButton?.addEventListener('click', () => {
        localStorage.setItem('jaweriaValentine', 'yes');
    });

    const moveButton = () => {
        const bounds = container.getBoundingClientRect();
        const btnBounds = noButton.getBoundingClientRect();
        const maxX = bounds.width - btnBounds.width;
        const maxY = bounds.height - btnBounds.height;
        const randX = Math.max(0, Math.random() * maxX);
        const randY = Math.max(0, Math.random() * maxY);
        noButton.style.left = `${randX}px`;
        noButton.style.top = `${randY}px`;
    };

    const teaseUser = (event) => {
        event.preventDefault();
        moveButton();
    };

    ['mouseenter', 'focus', 'touchstart'].forEach((evt) => {
        noButton.addEventListener(evt, teaseUser, { passive: false });
    });

    noButton.addEventListener('click', (event) => {
        event.preventDefault();
        moveButton();
    });

    container.addEventListener('mousemove', (event) => {
        const btnBounds = noButton.getBoundingClientRect();
        const distance = Math.hypot(
            event.clientX - (btnBounds.left + btnBounds.width / 2),
            event.clientY - (btnBounds.top + btnBounds.height / 2)
        );

        if (distance < 80) {
            moveButton();
        }
    });

    moveButton();
};

const initGiftsPage = () => {
    const giftBoxes = document.querySelectorAll('.gift-box');
    if (!giftBoxes.length) {
        return;
    }

    const modal = document.getElementById('giftModal');
    const modalMessage = document.getElementById('giftMessage');
    const modalClose = document.getElementById('closeModal');
    const finalMessage = document.getElementById('finalMessage');
    const modalHearts = document.getElementById('modalHearts');
    const openedGifts = new Set();

    const openModal = (message, id) => {
        modalMessage.textContent = message;
        modal.classList.add('open');
        modal.setAttribute('aria-hidden', 'false');
        if (modalHearts) {
            spawnHearts(modalHearts, 10, true);
        }
        openedGifts.add(id);
        if (finalMessage && openedGifts.size === giftBoxes.length) {
            finalMessage.classList.add('reveal');
        }
    };

    const closeModal = () => {
        modal.classList.remove('open');
        modal.setAttribute('aria-hidden', 'true');
    };

    giftBoxes.forEach((box) => {
        box.addEventListener('click', () => {
            box.classList.add('opened');
            openModal(box.dataset.message, box.dataset.gift);
        });
    });

    modalClose?.addEventListener('click', closeModal);
    modal?.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
};

const initPageTransitions = () => {
    const anchors = document.querySelectorAll('a[href$=".html"]');

    anchors.forEach((anchor) => {
        anchor.addEventListener('click', (event) => {
            if (
                anchor.getAttribute('target') === '_blank' ||
                event.metaKey ||
                event.ctrlKey ||
                event.shiftKey ||
                event.altKey
            ) {
                return;
            }

            const href = anchor.href;
            if (!href || (anchor.origin && anchor.origin !== window.location.origin)) {
                return;
            }

            event.preventDefault();
            document.body.classList.add('page-exit');
            setTimeout(() => {
                window.location.href = href;
            }, 320);
        });
    });
};

const ready = () => {
    requestAnimationFrame(() => document.body.classList.add('page-ready'));
    initPreloader();
    initFloatingHearts();

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(initFloatingHearts, 400);
    });

    const page = document.body.dataset.page;
    if (page === 'valentine') {
        initValentinePage();
    }
    if (page === 'gifts') {
        initGiftsPage();
    }

    initPageTransitions();
};

document.addEventListener('DOMContentLoaded', ready);
