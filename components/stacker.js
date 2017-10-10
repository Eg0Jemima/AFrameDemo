var list = [];
var count = 0;
var max = 3;
var stacker = document.createElement("a-entity");

function fadeOutOpacity(element){
    var alpha = { opacity: 1 };
    var tween = new TWEEN.Tween(alpha)
      .to({ opacity: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function() {
          element.object3D.traverse(function (o) {
            if (o.material) {
              o.material.opacity = alpha.opacity;
            }
          });
    }).start().onComplete(() => endAnimation(element));
}

function fadeInOpacity(element){
    var alpha = { opacity: 0 };
    var tween = new TWEEN.Tween(alpha)
      .to({ opacity: 1 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function() {
          element.object3D.traverse(function (o) {
            if (o.material) {
              o.material.opacity = alpha.opacity;
            }
          });
    }).start();
}

function animatePosition(element, position, target){
    var tween = new TWEEN.Tween(position)
      .to(target, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(function() {
          element.setAttribute("position", position.x + " " + position.y + " " + position.z);
    }).start();
}

document.addEventListener("DOMContentLoaded", function(event) {
    var camera = document.querySelector("a-camera");
    stacker.setAttribute("position", "0 -.25 -.4");
    camera.appendChild(stacker);

   // Listen for the event.
   document.addEventListener('notificationAdded', function () {
       var offPosition = {x: 0.2, y: 1.5, z: -.4};
       var topPosition = {x: 0.16, y: .7, z: -.3};
       var midPosition = {x: 0.12, y: .5, z: -.2};
       var lowPosition = {x: 0.08, y: .3, z: -.1};

       //remove first element from list so it cannot surpass max
       if(list.length > max){
           //Animate the oldest notification off the screen to leave room for latest
           animatePosition(list[0], list[0].object3D.position, offPosition);
           list.shift();
       }

       //Only append the last item. Works like a charm!
       stacker.appendChild(list[list.length - 1]);
       list[list.length - 1].object3D.position.set(.1, 0, 0);

       for (let i = 0; i < list.length; i++) {
           switch(i){
               case 0:
                   if(list.length == 1){
                       animatePosition(list[i], list[i].object3D.position, lowPosition);
                   } else if(list.length == 2) {
                       animatePosition(list[i], list[i].object3D.position, midPosition);
                   } else {
                       animatePosition(list[i], list[i].object3D.position, topPosition);
                   }
                   break;
               case 1:
                    if(list.length == 2){
                        animatePosition(list[i], list[i].object3D.position, lowPosition);
                    } else {
                        animatePosition(list[i], list[i].object3D.position, midPosition);
                    }
                   break;
               case 2:
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
        "position": {x: .04, y: .2, z: 0},
        "rotation": {x: 10, y: -15, z: 0},
        "scale": {x: .04, y: .04, z: .04}
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
