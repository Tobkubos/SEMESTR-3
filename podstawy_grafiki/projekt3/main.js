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

camera.position.z = 20;
renderer.setClearColor(0x9999bb, 1);
const grass_geo = new THREE.PlaneGeometry(10,10)
const pavement_geo = new THREE.PlaneGeometry(10,2)
const pavement_geo2 = new THREE.PlaneGeometry(10,2.5)
const building_geo = new THREE.BoxGeometry(3,3,6)
const building_geo2 = new THREE.BoxGeometry(2,2,2)
const building_geo3 = new THREE.BoxGeometry(2,2.5,4)
const treeLog_geo = new THREE.CylinderGeometry(0.1,0.1,1)
const treeMain_geo = new THREE.TetrahedronGeometry(0.5,3)
const roof_geo = new THREE.ConeGeometry(1.2,3,8,1)
const roof_geo2 = new THREE.ConeGeometry(0.3,3,8,1)


const grass_material = new THREE.MeshBasicMaterial( { color: 0x33cc33 } );
const pavement_material = new THREE.MeshBasicMaterial( { color: 0x1f1f2e } );
const pavement_material2 = new THREE.MeshBasicMaterial( { color: 0x535379 } );
const building_material = new THREE.MeshBasicMaterial( { color: 0xdddddd } );
const building_material2 = new THREE.MeshBasicMaterial( { color: 0xdd3333 } );
const building_material3 = new THREE.MeshBasicMaterial( { color: 0xddaaaa } );
const roof_material = new THREE.MeshBasicMaterial( { color: 0xdd2222 } );
const log_material = new THREE.MeshBasicMaterial( { color: 0x222222 } );
const tree_material = new THREE.MeshBasicMaterial( { color: 0x444444 } );

const  pavement1 = new THREE.Mesh(pavement_geo, pavement_material)
const  pavement2 = new THREE.Mesh(pavement_geo, pavement_material)
const  pavement3 = new THREE.Mesh(pavement_geo2, pavement_material2)
const pavement4 = new THREE.Mesh(pavement_geo2, pavement_material2)
const grass = new THREE.Mesh(grass_geo, grass_material)
const tree_log = new THREE.Mesh(treeLog_geo, log_material)
const tree_Main = new THREE.Mesh(treeMain_geo, tree_material)
const building1 = new THREE.Mesh(building_geo, building_material)
const building2 = new THREE.Mesh(building_geo2, building_material2)
const building3 = new THREE.Mesh(building_geo3, building_material3)

const roof = new THREE.Mesh(roof_geo, roof_material)
const roof1 = new THREE.Mesh(roof_geo2, roof_material)
const roof2 = new THREE.Mesh(roof_geo2, roof_material)
const roof3 = new THREE.Mesh(roof_geo2, roof_material)
const roof4 = new THREE.Mesh(roof_geo2, roof_material)

roof1.position.set(-1 ,1,1)
roof2.position.set(-1 ,1,-1)
roof3.position.set(1 ,1,1)
roof4.position.set(1,1,-1)

const roof_cones = new THREE.Group()
	roof_cones.add(roof1);
	roof_cones.add(roof2);
	roof_cones.add(roof3);
	roof_cones.add(roof4);
roof_cones.rotation.set(Math.PI/2,0,0)
roof_cones.position.set(3,3,6.4)

pavement1.position.z = 0.02

pavement2.position.z = 0.02
pavement2.rotation.z = 1.57

pavement3.position.z = 0.01

pavement4.position.z = 0.01
pavement4.rotation.z = 1.57
pavement4.rotation.z = 1.57
//////////////////////////
building1.position.set(3,3,3)
building2.position.set(3,-3,1)
building3.position.set(-3,3,2)

roof.rotation.set(Math.PI/2, 0, 0)
roof.position.set(3,3,7.5)
//////////////////////////

tree_log.position.y = -0.5

const tree1 = new THREE.Group();
		tree1.add(tree_log)
		tree1.add(tree_Main)

const tree2 = tree1.clone()
const tree3 = tree1.clone()
const tree4 = tree1.clone()
const tree5 = tree1.clone()

tree1.position.set(1,1,2)
tree2.position.set(-1,1.5,1.5)
tree3.position.set(-1.3,0.5,0.8)
tree4.position.set(0,-0.3,1.5)
tree5.position.set(0.2,0.4,1.3)

const tree_group = new THREE.Group();
		tree_group.add(tree1)
		tree_group.add(tree2)
		tree_group.add(tree3)
		tree_group.add(tree4)
		tree_group.add(tree5)

tree1.rotation.x = 1.57
tree1.scale.y = 2

tree2.rotation.x = 1.57
tree2.scale.y = 1.5

tree3.rotation.x = 1.57
tree3.scale.y = 0.8

tree4.rotation.x = 1.57
tree4.scale.y = 1.5

tree5.rotation.x = 1.57
tree5.scale.y = 1.3

const group = new THREE.Group();
		group.add( grass );
		group.add( pavement1 );
		group.add( pavement2 );
		group.add( pavement3 );
		group.add( pavement4 );
		group.add(building1);
		group.add(building2);
		group.add(building3);
		group.add(tree_group);
		group.add(roof);
		group.add(roof_cones);

tree_group.position.set(-3,-3,0)
group.rotation.set(-Math.PI/2,0,0)
camera.position.y = 10;
scene.add(group);




function animate() {
	requestAnimationFrame( animate );

	renderer.render( scene, camera );
}

animate();