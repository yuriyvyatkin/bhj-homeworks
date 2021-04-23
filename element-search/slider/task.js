const leftArrow = document.querySelector('.slider__arrow_prev');
const rightArrow = document.querySelector('.slider__arrow_next');
const sliderItems = document.querySelectorAll('.slider__item');
const sliderDots = document.querySelectorAll('.slider__dot');

let number = 0;

function getNextItem(number, upperBound) {
  if (number === upperBound) {
    return 0;
  } else if (number === -1) {
    return upperBound - 1;
  } else {
    return number;
  }
}

function removeActiveClass(number) {
  sliderItems.item(number).classList.remove('slider__item_active');
  sliderDots.item(number).classList.remove('slider__dot_active');
}

function addActiveClass(number) {
  sliderItems.item(number).classList.add('slider__item_active');
  sliderDots.item(number).classList.add('slider__dot_active');
}

sliderDots.forEach(sliderDot => sliderDot.onclick = function () {
  removeActiveClass(number);
  number = Array.from(sliderDots).indexOf(this);
  addActiveClass(number);
})

leftArrow.onclick = function () {
  removeActiveClass(number);
  number = getNextItem(--number, sliderItems.length);
  addActiveClass(number);
}

rightArrow.onclick = function () {
  removeActiveClass(number);
  number = getNextItem(++number, sliderItems.length);
  addActiveClass(number);
}

