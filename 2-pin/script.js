gsap.registerPlugin(ScrollTrigger);

gsap.to('#square-two', {
    markers: true,
    scrub: true,
    scrollTrigger: {
        trigger: "#square-two",
        endTrigger: "#square-three",
        start: 'top 100px',
        end: "bottom 300px",
        markers: true,
        scrub: 3,
        pin: "#square-two", // won't scroll  up until animation ends -- pass ID name of element you want to pin
        pinSpacing: false
    },
    x: 1000,
    rotate: "360deg"

});