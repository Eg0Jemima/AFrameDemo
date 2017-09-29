AFRAME.registerComponent('objectmenu', {
    schema: {
        layout: {type: 'string', default: 'bestfit'},
        selected: {type: 'string', default: ''}
    },

    init: function () {
        // Do something when component first attached.
        var element = this.el;
        var videoPlaying = false;
        var layout = this.data.layout;
        var selected = this.data.selected;
        var topofmenu = 0;
        var camera = element.sceneEl.querySelector("a-camera");
        var cameraPosition = camera.getAttribute("position");
        var cameraRotation = camera.getAttribute("rotation");
        var parent = element.parentEl;
        var list = ["Change Source", "Change Color", "Move Object","Video Controls"];

        //loop through 2D array to print menu as grid
        list.forEach(function(item, array){
            var text = document.createElement("a-text");
            setAttributes(text, {
                "value": item,
                "geometry": "primitive:plane",
                "width": "2",
                "height": "2",
                "align": "center",
                "wrapCount": 100
            });
            text.addEventListener("click", function(){
                console.log("You just clicked " + item);
                if(item === "Video Controls"){
                    if(!videoPlaying){
                      element.sceneEl.insertAdjacentHTML('beforeend','<a-entity id="curvedvideo" curvedvideo position="0 0 -3" scale=".75 .75 .75"></a-entity>');
                      videoPlaying = true;
                    }
                }
            });
            element.appendChild(text);
        });
        //Shared Element
        var sharedEl = document.querySelector(selected);
        var shared = sharedEl.cloneNode("true");

        //Back Button
        var back = document.createElement("a-text");
        setAttributes(back, {
            "value": "Main Menu",
            "geometry": "primitive:plane",
            "width": "2",
            "height": "2",
            "align": "center",
            "wrapCount": 5
        });
        back.addEventListener("click", function(){
              element.sceneEl.insertAdjacentHTML('beforeend','<a-entity id="gridmenu" gridmenu position="-3 2.5 0" rotation="0 90 0"></a-entity>');
              element.sceneEl.removeChild(parent);
        });

        //Dismiss Button
        var dismiss = document.createElement("a-text");
        setAttributes(dismiss, {
            "value": "Dismiss",
            "geometry": "primitive:plane",
            "width": "2",
            "height": "2",
            "align": "center",
            "wrapCount": 5
        });
        dismiss.addEventListener("click", function(){
            element.sceneEl.removeChild(parent);
        });

        setLayout();

        shared.setAttribute("position", {x:0, y:topofmenu, z:0});
        shared.setAttribute("rotation", "0 0 0");
        shared.setAttribute("scale", "1 1 1");
        shared.insertAdjacentHTML('beforeend','<a-animation attribute="rotation" dur="10000" fill="forwards" to="0 360 0" repeat="indefinite"></a-animation>');
        back.setAttribute("position", {x:-1, y:topofmenu, z:0});
        dismiss.setAttribute("position", {x:1, y:topofmenu, z:0});
        element.appendChild(shared);
        element.appendChild(back);
        element.appendChild(dismiss);

        //Animate menu locally from its wrapper object
        element.insertAdjacentHTML('beforeend','<a-animation attribute="scale" from="0 0 0" to=".5 .5 .5"></a-animation>');
        element.insertAdjacentHTML('beforeend','<a-animation attribute="position" to=".5 0 -2"></a-animation>');

        function setLayout(){
            //Set parent object position to users camera for relative adjustments
            parent.setAttribute("position", {x:cameraPosition.x, y:cameraPosition.y, z:cameraPosition.z});
            parent.setAttribute("rotation", {x:cameraRotation.x, y:cameraRotation.y, z:cameraRotation.z});

            var animRot = document.createElement("a-animation");
            var offsetY = cameraRotation.y - 15;
            if(cameraRotation.y < 0){
                cameraRotation + 30;
            }
            var rotTo = cameraRotation.x + " " + offsetY + " " + cameraRotation.z;
            var rotFrom = cameraRotation.x + " " + cameraRotation.y + " " + cameraRotation.z;
            animRot.setAttribute("to", rotTo);
            animRot.setAttribute("from", rotFrom);
            animRot.setAttribute("attribute", "rotation");
            parent.appendChild(animRot);

            //Push menu in front of user by 2
            element.setAttribute("position", {x:0, y:0, z:-2}); //need wrapper parent to push this forward locally

            switch (layout) {
                default:
                    //Default to 'bestfit'
                    var children = element.components.objectmenu.el.children;
                    var listLength = children.length;
                    var width = Math.round(Math.sqrt(listLength)); //x is not growing so will always be shorter
                    var ywidth = Math.ceil(listLength / width); //handles cases where the factors are not perfect example 30
                    topofmenu = ywidth;
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
//TODO make functions for layout and generating grid assets from list to be used in multiple components
