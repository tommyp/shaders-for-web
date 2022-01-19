/* global THREE */

// pick the section tag
const section = document.querySelector("section")

// create a new scene and camera
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, section.clientWidth / section.clientHeight, 0.1, 1000)

// something to pop out a canvas
const renderer = new THREE.WebGLRenderer({ 
  antialias: true, 
  alpha: true,
  preserveDrawingBuffer: true
})
renderer.setSize(section.clientWidth, section.clientHeight)
section.appendChild(renderer.domElement)

// set up things we want to use in uniforms
const clock = new THREE.Clock()
const mouse = new THREE.Vector2(0, 0)

// set up the uniforms object
const uniforms = {
  time: { value: clock.getElapsedTime() },
  seed: { value: Math.random() },
  mouse: { value: mouse }
}

// placing a shape
const dpi = 100
const geometry = new THREE.SphereGeometry(3, 2 * dpi, dpi)
const material = new THREE.ShaderMaterial({ 
  uniforms: uniforms,
  vertexShader: vert,
  fragmentShader: frag,
  // wireframe: true
})
const shape = new THREE.Mesh(geometry, material)
scene.add(shape)

// move the camera back accordingly
camera.position.z = 10;


// the animation loop, runs each frame
const animate = function () {
  // update anything that might get updated
  uniforms.time = { value: clock.getElapsedTime() }
  uniforms.mouse = { value: mouse }
  
	requestAnimationFrame(animate)
	renderer.render(scene, camera)
}


// pick all my sliders, and loop each time
const sliders = document.querySelectorAll("input")

sliders.forEach(slider => {
  // get the name="something" part of each input
  const name = slider.getAttribute("name")
  
  // make a new uniform based on that
  uniforms[name] = { value: parseFloat(slider.value) }
  
  // if it updates, update too!
  slider.addEventListener("input", function () {
    uniforms[name] = { value: parseFloat(slider.value) }
  })
})

// make sure the camera and canvas size updates
window.addEventListener("resize", function () {
  camera.aspect = section.clientWidth / section.clientHeight
  camera.updateProjectionMatrix()
  renderer.setSize(section.clientWidth, section.clientHeight)
})


// save button
const button = document.querySelector("button")

button.addEventListener("click", function (event) {
  event.preventDefault()
  
  // get the Three.js canvas
  const canvas = document.querySelector("canvas")

  // make a data url from that
  const url = canvas.toDataURL()
  
  // make a link just in JS to download this data url
  const link = document.createElement("a")
  link.setAttribute("href", url)
  link.setAttribute("target", "_blank")
  link.setAttribute("download", "rock.png")
  link.click()
})

// move the mouse around based on -1 to 1
// similar to vec2 uv = -1.0 + 2.0 * v_texcoord
section.addEventListener("mousemove", function (event) {
  mouse.x = event.clientX / section.clientWidth * 2 - 1
  mouse.y = event.clientY / section.clientHeight * -2 + 1
})

// start running the animation loop!
animate()

