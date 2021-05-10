const cart = document.body.querySelector('.cart');
const cartProducts = cart.querySelector('.cart__products');
const products = document.body.getElementsByClassName('product');
const addedProducts = localStorage.getItem('products');

if (addedProducts) {
  cart.style.display = 'block';
  cartProducts.innerHTML = addedProducts;
}

for (product of products) {
  product.addEventListener('click', (event) => {
    const {target} = event;

    if (target.className.includes('dec')) {
      if (target.nextElementSibling.textContent > 1) {
        --target.nextElementSibling.textContent;
      }
    } else if (target.className.includes('inc')) {
      ++target.previousElementSibling.textContent;
    }

    if (target.className.includes('add')) {
      if (!addedProducts) {
        cart.style.display = 'block';
      }

      const {currentTarget} = event;
      const id = currentTarget.dataset.id;
      const img = currentTarget.querySelector('img');
      const imgProps = img.getBoundingClientRect();
      const value = currentTarget.querySelector('[class$="value"]').textContent;

      const sameProduct = cartProducts.querySelector(`[data-id="${id}"]`);

      if (!sameProduct) {
        cartProducts.insertAdjacentHTML('beforeend', `
          <div class="cart__product" data-id="${id}">
            <img class="cart__product-image" src="${img.src}">
            <div class="cart__product-count">${value}</div>
            <a href="#" class="product__remove">&times;</a>
          </div>
        `);
      }

      document.body.prepend(img.cloneNode(false));
      const copyImg = document.body.querySelector('img');
      copyImg.classList.add('product__image-copy');
      copyImg.style.left = imgProps.x + 'px';
      copyImg.style.top = imgProps.y + 'px';

      const start = {x: imgProps.x, y: imgProps.y};

      let addedImgProps;
      if (sameProduct) {
        addedImgProps = sameProduct.getBoundingClientRect();
      } else {
        let addedImg = cartProducts.lastElementChild.querySelector('img');
        addedImgProps = addedImg.getBoundingClientRect();
        cartProducts.lastElementChild.style.visibility = 'hidden';
      }

      const end = {x: addedImgProps.x, y: addedImgProps.y + addedImgProps.height};

      function moveCopyImg() {
        if (start.x > end.x && start.y < end.y) {
          clearInterval(timerId);
          copyImg.remove();
          if (sameProduct) {
            const productCounter = sameProduct.querySelector('[class$="count"]');
            productCounter.textContent = +value + +productCounter.textContent;
          } else {
            cartProducts.lastElementChild.style.visibility = 'visible';
          }
        }

        if (start.x < end.x) {
          start.x += 10;
          copyImg.style.left = start.x + 'px';
        }

        if (start.y > end.y) {
          start.y -= 10;
          copyImg.style.top = start.y + 'px';
        }
      }

      const timerId = setInterval(moveCopyImg, 8);

      localStorage.setItem('products', cartProducts.innerHTML);
    }
  });
}

cartProducts.addEventListener('click', (event) => {
  const {target} = event;

  if (target.className.includes('remove')) {
    target.parentElement.remove();

    if (cartProducts.children.length) {
      localStorage.setItem('products', cartProducts.innerHTML);
    } else {
      cart.style.display = 'none';
      localStorage.removeItem('products');
    }
  }
})