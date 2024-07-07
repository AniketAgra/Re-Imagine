document.addEventListener('DOMContentLoaded', () => {
    // Initialize Locomotive Scroll
    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("[data-scroll-container]"),
        smooth: true,
        // Enable smooth scrolling on mobile as well
        smartphone: {
            smooth: true
        },
        tablet: {
            smooth: true
        }
    });

    // Update GSAP ScrollTrigger to use Locomotive Scroll
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

    // Your existing GSAP animations
    gsap.to("#bottle1", {
        scale: 18,
        x: 300,
        y: -40,
        duration: 5,
        rotate: 45,
        scrollTrigger: {
            trigger: "#bottle1",
            scroller: "[data-scroll-container]", // Use Locomotive Scroll container
            start: "top 80%",
            end: "top 80%",
            scrub: 3,
            pin: true
        }
    });

    gsap.from(".about", {
        x: 350,
        opacity: 0,
        duration: 5,
        scrollTrigger: {
            trigger: ".about",
            scroller: "[data-scroll-container]",
            start: "top 40%",
            end: "top 40%",
            scrub: 3,
            pin: true
        }
    });

    gsap.from("#why-image", {
        y: -100,
        opacity: 0,
        duration: 5,
        scrollTrigger: {
            trigger: "#why-image",
            scroller: "[data-scroll-container]",
            start: "top 80%",
            end: "top 90%",
            scrub: 3,
            pin: true
        }
    });

    gsap.to(".why", {
        yPercent: -100,
        ease: "none",
        scrollTrigger: {
            trigger: ".aboutus",
            scroller: "[data-scroll-container]",
            start: "top top",
            end: "bottom top",
            scrub: true
        }
    });

    // GSAP Scroll Animations
    gsap.from(".ift1", {
        scale: 0,
        delay: 1,
        duration: 2,
        scrollTrigger: {
            trigger: ".ift1",
            scroller: "[data-scroll-container]",
            start: "top 10%",
            scrub: 2,
            pin: true
        }
    });

    gsap.from(".ift2", {
        scale: 0,
        delay: 1,
        duration: 2,
        scrollTrigger: {
            trigger: ".ift2",
            scroller: "[data-scroll-container]",
            start: "top 20%",
            scrub: 2
        }
    });

    gsap.from(".ift3", {
        scale: 0,
        delay: 1,
        duration: 2,
        scrollTrigger: {
            trigger: ".ift3",
            scroller: "[data-scroll-container]",
            start: "top 20%",
            scrub: 2
        }
    });

    gsap.from(".adventures", {
        scale: 0,
        delay: 1,
        duration: 2,
        scrollTrigger: {
            trigger: ".adventures",
            scroller: "[data-scroll-container]",
            start: "top 100%",
            end: "top 60%",
            scrub: 2
        }
    });

    gsap.from(".newsletter-container", {
        y: 100,
        opacity: 0,
        duration: 3,
        scrollTrigger: {
            trigger: ".newsletter-container",
            scroller: "[data-scroll-container]",
            start: "top 70%",
            end:"top 70%",
            scrub: 3
        }
    });

    gsap.from(".footer", {
        y: 100,
        opacity: 0,
        duration: 3,
        scrollTrigger: {
            trigger: ".footer",
            scroller: "[data-scroll-container]",
            start: "top 70%",
            end:"top 70%",
            scrub: 2
        }
    });

    // Slider functionality
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

    const likeBtns = document.querySelectorAll(".like-btn");

    likeBtns.forEach((likeBtn) =>{
        likeBtn.addEventListener("click",() => {
            if(likeBtn.classList.contains("active")){
                likeBtn.classList.remove("active");
            }else{
                likeBtn.classList.add("active");
            }
        });
    });

    // Swiper initialization
    var swiper = new Swiper(".swiper", {
        grabCursor: true,
        freeMode: false,
        speed: 400,
        mousewheel: true,
        scrollbar: {
            el: ".swiper-scrollbar",
            draggable: true,
        },
        slidesPerView: 1,
        spaceBetween: 10,
        breakpoints: {
            520: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            960: {
                slidesPerView: 3,
                spaceBetween: 20,
            }
        }
    });
});
