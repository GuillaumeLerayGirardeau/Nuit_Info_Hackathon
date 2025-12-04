// Scene de base

const scene = new THREE.Scene();
// On instancie de la classe scene de THREE.js

const camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
// Creation d'une nouvelle camera: FOV, taille de l'ecran, distance minimale et maximale pour voir l'objet

const canvas = document.querySelector('canvas')
const renderer = new THREE.WebGLRenderer({canvas});
// Creation d'une variable qui va pouvoir lancer notre rendu

renderer.setSize(window.innerWidth, window.innerHeight);
// On met la taille du rendu a la meme taille que la caméra et de l'écran

document.body.appendChild(renderer.domElement);
// on met notre scene dans le body, domElement cree automatiquement une balise canvas si on avait pas specifie le tag


// Model

const geometry = new THREE.BoxGeometry();
// cree un cube
const material = new THREE.MeshStandardMaterial({color: 0x00ff00});
// on met une texture
const cube = new THREE.Mesh(geometry, material);
// On fusionne les deux pour cree un nouvel objet
scene.add(cube);

camera.position.z = 2;
camera.position.x = 1;
// on positionne la camera sur l'axe Z

// Light

const light = new THREE.PointLight(0xffffff, 1);
// Creation d'une lumiere avec sa couleur et son intensite
light.position.set(10, 10, 10);
scene.add(light);

anim_model();

function anim_model() {
    requestAnimationFrame(anim_model);
    /*On dit au navigateur d'executer notre fonction avant chaque
    rafraichissement d'ecran, la fonction est native au navigateur*/
    cube.rotation.y += 0.008;
    renderer.render(scene, camera);
}
// On rend la scene