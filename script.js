// const scroll = new LocomotiveScroll({
//     el: document.querySelector('#main-div'),
//     smooth: true
// });

let nalgene = document.getElementById('nalgene');
let hill1 = document.getElementById('hill1');
let hill2 = document.getElementById('hill2');
let person = document.getElementById('person');
let bottle = document.getElementById('bottle');

window.addEventListener('scroll', () => {
    let value = window.scrollY;

    nalgene.style.marginTop = value * -2 + 'px';
    hill1.style.top = value * 0.3 + 'px';
    hill2.style.top = value * 0.4 + 'px';
    person.style.top = value * 0.3 + 'px';
})

gsap.to("#bottle1",{
    scale:18,
    x:300,
    y:-40,
    duration:5,
    rotate:45,
    scrollTrigger:{
        trigger:"#bottle1",
        scroller:"body",
        start:"top 80%",
        end:"top 80%",
        scrub:3,            
        pin:true            
    }
})

gsap.from("#about-image",{
    x:350,
    opacity:0,
    duration:5,
    scrollTrigger:{
        trigger:"#about-image",
        scroller:"body",
        start:"top 40%",
        end:"top 40%",
        scrub:3,            
        pin:true            
    }
})

gsap.from("#why-image",{
    y:100,
    opacity:0,
    duration:5,
    scrollTrigger:{
        trigger:"#why-image",
        scroller:"body",
        start:"top 100%",
        end:"top 100%",
        scrub:3,            
        pin:true            
    }
})

gsap.registerPlugin(ScrollTrigger);

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

document.querySelectorAll('.cat').forEach(cat => {
    const video = cat.querySelector('.hover-video');
    const img = cat.querySelector('img');

    cat.addEventListener('mouseenter', () => {
        img.style.opacity = '0';
        video.play();
    });

    cat.addEventListener('mouseleave', () => {
        img.style.opacity = '1';
        video.pause();
        video.currentTime = 0;
    });
});

