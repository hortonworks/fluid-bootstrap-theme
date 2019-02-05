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

  var prePositionTooltip = function prePositionTooltip(event) {
    document.getElementById(event.target.getAttribute('aria-describedby')).style.visibility = "hidden";
  };

  var positionTooltip = function positionTooltip(event) {
    var tooltip = document.getElementById(event.target.getAttribute('aria-describedby'));

    var getPosition = function getPosition(target) {
      var parent = target.offsetParent;
      var placement = target.getAttribute("data-placement");

      if (parent) {
        switch (placement) {
          case "top":
            return {
              top: parent.offsetTop + target.offsetTop - tooltip.offsetHeight - parent.scrollTop,
              left: (target.offsetWidth - tooltip.offsetWidth) / 2 - parent.scrollLeft,
              arrow: {
                left: "50%",
                transform: "translateX(-50%)"
              }
            };

          case "right":
            return {
              top: parent.offsetTop + target.offsetTop + (target.offsetHeight - tooltip.offsetHeight) / 2 - parent.scrollTop,
              left: parent.offsetLeft + target.offsetWidth - parent.scrollLeft,
              arrow: {
                top: "50%",
                left: "1px",
                transform: "translateY(-50%) rotate(180deg)"
              }
            };

          case "bottom":
            return {
              top: parent.offsetTop + target.offsetTop + target.offsetHeight - parent.scrollTop,
              left: (target.offsetWidth - tooltip.offsetWidth) / 2 - parent.scrollLeft,
              arrow: {
                left: "50%",
                transform: "translateX(-50%)"
              }
            };

          case "left":
            return {
              top: parent.offsetTop + target.offsetTop + (target.offsetHeight - tooltip.offsetHeight) / 2 - parent.scrollTop,
              left: -tooltip.offsetWidth - parent.scrollLeft,
              arrow: {
                top: "50%",
                left: "calc(100% - .4rem)",
                // .4rem = $tooltip-arrow-height, which is used for the tooltip's padding
                transform: "translateY(-50%) rotate(180deg)"
              }
            };
        }
      }
    };

    var position = getPosition(event.target);

    if (position) {
      tooltip.style.position = "fixed";
      tooltip.style.top = "".concat(position.top, "px");
      tooltip.style.left = "".concat(position.left, "px");
      tooltip.style.transform = "";
      tooltip.style.pointerEvents = "none";
      var arrow = tooltip.getElementsByClassName('arrow')[0];
      arrow.style.top = position.arrow.top;
      arrow.style.left = position.arrow.left;
      arrow.style.transform = position.arrow.transform;
    }

    tooltip.style.visibility = "visible";
  };

  $('.navbar.collapse [data-toggle="tooltip"]').on('inserted.bs.tooltip', prePositionTooltip);
  $('.navbar.collapse [data-toggle="tooltip"]').on('shown.bs.tooltip', positionTooltip);
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
