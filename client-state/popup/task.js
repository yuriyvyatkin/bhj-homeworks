const popup = document.getElementById('subscribe-modal');

if (!document.cookie.split('; ').find(row => row.startsWith('popupClosed'))) {
  popup.classList.add('modal_active');

  const popupClose = popup.querySelector('.modal__close');

  popupClose.onclick = () => {
    popup.classList.remove('modal_active');
    document.cookie = 'popupClosed=true; expires=Tue, 19 Jan 2038 03:14:07 GMT';
  }
}

