const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const dpi = 50;
const geometry = new THREE.PlaneGeometry(5, 3, dpi, dpi * 0.6);
const material = new THREE.ShaderMaterial({
  fragmentShader: frag,
  vertexShader: vert,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 4;

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();