
// Variables
var groundX = 100;
var groundY = 2;
var groundZ = 100;
var nBalls = 30;
var ballMinRadius = 1;
var ballMaxRadius = 3;
var happyBallRadius = 1;
var happyBall = null;
var balls = [];

// Basic settings
var renderer = new THREE.WebGLRenderer({ alpha: true });
var scene = new THREE.Scene();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// Cameras
var currentCamera = 'orbital';
var cameras = {};
cameras.orbital = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
cameras.global = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 1, 1000 );
cameras.orbital.position.y = Math.max(groundX, groundZ);
cameras.global.position.y = Math.max(groundX, groundZ);
cameras.orbital.lookAt(new THREE.Vector3(0, 0, 0));
cameras.global.lookAt(new THREE.Vector3(0, 0, 0));
var controls = new THREE.OrbitControls(cameras.orbital);

// Ground
var ground = new THREE.Mesh(
    new THREE.BoxGeometry( groundX, groundY, groundZ ),
    new THREE.MeshBasicMaterial({
        map: new THREE.ImageUtils.loadTexture('img/ground.jpg')
    })
);

// Generate balls
for ( var i = 0; i < 30; i ++ ) {
    var ballRadius = Math.random()*ballMaxRadius + ballMinRadius;
    var ball = new THREE.Mesh(
        new THREE.SphereGeometry( ballRadius, 32, 32 ),
        new THREE.MeshBasicMaterial({
            map: new THREE.ImageUtils.loadTexture('img/rock.jpg')
        })
    );
    ball.position.x = Math.round(Math.random()*groundX) - groundX/2;
    ball.position.y = ballRadius/2 + groundY;
    ball.position.z = Math.round(Math.random()*groundZ) - groundZ/2;
    scene.add( ball );
    balls.push(ball);
}


// Detect collision
function detectCollision () {
    for (var i=0; i<balls.length; i++) {
        var ballDistance = Math.sqrt(
            Math.pow(happyBall.position.x-balls[i].position.x, 2) +
            Math.pow(happyBall.position.z-balls[i].position.z, 2)
        )
        var radiusSum = happyBall.geometry.parameters.radius - balls[i].geometry.parameters.radius;
        if (radiusSum>=ballDistance) {
            return true;
        }
    }
    return false;
}


// Init happy ball
happyBall = new THREE.Mesh(
    new THREE.SphereGeometry( happyBallRadius, 32, 32 ),
    new THREE.MeshBasicMaterial({
        color: 0xee2323
    })
);
happyBall.position.z = groundZ/-2;
happyBall.position.y = happyBallRadius/2 + groundY;
while( detectCollision() ) {
    happyBall.position.x = Math.random()*groundX - groundX/2;
}


// Move ball
window.addEventListener('deviceorientation', function (event) {
    var absolute = event.absolute;
    var alpha    = event.alpha;
    var beta     = event.beta;
    var gamma    = event.gamma;
    happyBall.position.z = Math.max( Math.min(happyBall.position.z + beta*0.05, groundX/2), groundX/-2);
    happyBall.position.x = Math.max( Math.min(happyBall.position.x + gamma*0.05, groundZ/2), groundZ/-2);

    if (detectCollision()) {
        alert('You lose!')
    } 
});


// Update ball size
setInterval(function () {
    happyBallRadius += 0.05;
    happyBall.geometry.parameters.radius = happyBallRadius;
    happyBall.scale.x += 0.05;
    happyBall.scale.y += 0.05;
    happyBall.scale.z += 0.05;
}, 150)


// Add base objects
scene.add(happyBall);
scene.add(cameras.orbital);
scene.add(cameras.global);
scene.add(ground);

// Render
function render() {
    requestAnimationFrame (render);
    renderer.render(scene, cameras[currentCamera]);
}
render();