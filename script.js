import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const radius = 5;
const numImages = 24;
const imageUrls = [];

const geometry = new THREE.BoxGeometry(1.5, 0.1, 2);
const materials = imageUrls.map(
  (url) =>
    new THREE.MeshBasicMaterial({ map: new THREE.TextureLoader().load(url) })
);
const group = new THREE.Group();

for (let i = 0; i < numImages; i++) {
  const material = materials[i % materials.length];
  const mesh = new THREE.Mesh(geometry, material);

  const angle = (i / numImages) * Math.PI * 4;
  const x = radius * Math.cos(angle);
  const z = radius * Math.sin(angle);

  mesh.position.set(x, 0, z);
  mesh.lookAt(new THREE.Vector3(0, 0, 0));

  group.add(mesh);
}

group.rotation.x = Math.PI * 4;
scene.add(group);

camera.position.set(0, 10, 0);
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableZoom = false;
controls.enablePan = false;

//controls.autoRotate = true; // Enable auto-rotation if desired
//controls.autoRotateSpeed = 0.5; // Adjust rotation speed

controls.minPolarAngle = Math.PI * 2;
controls.maxPolarAngle = Math.PI * 2;

controls.minAzimuthAngle = -Infinity;
controls.maxAzimuthAngle = Infinity;

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}
