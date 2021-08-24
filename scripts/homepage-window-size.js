
// var previousWidth = $(window).previousWidth();
console.log("oout")


    $(window).resize(function() {
        let currentWidth = $(window).width();
        let threshold = 641;
        console.log("in")
        if (currentWidth >= threshold) {
            console.log("getting bigger")
            console.log(currentWidth)
            $("#bottomfooter").css("display", "none");
        }
        else {

            $("#bottomfooter").css("display", "flex");
        };

        
    })
