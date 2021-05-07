const interestsList = document.querySelector('.interests_main');

function markDescendants(target, parent) {
  if (parent.children.length > 1) {
    target.indeterminate = false;

    if (target.checked === true) {
      for (interest of parent.children[1].getElementsByClassName('interest__check')) {
        interest.checked = true;
      }
    } else {
      for (interest of parent.children[1].getElementsByClassName('interest__check')) {
        interest.checked = false;
      }
    }
  }
}

function countChildrenCheckboxes(ancestor) {
  ancestor.classList.add('root');

  const sameLevelCheckboxes = [...ancestor.querySelectorAll('.root > ul > li > label > .interest__check')];

  ancestor.classList.remove('root');

  const numberEmptyCheckboxes = sameLevelCheckboxes.reduce((acc, sameLevelCheckbox) => {
    if (!sameLevelCheckbox.checked && !sameLevelCheckbox.indeterminate) {
      ++acc;
    }
    return acc;
  }, 0);

  result = {
    empty: numberEmptyCheckboxes,
    total: sameLevelCheckboxes.length
  }

  return result;
}

function markAncestors(ancestor) {
  const nextAncestor = ancestor.parentElement.closest('li.interest');

  if (!nextAncestor) {
    return;
  }

  const nextAncestorCheckbox = nextAncestor.querySelector('.interest__check');

  const checkboxesNumber = countChildrenCheckboxes(nextAncestor);

  if (checkboxesNumber.empty === checkboxesNumber.total) {
    nextAncestorCheckbox.indeterminate = false;
    nextAncestorCheckbox.checked = false;
  } else if (checkboxesNumber.empty > 0) {
    nextAncestorCheckbox.indeterminate = true;
  } else {
    nextAncestorCheckbox.indeterminate = false;
    nextAncestorCheckbox.checked = true;
  }

  markAncestors(nextAncestor);
}

interestsList.onclick = (event) => {
  const target = event.target;

  if (target.tagName === 'INPUT') {
    const parent = target.closest('li.interest');

    markDescendants(target, parent);

    markAncestors(parent);
  }
}
