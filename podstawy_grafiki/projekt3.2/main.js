import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js'


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)
const loader = new GLTFLoader()

camera.position.z = 20;
renderer.setClearColor(0x9999bb, 1)

///////////////////////////////////////////////////////////////////////


///////////////////////////////////////////////////////////////////////
//MATERIALS
const grass_material = new THREE.MeshBasicMaterial({ color: 0x6a994e })
const pavement_material = new THREE.MeshBasicMaterial({ color: 0x1f1f2e })
const pavement_material2 = new THREE.MeshBasicMaterial({ color: 0x535379 })
const line_material = new THREE.MeshBasicMaterial({ color: 0xffffff })

const log_material = new THREE.MeshBasicMaterial({ color: 0x582f0e });
const tree_material = new THREE.MeshBasicMaterial({ color: 0x386641 });

const window_geo = new THREE.BoxGeometry(0.6, 0.05, 1)
const window_material = new THREE.MeshBasicMaterial({ color: 0x48cae4 });

const building_material = new THREE.MeshBasicMaterial({ color: 0xfcefb4 });
const sep_material = new THREE.MeshBasicMaterial({ color: 0xf9dc5c });

const building_material2 = new THREE.MeshBasicMaterial({ color: 0xdddddd });
const sep_material2 = new THREE.MeshBasicMaterial({ color: 0xbbbbbb });
///////////////////////////////////////////////////////////////////////
function floor() {
	const grass_geo = new THREE.PlaneGeometry(10, 10)
	const pavement_geo = new THREE.PlaneGeometry(10, 2)
	const pavement_geo2 = new THREE.PlaneGeometry(10, 2.5)

	const pavement1 = new THREE.Mesh(pavement_geo, pavement_material)
	const pavement2 = new THREE.Mesh(pavement_geo, pavement_material)
	const pavement3 = new THREE.Mesh(pavement_geo2, pavement_material2)
	const pavement4 = new THREE.Mesh(pavement_geo2, pavement_material2)
	const grass = new THREE.Mesh(grass_geo, grass_material)


	const line = new THREE.PlaneGeometry(0.1, 0.5)

	const white_line1 = new THREE.Mesh(line, line_material)
	const white_line2 = white_line1.clone()
	const white_line3 = white_line1.clone()
	const white_line4 = white_line1.clone()
	const white_line5 = white_line1.clone()
	const white_line6 = white_line1.clone()
	const white_line7 = white_line1.clone()
	const white_line8 = white_line1.clone()

	white_line1.position.set(0, 4.5, 0.03)
	white_line2.position.set(0, 3.5, 0.03)
	white_line3.position.set(0, 2.5, 0.03)
	white_line4.position.set(0, 1.5, 0.03)
	white_line5.position.set(0.4, 1.5, 0.03)
	white_line6.position.set(0.8, 1.5, 0.03)
	white_line7.position.set(-0.4, 1.5, 0.03)
	white_line8.position.set(-0.8, 1.5, 0.03)

	const lines1 = new THREE.Group()
	lines1.add(white_line1, white_line2, white_line3, white_line4, white_line5, white_line6, white_line7, white_line8)
	const lines2 = lines1.clone()
	const lines3 = lines1.clone()
	const lines4 = lines1.clone()
	lines2.rotation.set(0, 0, (Math.PI / 2))
	lines3.rotation.set(0, 0, -(Math.PI / 2))
	lines4.rotation.set(0, 0, Math.PI)
	group.add(lines1, lines2, lines3, lines4)

	pavement1.position.z = 0.02

	pavement2.position.z = 0.02
	pavement2.rotation.z = 1.57

	pavement3.position.z = 0.01

	pavement4.position.z = 0.01
	pavement4.rotation.z = 1.57

	group.add(grass)
	group.add(pavement1)
	group.add(pavement2)
	group.add(pavement3)
	group.add(pavement4)




}
function trees() {
	const treeLog_geo = new THREE.CylinderGeometry(0.1, 0.1, 1)
	const treeMain_geo = new THREE.ConeGeometry(0.5 ,1, 8)

	const tree_log = new THREE.Mesh(treeLog_geo, log_material)
	const tree_Main = new THREE.Mesh(treeMain_geo, tree_material)
	const tree_Main2 = tree_Main.clone()
	const tree_Main3 = tree_Main.clone()

	tree_Main2.position.y = 0.3
	tree_Main3.position.y = 0.6
	tree_Main2.scale.set(0.8,0.8,0.8)
	tree_Main3.scale.set(0.5,0.5,0.5)

	tree_log.position.y = -0.5
	const tree1 = new THREE.Group();
	tree1.add(tree_log)
	tree1.add(tree_Main)
	tree1.add(tree_Main2)
	tree1.add(tree_Main3)

	const tree2 = tree1.clone()
	const tree3 = tree1.clone()
	const tree4 = tree1.clone()
	const tree5 = tree1.clone()

	tree1.position.set(1, 1, 2)
	tree2.position.set(-1, 1.5, 1.5)
	tree3.position.set(-1.3, 0.5, 0.8)
	tree4.position.set(0, -0.8, 1.5)
	tree5.position.set(0.2, 0.4, 1.3)

	const tree_group = new THREE.Group();
	tree_group.add(tree1, tree2, tree3, tree4, tree5)

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

	group.add(tree_group)
	
	const tree_group2 = tree_group.clone()
	group.add(tree_group2)
	tree_group.position.set(-3.25, -3.25, 0)
	tree_group2.position.set(3.25,-3.25,0)
	tree_group2.rotateZ(Math.PI/2)
	
}
function build1() {
	const build1 = new THREE.Group()
	const building_geo = new THREE.BoxGeometry(3.75, 3.75, 6)

	const building1 = new THREE.Mesh(building_geo, building_material)
	building1.position.set(0, 0, 0)
	build1.add(building1)

	const window1 = new THREE.Mesh(window_geo, window_material)
	const window2 = new THREE.Mesh(window_geo, window_material)
	const window3 = new THREE.Mesh(window_geo, window_material)
	window1.position.set(2, 0, 0.8)
	window2.position.set(3, 0, 0.8)
	window3.position.set(4, 0, 0.8)
	const windowside1 = new THREE.Group()
	const windowlayer1 = new THREE.Group()
	const windows1 = new THREE.Group()
	windowside1.add(window1, window2, window3)
	const windowside2 = windowside1.clone()
	const windowside3 = windowside1.clone()
	const windowside4 = windowside1.clone()

	windowside2.rotation.set(0, 0, (Math.PI / 2))
	windowside3.rotation.set(0, 0, (-Math.PI / 2))
	windowside4.rotation.set(0, 0, Math.PI)

	windowside1.position.set(-3, 1.9, 0)
	windowside2.position.set(1.9, -3, 0)
	windowside3.position.set(-1.9, 3, 0)
	windowside4.position.set(3, -1.9, 0)

	windowlayer1.add(windowside1, windowside2, windowside3, windowside4)
	const windowlayer2 = windowlayer1.clone()
	const windowlayer3 = windowlayer1.clone()
	const windowlayer4 = windowlayer1.clone()

	windowlayer2.position.set(0, 0, 1.5)
	windowlayer3.position.set(0, 0, -1.5)
	windowlayer4.position.set(0, 0, -3)

	windows1.add(windowlayer1, windowlayer2, windowlayer3, windowlayer4)
	build1.add(windows1)
	const sep_geo = new THREE.BoxGeometry(4, 4, 0.2)
	const separator1 = new THREE.Mesh(sep_geo, sep_material)
	const separator2 = new THREE.Mesh(sep_geo, sep_material)
	const separator3 = new THREE.Mesh(sep_geo, sep_material)
	const separator4 = new THREE.Mesh(sep_geo, sep_material)
	separator1.position.set(0, 0, -1.5)
	separator2.position.set(0, 0, 0)
	separator3.position.set(0, 0, 1.5)
	separator4.position.set(0, 0, 3)
	build1.add(separator1, separator2, separator3, separator4)

	group.add(build1)
	build1.position.set(3.125, 3.125, 3)
}

function build2() {
	const build2 = new THREE.Group()
	const building_geo = new THREE.BoxGeometry(3.75, 3.75, 7.5)

	const building2 = new THREE.Mesh(building_geo, building_material2)
	building2.position.set(0, 0, 0.75)
	build2.add(building2)

	const window1 = new THREE.Mesh(window_geo, window_material)
	const window2 = new THREE.Mesh(window_geo, window_material)
	const window3 = new THREE.Mesh(window_geo, window_material)
	window1.position.set(2, 0, 0.8)
	window2.position.set(3, 0, 0.8)
	window3.position.set(4, 0, 0.8)
	const windowside1 = new THREE.Group()
	const windowlayer1 = new THREE.Group()
	const windows1 = new THREE.Group()
	windowside1.add(window1, window2, window3)
	const windowside2 = windowside1.clone()
	const windowside3 = windowside1.clone()
	const windowside4 = windowside1.clone()

	windowside2.rotation.set(0, 0, (Math.PI / 2))
	windowside3.rotation.set(0, 0, (-Math.PI / 2))
	windowside4.rotation.set(0, 0, Math.PI)

	windowside1.position.set(-3, 1.9, 0)
	windowside2.position.set(1.9, -3, 0)
	windowside3.position.set(-1.9, 3, 0)
	windowside4.position.set(3, -1.9, 0)

	windowlayer1.add(windowside1, windowside2, windowside3, windowside4)
	const windowlayer2 = windowlayer1.clone()
	const windowlayer3 = windowlayer1.clone()
	const windowlayer4 = windowlayer1.clone()
	const windowlayer5 = windowlayer1.clone()

	windowlayer2.position.set(0, 0, 1.5)
	windowlayer3.position.set(0, 0, -1.5)
	windowlayer4.position.set(0, 0, -3)
	windowlayer5.position.set(0, 0, 3)

	windows1.add(windowlayer1, windowlayer2, windowlayer3, windowlayer4, windowlayer5)
	build2.add(windows1)
	const sep_geo = new THREE.BoxGeometry(4, 4, 0.2)
	const separator1 = new THREE.Mesh(sep_geo, sep_material2)
	const separator2 = new THREE.Mesh(sep_geo, sep_material2)
	const separator3 = new THREE.Mesh(sep_geo, sep_material2)
	const separator4 = new THREE.Mesh(sep_geo, sep_material2)
	const separator5 = new THREE.Mesh(sep_geo, sep_material2)
	separator1.position.set(0, 0, -1.5)
	separator2.position.set(0, 0, 0)
	separator3.position.set(0, 0, 1.5)
	separator4.position.set(0, 0, 3)
	separator5.position.set(0, 0, 4.5)
	build2.add(separator1, separator2, separator3, separator4, separator5)

	group.add(build2)
	build2.position.set(-3.125, 3.125, 3)
}

const group = new THREE.Group();
group.rotation.set(-Math.PI / 2, 0, 0)
camera.position.y = 10;
scene.add(group);
floor()
trees()
build1()
build2()

function animate() {
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}
animate()