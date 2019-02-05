/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */

const positionMenus = () => {
  // Helper method for getting absolute top position
  const offsetTop = el => {
    if (el) {
      return el.offsetTop + offsetTop(el.offsetParent);
    }

    return 0;
  }

  //$('.navbar .nav-item.dropdown.show').dropdown('toggle'); //close all dropdowns

  // Position dropdown menus
  $('.navbar .nav-item.dropdown .dropdown-menu').each((i, el) => {
    el.style.top = `${offsetTop(el.parentElement) - el.parentElement.offsetParent.scrollTop + 36}px`;
  });

  // Position sub-item flyout menus
  $('.navbar-nav.collapse').each((i, el) => {
    const dataTarget = el.id;
    const parentElement = $(`.navbar-nav[data-toggle="collapse"][data-target="#${dataTarget}"]`)[0];
    if (parentElement) {
      el.style.top = `${offsetTop(parentElement) - parentElement.offsetParent.scrollTop}px`;
    }
  });

  const prePositionTooltip = event => {
    document.getElementById(event.target.getAttribute('aria-describedby')).style.visibility = "hidden";
  };

  const positionTooltip = event => {
    const tooltip = document.getElementById(event.target.getAttribute('aria-describedby'));

    const getPosition = target => {
      const parent = target.offsetParent;
      const placement = target.getAttribute("data-placement");

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
              top: parent.offsetTop + target.offsetTop + ((target.offsetHeight - tooltip.offsetHeight) / 2) - parent.scrollTop,
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
              top: parent.offsetTop + target.offsetTop + ((target.offsetHeight - tooltip.offsetHeight) / 2) - parent.scrollTop,
              left: -tooltip.offsetWidth - parent.scrollLeft,
              arrow: {
                top: "50%",
                left: "calc(100% - .4rem)", // .4rem = $tooltip-arrow-height, which is used for the tooltip's padding
                transform: "translateY(-50%) rotate(180deg)"
              }
            };
        }
      }
    };

    const position = getPosition(event.target);

    if (position) {
      tooltip.style.position = "fixed";
      tooltip.style.top = `${position.top}px`;
      tooltip.style.left = `${position.left}px`;
      tooltip.style.transform = "";
      tooltip.style.pointerEvents = "none";

      const arrow = tooltip.getElementsByClassName('arrow')[0];
      arrow.style.top = position.arrow.top;
      arrow.style.left = position.arrow.left;
      arrow.style.transform = position.arrow.transform;
    }

    tooltip.style.visibility = "visible";
  };

  $('.navbar.collapse [data-toggle="tooltip"]').on('inserted.bs.tooltip', prePositionTooltip);
  $('.navbar.collapse [data-toggle="tooltip"]').on('shown.bs.tooltip', positionTooltip);
}

const preventClickEventsWhenCollapsed = event => {
  const navbar = $(event.currentTarget).closest('.navbar.collapse')[0];
  if (!$(navbar).hasClass('show')) {
    event.stopImmediatePropagation();
  }
}

$(function () {
  positionMenus();
  $('.navbar-collapse').scroll(positionMenus);

  $('.navbar.collapse .navbar-nav[data-toggle="collapse"]').click(preventClickEventsWhenCollapsed);
  $('.navbar.collapse .nav-item.dropdown .dropdown-toggle').click(preventClickEventsWhenCollapsed);
});
