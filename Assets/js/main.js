
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
          nav = document.getElementById(navId)
 
    toggle.addEventListener('click', () =>{
       
        nav.classList.toggle('show-menu')
        toggle.classList.toggle('show-icon')
    })
 }
 
 showMenu('nav-toggle','nav-menu')
 
 
 const dropdownItems = document.querySelectorAll('.dropdown__item')
 
 
 dropdownItems.forEach((item) =>{
     const dropdownButton = item.querySelector('.dropdown__button') 
 
     
     dropdownButton.addEventListener('click', () =>{
    
         const showDropdown = document.querySelector('.show-dropdown')
         
         
         toggleItem(item)
 
       
         if(showDropdown && showDropdown!== item){
             toggleItem(showDropdown)
         }
     })
 })
 
 
 const toggleItem = (item) =>{
   
     const dropdownContainer = item.querySelector('.dropdown__container')
 
    
     if(item.classList.contains('show-dropdown')){
         dropdownContainer.removeAttribute('style')
         item.classList.remove('show-dropdown')
     } else{
         dropdownContainer.style.height = dropdownContainer.scrollHeight + 'px'
         item.classList.add('show-dropdown')
     }
 }
 
 
 const mediaQuery = matchMedia('(min-width: 1118px)'),
       dropdownContainer = document.querySelectorAll('.dropdown__container')
 
 
 const removeStyle = () =>{
    
     if(mediaQuery.matches){
        
         dropdownContainer.forEach((e) =>{
             e.removeAttribute('style')
         })
 
         
         dropdownItems.forEach((e) =>{
             e.classList.remove('show-dropdown')
         })
     }
 }
 
 addEventListener('resize', removeStyle)
 //---------------------------------------------------------------------hide nav
 const nav = document.querySelector(".header");
 nav.classList.add("nav--hidden");
 let lastScrollY = window.scrollY;
 let isHovering = false;
 let scrollTimeout;
 
 function handleScroll() {
     const currentScrollY = window.scrollY;
 
     
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
     }, 1500);                                                              //change it for increasing delay before navbar goes off
 
     lastScrollY = currentScrollY;
 }
 
 
 window.addEventListener("scroll", handleScroll);
 
 
 nav.addEventListener("mouseenter", () => {
     isHovering = true;
     nav.classList.remove("nav--hidden");
 });
 
 nav.addEventListener("mouseleave", () => {
     isHovering = false;
     handleScroll(); 
 });
 
 
 //// smoooth scrolling
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
 
 
     // .text__effect p,
     _setInitialStates() {
         gsap.set('.hero__title span, .fullwidth-image__text', {
 
             y: 400,                                                 //changeable
             opacity: 0
         })
         gsap.set('.hero__images img', {
             opacity: 0,
             y: gsap.utils.random(2000, 1900)                     //changeable
 
         })
         gsap.set('.fullwidth-image img', {
 
             scale: 1.3
         })
 
 
     }
 
     _createLenis() {
         this.lenis = new Lenis({
             lerp: 0.1
         })
     }
 
     _createIntro() {
         const tl = gsap.timeline();
 
         tl.to('.hero__title div', {
             opacity: 1
         }).to('.hero__title span', {
             y: 400,                                           //changeable
             opacity: 1,
             ease: 'expo.out',
             duration: 2,
             stagger: 0.01
         }).to('.hero__images img',
             {
                 opacity: 1,
                 y: gsap.utils.random(1200, 1100),
                 ease: 'power3.out',
                 duration: 2,
                 stagger: 0.04
             }, '-=1')                                          //changeable(0.5) maybe not
     }
 
     _createHero() {
         const tl = gsap.timeline({
             scrollTrigger: {
                 trigger: '.hero',
                 start: 'top top',
                 end: 'bottom top',
                 scrub: true,                           //changeable
             }
         });
 
         this.heroImages.forEach(image => {
             tl.to(image, {
                 ease: 'none',
                 yPercent: gsap.utils.random(-100, -50)
             }, 0)
         })
 
     }
 
     _createTextAnimation() {
         const tl = gsap.timeline({
             scrollTrigger: {
                 trigger: '.text-block',
                 start: 'top center',
                 end: 'bottom top+=25%',
                 scrub: true,                           //changeable
             }
         });
 
         this.texts.forEach((text, index) => {
             const overlay = text.querySelector('.text__overlay');
 
             tl.to(overlay, {
                 scaleX: 0
             })
             // .to(content,{
             //     y:0,
             //     opacity: 1,
             //     ease: 'expo.out',
             //     duration: 2,
             //     delay:() => index*0.1
             // },0)
         })
     }
     _createPinnedSection() {
         const tl = gsap.timeline({
             scrollTrigger: {
                 trigger: '.fullwidth-image',
                 start: 'top top',
                 end: '+=1500',
                 scrub: true,
                 pin: true                     //changeable
             }
         });
 
         tl.to('.fullwidth-image__overlay', {
 
             opacity: 0.7
         }).to('.fullwidth-image', {
 
 
             "clip-path": "polygon(0% 0% ,100% 0%,100% 100%, 0% 100%)"
         }, 0).to('.fullwidth-image img', {
             scale: 1
         }, 0).to('.fullwidth-image__text',
             {
                 y: 0,
                 opacity: 1
             }, 0)
     }
     _render(time) {
         this.lenis.raf(time);
         requestAnimationFrame(this._render.bind(this))
     }
 
 }
 
 new App();
 
 function closeModal(){
     let modal=document.querySelector('.modalnav');
     modal.classList.add('modalHide');
 }
