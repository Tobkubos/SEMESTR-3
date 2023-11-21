import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'
import { MeshSurfaceSampler } from 'three/addons/math/MeshSurfaceSampler.js';


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
const loader = new GLTFLoader()

renderer.setClearColor(0x9999bb, 1)
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
///////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
//GEOMETRY


///////////////////////////////////////////////////////////////////////

//TEXTURES


///////////////////////////////////////////////////////////////////////

//MATERIALS

///////////////////////////////////////////////////////////////////////
const geometry = new THREE.PlaneGeometry( 200, 200, 25, 25);
geometry.rotateX(-Math.PI / 2);

const material = new THREE.MeshBasicMaterial({color: 0xffffff, wireframe: true})
const floor = new THREE.Mesh(geometry, material)
var max = 10
var min = 8
function spawner(q, w, height){
	const BUILDING = new THREE.Group()
	for(var i = 0; i<height; i++){
		var a = Math.floor(Math.random() * max) + min
		var b = Math.floor(Math.random() * max) + min	
		const geometry_test = new THREE.BoxGeometry(a, 4, b)
		const pillar_test = new THREE.BoxGeometry(a/8, 4, a/8)
		const material_test = new THREE.MeshBasicMaterial({color: Math.random() * 0xffffff})

		var randomizer = Math.random()*10

		if(randomizer<5){
			const object_pillar_test1 = new THREE.Mesh(pillar_test, material_test)
			const object_pillar_test2 = object_pillar_test1.clone()
			const object_pillar_test3 = object_pillar_test1.clone()
			const object_pillar_test4 = object_pillar_test1.clone()

			object_pillar_test1.position.set(3, 0, 3)
			object_pillar_test2.position.set(-3, 0, 3)
			object_pillar_test3.position.set(3, 0, -3)
			object_pillar_test4.position.set(-3, 0, -3)


			const pillars = new THREE.Group()
			pillars.add(object_pillar_test1, object_pillar_test2, object_pillar_test3, object_pillar_test4)
			
			if(i == 0){ pillars.position.y += 2}
			if(i >= 1){ pillars.position.y += 4*i+2}
			BUILDING.add(pillars)
			//scene.add(pillars)
		}

		if(randomizer>=5){
			const object_test = new THREE.Mesh(geometry_test, material_test)
			
			if(i == 0){ object_test.position.y += 2}
			if(i >= 1){ object_test.position.y += 4*i+2}
			BUILDING.add(object_test)
			//scene.add(object_test)
		}
	}
	BUILDING.position.x = q
	BUILDING.position.z = w
	scene.add(BUILDING)
}

//MASZYNA LOSUJĄCA DZYN DZYN DZYN DZYN
for(var i = -90; i<=90; i+=30){
	for(var j = -90; j<=90; j+=30){
		var height = (Math.random() * 30) + 8
		spawner(i, j, height)
	}
}


camera.position.set(0, 200, 200);
camera.rotateX(-Math.PI/5);
scene.add( floor );


function animate() {
	requestAnimationFrame(animate)
	scene.rotation.y += Math.PI/360
	renderer.render(scene, camera)
}
animate()