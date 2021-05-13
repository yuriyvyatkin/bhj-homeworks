const items = document.getElementById('items');
const loader = document.getElementById('loader');

function createHTMLBlock(charCode, value) {
  return `
    <div class='item'>
      <div class='item__code'>
          ${charCode}
      </div>
      <div class='item__value'>
          ${value}
      </div>
      <div class='item__currency'>
          руб.
      </div>
    </div>
  `;
}

const storage = JSON.parse(localStorage.getItem('currencyUnits'));

if (storage) {
  loader.classList.remove('loader_active');

  let html = '';

  storage.forEach(unit => {
    html += createHTMLBlock(unit.charCode, unit.value);
  });

  items.innerHTML = html;
}

const xhr = new XMLHttpRequest();

xhr.open('GET', 'https://netology-slow-rest.herokuapp.com');

xhr.responseType = 'json';

xhr.send();

xhr.onload = function () {
  if (xhr.status !== 200) {
    console.log(`Error ${xhr.status}: ${xhr.statusText}`);
  } else {
    const currencyUnits = Object.values(xhr.response.response.Valute);
    const localCurrencyUnits = [];
    let html = '';

    currencyUnits.forEach(unit => {
      html += createHTMLBlock(unit.CharCode, unit.Value);

      localCurrencyUnits.push({
        charCode: unit.CharCode,
        value: unit.Value
      });
    });

    items.innerHTML = html;
    loader.classList.remove('loader_active');
    localStorage.setItem('currencyUnits', JSON.stringify(localCurrencyUnits));
  }
}