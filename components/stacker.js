var list = [];
var count = 0;
var max = 3;

function fadeOutOpacity(element){
    var alpha = { opacity: 1 }; // Start at (0, 0)
    var tween = new TWEEN.Tween(alpha) // Create a new tween that modifies 'coords'.
      .to({ opacity: 0 }, 1000) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(function() { // Called after tween.js updates 'coords'.
          // Move 'box' to the position described by 'coords' with a CSS translation.
          element.object3D.traverse(function (o) {
            if (o.material) {
              o.material.opacity = alpha.opacity;
            }
          });
    }).start().onComplete(() => endAnimation(element));
}

function fadeInOpacity(element){
    var alpha = { opacity: 0 }; // Start at (0, 0)
    var tween = new TWEEN.Tween(alpha) // Create a new tween that modifies 'coords'.
      .to({ opacity: 1 }, 1000) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(function() { // Called after tween.js updates 'coords'.
          // Move 'box' to the position described by 'coords' with a CSS translation.
          element.object3D.traverse(function (o) {
            if (o.material) {
              o.material.opacity = alpha.opacity;
            }
          });
    }).start();
}

function animatePosition(element, position, target){
    var tween = new TWEEN.Tween(position) // Create a new tween that modifies 'coords'.
      .to(target, 1000) // Move to (300, 200) in 1 second.
      .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
      .onUpdate(function() { // Called after tween.js updates 'coords'.
          // Move 'box' to the position described by 'coords' with a CSS translation.
          element.setAttribute("position", position.x + " " + position.y + " " + position.z);
    }).start();
}

document.addEventListener("DOMContentLoaded", function(event) {
   // Listen for the event.
   document.addEventListener('notificationAdded', function () {
       var scene = document.querySelector("a-scene");
       var offPosition = {x: 0, y: .079, z: -.08};
       var topPosition = {x: 0, y: .051, z: -.07};
       var midPosition = {x: 0, y: .032, z: -.06};
       var lowPosition = {x: 0, y: .015, z: -.05};

       //remove first element from list so it cannot surpass max
       if(list.length > max){
           //Animate the oldest notification off the screen to leave room for latest
           fadeOutOpacity(list[0]);
           animatePosition(list[0], list[0].object3D.position, offPosition);
           list.shift();
       }

       //Only append the last item. Works like a charm!
       scene.camera.el.appendChild(list[list.length - 1]);
       list[list.length - 1].object3D.position.set(0, 0, -.06);

       for (let i = 0; i < list.length; i++) {
           switch(i){
               case 0:
                   if(list.length == 1){
                       //list[i].setAttribute("position", {x: 0, y: .0215, z: -.05});
                       animatePosition(list[i], list[i].object3D.position, lowPosition);
                   } else if(list.length == 2) {
                       animatePosition(list[i], list[i].object3D.position, midPosition);
                   } else {
                       //list[i].setAttribute("position", {x: 0, y: .04, z: -.06});
                       animatePosition(list[i], list[i].object3D.position, topPosition);
                   }
                   break;
               case 1:
                    if(list.length == 2){
                        animatePosition(list[i], list[i].object3D.position, lowPosition);
                    } else {
                        animatePosition(list[i], list[i].object3D.position, midPosition);
                    }
                   //list[i].setAttribute("position", {x: 0, y: .0215, z: -.05});
                   //fadeOutOpacity(list[i]);
                   break;
               case 2:
                   //list[i].setAttribute("position", {x: 0, y: .01, z: -.06});
                   animatePosition(list[i], list[i].object3D.position, lowPosition);
                   fadeInOpacity(list[i]);
                   break;
               default:
                   break;
           }
       }
   });
});

document.addEventListener("keypress", function(e){
    console.log(e);
    if(e.charCode == 110){
        list.push(addNotification());

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
    setTimeout(() => notifTimeout(notification), 5000);

    return notification;
}

//if the user doesn't click in 5 seconds, make the welcome vanish
function notifTimeout(element){
    if(element){
        fadeOutOpacity(element);
    }
};

function endAnimation(element){
    if(element.parentEl){
        element.parentEl.removeChild(element);
    }
}

//will come in handy for forced timeouts
function removeNotification(){
    clearTimeout(timeout);
    tween.start();
}
