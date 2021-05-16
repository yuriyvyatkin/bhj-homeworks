const editor = document.getElementById('editor');
const resetButton = document.getElementById('reset');

editor.value = localStorage.getItem('editorContent');

editor.onkeyup = () => {
  localStorage.setItem('editorContent', editor.value);
}

resetButton.onclick = () => {
  editor.value = '';
  localStorage.clear();
}
