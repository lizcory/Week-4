// gsap doesn't come with scroll trigger
// so we need to add this plugin manually
gsap.registerPlugin(ScrollTrigger);

// creating a trigger
// first element is the id of the element you want to animate
gsap.to('#square-two', {
    scrollTrigger: {
        // the div that has to be the trigger for scroll animation
        trigger: '#square-two',
        // 'top center'
        // top: relative to the trigger element (also applicable: center/bottom/px & % values)
        //      henceforth refered to as 'start trigger'
        // center: relative to the browser window (also applicable: center/bottom/px & % values)
        //      henceforth refered to as 'start position'
        start: 'top center',
        // similar to start of the trigger
        // top: relative to the trigger element (also applicable: center/bottom/px & % values)
        //      henceforth refered to as 'end trigger'
        // center: relative to the browser window (also applicable: center/bottom/px & % values)
        //      henceforth refered to as 'end position'
        end: `bottom 300px`,
        // show the trigger markers 
        // comment and uncomment to check the difference on the webpage
        markers: true,
        toggleActions: 'play reverse none none',
        // toggleActions: onEnter onLeave onEnterBack onLeaveBack
        // possible values: play, restart, reverse, resume, complete, none
        // onEnter: when start trigger overlaps with start position
        // onLeave: when end trigger overlaps with end position
        // onEnterBack: when start trigger overlaps with start position while scrolling backwards
        // onLeaveBack: when end trigger overlaps with end position while scrolling backwards

        // scrub: 3
        // this property makes the animation connected to the scrollbar
        // so moves along with the scrollbar

    },
    // the animation to trigger
    // x: 500 with move the element to the right by 500px
    // could be opacity, color or any other css property
    x: 500,
    // duration: seconds (time it takes to animate)
    // doesn't matter when scrub is true (or a number)
    duration: 1
});

