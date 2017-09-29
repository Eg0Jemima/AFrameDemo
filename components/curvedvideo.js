AFRAME.registerComponent('curvedvideo', {
    init: function () {
        // Do something when component first attached.
        var front = document.createElement("a-curvedimage");
        var back = document.createElement("a-curvedimage");

        setAttributes(front, {
            //"src": "#xvr",
            "src": "https://ucarecdn.com/40817a04-ea96-415e-8cf4-cca1b144711f/",
            "height": "3.0",
            "theta-start": "144",
            "theta-length": 100,
            "rotation": "0 0 0",
            "material": "side:single; repeat:1 1",
            "scale": "-2 0.8 0.8",
            "position": "0 1 0",
            "stretchable": "",
            "grabbable": ""
        });

        setAttributes(back, {
            "src": "https://ucarecdn.com/4130c599-445f-4e76-9052-49978e972641/",
            //"src": "#paris",
            "height": "3.0",
            "theta-start": "144",
            "theta-length": 100,
            "rotation": "0 0 0",
            "material": "side:single; repeat:1 1",
            "scale": "2 0.8 0.8",
            "position": "0 1 0",
            "stretchable": "",
            "grabbable": ""
        });

        this.el.appendChild(front);
        this.el.appendChild(back);
    }
});
