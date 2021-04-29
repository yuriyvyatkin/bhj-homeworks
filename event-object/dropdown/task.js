for (dropdown of document.getElementsByClassName('dropdown')) {
    dropdown.style.display = "inline-block";

    dropdown.addEventListener('click', (event) => {
      const target = event.target;
      const firstChild = event.currentTarget.firstElementChild;
      const secondChildClasses = firstChild.nextElementSibling.classList;
    
      if (target === firstChild) {
        secondChildClasses.toggle('dropdown__list_active');
      } else {
        event.preventDefault();
        firstChild.textContent = target.textContent;
        secondChildClasses.remove('dropdown__list_active');
      }
    });
}