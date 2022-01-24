const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const sectionTag = document.querySelector('section');

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xffaaee, 0.0);
sectionTag.appendChild(renderer.domElement);

const clock = new THREE.Clock();
const texture = new THREE.TextureLoader().load('./assets/cat.jpg');

const cubeLoader = new THREE.CubeTextureLoader();

const uniforms = {
  time: {
    value: clock.getElapsedTime(),
  },
  cat: {
    value: texture,
  },
  cube: {
    value: cubeLoader.load([
      './assets/posx.jpg',
      './assets/negx.jpg',
      './assets/posy.jpg',
      './assets/negy.jpg',
      './assets/posz.jpg',
      './assets/negz.jpg',
    ]),
  },
};

const dpi = 100;
const geometry = new THREE.SphereGeometry(12, dpi, dpi);
// const geometry = new THREE.TorusKnotGeometry(8, 1, 10 * dpi, dpi, 5, 9);

// const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,
  fragmentShader: frag,
  vertexShader: vert,
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

let aimCamera = new THREE.Vector3(0, 0, 35);
let currentCamera = new THREE.Vector3(0, 200, 100);

camera.position.copy(currentCamera);

const animate = function () {
  requestAnimationFrame(animate);

  // camera zoom
  const diff = aimCamera.clone().sub(currentCamera).multiplyScalar(0.02);

  currentCamera.add(diff);

  camera.position.copy(currentCamera);

  // update uniforms
  uniforms.time = { value: clock.getElapsedTime() };
  renderer.render(scene, camera);
};
animate();

window.addEventListener('resize', () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspectRatio = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
