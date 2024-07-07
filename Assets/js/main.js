document.addEventListener('DOMContentLoaded', () => {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        multiplier: 1.2 // Adjust to control the scroll speed
    });

    // Update GSAP ScrollTrigger to work with Locomotive Scroll
    gsap.registerPlugin(ScrollTrigger);
    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("[data-scroll-container]", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: document.querySelector("[data-scroll-container]").style.transform ? "transform" : "fixed"
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();

    // Menu Toggle
    const showMenu = (toggleId, navId) => {
        const toggle = document.getElementById(toggleId),
            nav = document.getElementById(navId);
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show-menu');
            toggle.classList.toggle('show-icon');
        });
    };

    showMenu('nav-toggle', 'nav-menu');

    // Dropdown Functionality
    const dropdownItems = document.querySelectorAll('.dropdown__item');
    dropdownItems.forEach((item) => {
        const dropdownButton = item.querySelector('.dropdown__button');
        dropdownButton.addEventListener('click', () => {
            const showDropdown = document.querySelector('.show-dropdown');
            toggleItem(item);
            if (showDropdown && showDropdown !== item) {
                toggleItem(showDropdown);
            }
        });
    });

    const toggleItem = (item) => {
        const dropdownContainer = item.querySelector('.dropdown__container');
        if (item.classList.contains('show-dropdown')) {
            dropdownContainer.removeAttribute('style');
            item.classList.remove('show-dropdown');
        } else {
            dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px';
            item.classList.add('show-dropdown');
        }
    };

    const mediaQuery = matchMedia('(min-width: 1118px)'),
        dropdownContainer = document.querySelectorAll('.dropdown__container');

    const removeStyle = () => {
        if (mediaQuery.matches) {
            dropdownContainer.forEach((e) => {
                e.removeAttribute('style');
            });
            dropdownItems.forEach((e) => {
                e.classList.remove('show-dropdown');
            });
        }
    };

    addEventListener('resize', removeStyle);

    // Hide Nav on Scroll
    const nav = document.querySelector(".header");
    nav.classList.add("nav--hidden");
    let lastScrollY = locoScroll.scroll.instance.scroll.y;
    let isHovering = false;
    let scrollTimeout;

    function handleScroll() {
        const currentScrollY = locoScroll.scroll.instance.scroll.y;
        if (!isHovering) {
            if (lastScrollY < currentScrollY && currentScrollY) {
                nav.classList.add("nav--hidden");
            } else {
                nav.classList.remove("nav--hidden");
            }
        }
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            if (!isHovering) {
                nav.classList.add("nav--hidden");
            }
        }, 1500);
        lastScrollY = currentScrollY;
    }

    locoScroll.on("scroll", handleScroll);

    nav.addEventListener("mouseenter", () => {
        isHovering = true;
        nav.classList.remove("nav--hidden");
    });

    nav.addEventListener("mouseleave", () => {
        isHovering = false;
        handleScroll();
    });

    // GSAP Animations
    class App {
        constructor() {
            this.heroImages = [...document.querySelectorAll('.hero__images img')];
            this.texts = [...document.querySelectorAll('.text__effect')];
            this._initialize();
            this._render();
        }

        _initialize() {
            this._setInitialStates();
            this._createLenis();
            this._createIntro();
            this._createHero();
            this._createTextAnimation();
            this._createPinnedSection();
        }

        _setInitialStates() {
            gsap.set('.hero__title span, .fullwidth-image__text', {
                y: 400,
                opacity: 0
            });
            gsap.set('.hero__images img', {
                opacity: 0,
                y: gsap.utils.random(2000, 1900)
            });
            gsap.set('.fullwidth-image img', {
                scale: 1.3
            });
        }

        _createLenis() {
            this.lenis = new Lenis({
                lerp: 0.1
            });
        }

        _createIntro() {
            const tl = gsap.timeline();
            tl.to('.hero__title div', {
                opacity: 1
            }).to('.hero__title span', {
                y: 0,
                opacity: 1,
                ease: 'expo.out',
                duration: 2,
                stagger: 0.01
            }).to('.hero__images img', {
                opacity: 1,
                y: 0,
                ease: 'power3.out',
                duration: 2,
                stagger: 0.04
            }, '-=1');
        }

        _createHero() {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.hero',
                    scroller: "[data-scroll-container]",
                    start: 'top top',
                    end: 'bottom top',
                    scrub: true,
                }
            });
            this.heroImages.forEach(image => {
                tl.to(image, {
                    ease: 'none',
                    yPercent: gsap.utils.random(-100, -50)
                }, 0);
            });
        }

        _createTextAnimation() {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.text-block',
                    scroller: "[data-scroll-container]",
                    start: 'top center',
                    end: 'bottom top+=25%',
                    scrub: true,
                }
            });
            this.texts.forEach((text) => {
                const overlay = text.querySelector('.text__overlay');
                tl.to(overlay, {
                    scaleX: 0
                });
            });
        }

        _createPinnedSection() {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: '.fullwidth-image',
                    scroller: "[data-scroll-container]",
                    start: 'top top',
                    end: '+=1500',
                    scrub: true,
                    pin: true
                }
            });
            tl.to('.fullwidth-image__overlay', {
                opacity: 0.7
            }).to('.fullwidth-image', {
                "clip-path": "polygon(0% 0% ,100% 0%,100% 100%, 0% 100%)"
            }, 0).to('.fullwidth-image img', {
                scale: 1
            }, 0).to('.fullwidth-image__text', {
                y: 0,
                opacity: 1
            }, 0);
        }

        _render(time) {
            this.lenis.raf(time);
            requestAnimationFrame(this._render.bind(this));
        }
    }

    new App();

    // Slider Functionality
    let items = document.querySelectorAll('.slider123 .list123 .item123');
    let next = document.getElementById('next123');
    let prev = document.getElementById('prev123');
    let thumbnails = document.querySelectorAll('.thumbnail123 .item123');

    let countItem = items.length;
    let itemActive = 0;

    next.onclick = function() {
        itemActive = (itemActive + 1) % countItem;
        showSlider();
    };

    prev.onclick = function() {
        itemActive = (itemActive - 1 + countItem) % countItem;
        showSlider();
    };

    let refreshInterval = setInterval(() => {
        next.click();
    }, 5000);

    function showSlider() {
        let itemActiveOld = document.querySelector('.slider123 .list123 .item123.active123');
        let thumbnailActiveOld = document.querySelector('.thumbnail123 .item123.active123');
        if (itemActiveOld) itemActiveOld.classList.remove('active123');
        if (thumbnailActiveOld) thumbnailActiveOld.classList.remove('active123');

        items[itemActive].classList.add('active123');
        thumbnails[itemActive].classList.add('active123');

        clearInterval(refreshInterval);
        refreshInterval = setInterval(() => {
            next.click();
        }, 5000);
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            itemActive = index;
            showSlider();
        });
    });

    // Like Button Functionality
    const likeBtns = document.querySelectorAll(".like-btn");
    likeBtns.forEach((likeBtn) => {
        likeBtn.addEventListener("click", () => {
            if (likeBtn.classList.contains("active")) {
                likeBtn.classList.remove("active");
            } else {
                likeBtn.classList.add("active");
            }
        });
    });

    // Modal Close Functionality
    function closeModal() {
        let modal = document.querySelector('.modalnav');
        modal.classList.add('modalHide');
    }
});
