console.clear();

const { gsap, imagesLoaded } = window;

document.querySelectorAll('.app').forEach(app => {
    const buttons = {
        prev: app.querySelector(".btn--left"),
        next: app.querySelector(".btn--right"),
    };
    const cardsContainerEl = app.querySelector(".cards__wrapper");
    const appBgContainerEl = app.querySelector(".app__bg");
    const cardInfosContainerEl = app.querySelector(".info__wrapper");

    if (buttons.prev && buttons.next && cardsContainerEl && appBgContainerEl && cardInfosContainerEl) {
        buttons.next.addEventListener("click", () => swapCards("right"));
        buttons.prev.addEventListener("click", () => swapCards("left"));

        function swapCards(direction) {
            const currentCardEl = cardsContainerEl.querySelector(".current--card");
            const previousCardEl = cardsContainerEl.querySelector(".previous--card");
            const nextCardEl = cardsContainerEl.querySelector(".next--card");

            const currentBgImageEl = appBgContainerEl.querySelector(".current--image");
            const previousBgImageEl = appBgContainerEl.querySelector(".previous--image");
            const nextBgImageEl = appBgContainerEl.querySelector(".next--image");

            if (currentCardEl && previousCardEl && nextCardEl && currentBgImageEl && previousBgImageEl && nextBgImageEl) {
                changeInfo(direction);
                swapCardsClass();
                removeCardEvents(currentCardEl);

                function swapCardsClass() {
                    currentCardEl.classList.remove("current--card");
                    previousCardEl.classList.remove("previous--card");
                    nextCardEl.classList.remove("next--card");

                    currentBgImageEl.classList.remove("current--image");
                    previousBgImageEl.classList.remove("previous--image");
                    nextBgImageEl.classList.remove("next--image");

                    currentCardEl.style.zIndex = "50";
                    currentBgImageEl.style.zIndex = "-2";

                    if (direction === "right") {
                        previousCardEl.style.zIndex = "20";
                        nextCardEl.style.zIndex = "30";
                        nextBgImageEl.style.zIndex = "-1";

                        currentCardEl.classList.add("previous--card");
                        previousCardEl.classList.add("next--card");
                        nextCardEl.classList.add("current--card");

                        currentBgImageEl.classList.add("previous--image");
                        previousBgImageEl.classList.add("next--image");
                        nextBgImageEl.classList.add("current--image");
                    } else if (direction === "left") {
                        previousCardEl.style.zIndex = "30";
                        nextCardEl.style.zIndex = "20";
                        previousBgImageEl.style.zIndex = "-1";

                        currentCardEl.classList.add("next--card");
                        previousCardEl.classList.add("current--card");
                        nextCardEl.classList.add("previous--card");

                        currentBgImageEl.classList.add("next--image");
                        previousBgImageEl.classList.add("current--image");
                        nextBgImageEl.classList.add("previous--image");
                    }
                }
            }
        }

        function changeInfo(direction) {
            let currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
            let previousInfoEl = cardInfosContainerEl.querySelector(".previous--info");
            let nextInfoEl = cardInfosContainerEl.querySelector(".next--info");

            if (currentInfoEl && previousInfoEl && nextInfoEl) {
                gsap.timeline()
                    .to([buttons.prev, buttons.next], {
                        duration: 0.2,
                        opacity: 0.5,
                        pointerEvents: "none",
                    })
                    .to(
                        currentInfoEl.querySelectorAll(".text"),
                        {
                            duration: 0.4,
                            stagger: 0.1,
                            translateY: "-120px",
                            opacity: 0,
                        },
                        "-="
                    )
                    .call(() => {
                        swapInfosClass(direction);
                    })
                    .call(() => initCardEvents())
                    .fromTo(
                        direction === "right"
                            ? nextInfoEl.querySelectorAll(".text")
                            : previousInfoEl.querySelectorAll(".text"),
                        {
                            opacity: 0,
                            translateY: "40px",
                        },
                        {
                            duration: 0.4,
                            stagger: 0.1,
                            translateY: "0px",
                            opacity: 1,
                        }
                    )
                    .to([buttons.prev, buttons.next], {
                        duration: 0.2,
                        opacity: 1,
                        pointerEvents: "all",
                    });

                function swapInfosClass() {
                    currentInfoEl.classList.remove("current--info");
                    previousInfoEl.classList.remove("previous--info");
                    nextInfoEl.classList.remove("next--info");

                    if (direction === "right") {
                        currentInfoEl.classList.add("previous--info");
                        nextInfoEl.classList.add("current--info");
                        previousInfoEl.classList.add("next--info");
                    } else if (direction === "left") {
                        currentInfoEl.classList.add("next--info");
                        nextInfoEl.classList.add("previous--info");
                        previousInfoEl.classList.add("current--info");
                    }
                }
            }
        }

        function updateCard(e) {
            const card = e.currentTarget;
            const box = card.getBoundingClientRect();
            const centerPosition = {
                x: box.left + box.width / 2,
                y: box.top + box.height / 2,
            };
            let angle = Math.atan2(e.pageX - centerPosition.x, 0) * (35 / Math.PI);
            gsap.set(card, {
                "--current-card-rotation-offset": `${angle}deg`,
            });
            const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
            if (currentInfoEl) {
                gsap.set(currentInfoEl, {
                    rotateY: `${angle}deg`,
                });
            }
        }

        function resetCardTransforms(e) {
            const card = e.currentTarget;
            const currentInfoEl = cardInfosContainerEl.querySelector(".current--info");
            gsap.set(card, {
                "--current-card-rotation-offset": 0,
            });
            if (currentInfoEl) {
                gsap.set(currentInfoEl, {
                    rotateY: 0,
                });
            }
        }

        function initCardEvents() {
            const currentCardEl = cardsContainerEl.querySelector(".current--card");
            if (currentCardEl) {
                currentCardEl.addEventListener("pointermove", updateCard);
                currentCardEl.addEventListener("pointerout", (e) => {
                    resetCardTransforms(e);
                });
            }
        }

        function removeCardEvents(card) {
            card.removeEventListener("pointermove", updateCard);
        }

        // Initialize events for the first time
        initCardEvents();
    }
});



const waitForImages = (container) => {
    const images = [...container.querySelectorAll("img")];
    const totalImages = images.length;
    let loadedImages = 0;
    const loaderEl = document.querySelector(".loader span");

    gsap.set(container.querySelectorAll(".cards__wrapper > *"), {
        "--card-translateY-offset": "100vh",
    });
    gsap.set(container.querySelectorAll(".info__wrapper .current--info .text"), {
        translateY: "40px",
        opacity: 0,
    });
    gsap.set([container.querySelector(".btn--left"), container.querySelector(".btn--right")], {
        pointerEvents: "none",
        opacity: "0",
    });

    images.forEach((image) => {
        imagesLoaded(image, (instance) => {
            if (instance.isComplete) {
                loadedImages++;
                let loadProgress = loadedImages / totalImages;

                gsap.to(loaderEl, {
                    duration: 1,
                    scaleX: loadProgress,
                    backgroundColor: `hsl(${loadProgress * 120}, 100%, 50%`,
                });

                if (totalImages === loadedImages) {
                    gsap.timeline()
                        .to(".loading__wrapper", {
                            duration: 0.8,
                            opacity: 0,
                            pointerEvents: "none",
                        })
                        .call(() => init(container));
                }
            }
        });
    });
};

function init(container) {
    let tl = gsap.timeline();

    tl.to(container.querySelectorAll(".cards__wrapper > *"), {
        delay: 0.15,
        duration: 0.5,
        stagger: {
            ease: "power4.inOut",
            from: "right",
            amount: 0.1,
        },
        "--card-translateY-offset": "0%",
    })
    .to(container.querySelectorAll(".info__wrapper .current--info .text"), {
        delay: 0.5,
        duration: 0.4,
        stagger: 0.1,
        opacity: 1,
        translateY: 0,
    })
    .to(
        [container.querySelector(".btn--left"), container.querySelector(".btn--right")],
        {
            duration: 0.4,
            opacity: 1,
            pointerEvents: "all",
        },
        "-=0.4"
    );
}

document.querySelectorAll('.app').forEach(app => {
    app.addEventListener('mouseenter', () => {
        if (!app.classList.contains('initialized')) {
            waitForImages(app);
            app.classList.add('initialized');
        }
    });
});
