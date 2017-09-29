AFRAME.registerComponent('menuable', {
    init: function () {
        // Do something when component first attached.
        var element = this.el;
        element.addEventListener("click", function(){
            //Throw up object menu if it is not already up & the item has an id
            if(!document.querySelector("#objectmenu") && element.getAttribute("id")){
                var menuhtml = '<a-entity id="obmenuwrap"><a-entity id="objectmenu" objectmenu="selected: #' + element.getAttribute("id") + '"></a-entity></a-entity>';
                element.sceneEl.insertAdjacentHTML('beforeend', menuhtml);
            }
        });
    }
});
