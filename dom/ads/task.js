const rotators = document.getElementsByClassName('rotator');

function changeColor(currentIndex, rotatorCases) {
  rotatorCases.item(currentIndex).style.color = rotatorCases.item(currentIndex).dataset.color;
}

function setCase(currentIndex, rotatorCases) {
  const id = setTimeout(() => {
    rotatorCases.item(currentIndex).classList.remove('rotator__case_active');

    currentIndex = (currentIndex + 1) % rotatorCases.length;

    rotatorCases.item(currentIndex).classList.add('rotator__case_active');

    changeColor(currentIndex, rotatorCases);

    setCase(currentIndex, rotatorCases);
  }, rotatorCases.item(currentIndex).dataset.speed);
}

for (rotator of rotators) {
  const rotatorCases = rotator.getElementsByClassName('rotator__case');
  const currentIndex = 0;

  changeColor(currentIndex, rotatorCases);

  setCase(currentIndex, rotatorCases);
}