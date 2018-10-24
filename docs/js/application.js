/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */

function updateContainerExample() {
  $('#documentWidth').text($('body').css('width'));
  $('#containerWidth').text($('#containerExample').css('width'));
}

$(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();
  $('.navbar').on('hidden.bs.collapse', function (event) {
    if (!event.target.classList.contains("brand-menu") // exclude the brand menu from this behavior
      && event.target === event.currentTarget) {
      $(this).find('.navbar-nav.collapse').css('margin-bottom', function () {
        return `${this.children.length * -38}px`;
      });
    }
  });
  $('.navbar').on('shown.bs.collapse', function (event) {
    if (!event.target.classList.contains("brand-menu") // exclude the brand menu from this behavior
      && event.target === event.currentTarget) {
      $(this).find('.navbar-nav.collapse').css('margin-bottom', '0');
    }
  });

  updateContainerExample();
  $(window).resize(updateContainerExample);
});
