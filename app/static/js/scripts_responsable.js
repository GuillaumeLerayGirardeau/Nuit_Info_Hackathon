import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const iw = window.innerWidth;
const ih = window.innerHeight;
const viewer = document.getElementById("viewer_stl");
const viewerdemo = document.getElementById("viewer_demo");

// Créer une scène qui contiendra tous les éléments à afficher
const scene = new THREE.Scene();
const scenedemo = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(70, viewer.clientWidth/viewer.clientHeight, 0.1, 1000);
camera.position.set(0, 0, 10);
const camerademo = new THREE.PerspectiveCamera(70, viewer.clientWidth/viewer.clientHeight, 0.1, 1000);
camerademo.position.set(0, 0, 10);

// Ajoute une lumière
const light = new THREE.PointLight(0xeeeeee, 5000);
light.position.set(0, 0, 100);
const lightdemo = new THREE.PointLight(0xeeeeee, 5000);
lightdemo.position.set(0, 0, 100);
scene.add(light);
scenedemo.add(lightdemo);

const ambientLight = new THREE.AmbientLight(0x404040, 8);
const ambientLightdemo = new THREE.AmbientLight(0x404040, 8);
scene.add(ambientLight);
scenedemo.add(ambientLightdemo);

// Créer le moteur de rendu
const renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(viewer.clientWidth, viewer.clientHeight);
viewer.appendChild(renderer.domElement);

const rendererdemo = new THREE.WebGLRenderer({antialias: true});
rendererdemo.setSize(viewer.clientWidth, viewer.clientHeight);
viewerdemo.appendChild(rendererdemo.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
const controlsdemo = new OrbitControls(camerademo, rendererdemo.domElement);

// importe objet demo
const loader = new STLLoader();
loader.load('/static/stl_file/monkey.stl', (geometry) => {
    //const text = new THREE.TextureLoader().load('/stl_file/cat_text.jpg');
    const material = new THREE.MeshStandardMaterial({color: 0xffffffff});
    const monkey_mesh = new THREE.Mesh(geometry, material);

    monkey_mesh.scale.set(3, 3, 3);
    monkey_mesh.position.set(0, 0, 0);
    monkey_mesh.rotation.x += 80;

    scenedemo.add(monkey_mesh)
})

// Animation
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  controlsdemo.update
  renderer.render(scene, camera);
  rendererdemo.render(scenedemo, camerademo);
}
animate();

// Compute Volume
function computeVolume(geometry) {
  const position = geometry.attributes.position;
  let volume = 0;

  for (let i = 0; i < position.count; i += 3) {
    const ax = position.getX(i);
    const ay = position.getY(i);
    const az = position.getZ(i);

    const bx = position.getX(i + 1);
    const by = position.getY(i + 1);
    const bz = position.getZ(i + 1);

    const cx = position.getX(i + 2);
    const cy = position.getY(i + 2);
    const cz = position.getZ(i + 2);

    volume += (ax * (by * cz - bz * cy) -
               ay * (bx * cz - bz * cx) +
               az * (bx * cy - by * cx)) / 6.0;
  }

  return Math.abs(volume);
}

// importe l'objet 3D 
document.getElementById('stl_file').addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const arrayBuffer = await file.arrayBuffer();
    const loader = new STLLoader();
    const geometry = loader.parse(arrayBuffer);

    const material = new THREE.MeshStandardMaterial({ color: '#d164c3' });
    const mesh = new THREE.Mesh(geometry, material);

    mesh.scale.set(0.2, 0.2, 0.2);

    // Centrer le modèle
    geometry.computeBoundingBox();
    const box = geometry.boundingBox;
    const center = new THREE.Vector3();
    box.getCenter(center);
    geometry.translate(-center.x, -center.y, -center.z);

    // Calcul des dimensions
    const width = box.max.x - box.min.x;
    const height = box.max.y - box.min.y;
    const depth = box.max.z - box.min.z;

    const stl_data = document.getElementById('stl_data');
    const width_data = document.createElement('p');
    width_data.textContent = `Largeur X : ${width.toFixed(2)}mm `;
    stl_data.appendChild(width_data);
    const height_data = document.createElement('p');
    height_data.textContent = `Longueur Y : ${height.toFixed(2)}mm `;
    stl_data.appendChild(height_data);
    const depth_data = document.createElement('p');
    depth_data.textContent = `Profondeur Z : ${depth.toFixed(2)}mm `;
    stl_data.appendChild(depth_data);

    // Calcul du volume
    const volume = computeVolume(geometry);
    const volume_data = document.createElement('p');
    volume_data.textContent = `Volume : ${volume.toFixed(2)}mm3 `;
    stl_data.appendChild(volume_data);


    scene.add(mesh);

})
