const tabs = document.getElementsByClassName('tab');
const content = document.getElementsByClassName('tab__content');

const lastChoice = {
  tab: tabs.item(0),
  getIndex() {
    return [...tabs].indexOf(this.tab);
  }
};

for (tab of tabs) {
  tab.addEventListener('click', (event) => {
    lastChoice.tab.classList.remove('tab_active');
    content.item(lastChoice.getIndex()).classList.remove('tab__content_active');

    lastChoice.tab = event.target;

    lastChoice.tab.classList.add('tab_active');
    content.item(lastChoice.getIndex()).classList.add('tab__content_active');
  });
}
