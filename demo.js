/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */

const addAlert = (message, options = {}) => {
  const makeAlert = (message, options) => {
    const alert = document.createElement('div');
    alert.classList.add('alert', 'fade', 'show');
    alert.setAttribute('role', 'alert');

    switch (options.type) {
      case 'info':
        alert.classList.add('alert-info');
        break;
      case 'success':
        alert.classList.add('alert-success');
        break;
      case 'warning':
        alert.classList.add('alert-warning');
        break;
      case 'danger':
        alert.classList.add('alert-danger');
        break;
      default:
        alert.classList.add('alert-default');
        break;
    }

    const wrapper = document.createElement('div');

    const heading = document.createElement('div');
    heading.classList.add('alert-heading');
    heading.innerHTML = message;
    wrapper.appendChild(heading);

    if (options.content) {
      const content = document.createElement('div');
      content.innerHTML = options.content;
      wrapper.appendChild(content);
    }

    alert.appendChild(wrapper);

    if (options.dismissible) {
      alert.classList.add('alert-dismissible');
      const temp = document.createElement('div');
      temp.innerHTML = '<button type="button" class="close" data-dismiss="alert" aria-label="Close"></button>';
      alert.appendChild(temp.firstChild);
    }

    return alert;
  };

  if (!message || typeof message !== 'string') return;

  const {
    target = document.documentElement,
    type = 'default', // may be 'info', 'success', 'warning', 'danger', or 'default'
    content = null,
    dismissible = true,
    duration = 0, //in seconds
    position = 'first' // if 'first' alert will be inserted above existing alerts
  } = options;

  const alert = makeAlert(message, {target, type, content, dismissible, duration, position});

  if (position === 'first') {
    target.insertBefore(alert, target.firstChild);
  } else {
    target.appendChild(alert);
  }

  if (duration) {
    setTimeout(() => $(alert).alert('close'), duration * 1000);
  }
};

const addAlertHandler = event => {
  event.preventDefault();

  const arrayToObj = (output, input) => {
    output[input.name] = input.value;
    return output;
  };

  const data = $(event.currentTarget).serializeArray().reduce(arrayToObj, {});

  const getTarget = (topBottom, rightLeft) => {
    let id;

    if (topBottom === 'top') {
      if (rightLeft === 'right') {
        id = 'alertsTopRight';
      } else {
        id = 'alertsTopLeft';
      }
    } else {
      if (rightLeft === 'right') {
        id = 'alertsBottomRight';
      } else {
        id = 'alertsBottomLeft';
      }
    }

    return document.getElementById(id) || document.documentElement;
  }

  const options = {
    target: getTarget(data.alertTopBottom, data.alertRightLeft),
    type: data.alertType,
    content: data.alertContent,
    dismissible: !!data.alertDismissible,
    duration: Number.parseInt(data.alertDuration),
    position: data.alertTopBottom === 'bottom' ? 'first' : 'last'
  };

  addAlert(data.alertMessage, options);

  return false;
};

const dismissAllAlerts = () => {
  $(".alert-container .alert").alert('close');
};

const updateContainerExample = function () {
  $('#documentWidth').text($('body').css('width'));
  $('#containerWidth').text($('#containerExample').css('width'));
  $('#containerFluidWidth').text($('#containerFluidExample').css('width'));
};

$(function () {
  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

  updateContainerExample();
  $(window).resize(updateContainerExample);

  $('#addAlert').on('submit', addAlertHandler);
  $('#dismissAllAlerts').on('click', dismissAllAlerts);
});
