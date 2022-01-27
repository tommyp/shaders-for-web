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

const renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true,
});
renderer.setClearColor(0xff0000, 0);
renderer.setSize(section.clientWidth, section.clientHeight);

section.appendChild(renderer.domElement);

let current = 0;

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 5;

const next = () => {
  current + 1 > cloths.length - 1 ? (current = 0) : (current += 1);
};

const prev = () => {
  current - 1 < 0 ? (current = cloths.length - 1) : (current -= 1);
};

const update = function () {
  const cloth = cloths[current];
  description.innerHTML = cloth.title;
  // image.setAttribute('src', `./assets/${cloth.src}`);

  body.className = cloth.theme;
};

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
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
