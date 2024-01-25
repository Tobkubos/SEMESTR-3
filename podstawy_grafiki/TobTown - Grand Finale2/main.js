import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Stats from 'three/addons/libs/stats.module.js';
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';

let camera, scene, renderer, stats;


let controls;

function init() {

    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setClearColor(0x9494b8, 1)
    document.body.appendChild(renderer.domElement);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    window.addEventListener('resize', onWindowResized);

    stats = new Stats();

    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 300);
    camera.position.set(45, 90, 45)

    scene = new THREE.Scene();

    const fogColor = new THREE.Color(0x66ccff); // color
    const fogNear = 10; // near dist
    const fogFar = 500; // max dist
    scene.fog = new THREE.Fog(fogColor, fogNear, fogFar);

    controls = new OrbitControls(camera, renderer.domElement);
}
init();

function onWindowResized() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
}

////////////////////////////////////////////////////
//LIGHT
const light = new THREE.AmbientLight(0x404040, 4); // soft white light 
scene.add(light);
var power = 20000;
const pointLight = new THREE.PointLight(0xFFE29A, power, 0);
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.castShadow = true;

const Glight = new THREE.Group()
Glight.add(pointLight)
scene.add(Glight)

////////////////////////////////////////////////////
//GEOMETRIES
var size = 8;
var road_diff = 2;
const platform_geo = new THREE.PlaneGeometry(size, size, 1, 1)
const platform_geo2 = new THREE.PlaneGeometry(size - road_diff, size - road_diff, 1, 1)
const pole_geo = new THREE.CylinderGeometry(0.05, 0.05, 2, 8, 1)
const pole_geo2 = new THREE.CylinderGeometry(0.05, 0.05, 0.5, 8, 1)
const pole_geo3 = new THREE.CylinderGeometry(0.05, 0.2, 0.2, 8, 1)
const white_line_geo = new THREE.PlaneGeometry(0.05, 0.4, 1, 1)


const cloud_geo = new THREE.TetrahedronGeometry(2, 3)
const cloud_geo2 = new THREE.TetrahedronGeometry(3.2, 3)
const cloud_geo3 = new THREE.TetrahedronGeometry(3.5, 3)

const sun_geo = new THREE.SphereGeometry(2, 10, 10)
const moon_geo = new THREE.SphereGeometry(4, 10, 10)

////////////////////////////////////////////////////
//TEXTURES

const pavement_texture = new THREE.TextureLoader().load("textures/pavement_city.jpg");
const grass_texture = new THREE.TextureLoader().load("textures/grass.jpg");
const wood_texture = new THREE.TextureLoader().load("textures/wood.jpg");
const leaves_texture = new THREE.TextureLoader().load("textures/leaves.png");
pavement_texture.wrapS = THREE.RepeatWrapping;
pavement_texture.wrapT = THREE.RepeatWrapping;
pavement_texture.repeat.set(4, 4);

leaves_texture.wrapS = THREE.RepeatWrapping;
leaves_texture.wrapT = THREE.RepeatWrapping;
leaves_texture.repeat.set(4, 4);

////////////////////////////////////////////////////
//MATERIALS
const cube_mat1 = new THREE.MeshStandardMaterial({ color: 0x00ffff })
const cube_mat2 = new THREE.MeshStandardMaterial({ color: 0x686868, side: THREE.DoubleSide, map: pavement_texture })
const cube_mat3 = new THREE.MeshStandardMaterial({ color: 0x989898, side: THREE.DoubleSide, map: pavement_texture })
const cube_mat4 = new THREE.MeshStandardMaterial({ color: 0x4CBB17, side: THREE.DoubleSide })
const road_mat = new THREE.MeshStandardMaterial({ color: 0x000000, side: THREE.DoubleSide })
const road_mat2 = new THREE.MeshStandardMaterial({ color: 0x4CBB17, side: THREE.DoubleSide, map: grass_texture })
const white_line_mat = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide })

const lamp_pole_mat = new THREE.MeshStandardMaterial({ color: 0xABCDEF })

const cloud_mat = new THREE.MeshStandardMaterial({ color: 0xffffff })
const sun_mat = new THREE.MeshStandardMaterial({ color: 0xFCEEA7, emissive: 0xffbb00 })
const moon_mat = new THREE.MeshStandardMaterial({ color: 0xFCEEA7, emissive: 0xffffff })

////////////////////////////////////////////////////
//OTHER
const Pietra1 = ['building/flat_0.obj', 'building/roof.obj', 'building/flat_1.obj', 'building/flat_2.obj', 'building/flat_3.obj'];
const Pietra2 = ['building/2floor_0.obj', 'building/2floor_1.obj', 'building/2floor_2.obj', 'building/2floor_3.obj', 'building/2floor_4.obj'];
const Colors = ['palettes/col1.png', 'palettes/col2.png', 'palettes/col3.png', 'palettes/col4.png', 'palettes/col5.png'];

const platformsGroup = new THREE.Group()
const CloudGroup = new THREE.Group()
////////////////////////////////////////////////////
const cloud = new THREE.Mesh(cloud_geo, cloud_mat)
const cloud2 = new THREE.Mesh(cloud_geo2, cloud_mat)
const cloud3 = new THREE.Mesh(cloud_geo3, cloud_mat)

const sun = new THREE.Mesh(sun_geo, sun_mat)
const moon = new THREE.Mesh(moon_geo, moon_mat)
scene.add(cloud, cloud2, cloud3, sun, moon)

////////////////////////////////////////////////////
//MAIN
function roads(x, z, platformsGroup) {
    const LINES1 = new THREE.Group()
    const white_line = new THREE.Mesh(white_line_geo, white_line_mat)
    white_line.position.set(4.025, 3.01, 0)
    white_line.rotation.set(-Math.PI / 2, 0, 0)

    const white_line2 = white_line.clone()
    white_line2.position.set(4.025, 3.01, 2)

    const white_line3 = white_line.clone()
    white_line3.position.set(4.025, 3.01, -2)
    LINES1.add(white_line, white_line2, white_line3)
    const LINES2 = LINES1.clone()
    const LINES3 = LINES1.clone()
    const LINES4 = LINES1.clone()

    LINES2.rotation.set(0, Math.PI / 2, 0)
    LINES3.rotation.set(0, (Math.PI / 2) * 2, 0)
    LINES4.rotation.set(0, (Math.PI / 2) * 3, 0)

    const ALL_LINES = new THREE.Group()
    ALL_LINES.add(LINES1, LINES2, LINES3, LINES4)
    ALL_LINES.position.set(x, 0, z)

    platformsGroup.add(ALL_LINES)
}

function trees(x, z, platformsGroup) {


    const createTree = () => {
        const log_mat = new THREE.MeshStandardMaterial({ color: 0x0fffff, map: wood_texture })
        const leaves_mat = new THREE.MeshStandardMaterial({ color: 0xfffabc, map: leaves_texture })

        const log_geo = new THREE.CylinderGeometry(0.1, 0.1, 1, 8, 1)
        const leaves_geo = new THREE.CylinderGeometry(0, 0.4, 2, 8, 1)

        const log = new THREE.Mesh(log_geo, log_mat)
        const leaves = new THREE.Mesh(leaves_geo, leaves_mat)
        const leaves2 = new THREE.Mesh(leaves_geo, leaves_mat)
        const leaves3 = new THREE.Mesh(leaves_geo, leaves_mat)

        log.castShadow = true;
        leaves.castShadow = true;
        leaves2.castShadow = true;
        leaves3.castShadow = true;

        //3.5  4.7   5.3   6
        log.position.set(0, 0, 0)
        leaves.position.set(0, 1.2, 0)
        leaves2.position.set(0, 1.8, 0)
        leaves3.position.set(0, 2.4, 0)

        leaves2.scale.set(0.8, 0.8, 0.8)
        leaves3.scale.set(0.5, 0.5, 0.5)

        var tree_offset1 = Math.random() * 3.8
        var tree_offset2 = Math.random() * 3.8
        var side = Math.random()

        const full_tree = new THREE.Group()
        full_tree.add(log, leaves, leaves2, leaves3)

        if (side >= 0 && side < 0.25) {
            full_tree.position.set(x + tree_offset1, 3.5, z + tree_offset2)
        }
        if (side >= 0.25 && side < 0.5) {
            full_tree.position.set(x + tree_offset1, 3.5, z + -tree_offset2)
        }
        if (side >= 0.5 && side < 0.75) {
            full_tree.position.set(x + -tree_offset1, 3.5, z + tree_offset2)
        }
        if (side >= 0.75) {
            full_tree.position.set(x + -tree_offset1, 3.5, z + -tree_offset2)
        }
        full_tree.scale.y = ((Math.random() * 1.3) + 1)

        return full_tree
    };

    const tree1 = createTree()
    const tree2 = createTree()
    const tree3 = createTree()
    const tree4 = createTree()
    const tree5 = createTree()


    platformsGroup.add(tree1, tree2, tree3, tree4, tree5)

}

function lantern(x, z, platformsGroup) {


    const createLamp = () => {
        const lamp = new THREE.Mesh(pole_geo, lamp_pole_mat);
        const lamp_up = new THREE.Mesh(pole_geo2, lamp_pole_mat);
        const lamp_light_cone = new THREE.Mesh(pole_geo3, lamp_pole_mat);
        lamp.position.set(0, 4, 0);
        lamp_up.rotation.set(Math.PI / 2, 0, -Math.PI / 4);
        lamp_up.position.set(0.1, 5, 0.1);
        lamp_light_cone.position.set(0.2, 4.9, 0.2);
        const lampGroup = new THREE.Group();
        var ifLight = Math.random()

        if (ifLight < 0.8) {
            const lamplight = new THREE.SpotLight(0xFFE29A, 10, 10, Math.PI / 4);
            lamplight.position.set(0.2, 4.9, 0.2);

            const targetObject = new THREE.Object3D();
            targetObject.position.set(0.2, 0, 0.2);
            lamplight.target = targetObject;

            lampGroup.add(lamp, lamp_up, lamp_light_cone, lamplight, targetObject);
        }
        lampGroup.add(lamp, lamp_up, lamp_light_cone);
        return lampGroup;
    };

    const LAMP1 = createLamp();
    const LAMP2 = createLamp();
    const LAMP3 = createLamp();
    const LAMP4 = createLamp();
    LAMP1.position.set(x + 2.6, 0, z + 2.6)

    LAMP2.rotation.set(0, (-Math.PI / 2), 0)
    LAMP2.position.set(-(x + 2.6), 0, z + 2.6)

    LAMP3.rotation.set(0, (-Math.PI / 2) * 3, 0)
    LAMP3.position.set(x + 2.6, 0, -(z + 2.6))

    LAMP4.rotation.set(0, (-Math.PI / 2) * 2, 0)
    LAMP4.position.set(-(x + 2.6), 0, -(z + 2.6))

    platformsGroup.add(LAMP1, LAMP2, LAMP3, LAMP4)
}



function spawn() {
    const loader = new OBJLoader();
    loader.castShadow = true
    loader.receiveShadow = true
    const textureLoader = new THREE.TextureLoader();

    // generator
    var map_size = 11;
    var max = 8 * map_size;
    var r = max / 2;

    const base_geo = new THREE.BoxGeometry(max + 10, max + 10, 1, 1)
    const base_mat = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.DoubleSide })
    const BASE = new THREE.Mesh(base_geo, base_mat)
    BASE.castShadow = false
    BASE.receiveShadow = false
    BASE.position.set(0, 2.4, 0)
    BASE.rotation.set(Math.PI / 2, 0, 0)
    scene.add(BASE)


    for (var x = -r; x <= r; x += size) {
        for (var z = -r; z <= r; z += size) {


            var c = Math.pow(x, 2) + Math.pow(z, 2) - Math.pow(r, 2);

            var t = Math.random()
            if (t < 0.5) {
                var offset1 = Math.random();
                var offset2 = Math.random();
            }
            else {
                var offset1 = -Math.random();
                var offset2 = -Math.random();
            }

            const texture = textureLoader.load(ColorPath);
            const materialWithTexture = new THREE.MeshStandardMaterial({ map: texture });
            var randomColorIndex = Math.floor(Math.random() * Colors.length);

            var whatBuild = Math.random();
            if (whatBuild < 0.7) {
                var bd = Pietra1
            }
            else {
                var bd = Pietra2
            }

            var ColorPath = Colors[randomColorIndex];
            //Strefa biznes - wiezowce)
            if (c <= -(1150)) {
                const road = new THREE.Mesh(platform_geo, road_mat)
                const pavement = new THREE.Mesh(platform_geo2, cube_mat2)
                road.position.set(x, 2.99, z)
                road.rotation.set(-Math.PI / 2, 0, 0)
                road.receiveShadow = true

                pavement.position.set(x, 3, z)
                pavement.rotation.set(-Math.PI / 2, 0, 0)
                pavement.receiveShadow = true

                ///////////////////////////////
                ///////////////////////////////
                lantern(x, z, platformsGroup)
                roads(x, z, platformsGroup)
                ///////////////////////////////
                ///////////////////////////////
                platformsGroup.add(road, pavement)

                var randRot = (Math.floor(Math.random() * 10)) - 6;
                var bud_y = 2;
                var thisX = x;
                var thisZ = z;
                var randHeight = Math.floor(Math.random() * (25 - 10 + 1)) + 10;
                const buildingGroup = new THREE.Group()
                for (var i = 0; i <= randHeight; i++) {

                    if (i == 0) {
                        bud_y += 1;
                        (function (currentX, currentZ, BuildingY, BuildingRotation, off1, off2, bd) {
                            loader.load(
                                bd[0],
                                function (object) {
                                    buildingGroup.add(object);
                                    object.position.set(currentX + off1, BuildingY, currentZ + off2)
                                    object.rotation.set(0, (Math.PI / 2 * BuildingRotation), 0);
                                    object.traverse(child => {
                                        if (child.isMesh) {
                                            child.material = materialWithTexture;
                                            child.castShadow = true
                                            child.receiveShadow = true
                                        }
                                    });
                                }
                            );
                        })(thisX, thisZ, bud_y, randRot, offset1, offset2, bd);
                    }

                    else if (i > 0 && i < randHeight - 1) {
                        bud_y += 1;
                        var randomModelIndex = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
                        (function (currentX, currentZ, BuildingY, BuildingRotation, off1, off2, bd) {
                            loader.load(
                                bd[randomModelIndex],
                                function (object) {
                                    buildingGroup.add(object);
                                    scene.add(buildingGroup);
                                    object.position.set(currentX + off1, BuildingY, currentZ + off2)
                                    object.rotation.set(0, (Math.PI / 2 * BuildingRotation), 0);
                                    object.traverse(child => {
                                        if (child.isMesh) {
                                            child.material = materialWithTexture;
                                            child.castShadow = true
                                            child.receiveShadow = true
                                        }
                                    });
                                }
                            );
                        })(x, z, bud_y, randRot, offset1, offset2, bd);
                    }

                    else if (i == randHeight) {
                        bud_y += 1;
                        (function (currentX, currentZ, BuildingY, BuildingRotation, off1, off2, bd) {
                            loader.load(
                                bd[1],
                                function (object) {
                                    buildingGroup.add(object);
                                    object.position.set(currentX + off1, BuildingY, currentZ + off2)
                                    object.rotation.set(0, (Math.PI / 2 * BuildingRotation), 0);
                                    object.traverse(child => {
                                        if (child.isMesh) {
                                            child.material = materialWithTexture;
                                            child.castShadow = true
                                            child.receiveShadow = true
                                        }
                                    });
                                }
                            );
                        })(x, z, bud_y, randRot, offset1, offset2, bd);
                    }
                }
            }

            //Strefa rodzinna - bloki/domy)
            else if (c > -(1150) && c < -120) {
                const road = new THREE.Mesh(platform_geo, road_mat)
                const pavement = new THREE.Mesh(platform_geo2, cube_mat3)
                road.position.set(x, 2.99, z)
                road.rotation.set(-Math.PI / 2, 0, 0)
                road.receiveShadow = true

                pavement.position.set(x, 3, z)
                pavement.rotation.set(-Math.PI / 2, 0, 0)
                pavement.receiveShadow = true

                ///////////////////////////////
                ///////////////////////////////
                roads(x, z, platformsGroup)
                ///////////////////////////////
                ///////////////////////////////
                platformsGroup.add(road, pavement)

                var randomBud = Math.floor(Math.random() * 10);
                var randRot = (Math.floor(Math.random() * 10)) - 6;
                var bud_y = 2;
                var thisX = x;
                var thisZ = z;


                var randHeight = Math.floor(Math.random() * (7 - 3 + 1)) + 3;
                const buildingGroup = new THREE.Group()

                for (var j = 0; j <= randHeight; j++) {

                    if (j == 0) {

                        bud_y += 1;
                        (function (currentX, currentZ, BuildingY, BuildingRotation, off1, off2, bd) {
                            loader.load(
                                bd[0],
                                function (object) {
                                    buildingGroup.add(object);
                                    object.position.set(currentX + off1, BuildingY, currentZ + off2)
                                    object.rotation.set(0, (Math.PI / 2 * BuildingRotation), 0);
                                    object.traverse(child => {
                                        if (child.isMesh) {
                                            child.material = materialWithTexture;
                                            child.castShadow = true
                                            child.receiveShadow = true
                                        }
                                    });
                                }
                            );
                        })(thisX, thisZ, bud_y, randRot, offset1, offset2, bd);
                    }

                    else if (j > 0 && j < randHeight - 1) {
                        var randomModelIndex = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
                        bud_y += 1;
                        (function (currentX, currentZ, BuildingY, BuildingRotation, off1, off2, bd) {
                            loader.load(
                                bd[randomModelIndex],
                                function (object) {
                                    buildingGroup.add(object);
                                    object.position.set(currentX + off1, BuildingY, currentZ + off2)
                                    object.rotation.set(0, (Math.PI / 2 * BuildingRotation), 0);
                                    object.traverse(child => {
                                        if (child.isMesh) {
                                            child.material = materialWithTexture;
                                            child.castShadow = true
                                            child.receiveShadow = true
                                        }
                                    });
                                }
                            );
                        })(x, z, bud_y, randRot, offset1, offset2, bd);
                    }

                    else if (j == randHeight) {
                        bud_y += 1;
                        (function (currentX, currentZ, BuildingY, BuildingRotation, off1, off2, bd) {
                            loader.load(
                                bd[1],
                                function (object) {
                                    buildingGroup.add(object);
                                    scene.add(buildingGroup);
                                    object.position.set(currentX + off1, BuildingY, currentZ + off2)
                                    object.rotation.set(0, (Math.PI / 2 * BuildingRotation), 0);
                                    object.traverse(child => {
                                        if (child.isMesh) {
                                            child.material = materialWithTexture;
                                            child.castShadow = true
                                            child.receiveShadow = true
                                        }
                                    });
                                }
                            );
                        })(x, z, bud_y, randRot, offset1, offset2, bd);
                    }
                }
            }
            //Strefa eco - lasy
            else {
                const road = new THREE.Mesh(platform_geo, road_mat2)
                road.position.set(x, 3.011, z)
                road.rotation.set(-Math.PI / 2, 0, 0)
                road.receiveShadow = true

                ///////////////////////////////
                ///////////////////////////////
                trees(x, z, platformsGroup)
                ///////////////////////////////
                ///////////////////////////////
                platformsGroup.add(road)
            }

        }
    }
    scene.add(platformsGroup)
    platformsGroup.position.set(0, 0, 0)
}
spawn()

var time = 0;
var timeForMoon = 0;

function animate() {
    time = Date.now() * 0.0005;
    timeForMoon = time + Math.PI;
    var q = Math.sin(time) * 75;
    var w = Math.cos(time) * 75;
    Glight.position.set(0, q, w);
    sun.position.set(0, q, w);
    moon.position.set(0, Math.sin(timeForMoon) * 75, Math.cos(timeForMoon) * 75);

    if (q < 10) {

        //LAMPY ON
        power = THREE.MathUtils.lerp(power, 0, 0.2);
        platformsGroup.children.forEach((child) => {
            if (child.type === "Group") {
                child.children.forEach((lamp) => {
                    if (lamp.type === "SpotLight") {
                        lamp.intensity = 10;
                    }
                });
            }
        });
    }
    else {

        //LAMPY OFF
        power = THREE.MathUtils.lerp(power, 20000, 0.1);
        platformsGroup.children.forEach((child) => {
            if (child.type === "Group") {
                child.children.forEach((lamp) => {
                    if (lamp.type === "SpotLight") {
                        lamp.intensity = 0;
                    }
                });
            }
        });
    }

    var e1 = Math.sin(time * 0.1) * 35;
    var r1 = Math.cos(time * 0.1) * 35;

    var e2 = Math.sin(time * 0.15) * 40;
    var r2 = Math.cos(time * 0.15) * 40;

    var e3 = Math.sin(time * 0.08) * 28;
    var r3 = Math.cos(time * 0.08) * 28;

    cloud.position.set(e1, 30, r1)
    cloud2.position.set(e2, 33, r2)
    cloud3.position.set(e3, 37, r3)

    cloud.scale.x = 0.5 * Math.sin(time * 0.2) + 1.75
    cloud.scale.z = 0.5 * Math.sin(time * 0.2) + 1.75

    cloud2.scale.x = 0.5 * Math.sin(time * 0.3) + 1.60
    cloud2.scale.z = 0.5 * Math.sin(time * 0.3) + 1.60

    cloud3.scale.x = 0.5 * Math.sin(time * 0.4) + 1.67
    cloud3.scale.z = 0.5 * Math.sin(time * 0.4) + 1.67

    scene.rotation.y += 0.001

    pointLight.intensity = power;

    controls.update();
    stats.update();
    renderer.render(scene, camera);
    requestAnimationFrame(animate);
}

animate();