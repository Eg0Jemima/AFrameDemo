AFRAME.registerComponent('many-cube', {
    schema: {
        event: {type: 'string', default: ''},
        message: {type: 'string', default: 'Hello, World!'}
    },
    init: function () {
        //Unable to get this to work using loader but keeping code for this type of texturing for reference
        /*var loader = new THREE.CubeTextureLoader();
        loader.setPath('./images/');

        var textureCube = loader.load( [
            'posx.jpg', 'negx.jpg',
            'posy.jpg', 'negy.jpg',
            'posz.jpg', 'negz.jpg'
        ] );

        var material = new THREE.MeshFaceMaterial( { color: 0xffffff, envMap: textureCube } );*/

        var textureLoader = new THREE.TextureLoader();

        var texture0 = textureLoader.load( 'https://ucarecdn.com/d8459766-0eeb-4fac-b605-091aa4f5171c/' );
        var texture1 = textureLoader.load( 'https://ucarecdn.com/3e1feafb-efcf-4f38-8585-0affc8dcacca/' );
        var texture2 = textureLoader.load( 'https://ucarecdn.com/eac38c24-92a5-4e70-8c5a-9c53db2248ec/' );
        var texture3 = textureLoader.load( 'https://ucarecdn.com/3a94eef7-1436-48d7-a878-a78cb2e1fa67/' );
        var texture4 = textureLoader.load( 'https://ucarecdn.com/4f3972b5-66ca-4579-99e3-ae984c9d91ce/' );
        var texture5 = textureLoader.load( 'https://ucarecdn.com/0e1a6433-4961-47d9-99ea-d90230bcf3e6/' );

        var materials = [
            new THREE.MeshBasicMaterial( { map: texture0 } ),
            new THREE.MeshBasicMaterial( { map: texture1 } ),
            new THREE.MeshBasicMaterial( { map: texture2 } ),
            new THREE.MeshBasicMaterial( { map: texture3 } ),
            new THREE.MeshBasicMaterial( { map: texture4 } ),
            new THREE.MeshBasicMaterial( { map: texture5 } )
        ];

        var material = new THREE.MultiMaterial( materials );

        /* Example of transparent textures and coloring
        var cubeMaterials = [
            new THREE.MeshBasicMaterial({color:0x33AA55, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x55CC00, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x000000, transparent:true, opacity:0.2, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0xFF0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0xFF0000, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
            new THREE.MeshBasicMaterial({color:0x5555AA, transparent:true, opacity:0.8, side: THREE.DoubleSide}),
        ];*/

        // Create a MeshFaceMaterial, which allows the cube to have different materials on each face
        //var material = new THREE.MeshFaceMaterial(cubeMaterials);

        var geometry = new THREE.CubeGeometry( .5, .5, .5 );

        var mesh = new THREE.Mesh( geometry, material );
        this.el.setObject3D("mesh", mesh);
    },
    update: function () {
        // Do something when component's data is updated.
    },
    remove: function () {
        // Do something the component or its entity is detached.
    },
    tick: function (time, timeDelta) {
        // Do something on every scene tick or frame.
    }
});
