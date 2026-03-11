let scene, camera, renderer, controls;

let corps, logo, contour;

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

const ambient = new THREE.AmbientLight(0xffffff,0.6);

scene.add(ambient);


controls = new THREE.OrbitControls(camera,renderer.domElement);

controls.enableZoom = true;

const loader = new THREE.STLLoader();


loader.load("piece_corps.STL",function(geometry){

geometry.computeVertexNormals();

let material = new THREE.MeshStandardMaterial({
color:0x7a00ff,
roughness:0.5
});

corps = new THREE.Mesh(geometry,material);

geometry.center();

corps.scale.set(0.7,0.7,0.7);

scene.add(corps);

});


loader.load("piece_logo.STL",function(geometry){

geometry.computeVertexNormals();

let material = new THREE.MeshStandardMaterial({
color:0xffffff
});

logo = new THREE.Mesh(geometry,material);

geometry.center();

logo.scale.set(0.7,0.7,0.7);

scene.add(logo);

});


loader.load("piece_contour.STL",function(geometry){

geometry.computeVertexNormals();

let material = new THREE.MeshStandardMaterial({
color:0x000000
});

contour = new THREE.Mesh(geometry,material);

geometry.center();

contour.scale.set(0.7,0.7,0.7);

scene.add(contour);

});

}


function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}


const colors = document.querySelectorAll(".color");

colors.forEach(color=>{

color.addEventListener("click",()=>{

const c = color.dataset.color;

if(corps){
corps.material.color.set(c);
}

});

});
