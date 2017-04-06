var camera, scene, renderer, raycaster;
var mesh;
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
raycaster = new THREE.Raycaster();


function init (){
    camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.z = 400;

    scene = new THREE.Scene();

    var texture = new THREE.ImageUtils.loadTexture("img/ball.jpg");
    var geometry = new THREE.SphereGeometry( 5, 20, 20 );
    var material = new THREE.MeshBasicMaterial({map:texture});
    mesh = new THREE.Mesh( geometry, material );
    mesh.position.x = -400;
    mesh.position.y = 5;
    mesh.position.z = 5;

    scene.add( mesh );
}

function fillBallWalls(num_walls) {
	/*var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );*/
	var geometry = new THREE.SphereBufferGeometry( 5, 32, 32 );
    for ( var i = 0; i < num_walls; i ++ ) {
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        var object = new THREE.Mesh( geometry,material) ;
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 800 - 400;
		/*object.position.z = Math.random() * 800 - 400;*/
		/*object.rotation.x = Math.random() * 2 * Math.PI;
		object.rotation.y = Math.random() * 2 * Math.PI;
	    object.rotation.z = Math.random() * 2 * Math.PI;
		*/
        var tmp = Math.random();
        object.scale.x = tmp * object.geometry.parameters.radius ;
		object.scale.y = tmp * object.geometry.parameters.radius ;
		object.scale.z = tmp * object.geometry.parameters.radius ;
		scene.add( object );
	}
}

function fillCubeWalls(num_walls) {
	var geometry = new THREE.BoxBufferGeometry( 20, 20, 20 );
    for ( var i = 0; i < num_walls; i ++ ) {
        var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} ); 
        var object = new THREE.Mesh( geometry,material) ;
		object.position.x = Math.random() * 800 - 400;
		object.position.y = Math.random() * 800 - 400;
		object.position.z = Math.random() * 800 - 400;
		/*object.rotation.x = Math.random() * 2 * Math.PI;
		object.rotation.y = Math.random() * 2 * Math.PI;
	    object.rotation.z = Math.random() * 2 * Math.PI;
		*/
        object.scale.x = Math.random() + 0.5;
		object.scale.y = Math.random() + 0.5;
		object.scale.z = Math.random() + 0.5;
        scene.add( object );
	}
	
}


var interval, radio;

function makeBallBigger(){
    radio = 5;
    var scale;
    clearInterval(interval);
    interval = setInterval(function (){
        if (mesh.geometry.parameters.radius >= 200){
            stop();
        }
        mesh.geometry.parameters.radius = radio;
        scale = radio * 0.1;
        mesh.scale.x = scale;
        mesh.scale.y = scale;
        mesh.scale.z = scale;
        //mesh.scale.multiplyScalar(1.025);
        radio+=0.1;
    }, 20);
}

function stop (){
	clearInterval(interval);
}

function render() {
    requestAnimationFrame (render);
    renderer.render(scene, camera);
}

init();
fillBallWalls(20);
render();