let scene,camera,renderer,controls;

init();
animate();

function init(){

const viewer = document.getElementById("viewer");

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
75,
viewer.clientWidth/viewer.clientHeight,
0.1,
1000
);

camera.position.set(0,20,120);

renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(viewer.clientWidth,viewer.clientHeight);

viewer.appendChild(renderer.domElement);

const light1 = new THREE.DirectionalLight(0xffffff,1);
light1.position.set(50,50,50);
scene.add(light1);

const ambient = new THREE.AmbientLight(0xffffff,0.5);
scene.add(ambient);

controls = new THREE.OrbitControls(camera,renderer.domElement);

const loader = new THREE.STLLoader();


loader.load("piece_corps.STL",function(g){

let m = new THREE.MeshStandardMaterial({color:0x7a00ff});
let mesh = new THREE.Mesh(g,m);

g.center();

scene.add(mesh);

});


loader.load("piece_logo.STL",function(g){

let m = new THREE.MeshStandardMaterial({color:0xffffff});
let mesh = new THREE.Mesh(g,m);

g.center();

scene.add(mesh);

});


loader.load("piece_contour.STL",function(g){

let m = new THREE.MeshStandardMaterial({color:0x000000});
let mesh = new THREE.Mesh(g,m);

g.center();

scene.add(mesh);

});

}


function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}
