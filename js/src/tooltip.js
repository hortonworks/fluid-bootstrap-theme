const isTruncatedX = (element, tolerance) => {
  const tol = tolerance || 2;
  return element.clientWidth + tol < element.scrollWidth;
};

const isTruncatedY = (element, tolerance) => {
  const tol = tolerance || 2;
  return element.clientHeight + tol < element.scrollHeight;
};

const conditionalTooltipHandler = (event, tolerance) => {
  switch (event.target.getAttribute('data-condition')) {
    case 'truncated':
    case 'truncated-x':
      if (!isTruncatedX(event.target, tolerance)) {
        event.preventDefault();
      }
      break;
    case 'truncated-y':
      if (!isTruncatedY(event.target, tolerance)) {
        event.preventDefault();
      }
      break;
    case 'truncated-both':
      if (!isTruncatedX(event.target, tolerance)
        && !isTruncatedY(event.target, tolerance)) {
        event.preventDefault();
      }
  }
};

$(document).on('show.bs.tooltip', conditionalTooltipHandler); // Must use jQuery to handle a jQuery event
