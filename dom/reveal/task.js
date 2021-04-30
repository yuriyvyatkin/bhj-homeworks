const paragraphs = document.getElementsByClassName('reveal');

document.addEventListener('scroll', () => {
  for (paragraph of paragraphs) {
    const paragraphParameters = paragraph.getBoundingClientRect();
    
    if (paragraphParameters.top < window.innerHeight - paragraphParameters.height) {
      paragraph.classList.add('reveal_active');
    }
  }
})

