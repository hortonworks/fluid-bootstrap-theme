/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */

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
