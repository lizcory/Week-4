gsap.registerPlugin(ScrollTrigger);

// gsap.to('#square-two', {
//     scrollTrigger: {
//         trigger: '#square-two',
//         start: 'top center',
//         end: `bottom 300px`,
//         markers: true,
//         toggleActions: 'play reverse none none',
//         // onEnter onLeave onEnterBack onLeaveBack
//         // possible values: play, restart, reverse, resume, complete, none
//         scrub: 1,
//         // this property makes the animation connected to the scrollbar
//         pin: true
//     },
//     x: 500,
//     duration: 1
// });


gsap.to('#square-two', {
    scrollTrigger: {
        trigger: '#square-one',
        endTrigger: '#square-three',
        start: 'top 100px',
        end: `bottom 300px`,
        markers: true,
        toggleActions: 'play reverse none none',
        // onEnter onLeave onEnterBack onLeaveBack
        // possible values: play, restart, reverse, resume, complete, none
        scrub: 1,
        // this 'scrub' property makes the animation connected to the scrollbar
        pin: '#square-two'
        // this 'pin' property makes the element pin to the screen
        //      meaning that it will stop scrolling until the end-trigger (onLeave)
    },
    x: 500,
    duration: 1
});
