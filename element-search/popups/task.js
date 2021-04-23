const modalMain = document.querySelector('#modal_main');
const modalSuccess = document.querySelector('#modal_success');
const modalClose = document.querySelectorAll('.modal__close');
const showSuccess = document.querySelector('.show-success');

modalMain.classList.toggle('modal_active');

modalClose.forEach((modal) => modal.onclick = function () {
      this.closest('.modal').classList.toggle('modal_active');
  }
);

showSuccess.onclick = function () {
  modalMain.classList.toggle('modal_active');
  modalSuccess.classList.toggle('modal_active');
}
