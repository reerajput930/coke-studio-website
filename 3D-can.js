
import * as THREE from "./three.js-master/build/three.module.js";
import { GLTFLoader } from "./three.js-master/examples/jsm/loaders/GLTFLoader.js";


window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("coke3d");

  const w = container.clientWidth;
  const h = container.clientHeight;

  // scence created - space for 3d object --------
  const scene = new THREE.Scene();

  // camera created - for space and size -----------
  const camera = new THREE.PerspectiveCamera(45, w / h, 0.01, 1000);
  camera.position.set(0, 0, 3);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(w, h);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);


  // lightening code -----------------------
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


  const loader = new GLTFLoader();

  loader.load(
  "./3d_coke_can.glb",
  (gltf) => {
    const model = gltf.scene;
    scene.add(model);

    const box = new THREE.Box3().setFromObject(model);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    model.position.sub(center);

    camera.near = size / 100;
    camera.far = size * 100;
    camera.updateProjectionMatrix();

    camera.position.set(0, size * 0.1, size * 1.2);
    camera.lookAt(0, 0, 0);

    console.log("✅ GLB loaded");

    // ✅ THIS is what actually draws it once
    renderer.render(scene, camera);
    },
    undefined,
    (err) => {
      console.error("❌ GLB failed to load:", err);
    }
  );
});
