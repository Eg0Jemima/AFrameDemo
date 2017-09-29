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
              "opacity": ".8",
              "radius":"1",
              "position":"-5, -2.5, 0"
          });

          setAttributes(text, {
              "value": this.data.text,
              "height": "auto",
              "width": "auto",
              "color": this.data.textcolor,
              "opacity": "1",
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

          element.addEventListener("click", function(){
              dismissElement(element);
          });
      }
  });
