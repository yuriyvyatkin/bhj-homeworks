const signin = document.getElementById('signin');
const signinForm = document.getElementById('signin__form');
const welcome = document.getElementById('welcome');
const signoutBtn = document.getElementById('signout__btn');
const userId = document.getElementById('user_id');
const getCookie = (name) => {
  return document.cookie
    ?.split('; ')
    .find(row => row.startsWith(name))
    ?.split('=')[1];
}

userId.textContent = getCookie('userId');

if (userId.textContent) {
  welcome.classList.add('welcome_active');
} else {
  signin.classList.add('signin_active');
}

signinForm.onsubmit = (event) => {
  event.preventDefault();

  const xhr = new XMLHttpRequest();
  xhr.open('POST', signinForm.getAttribute('action'));
  xhr.responseType = 'json';
  const formData = new FormData(signinForm);
  xhr.send(formData);

  xhr.onload = function () {
    if (xhr.status !== 200) {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    } else {
      if (xhr.response.success) {
        const id = xhr.response.user_id;
        userId.textContent = id;
        document.cookie = `userId=${id}; expires=Tue, 19 Jan 2038 03:14:07 GMT`;
        welcome.classList.add('welcome_active');
        signin.classList.remove('signin_active');
      } else {
        alert('Неверный логин/пароль');
      }
    }
    signinForm.reset();
  }
}

signoutBtn.onclick = () => {
  document.cookie = 'userId=; max-age=0';
  welcome.classList.remove('welcome_active');
  signin.classList.add('signin_active');
}