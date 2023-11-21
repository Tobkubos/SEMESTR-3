import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


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
//const light = new THREE.AmbientLight( 0x404040, 100 ); // soft white light
//light.position.set(20,200,20)
//scene.add( light );

const pointLight = new THREE.PointLight( 0xffffff, 100000, 100000 );
pointLight.position.set( 0,0,0 );
pointLight.castShadow = true;
scene.add( pointLight );

//const sphereSize = 15;
//const pointLightHelper = new THREE.PointLightHelper( pointLight, sphereSize );
//scene.add( pointLightHelper );
///////////////////////////////////////////////////////////////////////
//GEOMETRY
var size = 10
var speed = 0.01
var orbit = 20
var orbit_speed = 0.001
var m = 2
const Sun_geometry = new THREE.SphereGeometry(size, 20, 20)
const Mercury_geometry = new THREE.SphereGeometry(size/4, 20, 20)
const Venus_geometry = new THREE.SphereGeometry(size/3, 20, 20)
const Earth_geometry = new THREE.SphereGeometry(size/2, 20, 20)
const Moon_geometry = new THREE.SphereGeometry(size/8, 20, 20)
const space_geometry = new THREE.SphereGeometry(size*100, 20, 20)

const orbit_geometry = new THREE.TorusGeometry(orbit*m, 0.3, 4, 200)
///////////////////////////////////////////////////////////////////////

//TEXTURES

const Sun_txt = new THREE.TextureLoader().load('public/2k_sun.png' );
const Mercury_txt = new THREE.TextureLoader().load('public/2k_mercury.jpg' );
const Venus_txt = new THREE.TextureLoader().load('public/2k_venus.jpg' );
const Earth_txt = new THREE.TextureLoader().load('public/2k_earth.jpg' );
const Moon_txt = new THREE.TextureLoader().load('public/2k_moon.jpg' );
const Space_txt = new THREE.TextureLoader().load('public/2k_space.jpg' );
///////////////////////////////////////////////////////////////////////

//MATERIALS
const Sun_material = new THREE.MeshBasicMaterial({ map:Sun_txt})
const Mercury_material = new THREE.MeshStandardMaterial({ map: Mercury_txt})
const Venus_material = new THREE.MeshStandardMaterial({ map: Venus_txt })
const Earth_material = new THREE.MeshStandardMaterial({ map: Earth_txt })
const Moon_material = new THREE.MeshStandardMaterial({ map: Moon_txt})
const Space_material = new THREE.MeshBasicMaterial({ map: Space_txt, side:THREE.BackSide})

const orbit_material = new THREE.MeshBasicMaterial({ color: 0xffffff})
///////////////////////////////////////////////////////////////////////
const orbit_Mercury = new THREE.Mesh(orbit_geometry, orbit_material)


const Space = new THREE.Mesh(space_geometry, Space_material)
const Sun = new THREE.Mesh(Sun_geometry, Sun_material)
const Mercury = new THREE.Mesh(Mercury_geometry, Mercury_material)
const Venus = new THREE.Mesh(Venus_geometry, Venus_material)
const Earth = new THREE.Mesh(Earth_geometry, Earth_material)
const Moon = new THREE.Mesh(Moon_geometry, Moon_material)
Mercury.castShadow = true
Mercury.receiveShadow = true
Venus.castShadow = true
Venus.receiveShadow = true
Earth.castShadow = true
Earth.receiveShadow = true
Moon.castShadow = true
Moon.receiveShadow = true

camera.position.set(0,0,100)

const earth_moon = new THREE.Group() 
earth_moon.add(Earth, Moon)

orbit_Mercury.rotation.x=Math.PI/2

const Mercury_group = new THREE.Group()
Mercury_group.add(Mercury, orbit_Mercury)
Mercury_group.rotation.x = Math.PI/4

scene.add(Sun, Mercury, Venus, earth_moon, Space, orbit_Mercury, Mercury_group)
function animate() {
	Sun.rotation.y += speed
	Mercury.rotation.y += speed*1
	Venus.rotation.y += speed*2
	Earth.rotation.y += speed*3
	
	var data = (Date.now() * orbit_speed)
	Mercury.position.set(
		Math.sin(data)* orbit*m,
		0,
		Math.cos(data)* orbit*m
	)

	Venus.position.set(
		Math.sin(data*1.1)* (orbit*m*2),
		0,
		Math.cos(data*1.1)* (orbit*m*2)
	)

	earth_moon.position.set(
		Math.sin(data*0.5)* orbit*m*3,
		0,
		Math.cos(data*0.5)* orbit*m*3
	)

	Moon.position.set(
		Math.sin(data*3)* orbit/1.5,
		0,
		Math.cos(data*3)* orbit/1.5
	)



	requestAnimationFrame(animate)

	renderer.render(scene, camera)
}
animate()