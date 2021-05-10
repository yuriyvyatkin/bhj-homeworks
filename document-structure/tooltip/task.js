const tooltipTriggers = document.getElementsByClassName('has-tooltip');
const tooltip = document.querySelector('.tooltip');

let prevTarget = tooltipTriggers[0];
let timerId;

function getTooltipPosition() {
  const sides = ['top', 'right', 'bottom', 'left'];
  return sides[Math.floor(Math.random() * sides.length)];
}

function setTooltipPosition(target) {
  const {dataset} = target;
  const targetProps = target.getBoundingClientRect();
  const targetCompsStyles = window.getComputedStyle(target);
  let targetLineHeight = parseInt(targetCompsStyles.lineHeight, 10);
  if (!targetLineHeight) {
    targetLineHeight = Math.floor(parseInt(targetCompsStyles.fontSize, 10) * 0.625);
  }

  const indent = 3;

  let tooltipProps = tooltip.getBoundingClientRect();

  function setTop() {
    tooltip.style.top = targetProps.y - targetProps.height - targetLineHeight - indent + 'px';
    tooltip.style.left = targetProps.x + 'px';
  }

  function setRight() {
    tooltip.style.top = targetProps.y + (Math.round((targetProps.height - tooltipProps.height) / 2)) + 'px';
    tooltip.style.left = targetProps.x + targetProps.width + indent + 'px';
  }

  function setBottom() {
    tooltip.style.top = targetProps.y + targetProps.height + indent + 'px';
    tooltip.style.left = targetProps.x + 'px';
  }

  function setLeft() {
    tooltip.style.top = targetProps.y + (Math.round((targetProps.height - tooltipProps.height) / 2)) + 'px';
    tooltip.style.left = targetProps.x - tooltipProps.width - indent + 'px'
  }

  switch (dataset.position) {
    case 'top':
      setTop();
      break;
    case 'right':
      setRight();
      break;
    case 'bottom':
      setBottom();
      break;
    case 'left':
      setLeft();
      break;
    default:
      setBottom();
      break;
  }

  tooltipProps = tooltip.getBoundingClientRect();

  if (tooltipProps.y < 0) {
    dataset.position = 'bottom';
    setBottom();
  }

  if (tooltipProps.right > window.innerWidth) {
    dataset.position = 'left';
    setLeft();
  }

  if (tooltipProps.bottom > window.innerHeight) {
    dataset.position = 'top';
    setTop();
  }

  if (tooltipProps.x < 0) {
    dataset.position = 'right';
    setRight();
  }
}

for (tooltipTrigger of tooltipTriggers) {
  tooltipTrigger.setAttribute('data-position', getTooltipPosition());

  tooltipTrigger.onclick = (event) => {
    event.preventDefault();

    clearTimeout(timerId);

    const {target} = event;

    if (target.classList.contains('tooltip-triggered')) {
      tooltip.classList.remove('tooltip_active');

      target.classList.remove('tooltip-triggered');
    } else {
      prevTarget.classList.remove('tooltip-triggered');
      target.classList.add('tooltip-triggered');
      prevTarget = target;

      tooltip.textContent = target.title;
      tooltip.classList.add('tooltip_active');

      setTooltipPosition(target);

      timerId = setTimeout(() => {
        tooltip.classList.remove('tooltip_active');
        prevTarget.classList.remove('tooltip-triggered');
      }, 2000);
    }
  }
}