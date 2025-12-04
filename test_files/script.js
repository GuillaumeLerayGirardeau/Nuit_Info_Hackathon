import * as THREE from 'three';

const iw = window.innerWidth;
const ih = window.innerHeight;

// Créer une scène qui contient tous les éléments à afficher
const scene = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(70, iw/ih, 0.1, 1000);
camera.position.set(0, 0, 2);

// Créer et ajouter un mesh à la scène
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({color: '#424242'});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// Créer le moteur de rendu sur une balise
const canvas = document.getElementById('canva');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(iw, ih);

loop()

// Anime le cube
function loop() {
    requestAnimationFrame(loop)
    mesh.rotation.y += 0.01
    // Lancer un rendu avec la scène et la caméra
    renderer.render(scene, camera);
}
