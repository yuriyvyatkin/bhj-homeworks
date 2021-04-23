const menus = document.querySelectorAll('.menu_main');

menus.forEach((menu) => {
  const links = menu.querySelectorAll('a[href=""]');

  let selected = null;

  links.forEach(
    (link) =>
      link.onclick = function () {
        if (selected) {
          selected.nextElementSibling.classList.remove('menu_active');
        }

        if (selected !== this) {
          selected = this;
          this.nextElementSibling.classList.add('menu_active');
        } else {
          selected = null;
          this.nextElementSibling.classList.remove('menu_active');
        }

        return false;
      }
  );
});
