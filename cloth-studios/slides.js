const cloths = [
  {
    title: 'Print #1',
    src: 'image1.jpg',
  },
  {
    title: 'Print #2',
    src: 'image2.jpg',
  },
  {
    title: 'Print #3',
    src: 'image3.jpg',
  },
  {
    title: 'Print #4',
    src: 'image4.jpg',
  },
  {
    title: 'Print #5',
    src: 'image5.jpg',
  },
];

const image = document.querySelector('section img');
const description = document.querySelector('div.description');
const prevTag = document.querySelector('a.prev');
const nextTag = document.querySelector('a.next');

let current = 0;

const next = () => {
  current + 1 > cloths.length - 1 ? (current = 0) : (current += 1);
};

const prev = () => {
  current - 1 < 0 ? (current = cloths.length - 1) : (current -= 1);
};

const update = function () {
  const cloth = cloths[current];
  description.innerHTML = cloth.title;
  image.setAttribute('src', `./assets/${cloth.src}`);
};

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
