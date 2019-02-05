"use strict";

/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
var isTruncated = function isTruncated(element) {
  return element.clientWidth < element.scrollWidth;
};

var conditionalTooltipHandler = function conditionalTooltipHandler(event) {
  switch (event.target.getAttribute('data-condition')) {
    case 'truncated':
      if (!isTruncated(event.target)) {
        event.preventDefault();
      }

  }
};

$(document).on('show.bs.tooltip', conditionalTooltipHandler); // Must use jQuery to handle a jQuery event
//# sourceMappingURL=tooltip.js.map
