import * as  THREE from "three"
import { GLTFLoader } from "three/examples/jsm/Addons.js"

let model;   // 👈 global reference

// basic - scene , camera , render and appending child -------------------- 
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ alpha: true }); //did alpha true for transparent canva
// this is the size of the body (parent in which our 3d modell will be integrated)
// const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1,1000);

// renderer.setSize(window.innerWidth,window.innerHeight);
// document.body.appendChild(renderer.domElement);
renderer.setClearColor(0x000000, 0); // transparent

// using div as canva parent
const container = document.getElementById("coke3d");
const w = container.clientWidth;
const h = container.clientHeight;
const camera = new THREE.PerspectiveCamera(75,w/h, 0.1,1000);
renderer.setSize(w, h);

container.appendChild(renderer.domElement);

//-------------------------------------------------------------------------------


//  need color style ----------------------------------------------------
// brighter base light
scene.add(new THREE.AmbientLight(0xffffff, 1.5));

// main front light (logo light)
const keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
keyLight.position.set(0, 3, 6);
scene.add(keyLight);

// left fill (soft)
const fillL = new THREE.DirectionalLight(0xffffff, 2.4);
fillL.position.set(-3, 2, 4);
scene.add(fillL);

// right fill (soft)
const fillR = new THREE.DirectionalLight(0xffffff, 2.4);
fillR.position.set(3, 2, 4);
scene.add(fillR);

// rim light (edge highlight)
const rimLight = new THREE.DirectionalLight(0xffffff, 2.5);
rimLight.position.set(0, 4, -6);
scene.add(rimLight);

//-------------------------------------------------------------------

//camera angle ------------------------------------
/*
X → left (-)  | right (+)
Y → down (-)  | up (+)
Z → back (+)  | forward (-)

*/
camera.position.set(0, 0, 1);
//---------------------------------------------------


// loader usage for loading 3d models
const loader = new GLTFLoader()
loader.load('./3d_coke_can.glb',function(gltf){
  model = gltf.scene

//  scale (size)
model.scale.set(6, 6 ,6);
//-----------------

// rotation
//  model.rotation.x += 0.1;
//  model.rotation.y += 40.01;
 //---------------

//  position
/*
X → left (-)  / right (+)
Y → down (-)  / up (+)
Z → back (-)  / forward (+)
*/
model.position.set(0, -.3, 0); 
//--------------------------------

 scene.add(gltf.scene);
 console.log("working model");

},undefined,function(error){
    console.error(error);
    console.error("wronge")
});



// needed to render 
// function animate(){

//     renderer.render(scene,camera);
// }
// renderer.setAnimationLoop(animate);


function animate() {
  console.log("1")
    if (!model) return;
    
    
    // common rotation
    // model.rotation.x += 0.01;
    
    if (currentBlock === 1) {
      
    model.scale.set(4, 4, 4);
    model.rotation.y += 0.01;
    model.position.set(0, 0, 0);
  }

  if (currentBlock === 2) {
    model.scale.set(5, 5, 5);
    model.rotation.y += 0.012;
    model.position.set(0, 0, 0);
  }

  if (currentBlock === 3) {
    model.scale.set(3, 3, 3);
    model.rotation.y += 0.015;
    model.position.set(0, 0, 0);
  }

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);