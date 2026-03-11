let scene, camera, renderer, controls;

let corps, logo;

init();
animate();

function init(){

const viewer = document.getElementById("viewer");

scene = new THREE.Scene();
const axesHelper = new THREE.AxesHelper(50);
scene.add(axesHelper);

scene.background = new THREE.Color(0xeeeeee);


// camera

camera = new THREE.PerspectiveCamera(
75,
viewer.clientWidth/viewer.clientHeight,
0.1,
1000
);

camera.position.set(0,20,120);


// renderer

renderer = new THREE.WebGLRenderer({antialias:true});

renderer.setSize(viewer.clientWidth,viewer.clientHeight);

viewer.appendChild(renderer.domElement);


// lumières

const light1 = new THREE.DirectionalLight(0xffffff,1);
light1.position.set(50,50,50);

scene.add(light1);

const ambient = new THREE.AmbientLight(0xffffff,0.6);

scene.add(ambient);


// controles souris

controls = new THREE.OrbitControls(camera,renderer.domElement);

controls.enableZoom = true;
controls.enablePan = false;
controls.enableDamping = true;


// loader STL

const loader = new THREE.STLLoader();


// corps

loader.load("piece_corps.STL",function(geometry) {

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


// logo

loader.load("piece_logo.STL",function(geometry){

geometry.computeVertexNormals();

let material = new THREE.MeshStandardMaterial({
color:0xffffff,
roughness:0.5
});

logo = new THREE.Mesh(geometry,material);

geometry.center();

logo.scale.set(0.7,0.7,0.7);

// déplacer la pièce
logo.position.set(0,0,5);

// rotation
logo.rotation.set(0,0,0);

scene.add(logo);

});

}


// animation

function animate(){

requestAnimationFrame(animate);

controls.update();

renderer.render(scene,camera);

}


// couleurs

const colors = document.querySelectorAll(".color");

colors.forEach(color=>{

color.addEventListener("click",()=>{

const c = color.dataset.color;

const zone = document.querySelector("input[name='zone']:checked").value;

if(zone==="corps" && corps){
corps.material.color.set(c);
}

if(zone==="logo" && logo){
logo.material.color.set(c);
}

});

});


// export image

function exportImage(){

const link = document.createElement("a");

link.download = "config.png";

link.href = renderer.domElement.toDataURL();

link.click();


}









