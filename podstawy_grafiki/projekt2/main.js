import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

const controls = new OrbitControls( camera, renderer.domElement );
const loader = new GLTFLoader();



const geometry = new THREE.CylinderGeometry( 1, 1, 6,20);
const material1 = new THREE.MeshBasicMaterial( { color: 0x888888 } );
const material1_0 = new THREE.MeshBasicMaterial( { wireframe: true } );
const cyl = new THREE.Mesh( geometry, material1 );
const cyl1 = new THREE.Mesh( geometry, material1_0 );

//scene.add( cyl );

const geometryspike = new THREE.CylinderGeometry( 1, 0, 2,20);
const material2 = new THREE.MeshBasicMaterial( { color: 0x110000 } );
const material2_0 = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
const spike = new THREE.Mesh( geometryspike, material2 );
const spike1 = new THREE.Mesh( geometryspike, material2_0 );
//scene.add( spike );

const geometryhead = new THREE.CylinderGeometry( 1.5, 1.5, 0.3, 20);
const material3 = new THREE.MeshBasicMaterial( { color: 0x440000 } );
const material3_0 = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
const head1 = new THREE.Mesh( geometryhead, material3 );
const head1_0 = new THREE.Mesh( geometryhead, material3_0 );
//scene.add( head1 );

const geometryhead2 = new THREE.CylinderGeometry( 2, 2, 0.8, 6);
const material4 = new THREE.MeshBasicMaterial( { color: 0x00aa00 } );
const material4_0 = new THREE.MeshBasicMaterial( { color: 0xffffff, wireframe: true } );
const head2 = new THREE.Mesh( geometryhead2, material4 );
const head2_0 = new THREE.Mesh( geometryhead2, material4_0 );
//scene.add( head2 );

spike.position.y = -4;
head1.position.y = 2;
head2.position.y = 3;

spike1.position.y = -4;
head1_0.position.y = 2;
head2_0.position.y = 3;

		const group = new THREE.Group();
		group.add( cyl );
		group.add( spike );
		group.add( head1 );
		group.add( head2 );
		group.add( cyl1 );
		group.add( spike1 );
		group.add( head1_0 );
		group.add( head2_0 );

		const group2 = group.clone();

scene.add( group );
scene.add( group2 );

group.rotation.z=70;

group2.rotation.z= -70;
group2.rotation.x= -160;
group2.rotation.y= 20;

group.position.x = -5;
group2.position.x = 5;


camera.position.z = 20;
renderer.setClearColor(0x9999bb, 1);

function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();