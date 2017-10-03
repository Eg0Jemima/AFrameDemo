AFRAME.registerComponent('image-alert', {
      schema: {
          text: {type: 'string', default: ''},
          bgcolor: {type: 'string', default: ''},
          textcolor: {type: 'string', default:''},
          duration: {type: 'int', default: 0},
      },
      init: function () {
          // Do something when component first attached.
          var element = this.el;
          var roundUI = document.createElement("a-rounded");
          var text = document.createElement("a-text");
          var image = document.createElement("a-image");

          setAttributes(roundUI, {
              "height": "3",
              "width": "10",
              "color": this.data.bgcolor,
              "opacity": .8,
              "radius":"1",
              "position":"-5, -2.5, 0"
          });

          setAttributes(text, {
              "value": this.data.text,
              "height": "auto",
              "width": "auto",
              "color": this.data.textcolor,
              "opacity": 1,
              "align": "center",
              "scale": "6 5 0",
              //"geometry":"primitive:plane",
              "position":"6.25, 1.5, .1"
          });

          setAttributes(image, {
              "src": "#iconcl",
              "scale": "2, 1.14, 2",
              "position":"-3.25, -1, .1",
              "material": "alphaTest:0.5;"
          });

          roundUI.appendChild(text);
          element.appendChild(image);
          element.appendChild(roundUI);

          var coords = { opacity: 1 }; // Start at (0, 0)
          var tween = new TWEEN.Tween(coords) // Create a new tween that modifies 'coords'.
            .to({ opacity: 0 }, 1000) // Move to (300, 200) in 1 second.
            .easing(TWEEN.Easing.Quadratic.Out) // Use an easing function to make the animation smooth.
            .onUpdate(function() { // Called after tween.js updates 'coords'.
                // Move 'box' to the position described by 'coords' with a CSS translation.
                element.object3D.traverse(function (o) {
                  if (o.material) {
                    o.material.opacity = coords.opacity;
                  }
                });
          }).onComplete(endAnimation); // Start the tween immediately.

          element.addEventListener("click", function(){
              tween.start();
          });

          //if the user doesn't click in 5 seconds, make the welcome vanish
          setTimeout(function(){
              if(element){
                  tween.start();
              }
          }, 5000);

          function endAnimation(){
              console.log("The Animation has exited the building!");
              dismissElement(element);
          }
      }
  });
