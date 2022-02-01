const cloths = [
  {
    title: 'Print #1',
    src: 'image1.jpg',
    theme: '',
  },
  {
    title: 'Print #2',
    src: 'image2.jpg',
    theme: '',
  },
  {
    title: 'Print #3',
    src: 'image3.jpg',
    theme: 'cream',
  },
  {
    title: 'Print #4',
    src: 'image4.jpg',
    theme: 'dark',
  },
  {
    title: 'Print #5',
    src: 'image5.jpg',
    theme: 'dark',
  },
];

const body = document.body;
const section = document.querySelector('section');
const description = document.querySelector('div.description');
const prevTag = document.querySelector('a.prev');
const nextTag = document.querySelector('a.next');

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  section.clientWidth / section.clientHeight,
  0.1,
  1000
);
const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

camera.position.z -= 2;

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setClearColor(0xff0000, 0);
renderer.setSize(section.clientWidth, section.clientHeight);

section.appendChild(renderer.domElement);

let current = 0;
let currentRotationX = Math.PI / 4;
let aimRotationX = 0;
let currentRotationY = 0;
let aimRotationY = 0;

// setup tools
const loader = new THREE.TextureLoader();
const clock = new THREE.Clock();

const arc = (Math.PI * 2) / cloths.length;

// loop over all of the clothes

cloths.forEach((cloth, index) => {
  cloth.uniforms = {
    image: { value: loader.load(`./assets/${cloth.src}`) },
    time: { value: clock.getElapsedTime() },
    mouse: { value: mouse },
    touchUv: { value: new THREE.Vector2(0.5, 0.5) },
    touchStrength: { value: 0.0 },
    touchStrengthAim: { value: 0.0 },
  };

  const dpi = 100;

  const geometry = new THREE.PlaneGeometry(4, 6, dpi, dpi * 1.5);
  const material = new THREE.ShaderMaterial({
    uniforms: cloth.uniforms,
    vertexShader: vert,
    fragmentShader: frag,
  });
  const shape = new THREE.Mesh(geometry, material);
  const group = new THREE.Group();
  group.rotation.set(0, index * arc, 0);

  shape.position.set(0, 0, -10);

  cloth.shape = shape;

  group.add(shape);
  scene.add(group);
});

const next = () => {
  current + 1 > cloths.length - 1 ? (current = 0) : (current += 1);
  aimRotationY -= arc;
};

const prev = () => {
  current - 1 < 0 ? (current = cloths.length - 1) : (current -= 1);
  aimRotationY += arc;
};

const update = function () {
  const cloth = cloths[current];
  description.innerHTML = cloth.title;
  // image.setAttribute('src', `./assets/${cloth.src}`);

  body.className = cloth.theme;
};

const animate = () => {
  const diffY = (aimRotationY - currentRotationY) * 0.025;
  currentRotationY += diffY;

  const diffX = (aimRotationX - currentRotationX) * 0.025;
  currentRotationX += diffX;

  camera.rotation.set(currentRotationX, currentRotationY, 0);

  raycaster.setFromCamera(mouse, camera);

  cloths.forEach((cloth) => {
    cloth.uniforms.time = { value: clock.getElapsedTime() };
    cloth.uniforms.mouse = { value: mouse };

    const intersects = raycaster.intersectObject(cloth.shape);

    if (intersects.length > 0) {
      cloth.uniforms.touchUv = { value: intersects[0].uv };
      cloth.uniforms.touchStrengthAim = { value: 1.0 };
    } else {
      cloth.uniforms.touchStrengthAim = { value: 0.0 };
    }

    const currentStrength = cloth.uniforms.touchStrength.value;
    const aimStrength = cloth.uniforms.touchStrengthAim.value;
    const diffStrength = (aimStrength - currentStrength) * 0.025;

    cloth.uniforms.touchStrength = { value: currentStrength + diffStrength };
  });

  requestAnimationFrame(animate);
  renderer.render(scene, camera);
};

// interactions
animate();
update();

prevTag.addEventListener('click', (e) => {
  e.preventDefault;
  prev();
  update();
});

nextTag.addEventListener('click', (e) => {
  e.preventDefault;
  next();
  update();
});

function onMouseMove(event) {
  // calculate mouse position in normalized device coordinates
  // (-1 to +1) for both components

  mouse.x = (event.clientX / section.clientWidth) * 2 - 1;
  mouse.y = -(event.clientY / section.clientHeight) * 2 + 1;
}

window.addEventListener('mousemove', onMouseMove);

window.addEventListener('resize', function () {
  camera.aspect = section.clientWidth / section.clientHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(section.clientWidth, section.clientHeight);
});
