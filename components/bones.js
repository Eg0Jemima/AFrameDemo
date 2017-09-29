var mybone;
var start = false;

AFRAME.registerComponent('bones', {
    init: function () {
        // Do something when component first attached.
        var source = this.el;
        console.log(source.object3D);

        source.addEventListener("loaded", function(source){
            var jsonmodel;
            jsonmodel = source.target.components["json-model"];
            console.log(jsonmodel);
            console.log("loaded call");

            //Hack - Wait 5 seconds before grabbing model reference due to loading lifecycle issues
            window.setTimeout(function(){
                start = true;
                console.log(jsonmodel.model.skeleton.bones[4]);
                mybone = jsonmodel.model.skeleton.bones[4];
                console.log("My Bone = " + mybone);
            }, 5000);
        });
    },
    update: function () {
        // Do something when component's data is updated.
    },
    remove: function () {
        // Do something the component or its entity is detached.
    },
    tick: function (time, timeDelta) {
        // Do something on every scene tick or frame.
        if(start){
            //mybone.position.y += 0.001;
        }
    }
});
