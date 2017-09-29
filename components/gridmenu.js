AFRAME.registerComponent('gridmenu', {
    schema: {
        layout: {type: 'string', default: 'bestfit'},
    },

    init: function () {
        // Do something when component first attached.
        var element = this.el;
        var videoPlaying = false;
        var layout = this.data.layout;
        var list = ["Return to Lobby", "Change Ownership", "Place Objects","Mute Self"];
        console.log("The layout of this grid = " + layout);

        //loop through 2D array to print menu as grid
        list.forEach(function(item, array){
            var text = document.createElement("a-text");
            setAttributes(text, {
                "value": item,
                "stretchable": "",
                "grabbable": "",
                "geometry": "primitive:plane",
                "width": "2",
                "height": "2",
                "align": "center",
                "wrapCount": 5
            });
            /*text.addEventListener("click", function(){
                if(item === "Change Ownership"){
                    element.sceneEl.insertAdjacentHTML('beforeend','<a-entity id="objectmenu" objectmenu position="-3 2.5 0" rotation="0 90 0"></a-entity>');
                    element.sceneEl.removeChild(element);
                }
            });*/
            element.appendChild(text);
        });

        setLayout();

        function setLayout(){
            switch (layout) {
                default:
                    //Default to 'bestfit'
                    var children = element.components.gridmenu.el.children;
                    var listLength = children.length;
                    var width = Math.round(Math.sqrt(listLength)); //x is not growing so will always be shorter
                    var ywidth = Math.ceil(listLength / width); //handles cases where the factors are not perfect example 30
                    console.log(width);

                    var xoff = width / 2 + .5; //starting point is an offset of half the width of the grid + .5 for center multiplied by -1
                    var yoff = ywidth / 2 + .5;

                    for(i = 0; i < listLength; i++){
                        var child = children[i];
                        var x = i % width + 1; //adding one makes it go from 1 - 4 instead of 0 to 1 to avoid 0 division
                        var y = Math.floor(i / width) + 1; //adding one makes it go from 1 - 4 instead of 0 to 1 to avoid 0 division
                        console.log(x + ", " + y);
                        child.setAttribute("position", {x:(x - xoff), y:(y - yoff), z:0});
                        console.log(child.components.position);
                    }
                    break;
            }
        }
    }
});
