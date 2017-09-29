AFRAME.registerComponent('avatar', {
    schema: {
        event: {type: 'string', default: ''},
        message: {type: 'string', default: 'Hello, World!'}
    },

    init: function () {
        // Do something when component first attached.
        loader = new THREE.JSONLoader();
        loader.load( 'https://ucarecdn.com/b229522f-bde3-49d4-bd0f-5b6313bb593f/', addModel );
        var mesh;
        var group;
        function addModel(geometry,  materials){
            materials[0].skinning = true;

            //var cs = scaleVal * Math.random();

            var avatar = new THREE.SkinnedMesh( geometry, new THREE.MultiMaterial(materials) );
            //set[i].position.set(Math.random()*250,Math.random()*250,Math.random()*250);
            //set[i].scale.set (cs, cs, cs);
            avatar.castShadow = true;
            avatar.receiveShadow = true;

            //scene.add(set[i]);
            //helpset[i] = new THREE.SkeletonHelper(set[i]);
            //scene.add(helpset[i]);
            mesh = new THREE.Mesh(avatar.geometry, avatar.materials);
            group = new THREE.Object3D();//create an empty container
            group.add( mesh );//add a mesh with geometry to it
        }

        this.el.setObject3D("mesh", group)
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

/*AFRAME.registerComponent('bluemat', {
    multiple: true,

    init: function (){
        var textureLoader = new THREE.TextureLoader();
        var texture = textureLoader.load( 'https://ucarecdn.com/368ba9a7-d6ad-4bee-ac49-b76f315000e3/' );
        var material = new THREE.MeshBasicMaterial({ map: texture });
        var geometry = this.el.getObject3D('mesh');
        this.el.setObject3D('mesh', new THREE.Mesh(geometry, material));
    },

    remove: function(){
        this.el.removeObject3D('mesh');
    }

});*/
