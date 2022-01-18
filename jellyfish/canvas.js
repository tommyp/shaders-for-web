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

const uniforms = {
  time: {
    value: clock.getElapsedTime(),
  },
  cat: {
    value: texture,
  },
};

const dpi = 32;
// const geometry = new THREE.SphereGeometry(12, dpi, dpi);
const geometry = new THREE.TorusKnotGeometry(10, 3, 10 * dpi, dpi);

// const material = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const material = new THREE.ShaderMaterial({
  uniforms: uniforms,

  fragmentShader: frag,
  vertexShader: vert,
});
const shape = new THREE.Mesh(geometry, material);
scene.add(shape);

camera.position.z = 35;

const animate = function () {
  requestAnimationFrame(animate);

  // shape.rotation.y += 0.01;
  // update uniforms
  uniforms.time = { value: clock.getElapsedTime() };
  renderer.render(scene, camera);
};
animate();
