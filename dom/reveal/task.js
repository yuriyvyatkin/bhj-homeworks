const paragraphs = document.getElementsByClassName('reveal');

document.addEventListener('scroll', () => {
  for (paragraph of paragraphs) {
    const paragraphParameters = paragraph.getBoundingClientRect();

    if (paragraphParameters.top < window.innerHeight && paragraphParameters.top > -paragraphParameters.height) {
      paragraph.classList.add('reveal_active');
    } else {
      paragraph.classList.remove('reveal_active');
    }
  }
})