document.addEventListener('DOMContentLoaded', () => {
    // Define elements
    let nalgene = document.getElementById('nalgene');
    let hill1 = document.getElementById('hill1');
    let hill2 = document.getElementById('hill2');
    let person = document.getElementById('person');
    let bottle = document.getElementById('bottle');

    // Scroll event for parallax effect
    window.addEventListener('scroll', () => {
        let value = window.scrollY;

        nalgene.style.marginTop = value * -2 + 'px';
        hill1.style.top = value * 0.3 + 'px';
        hill2.style.top = value * 0.4 + 'px';
        person.style.top = value * 0.3 + 'px';
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.to("#bottle1", {
        scale: 18,
        x: 300,
        y: -40,
        duration: 5,
        rotate: 45,
        scrollTrigger: {
            trigger: "#bottle1",
            scroller: "body",
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
            scroller: "body",
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
            scroller: "body",
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
            scroller: "body",
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
            scroller: "body",
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
            scroller: "body",
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
            scroller: "body",
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
            scroller: "body",
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
            scroller: "body",
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
