import * as THREE from 'three';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

const iw = window.innerWidth;
const ih = window.innerHeight;

// Créer une scène qui contient tous les éléments à afficher
const scene = new THREE.Scene();

// Créer une caméra
const camera = new THREE.PerspectiveCamera(70, iw/ih, 0.1, 1000);
camera.position.set(0, 0, 10);

/*
// Créer et ajouter un mesh à la scène
const geometry = new THREE.BoxGeometry(1, 1, 1);
const texture = new THREE.TextureLoader().load('/textures/wood_texture.jpg')
// le Phong Material est un shadder standard qui simule une réaction à une source de lumière
const material = new THREE.MeshPhongMaterial({map: texture});
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);
*/

// importer un fichier STL
const loader = new STLLoader();
loader.load('stl_file/cat.stl', (geometry) => {
    //const text = new THREE.TextureLoader().load('/stl_file/cat_text.jpg');
    const material = new THREE.MeshStandardMaterial({color: 0xffffffff});
    const cat_mesh = new THREE.Mesh(geometry, material);
    console.log("cat found")

    cat_mesh.scale.set(0.1, 0.1, 0.1);
    cat_mesh.position.set(0, 0, 0);

    scene.add(cat_mesh)
})

// Ajoute une lumière
const light = new THREE.PointLight(0xeeeeee, 1000);
light.position.set(0, 0, 100);
scene.add(light);

const ambientLight = new THREE.AmbientLight(0x404040, 2);
scene.add(ambientLight);

// Créer le moteur de rendu dans une balise contenant un ID
const canvas = document.getElementById('canva');
const renderer = new THREE.WebGLRenderer({canvas});

renderer.setSize(iw, ih);

loop();

// Anime le cube
function loop() {
    requestAnimationFrame(loop)
    /*
    mesh.rotation.y += 0.01
    mesh.rotation.x += 0.005
    */
   // Lancer un rendu avec la scène et la caméra
   renderer.render(scene, camera);
}
