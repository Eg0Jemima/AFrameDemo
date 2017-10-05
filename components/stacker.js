var scene = document.querySelector("a-scene");
var list = [];
var count = 0;

document.addEventListener("DOMContentLoaded", function(event) {
   scene = document.querySelector("a-scene");

   // Listen for the event.
   document.addEventListener('notificationAdded', function () {
       for (let i = 0; i < list.length; i++) {
           console.log(list[i]);
           switch(i){
               case 0:
                   list[i].setAttribute("position", {x: 0, y: .05, z: -.06});
                   break;
               case 1:
                   break;
               case 2:
                   list[i].setAttribute("position", {x: 0, y: .03, z: -.06});
                   break;
               default:
                   break;
           }
           scene.camera.el.appendChild(list[i]);
       }
   });
});

document.addEventListener("keypress", function(e){
    console.log(e);
    if(e.charCode == 110){
        list.push(addNotification(1));
        console.log(list);
        
        // Dispatch the event.
        document.dispatchEvent(new Event('notificationAdded'));
    }
});

function addNotification(count){
    let notification = document.createElement("a-entity");
    let val = "This is notification " + count;
    setAttributes(notification, {
        "notification": "text:" + val,
        "position": {x: 0, y: .035, z: -.05},
        "scale": {x: .004, y: .004, z: .004}
    });

    return notification;
}



// If count > max then call removeNotification of that element
//Add reference as child to scene camera
