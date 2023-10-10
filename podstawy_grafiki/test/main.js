import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//npx vite


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
scene.background = new THREE.Color(0xffffff);

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();

const geometry = new THREE.BoxGeometry(2,2,2);
const material = new THREE.MeshBasicMaterial( { color: 0xaaffdd } );

const sciany = [
	new THREE.MeshBasicMaterial({ color: 0xff0000 }), // Czerwony
	new THREE.MeshBasicMaterial({ color: 0x00ff00 }), // Zielony
	new THREE.MeshBasicMaterial({ color: 0x0000ff }), // Niebieski
	new THREE.MeshBasicMaterial({ color: 0xffff00 }), // Żółty
	new THREE.MeshBasicMaterial({ color: 0xff00ff }), // Magenta
	new THREE.MeshBasicMaterial({ color: 0x00ffff })  // Cyjan
  ];
const kostki = [];

const cube = new THREE.Mesh( geometry, material );
cube.translateX(0);
scene.add( cube );

for(var i = 0; i < 16;i+=5){
	for(var j = 0; j < 16;j+=5){
		for(var k = 0; k < 16;k+=5){
	var mesh  = new THREE.Mesh(geometry, sciany);
	mesh.translateX(i);
	mesh.translateY(j);
	mesh.translateZ(k);
	kostki.push(mesh);
	scene.add(mesh);
}}}


camera.position.z = 60;


function animate() {
	requestAnimationFrame( animate );

	for (const mesh of kostki) {
		// Obrót wokół osi Y o 0.01 radianów w każdej klatce animacji
		mesh.rotation.y += 0.01;
	  
		// Obrót wokół osi X o 0.01 radianów w każdej klatce animacji
		mesh.rotation.x += 0.01;
	}

	renderer.render( scene, camera );
}

animate();