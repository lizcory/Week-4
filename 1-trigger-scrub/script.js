// load lib

// load plugin
gsap.registerPlugin(ScrollTrigger);

// animate
gsap.to('#square-two', {
    x: 1000,
    duration: 5,
    scrollTrigger: {
        trigger: '#square-one', // what triggers animation
        start: 'top center',  // when square 2 comes to view (1 relative to element and 2 relative to page)
        end: 'bottom 300px', //top/botom/center/px or %
        toggleActions: 'restart none none none',
        // 'restart none none none'
        // onEnter onLeave onEnterBack onLeaveBack
        // start/start end/end end/endREVERSE start/startREVERSE
        markers: true,  //helps us debug
        scrub: true,
        onEnter: function() { console.log('onEnter'); },
        // onLeave; onEnterBack; onLeaveBack;
        onUpdate: function(event) { 
            console.log('onUpdate', event); 
        },
    } // adding a property (that is an object)
});  //second argument = how to animate, first arg = what to animate