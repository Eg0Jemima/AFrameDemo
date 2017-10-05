var scene = document.querySelector("a-scene");
var list = [];
var count = 0;
var max = 3;

document.addEventListener("DOMContentLoaded", function(event) {
   scene = document.querySelector("a-scene");

   // Listen for the event.
   document.addEventListener('notificationAdded', function () {
       //remove first element from list so it cannot surpass max
       if(list.length > max){
           list.shift();
           //console.log(list);
       }

       for (let i = 0; i < list.length; i++) {
           console.log(list[i]);
           switch(i){
               case 0:
                   if(list.length == 1){
                       list[i].setAttribute("position", {x: 0, y: .0215, z: -.05});
                   } else {
                       list[i].setAttribute("position", {x: 0, y: .04, z: -.06});
                   }
                   break;
               case 1:
                   list[i].setAttribute("position", {x: 0, y: .0215, z: -.05});
                   break;
               case 2:
                   list[i].setAttribute("position", {x: 0, y: .01, z: -.06});
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
        list.push(addNotification());
        console.log(list);

        // Dispatch the event.
        document.dispatchEvent(new Event('notificationAdded'));
    }
});

function addNotification(){
    count++;
    let notification = document.createElement("a-entity");
    let val = "This is notification " + count;
    setAttributes(notification, {
        "notification": "text:" + val,
        "position": {x: 0, y: .025, z: -.05},
        "scale": {x: .004, y: .004, z: .004}
    });

    return notification;
}



// If count > max then call removeNotification of that element
//Add reference as child to scene camera
