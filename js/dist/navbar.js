"use strict";

/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
var positionMenus = function positionMenus() {
  // Helper method for getting absolute top position
  var offsetTop = function offsetTop(el) {
    if (el) {
      return el.offsetTop + offsetTop(el.offsetParent);
    }

    return 0;
  }; //$('.navbar .nav-item.dropdown.show').dropdown('toggle'); //close all dropdowns
  // Position dropdown menus


  $('.navbar .nav-item.dropdown .dropdown-menu').each(function (i, el) {
    el.style.top = "".concat(offsetTop(el.parentElement) - el.parentElement.offsetParent.scrollTop + 36, "px");
  }); // Position sub-item flyout menus

  $('.navbar-nav.collapse').each(function (i, el) {
    var dataTarget = el.id;
    var parentElement = $(".navbar-nav[data-toggle=\"collapse\"][data-target=\"#".concat(dataTarget, "\"]"))[0];

    if (parentElement) {
      el.style.top = "".concat(offsetTop(parentElement) - parentElement.offsetParent.scrollTop, "px");
    }
  });
};

var preventClickEventsWhenCollapsed = function preventClickEventsWhenCollapsed(event) {
  var navbar = $(event.currentTarget).closest('.navbar.collapse')[0];

  if (!$(navbar).hasClass('show')) {
    event.stopImmediatePropagation();
  }
};

$(function () {
  positionMenus();
  $('.navbar-collapse').scroll(positionMenus);
  $('.navbar.collapse .navbar-nav[data-toggle="collapse"]').click(preventClickEventsWhenCollapsed);
  $('.navbar.collapse .nav-item.dropdown .dropdown-toggle').click(preventClickEventsWhenCollapsed);
});
//# sourceMappingURL=navbar.js.map
