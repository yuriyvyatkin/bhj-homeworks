const book = document.getElementById('book');

const bookControls = book.getElementsByClassName('book__control');

for (bookControl of bookControls) {
  let prevElement = bookControl.querySelector('a[class$="active"]');

  bookControl.addEventListener('click', (event) => {
    event.preventDefault();

    let prevValue = prevElement.classList[1];
    const classActive = prevElement.classList[prevElement.classList.length - 1];
    let currentValue = event.target.classList[1];

    if (/^(?!font-size).*$/i.test(currentValue)) {
      const regex = /(^\w*)(_\w*)(_)/i;

      if (/^text/i.test(currentValue)) {
        prevValue = prevValue.replace(regex, 'book$2-');
        currentValue = currentValue.replace(regex, 'book$2-');
      }

      if (/^bg/i.test(currentValue)) {
        prevValue = prevValue.replace(regex, 'book_$1-');
        currentValue = currentValue.replace(regex, 'book_$1-');
      }
    }

    book.classList.remove(prevValue);

    if (currentValue) {
      book.classList.add(currentValue);
    }

    prevElement.classList.remove(classActive);

    event.target.classList.add(classActive);

    prevElement = event.target;
  });
}
