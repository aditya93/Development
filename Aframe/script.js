// $ = (queryString) => document.querySelector(queryString);

// const shiftHue = (hue) => (hue + 1) % 360;

// let hue = 0;

// const animate = () => {
// 	hue = shiftHue(hue);
// 	const color = 'hsl(${hue}, 100%, 50%)';
// 	$('a-sphere').setAttribute('color',color);

// 	const position = '0 ${1.5 + Math.sin(Date.now())} -2';
// 	$('a-sphere').setAttribute('position',position);

// 	requestAnimationFrame(animate);

// };


// requestAnimationFrame(animate);


const $ = (query) => document.querySelector(query);

const sphere = $('a-sphere');
const plane = $('a-plane');

const shiftDegrees = (value) => (value + 1) % 360;

let degrees = 0;

const animate = () => {
  degrees = shiftDegrees(degrees);
  const color = `hsl(${degrees}, 100%, 50%)`;
  const variation = Math.sin(Date.now() / 1000);
  const position = `0 ${1.5 + variation} -2`;
  const rotation = `-90 0 ${degrees}`;

  sphere.setAttribute('color', color);
  sphere.setAttribute('position', position);

  plane.setAttribute('color', color);
  plane.setAttribute('rotation', rotation);

  requestAnimationFrame(animate);
};

requestAnimationFrame(animate);