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
