'use strict';
// Modal selection
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

// button Scroll Selection
let btnScrollTo = document.querySelector('.btn--scroll-to');
let section1 = document.querySelector('#section--1');

// Tabs content Selectiion
let tabs = document.querySelectorAll('.operations__tab');
let tabsContainer = document.querySelector('.operations__tab-container');
let tabsContent = document.querySelectorAll('.operations__content');
///////////////////////////////////////

let nav = document.querySelector('.nav');
let header = document.querySelector('.header');

// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};
btnsOpenModal.forEach((arr, i) => {
  btnsOpenModal[i].addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

// //////////////////
// Button Scroll
btnScrollTo.addEventListener('click', function (e) {
  // get coordinate of the element you are scrolling too
  // let sec1coo = section1.getBoundingClientRect();
  // scrolling
  // window.scrollTo(sec1coo.left, sec1coo.top + window.scrollY);
  // window.scrollTo({
  //   left: sec1coo.left + window.screenX,
  //   top: sec1coo.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  // most modern and conveniet way of scrolling
  section1.scrollIntoView({ behavior: 'smooth' });
});

// /////////////////
// Page Navigation
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     let id = el.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

// Event delegation
// #1. Add an event listener to the common parent of its element
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();

  // 2. Determine what element originated the event
  if (e.target.classList.contains('nav__link')) {
    let id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// Operations

tabsContainer.addEventListener('click', function (e) {
  e.preventDefault();
  let clicked = e.target.closest('.operations__tab');
  if (!clicked) return;

  // Remove activate tab
  tabs.forEach(el => {
    el.classList.remove('operations__tab--active');
  });
  // Remove active content

  tabsContent.forEach(c => {
    c.classList.remove('operations__content--active');
  });

  // Active Tab
  clicked.classList.add('operations__tab--active');

  // Activate Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

// Menu Fade Animation
function hoverHandle(e) {
  if (e.target.classList.contains('nav__link')) {
    let clicked = e.target;

    let siblings = clicked.closest('.nav').querySelectorAll('.nav__link');
    let logo = clicked.closest('.nav').querySelector('img');
    siblings.forEach(el => {
      if (el !== clicked) {
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
}

// Passing an "arguement" to an handler function
nav.addEventListener('mouseover', hoverHandle.bind(0.5));
nav.addEventListener('mouseout', hoverHandle.bind(1));

// NAV SCROLL

// let initialCord = section1.getBoundingClientRect();
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCord.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// Sticky Navigation:InterSection Observer API
let obsOption = {
  root: null,
  threshold: 0,
};
//  the function would be called when the root is intersecting the observed element at that view point set by the threshold
// function obsCallback(entries, observer) {
// entries.forEach(entry => {
//   console.log(entry);
// });
// }
// let Observer = new IntersectionObserver(obsCallback, obsOption);
// Observe method to observe a tartget
// so section1 would be observed
// Observer.observe(section1);

function stickyNav(entries) {
  let [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
let navHeight = nav.getBoundingClientRect().height;

let headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Reveal Section
let allSection = document.querySelectorAll('.section');

function revealSection(entries, observer) {
  let [entry] = entries;
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
}

let sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

// Lazy loading Images
let imageTargets = document.querySelectorAll('img[data-src]');

function loadImg(entries, observer) {
  let [entry] = entries;

  if (!entry.isIntersecting) return;

  // Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  observer.unobserve(entry.target);
}

let imageObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});
imageTargets.forEach(img => {
  imageObserver.observe(img);
});

///////////////////////////////////////
// Slider

function slider() {
  let slides = document.querySelectorAll('.slide');
  let btnRight = document.querySelector('.slider__btn--right');
  let btnLeft = document.querySelector('.slider__btn--left');
  let dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  let maxSlide = slides.length;

  // functions
  function createDot() {
    slides.forEach((_, i) => {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"> </button>`
      );
    });
  }
  function goToSlides(slide) {
    slides.forEach((s, i) => {
      s.style.transform = `translateX(${100 * (i - slide)}%  )`;
    });
  }

  function activateDot(slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  }

  // Next Slides right

  function nextSlides() {
    if (currentSlide === maxSlide - 1) {
      currentSlide = 0;
    } else {
      currentSlide++;
    }
    goToSlides(currentSlide);
    activateDot(currentSlide);
  }

  // Previous SLides
  function prevSlides() {
    if (currentSlide === 0) {
      currentSlide = maxSlide - 1;
    } else {
      currentSlide--;
    }
    goToSlides(currentSlide);
    activateDot(currentSlide);
  }
  function init() {
    goToSlides(0);
    createDot();
    activateDot(0);
  }
  init();
  // Event Handlers
  btnRight.addEventListener('click', nextSlides);

  btnLeft.addEventListener('click', prevSlides);

  document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && prevSlides();
    e.key === 'ArrowRight' && nextSlides();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      let slide = e.target.dataset.slide;

      goToSlides(slide);
      activateDot(slide);
    }
  });
}
slider();
// LECTURES////////////////////////

// Inserting and creating element
let message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'i plaster for spah tonight he remain who go cook am <button class="btn btn--close- cookie"> spag</button>';

// Prepend is used to chain the new div to the header class at the top

// header.prepend(message);

// append is used to chain the new div to the header class at the top
// header.append(message);
// clone node is used to clone multiple div being inserted
// header.prepend(message.cloneNode(true));

// header.before(message);
// header.after(message);

// document
//   .querySelector('.cookie-message')
//   .addEventListener('click', function () {
//     message.remove();
//   });

// style
message.style.backgroundColor = '#37383d';

// CSS properties
message.style.height = parseFloat(getComputedStyle(message).height + 40 + 'px');
// console.log(getComputedStyle(message).height);

// setting properties in the javascript root folder so everywhere the property is used the code below would affect it.
// document.documentElement.style.setProperty('--color-primary', 'orangered');

// Attributess
let logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);

// Types of Event
// mouse enter has the same effect as CSS hover
let h1 = document.querySelector('h1');

let h1alert = function () {
  alert('Gba niggas');

  // Remove eventListner
  // h1.removeEventListener('mouseenter', h1alert);
};

// h1.addEventListener('mouseenter', h1alert);
setTimeout(() => h1.removeEventListener('mouseenter', h1alert), 3000);
// can be used instead of the above
// h1.onmouseenter = function () {
//   alert('who dey breattttttttt');
// };

// creating random number
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColour() {
  return `rgb(${randomInt(0, 255)},${randomInt(0, 255)},${randomInt(0, 255)})`;
}
// console.log(randomColour());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColour();
  // console.log('link', e.target, e.currentTarget);
  // stop Propagation (Propagation is when an event link in a child element affect the paren element)
  // e.stopPropagation();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColour();
  // console.log('Container', e.target, e.currentTarget);
});

document.querySelector('.nav').addEventListener('click', function (e) {
  // this.style.backgroundColor = randomColour();
  // console.log('NAV', e.target, e.currentTarget);
});

// Dom traversing is going deep into a parent element

// going deep
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.childNodes);
// console.log(h1.children);
// h1.firstElementChild.style.color = 'white';
// h1.lastElementChild.style.color = 'orangered';

// going upward
// console.log(h1.parentNode);
// console.log(h1.parentElement);

// The closest attribute selects the closest header to the H1
// h1.closest('.header').style.background = 'var(--gradient-secondary)';

// Going sideways : SElecting Siblings
// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);

// console.log(h1.parentElement.children);
