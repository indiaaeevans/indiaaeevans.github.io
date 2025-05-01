const navLinks = document.querySelectorAll('nav > .menu-item');
const main = document.querySelector('main');

// Viewport height handling
class ViewportManager {
    constructor() {
        this.vh = window.innerHeight * 0.01;
        this.init();
    }

    init() {
        this.updateVh();
        window.addEventListener('resize', this.debouncedHandleResize);
    }

    updateVh() {
        try {
            document.documentElement.style.setProperty('--vh', `${this.vh}px`);
        } catch (error) {
            console.error('Failed to update viewport height:', error);
        }
    }

    handleResize = () => {
        const newVh = window.innerHeight * 0.01;
        const widthChanged = window.innerWidth !== document.documentElement.clientWidth;
        const heightChangedSignificantly = Math.abs(newVh - this.vh) > 1;
        
        if (widthChanged || heightChangedSignificantly) {
            this.vh = newVh;
            this.updateVh();
        }
    }

    debouncedHandleResize = this.debounce(this.handleResize, 150);

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func.apply(this, args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}

// Initialize viewport manager
const viewportManager = new ViewportManager();

// TODO refactor to fade in first section on scroll
const devSection = `<p class="tagline">Also known as: frontend engineer, tenacious problem-solver, passionate creative, and dedicated mentor.</p><p>My specialties include building high-quality, reusable components and optimizing development workflows to help teams build better apps, faster. I'm on a quest to improve usability, performance, and accessibility across the web, while having some fun along the way.</p>`,
    careerSection = `<p>I took the "non-traditional" path to the industry. In 2017, while (miserably) working in financial services, I took a risk and dumped my savings into a 6-month coding bootcamp to learn what I needed to start building a career in tech. My ability to solve problems and my curiosity to learn allowed me to transition into a software engineering role by the end of the program.<p><b>I haven't stopped learning since.<b><p>`,
    personalSection = `<p>I'm based in Durham, NC just outside of Research Triangle Park. Outside of work, I immerse myself in sewing, crafting, exploring nature, and making a mess in the kitchen.<p>
<p>Let's make something <em class="text-highlight">awesome</em> together.<p>`;

pages = [devSection, careerSection, personalSection];
let requestedPage,
    currentPage = 0;
const aboutMe = document.getElementById('bio');
const backButton = document.getElementById('back-button');
const nextButton = document.getElementById('next-button');

// Add menu highlighting functionality
const menuItems = document.querySelectorAll('.menu-item');
const sections = document.querySelectorAll('section[id]');
const homeMenuItem = document.querySelector('.menu-item[href="#"]');

// Debounce function to prevent multiple highlights
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Function to update menu highlight
const updateMenuHighlight = (sectionId) => {
    menuItems.forEach(item => item.classList.remove('text-highlight'));
    const correspondingMenuItem = document.querySelector(`.menu-item[href="#${sectionId}"]`);
    if (correspondingMenuItem) {
        correspondingMenuItem.classList.add('text-highlight');
    } else {
        homeMenuItem.classList.add('text-highlight');
    }
};

// Debounced version of updateMenuHighlight
const debouncedUpdateMenuHighlight = debounce(updateMenuHighlight, 450);

// Create an Intersection Observer to watch sections
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const sectionId = entry.target.getAttribute('id');
            debouncedUpdateMenuHighlight(sectionId);
        }
    });
}, {
    threshold: 0.5 // Trigger when section is 50% visible
});

// Observe all sections
sections.forEach(section => {
    sectionObserver.observe(section);
});

// Update menu highlight on click (no debounce needed for clicks)
menuItems.forEach(item => {
    item.addEventListener('click', (e) => {
        menuItems.forEach(menuItem => menuItem.classList.remove('text-highlight'));
        e.target.classList.add('text-highlight');
    });
});

// Page Navigation System
class PageNavigator {
    constructor(pages, container, backButton, nextButton) {
        this.pages = pages;
        this.container = container;
        this.backButton = backButton;
        this.nextButton = nextButton;
        this.currentPage = 0;
        this.isAnimating = false;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadInitialPage();
    }

    setupEventListeners() {
        this.backButton.addEventListener('click', this.throttled(500, () => this.goToPreviousPage()));
        this.nextButton.addEventListener('click', this.throttled(500, () => this.goToNextPage()));
        document.addEventListener('keydown', this.throttled(500, (event) => this.handleKeyPress(event)));
    }

    loadInitialPage() {
        const requestedPage = this.getPageFromUrl();
        if (requestedPage !== this.currentPage) {
            this.updatePage(requestedPage, false);
        }
    }

    handleKeyPress(event) {
        if (event.key === 'ArrowLeft') {
            this.goToPreviousPage();
        } else if (event.key === 'ArrowRight') {
            this.goToNextPage();
        }
    }

    goToNextPage() {
        if (this.currentPage < this.pages.length - 1 && !this.isAnimating) {
            this.updatePage(this.currentPage + 1);
        }
    }

    goToPreviousPage() {
        if (this.currentPage > 0 && !this.isAnimating) {
            this.updatePage(this.currentPage - 1);
        }
    }

    updatePage(pageIndex, animate = true) {
        if (this.isAnimating) return;
        
        this.isAnimating = true;
        this.currentPage = pageIndex;

        if (animate) {
            this.container.classList.add('animating');
            this.container.style.opacity = '0';

            setTimeout(() => {
                this.updateContent();
                this.container.classList.add('animating');
                requestAnimationFrame(() => {
                    this.container.style.opacity = '1';
                });
                this.isAnimating = false;
            }, 750);
        } else {
            this.updateContent();
            this.isAnimating = false;
        }
    }

    updateContent() {
        this.container.innerHTML = this.pages[this.currentPage];
        this.updateButtons();
        this.updateUrl();
    }

    updateButtons() {
        this.backButton.disabled = this.currentPage <= 0;
        this.nextButton.disabled = this.currentPage >= this.pages.length - 1;
    }

    updateUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('about-page', this.currentPage + 1);
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }

    getPageFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        const pageParam = urlParams.get('about-page');
        let page = pageParam ? parseInt(pageParam, 10) - 1 : 0;
        return Math.max(0, Math.min(page, this.pages.length - 1));
    }

    throttled(delay, fn) {
        let lastCall = 0;
        return function (...args) {
            const now = Date.now();
            if (now - lastCall < delay) return;
            lastCall = now;
            return fn.apply(this, args);
        };
    }
}

// Initialize page navigator
const pageNavigator = new PageNavigator(
    [devSection, careerSection, personalSection],
    document.getElementById('bio'),
    document.getElementById('back-button'),
    document.getElementById('next-button')
);

// animate skills when the skills section enters the viewport
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const items = document.querySelectorAll('.skill');
            let delay = 100;
            items.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('drop-in');
                }, index * delay);
            });
            observer.unobserve(entry.target);

        }
    });
});

const skillsSectionEl = document.querySelector('.skills');
observer.observe(skillsSectionEl);