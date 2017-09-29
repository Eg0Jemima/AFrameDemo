AFRAME.registerComponent('cursor-scale', {
    schema: {
        to: {default: '2.5 2.5 2.5'}
    },
    init: function () {
        // Do something when component first attached.
        var data = this.data;

        var mouseEnterAnim = document.createElement("a-animation");
        var mouseLeaveAnim = document.createElement("a-animation");
        var clickAnim = document.createElement("a-animation");

        mouseEnterAnim.setAttribute("attribute", "scale");
        mouseEnterAnim.setAttribute("begin", "mouseenter");
        mouseEnterAnim.setAttribute("dur", "100");
        mouseEnterAnim.setAttribute("to", "2.5 2.5 2.5");

        mouseLeaveAnim.setAttribute("attribute", "scale");
        mouseLeaveAnim.setAttribute("begin", "mouseleave");
        mouseLeaveAnim.setAttribute("dur", "300");
        mouseLeaveAnim.setAttribute("to", "1 1 1");

        clickAnim.setAttribute("attribute", "rotation");
        clickAnim.setAttribute("begin", "click");
        clickAnim.setAttribute("dur", "2000");
        clickAnim.setAttribute("to", "360 405 45");

        console.log(mouseEnterAnim);
        console.log(this.el);

        this.el.appendChild(mouseEnterAnim);
        this.el.appendChild(mouseLeaveAnim);
        this.el.appendChild(clickAnim);


        /*this.el.addEventListener("mouseenter", function(){
            this.setAttribute("scale", data.to);
        });
        this.el.addEventListener("mouseleave", function(){
            this.setAttribute("scale", data.default);
        }); */
    }
});
