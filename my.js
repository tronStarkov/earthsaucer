const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, 450/450, 0.1, 1000)
const renderer = new THREE.WebGL1Renderer({antialias: true})
renderer.setSize(450, 450)

renderer.shadowMap.enabled = true

document.body.appendChild(renderer.domElement)

camera.position.z = 3

scene.background = new THREE.Color("black")

const light = new THREE.DirectionalLight("skyblue", 1)
light.castShadow = true
light.position.set(2, 2, 2)
light.target.position.set(0, 0, 0)
light.shadow.mapSize.height = 2048
light.shadow.mapSize.width = 2048

scene.add(light)

const lightAmb = new THREE.AmbientLight("khaki", 0.1)
scene.add(lightAmb)

const spherGeo = new THREE.SphereGeometry(1, 20, 20)
const spherMater = new THREE.MeshLambertMaterial({color: "aqua"})
const sphere = new THREE.Mesh(spherGeo, spherMater)

sphere.receiveShadow = true
scene.add(sphere)

const centerSouc = new THREE.Object3D()
sphere.add(centerSouc)

const torusGeo = new THREE.TorusGeometry(0.12, 0.12, 20, 20, 6.28)
torusGeo.scale(1, 1, 0.3)
const torusMater = new THREE.MeshLambertMaterial({color: "coral"})
const torus = new THREE.Mesh(torusGeo, torusMater)
torus.position.set(1.1, 0.1, 1)
torus.lookAt(sphere.position)

torus.castShadow = true
centerSouc.add(torus)

const cabinGeo = new THREE.SphereGeometry(0.15, 20, 20)
const cabinMater = new THREE.MeshLambertMaterial({color: "lime"})
const cabin = new THREE.Mesh(cabinGeo, cabinMater)
cabin.position.z = -0.06
cabinGeo.scale(1, 1, 0.5)

cabin.castShadow = true
torus.add(cabin)

var animate = function(){ 
    
    centerSouc.rotation.x += 0.01
    centerSouc.rotation.y += 0.015
    centerSouc.rotation.z += 0.01

    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}
animate()