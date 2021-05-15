const progressBar = document.getElementById('progress');
const inputFile = document.getElementsByName('file')[0];
const sendButton = document.getElementById('send');

sendButton.onclick = (event) => {
  event.preventDefault();

  sendButton.disabled = true;

  const xhr = new XMLHttpRequest();

  xhr.open('POST', 'https://netology-slow-rest.herokuapp.com/upload.php');

  xhr.upload.onprogress = (event) => {
    progressBar.value += event.loaded / event.total;
  }

  xhr.upload.onload = (event) => {
    if (event.loaded === event.total) {
      alert('Данные успешно отправлены.');
    } else {
      console.log(`Error ${xhr.status}: ${xhr.statusText}`);
    }
    document.forms.form.reset();
    progressBar.value = 0;
    sendButton.disabled = false;
  }

  xhr.send(inputFile.files[0]);
}
