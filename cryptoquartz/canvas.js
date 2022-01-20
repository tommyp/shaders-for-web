const section = document.querySelector('section');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  section.clientWidth / section.clientHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  antialias: true,
  alpha: true,
});
renderer.setSize(section.clientWidth, section.clientHeight);
section.appendChild(renderer.domElement);

const clock = new THREE.Clock();

const uniforms = {
  time: { value: clock.getElapsedTime() },
  seed: { value: Math.random() },
};

const dpi = 10;
const geometry = new THREE.SphereGeometry(3, 2 * dpi, dpi);
const material = new THREE.ShaderMaterial({
  uniforms,
  vertexShader: vert,
  fragmentShader: frag,
  wireframe: true,
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 10;

function animate() {
  uniforms.time = { value: clock.getElapsedTime() };
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
}

// pick all my sliders, and loop each time

const sliders = document.querySelectorAll('input[type=range]');

sliders.forEach((slider) => {
  const name = slider.getAttribute('name');

  uniforms[name] = { value: parseFloat(slider.value) };

  slider.addEventListener('input', function () {
    uniforms[name] = { value: parseFloat(slider.value) };
  });
});

animate();
