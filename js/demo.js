"use strict";

/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
//#region Alert tester
var addAlert = function addAlert(message) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var makeAlert = function makeAlert(message, options) {
    var alert = document.createElement('div');
    alert.classList.add('alert', 'fade');
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

    var wrapper = document.createElement('div');
    var heading = document.createElement('div');
    heading.classList.add('alert-heading');
    heading.innerHTML = message;
    wrapper.appendChild(heading);

    if (options.content) {
      var _content = document.createElement('div');

      _content.innerHTML = options.content;
      wrapper.appendChild(_content);
    }

    alert.appendChild(wrapper);

    if (options.dismissible) {
      alert.classList.add('alert-dismissible');
      var temp = document.createElement('div');
      temp.innerHTML = '<button type="button" class="close" aria-label="Close" onclick="dismissAlertHandler(this)"></button>';
      alert.appendChild(temp.firstChild);
    }

    var alertCollapse = document.createElement('div');
    alertCollapse.classList.add('alert-collapse', 'collapse', 'show');
    alertCollapse.appendChild(alert);
    return alertCollapse;
  };

  if (!message || typeof message !== 'string') return;
  var _options$target = options.target,
      target = _options$target === void 0 ? document.documentElement : _options$target,
      _options$type = options.type,
      type = _options$type === void 0 ? 'default' : _options$type,
      _options$content = options.content,
      content = _options$content === void 0 ? null : _options$content,
      _options$dismissible = options.dismissible,
      dismissible = _options$dismissible === void 0 ? true : _options$dismissible,
      _options$duration = options.duration,
      duration = _options$duration === void 0 ? 0 : _options$duration,
      _options$position = options.position,
      position = _options$position === void 0 ? 'first' : _options$position;
  var alert = makeAlert(message, {
    target: target,
    type: type,
    content: content,
    dismissible: dismissible,
    duration: duration,
    position: position
  });

  if (position === 'first') {
    target.insertBefore(alert, target.firstChild);
  } else {
    target.appendChild(alert);
  }

  setTimeout(function () {
    return alert.firstChild.classList.add('show');
  });

  if (duration) {
    setTimeout(function () {
      return dismissAlert($(alert.firstChild));
    }, duration * 1000);
  }
};

var addAlertHandler = function addAlertHandler(event) {
  event.preventDefault();

  var arrayToObj = function arrayToObj(output, input) {
    output[input.name] = input.value;
    return output;
  };

  var data = $(event.currentTarget).serializeArray().reduce(arrayToObj, {});

  var getTarget = function getTarget(topBottom, rightLeft) {
    var id;

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
  };

  var options = {
    target: getTarget(data.alertTopBottom, data.alertRightLeft),
    type: data.alertType,
    content: data.alertContent,
    dismissible: !!data.alertDismissible,
    duration: window.parseInt(data.alertDuration),
    position: data.alertTopBottom === 'bottom' ? 'first' : 'last'
  };
  addAlert(data.alertMessage, options);
  return false;
};

var dismissAlert = function dismissAlert(alert) {
  var alertCollapse = alert.closest('.alert-collapse');
  alert.one('close.bs.alert', function () {
    return alertCollapse.collapse('hide');
  });
  alertCollapse.one('hidden.bs.collapse', function () {
    return alertCollapse.remove();
  });
  alert.alert('close');
};

var dismissAlertHandler = function dismissAlertHandler(close) {
  var alert = $(close).closest('.alert');
  dismissAlert(alert);
};

var dismissAllAlerts = function dismissAllAlerts() {
  $(".alert-container .alert").alert('close');
}; //#endregion
//#region Container example


var updateContainerExample = function updateContainerExample() {
  $('#documentWidth').text($('body').css('width'));
  $('#containerWidth').text($('#containerExample').css('width'));
  $('#containerFluidWidth').text($('#containerFluidExample').css('width'));
};

$(function () {
  if ($.fn.popover) {
    $('[data-toggle="popover"]').popover();
  }

  if ($.fn.tooltip) {
    $('[data-toggle="tooltip"]').tooltip({
      boundary: 'window'
    });
  }

  updateContainerExample();
  $(window).resize(updateContainerExample);
  $('#addAlert').on('submit', addAlertHandler);
  $('#dismissAllAlerts').on('click', dismissAllAlerts);
}); //#endregion
//#region Wizard in modal

var currentStep;

function updateDisplayedStep(targetStep) {
  var toHide = document.querySelectorAll('[class*="step-"]');
  Array.prototype.forEach.call(toHide, function (el) {
    el.style.display = 'none';
  });
  var toShow = document.getElementsByClassName("step-".concat(targetStep));
  Array.prototype.forEach.call(toShow, function (el) {
    el.style.display = 'block';
  });
  var buttons = document.getElementsByClassName('wizard-nav-button');
  Array.prototype.forEach.call(buttons, function (el) {
    el.style.display = 'block';
  });
  document.getElementById('finish').style.display = 'none';

  if (targetStep === 1) {
    document.getElementById('back').style.display = 'none';
  }

  if (targetStep === 3) {
    document.getElementById('next').style.display = 'none';
    document.getElementById('finish').style.display = 'block';
  }
}

function back() {
  updateDisplayedStep(--currentStep);
}

function next() {
  updateDisplayedStep(++currentStep);
}

function goToStep(step) {
  currentStep = step;
  updateDisplayedStep(step);
}

function cancelConfirmation(selector) {
  $(selector).one('hidden.bs.modal', function () {
    return $('body').addClass('modal-open');
  });
  $(selector).modal('hide');
} //#endregion
//#region Form validation
// Example starter JavaScript for disabling form submissions if there are invalid fields


(function () {
  'use strict';

  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByTagName('form'); // Loop over them and prevent submission

    var validation = Array.prototype.filter.call(forms, function (form) {
      if (form.classList.contains('validate')) {
        form.addEventListener('submit', function (event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }

          form.classList.add('was-validated');
        }, false);
      }
    });
  }, false);
})(); //#endregion
//#region Dashrows


$(function () {
  $('.js-btn-a').click(function () {
    $('.js-target-a').toggleClass('expanded');
  });
  $('.js-btn-b').click(function () {
    $('.js-target-b').toggleClass('expanded');
  });
}); //#endregion
//#region Sortable table example
// Uses List.js only for demo purposes to show how a Fluid sortable table should behave

var toggleRowSelection = function toggleRowSelection(target) {
  var getRow = function getRow(el) {
    do {
      if (el.matches('tr')) {
        return el;
      }

      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
  };

  var row = getRow(target);

  if (row) {
    var checkbox = row.querySelector('tr input[type="checkbox"]');

    if (checkbox) {
      checkbox.checked = target.checked;
      target.checked ? row.classList.add('selected') : row.classList.remove('selected');
    }
  }
};

var checkHandler = function checkHandler(event) {
  toggleRowSelection(event.target);

  if (!event.target.checked) {
    document.getElementById('checkAll').checked = false;
  }
};

var checkAllHandler = function checkAllHandler(event) {
  var table = document.getElementById('sortable-example');

  if (table) {
    var checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxes, function (checkbox) {
      checkbox.checked = event.target.checked;
      toggleRowSelection(checkbox);
    });
  }
};

$(function () {
  new List('sortable-example', {
    listClass: "table-data",
    sortClass: "sortable",
    valueNames: ['data-status', 'data-name', 'data-username', 'data-login']
  });
  document.getElementById('checkAll').addEventListener('click', checkAllHandler);
  Array.prototype.forEach.call(document.querySelectorAll('#sortable-example tbody input[type="checkbox"]'), function (checkbox) {
    checkbox.addEventListener('click', checkHandler);
  });
}); //#endregion
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiYWRkQWxlcnQiLCJtZXNzYWdlIiwib3B0aW9ucyIsIm1ha2VBbGVydCIsImFsZXJ0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidHlwZSIsIndyYXBwZXIiLCJoZWFkaW5nIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiZGlzbWlzc2libGUiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImFsZXJ0Q29sbGFwc2UiLCJ0YXJnZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJkdXJhdGlvbiIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwic2V0VGltZW91dCIsImRpc21pc3NBbGVydCIsIiQiLCJhZGRBbGVydEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXJyYXlUb09iaiIsIm91dHB1dCIsImlucHV0IiwibmFtZSIsInZhbHVlIiwiZGF0YSIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemVBcnJheSIsInJlZHVjZSIsImdldFRhcmdldCIsInRvcEJvdHRvbSIsInJpZ2h0TGVmdCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGVydFRvcEJvdHRvbSIsImFsZXJ0UmlnaHRMZWZ0IiwiYWxlcnRUeXBlIiwiYWxlcnRDb250ZW50IiwiYWxlcnREaXNtaXNzaWJsZSIsIndpbmRvdyIsInBhcnNlSW50IiwiYWxlcnREdXJhdGlvbiIsImFsZXJ0TWVzc2FnZSIsImNsb3Nlc3QiLCJvbmUiLCJjb2xsYXBzZSIsInJlbW92ZSIsImRpc21pc3NBbGVydEhhbmRsZXIiLCJjbG9zZSIsImRpc21pc3NBbGxBbGVydHMiLCJ1cGRhdGVDb250YWluZXJFeGFtcGxlIiwidGV4dCIsImNzcyIsImZuIiwicG9wb3ZlciIsInRvb2x0aXAiLCJib3VuZGFyeSIsInJlc2l6ZSIsIm9uIiwiY3VycmVudFN0ZXAiLCJ1cGRhdGVEaXNwbGF5ZWRTdGVwIiwidGFyZ2V0U3RlcCIsInRvSGlkZSIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJBcnJheSIsInByb3RvdHlwZSIsImZvckVhY2giLCJjYWxsIiwiZWwiLCJzdHlsZSIsImRpc3BsYXkiLCJ0b1Nob3ciLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiYnV0dG9ucyIsImJhY2siLCJuZXh0IiwiZ29Ub1N0ZXAiLCJzdGVwIiwiY2FuY2VsQ29uZmlybWF0aW9uIiwic2VsZWN0b3IiLCJhZGRDbGFzcyIsIm1vZGFsIiwiYWRkRXZlbnRMaXN0ZW5lciIsImZvcm1zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJ2YWxpZGF0aW9uIiwiZmlsdGVyIiwiZm9ybSIsImNvbnRhaW5zIiwiY2hlY2tWYWxpZGl0eSIsInN0b3BQcm9wYWdhdGlvbiIsImNsaWNrIiwidG9nZ2xlQ2xhc3MiLCJ0b2dnbGVSb3dTZWxlY3Rpb24iLCJnZXRSb3ciLCJtYXRjaGVzIiwicGFyZW50RWxlbWVudCIsInBhcmVudE5vZGUiLCJub2RlVHlwZSIsInJvdyIsImNoZWNrYm94IiwicXVlcnlTZWxlY3RvciIsImNoZWNrZWQiLCJjaGVja0hhbmRsZXIiLCJjaGVja0FsbEhhbmRsZXIiLCJ0YWJsZSIsImNoZWNrYm94ZXMiLCJMaXN0IiwibGlzdENsYXNzIiwic29ydENsYXNzIiwidmFsdWVOYW1lcyJdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7Ozs7OztBQVFBO0FBQ0EsSUFBTUEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsT0FBRCxFQUEyQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPOztBQUMxQyxNQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDRixPQUFELEVBQVVDLE9BQVYsRUFBc0I7QUFDdEMsUUFBTUUsS0FBSyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtBQUNBRixJQUFBQSxLQUFLLENBQUNHLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLE9BQXBCLEVBQTZCLE1BQTdCO0FBQ0FKLElBQUFBLEtB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QixDQUFuQjtBQUNBQyxJQUFBQSxLQUFLLENBQUNDLFNBQU4sQ0FBZ0JDLE9BQWhCLENBQXdCQyxJQUF4QixDQUE2QnVDLFVBQTdCLEVBQXlDLFVBQUFOLFFBQVEsRUFBSTtBQUNuREEsTUFBQUEsUUFBUSxDQUFDRSxPQUFULEdBQW1CcEYsS0FBSyxDQUFDVCxNQUFOLENBQWE2RixPQUFoQztBQUNBVCxNQUFBQSxrQkFBa0IsQ0FBQ08sUUFBRCxDQUFsQjtBQUNELEtBSEQ7QUFJRDtBQUNGLENBVkQ7O0FBWUFwRixDQUFDLENBQUMsWUFBWTtBQUNaLE1BQUkyRixJQUFKLENBQVMsa0JBQVQsRUFBNkI7QUFDM0JDLElBQUFBLFNBQVMsRUFBRSxZQURnQjtBQUUzQkMsSUFBQUEsU0FBUyxFQUFFLFVBRmdCO0FBRzNCQyxJQUFBQSxVQUFVLEVBQUUsQ0FBQyxhQUFELEVBQWdCLFdBQWhCLEVBQTZCLGVBQTdCLEVBQThDLFlBQTlDO0FBSGUsR0FBN0I7QUFNQXBILEVBQUFBLFFBQVEsQ0FBQ3VDLGNBQVQsQ0FBd0IsVUFBeEIsRUFBb0NpRCxnQkFBcEMsQ0FBcUQsT0FBckQsRUFBOERzQixlQUE5RDtBQUNBeEMsRUFBQUEsS0FBSyxDQUFDQyxTQUFOLENBQWdCQyxPQUFoQixDQUF3QkMsSUFBeEIsQ0FBNkJ6RSxRQUFRLENBQUNxRSxnQkFBVCxDQUEwQixnREFBMUIsQ0FBN0IsRUFBMEcsVUFBQXFDLFFBQVEsRUFBSTtBQUNwSEEsSUFBQUEsUUFBUSxDQUFDbEIsZ0JBQVQsQ0FBMEIsT0FBMUIsRUFBbUNxQixZQUFuQztBQUNELEdBRkQ7QUFHRCxDQVhBLENBQUQsQyxDQVlBIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxOCwgSG9ydG9ud29ya3MgSW5jLiAgQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiAqIEV4Y2VwdCBhcyBleHByZXNzbHkgcGVybWl0dGVkIGluIGEgd3JpdHRlbiBhZ3JlZW1lbnQgYmV0d2VlbiB5b3VcbiAqIG9yIHlvdXIgY29tcGFueSBhbmQgSG9ydG9ud29ya3MsIEluYywgYW55IHVzZSwgcmVwcm9kdWN0aW9uLFxuICogbW9kaWZpY2F0aW9uLCByZWRpc3RyaWJ1dGlvbiwgc2hhcmluZywgbGVuZGluZyBvciBvdGhlciBleHBsb2l0YXRpb25cbiAqIG9mIGFsbCBvciBhbnkgcGFydCBvZiB0aGUgY29udGVudHMgb2YgdGhpcyBmaWxlIGlzIHN0cmljdGx5IHByb2hpYml0ZWQuXG4gKi9cblxuLy8jcmVnaW9uIEFsZXJ0IHRlc3RlclxuY29uc3QgYWRkQWxlcnQgPSAobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IG1ha2VBbGVydCA9IChtZXNzYWdlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydCcsICdmYWRlJyk7XG4gICAgYWxlcnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG5cbiAgICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWluZm8nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtc3VjY2VzcycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC13YXJuaW5nJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGFuZ2VyJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGVmYXVsdCcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdhbGVydC1oZWFkaW5nJyk7XG4gICAgaGVhZGluZy5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG5cbiAgICBpZiAob3B0aW9ucy5jb250ZW50KSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb250ZW50LmlubmVySFRNTCA9IG9wdGlvbnMuY29udGVudDtcbiAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfVxuXG4gICAgYWxlcnQuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cbiAgICBpZiAob3B0aW9ucy5kaXNtaXNzaWJsZSkge1xuICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGlzbWlzc2libGUnKTtcbiAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRlbXAuaW5uZXJIVE1MID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBvbmNsaWNrPVwiZGlzbWlzc0FsZXJ0SGFuZGxlcih0aGlzKVwiPjwvYnV0dG9uPic7XG4gICAgICBhbGVydC5hcHBlbmRDaGlsZCh0ZW1wLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGNvbnN0IGFsZXJ0Q29sbGFwc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydENvbGxhcHNlLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWNvbGxhcHNlJywgJ2NvbGxhcHNlJywgJ3Nob3cnKTtcbiAgICBhbGVydENvbGxhcHNlLmFwcGVuZENoaWxkKGFsZXJ0KTtcblxuICAgIHJldHVybiBhbGVydENvbGxhcHNlO1xuICB9O1xuXG4gIGlmICghbWVzc2FnZSB8fCB0eXBlb2YgbWVzc2FnZSAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICBjb25zdCB7XG4gICAgdGFyZ2V0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgIHR5cGUgPSAnZGVmYXVsdCcsIC8vIG1heSBiZSAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgb3IgJ2RlZmF1bHQnXG4gICAgY29udGVudCA9IG51bGwsXG4gICAgZGlzbWlzc2libGUgPSB0cnVlLFxuICAgIGR1cmF0aW9uID0gMCwgLy9pbiBzZWNvbmRzXG4gICAgcG9zaXRpb24gPSAnZmlyc3QnIC8vIGlmICdmaXJzdCcgYWxlcnQgd2lsbCBiZSBpbnNlcnRlZCBhYm92ZSBleGlzdGluZyBhbGVydHNcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgYWxlcnQgPSBtYWtlQWxlcnQobWVzc2FnZSwge3RhcmdldCwgdHlwZSwgY29udGVudCwgZGlzbWlzc2libGUsIGR1cmF0aW9uLCBwb3NpdGlvbn0pO1xuXG4gIGlmIChwb3NpdGlvbiA9PT0gJ2ZpcnN0Jykge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoYWxlcnQsIHRhcmdldC5maXJzdENoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoYWxlcnQpO1xuICB9XG5cbiAgc2V0VGltZW91dCgoKSA9PiBhbGVydC5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKSk7XG5cbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBkaXNtaXNzQWxlcnQoJChhbGVydC5maXJzdENoaWxkKSksIGR1cmF0aW9uICogMTAwMCk7XG4gIH1cbn07XG5cbmNvbnN0IGFkZEFsZXJ0SGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBhcnJheVRvT2JqID0gKG91dHB1dCwgaW5wdXQpID0+IHtcbiAgICBvdXRwdXRbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIGNvbnN0IGRhdGEgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZUFycmF5KCkucmVkdWNlKGFycmF5VG9PYmosIHt9KTtcblxuICBjb25zdCBnZXRUYXJnZXQgPSAodG9wQm90dG9tLCByaWdodExlZnQpID0+IHtcbiAgICBsZXQgaWQ7XG5cbiAgICBpZiAodG9wQm90dG9tID09PSAndG9wJykge1xuICAgICAgaWYgKHJpZ2h0TGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBpZCA9ICdhbGVydHNUb3BSaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9ICdhbGVydHNUb3BMZWZ0JztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJpZ2h0TGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBpZCA9ICdhbGVydHNCb3R0b21SaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9ICdhbGVydHNCb3R0b21MZWZ0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdGFyZ2V0OiBnZXRUYXJnZXQoZGF0YS5hbGVydFRvcEJvdHRvbSwgZGF0YS5hbGVydFJpZ2h0TGVmdCksXG4gICAgdHlwZTogZGF0YS5hbGVydFR5cGUsXG4gICAgY29udGVudDogZGF0YS5hbGVydENvbnRlbnQsXG4gICAgZGlzbWlzc2libGU6ICEhZGF0YS5hbGVydERpc21pc3NpYmxlLFxuICAgIGR1cmF0aW9uOiB3aW5kb3cucGFyc2VJbnQoZGF0YS5hbGVydER1cmF0aW9uKSxcbiAgICBwb3NpdGlvbjogZGF0YS5hbGVydFRvcEJvdHRvbSA9PT0gJ2JvdHRvbScgPyAnZmlyc3QnIDogJ2xhc3QnXG4gIH07XG5cbiAgYWRkQWxlcnQoZGF0YS5hbGVydE1lc3NhZ2UsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGRpc21pc3NBbGVydCA9IGFsZXJ0ID0+IHtcbiAgY29uc3QgYWxlcnRDb2xsYXBzZSA9IGFsZXJ0LmNsb3Nlc3QoJy5hbGVydC1jb2xsYXBzZScpO1xuXG4gIGFsZXJ0Lm9uZSgnY2xvc2UuYnMuYWxlcnQnLCAoKSA9PiBhbGVydENvbGxhcHNlLmNvbGxhcHNlKCdoaWRlJykpO1xuICBhbGVydENvbGxhcHNlLm9uZSgnaGlkZGVuLmJzLmNvbGxhcHNlJywgKCkgPT4gYWxlcnRDb2xsYXBzZS5yZW1vdmUoKSk7XG5cbiAgYWxlcnQuYWxlcnQoJ2Nsb3NlJyk7XG59O1xuXG5jb25zdCBkaXNtaXNzQWxlcnRIYW5kbGVyID0gY2xvc2UgPT4ge1xuICBjb25zdCBhbGVydCA9ICQoY2xvc2UpLmNsb3Nlc3QoJy5hbGVydCcpO1xuICBkaXNtaXNzQWxlcnQoYWxlcnQpO1xufTtcblxuY29uc3QgZGlzbWlzc0FsbEFsZXJ0cyA9ICgpID0+IHtcbiAgJChcIi5hbGVydC1jb250YWluZXIgLmFsZXJ0XCIpLmFsZXJ0KCdjbG9zZScpO1xufTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gQ29udGFpbmVyIGV4YW1wbGVcbmNvbnN0IHVwZGF0ZUNvbnRhaW5lckV4YW1wbGUgPSBmdW5jdGlvbiAoKSB7XG4gICQoJyNkb2N1bWVudFdpZHRoJykudGV4dCgkKCdib2R5JykuY3NzKCd3aWR0aCcpKTtcbiAgJCgnI2NvbnRhaW5lcldpZHRoJykudGV4dCgkKCcjY29udGFpbmVyRXhhbXBsZScpLmNzcygnd2lkdGgnKSk7XG4gICQoJyNjb250YWluZXJGbHVpZFdpZHRoJykudGV4dCgkKCcjY29udGFpbmVyRmx1aWRFeGFtcGxlJykuY3NzKCd3aWR0aCcpKTtcbn07XG5cbiQoZnVuY3Rpb24gKCkge1xuICBpZiAoJC5mbi5wb3BvdmVyKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcbiAgfVxuICBpZiAoJC5mbi50b29sdGlwKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoeyBib3VuZGFyeTogJ3dpbmRvdycgfSk7XG4gIH1cblxuICB1cGRhdGVDb250YWluZXJFeGFtcGxlKCk7XG4gICQod2luZG93KS5yZXNpemUodXBkYXRlQ29udGFpbmVyRXhhbXBsZSk7XG5cbiAgJCgnI2FkZEFsZXJ0Jykub24oJ3N1Ym1pdCcsIGFkZEFsZXJ0SGFuZGxlcik7XG4gICQoJyNkaXNtaXNzQWxsQWxlcnRzJykub24oJ2NsaWNrJywgZGlzbWlzc0FsbEFsZXJ0cyk7XG59KTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gV2l6YXJkIGluIG1vZGFsXG5sZXQgY3VycmVudFN0ZXA7XG5cbmZ1bmN0aW9uIHVwZGF0ZURpc3BsYXllZFN0ZXAodGFyZ2V0U3RlcCkge1xuICBjb25zdCB0b0hpZGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3MqPVwic3RlcC1cIl0nKTtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b0hpZGUsIGVsID0+IHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICB9KTtcblxuICBjb25zdCB0b1Nob3cgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBzdGVwLSR7dGFyZ2V0U3RlcH1gKTtcbiAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b1Nob3csIGVsID0+IHtcbiAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgfSk7XG5cbiAgY29uc3QgYnV0dG9ucyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dpemFyZC1uYXYtYnV0dG9uJyk7XG4gIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYnV0dG9ucywgZWwgPT4ge1xuICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9KTtcblxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmluaXNoJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgaWYgKHRhcmdldFN0ZXAgPT09IDEpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYmFjaycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cbiAgaWYgKHRhcmdldFN0ZXAgPT09IDMpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbmV4dCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbmlzaCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJhY2soKSB7XG4gIHVwZGF0ZURpc3BsYXllZFN0ZXAoLS1jdXJyZW50U3RlcCk7XG59XG5cbmZ1bmN0aW9uIG5leHQoKSB7XG4gIHVwZGF0ZURpc3BsYXllZFN0ZXAoKytjdXJyZW50U3RlcCk7XG59XG5cbmZ1bmN0aW9uIGdvVG9TdGVwKHN0ZXApIHtcbiAgY3VycmVudFN0ZXAgPSBzdGVwO1xuICB1cGRhdGVEaXNwbGF5ZWRTdGVwKHN0ZXApO1xufVxuXG5mdW5jdGlvbiBjYW5jZWxDb25maXJtYXRpb24oc2VsZWN0b3IpIHtcbiAgJChzZWxlY3Rvcikub25lKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiAkKCdib2R5JykuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKSk7XG4gICQoc2VsZWN0b3IpLm1vZGFsKCdoaWRlJyk7XG59XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIEZvcm0gdmFsaWRhdGlvblxuLy8gRXhhbXBsZSBzdGFydGVyIEphdmFTY3JpcHQgZm9yIGRpc2FibGluZyBmb3JtIHN1Ym1pc3Npb25zIGlmIHRoZXJlIGFyZSBpbnZhbGlkIGZpZWxkc1xuKGZ1bmN0aW9uICgpIHtcbiAgJ3VzZSBzdHJpY3QnO1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBGZXRjaCBhbGwgdGhlIGZvcm1zIHdlIHdhbnQgdG8gYXBwbHkgY3VzdG9tIEJvb3RzdHJhcCB2YWxpZGF0aW9uIHN0eWxlcyB0b1xuICAgIHZhciBmb3JtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJyk7XG4gICAgLy8gTG9vcCBvdmVyIHRoZW0gYW5kIHByZXZlbnQgc3VibWlzc2lvblxuICAgIHZhciB2YWxpZGF0aW9uID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGZvcm1zLCBmdW5jdGlvbiAoZm9ybSkge1xuICAgICAgaWYgKGZvcm0uY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZScpKSB7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBmYWxzZSk7XG59KSgpO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBEYXNocm93c1xuJChmdW5jdGlvbiAoKSB7XG4gICQoJy5qcy1idG4tYScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuanMtdGFyZ2V0LWEnKS50b2dnbGVDbGFzcygnZXhwYW5kZWQnKTtcbiAgfSk7XG5cbiAgJCgnLmpzLWJ0bi1iJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5qcy10YXJnZXQtYicpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpO1xuICB9KTtcbn0pO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBTb3J0YWJsZSB0YWJsZSBleGFtcGxlXG4vLyBVc2VzIExpc3QuanMgb25seSBmb3IgZGVtbyBwdXJwb3NlcyB0byBzaG93IGhvdyBhIEZsdWlkIHNvcnRhYmxlIHRhYmxlIHNob3VsZCBiZWhhdmVcbmNvbnN0IHRvZ2dsZVJvd1NlbGVjdGlvbiA9IHRhcmdldCA9PiB7XG4gIGNvbnN0IGdldFJvdyA9IGVsID0+IHtcbiAgICBkbyB7XG4gICAgICBpZiAoZWwubWF0Y2hlcygndHInKSkge1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSk7XG4gIH1cblxuICBjb25zdCByb3cgPSBnZXRSb3codGFyZ2V0KTtcbiAgaWYgKHJvdykge1xuICAgIGNvbnN0IGNoZWNrYm94ID0gcm93LnF1ZXJ5U2VsZWN0b3IoJ3RyIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgIGlmIChjaGVja2JveCkge1xuICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRhcmdldC5jaGVja2VkO1xuICAgICAgdGFyZ2V0LmNoZWNrZWQgPyByb3cuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKSA6IHJvdy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgfVxufVxuXG5jb25zdCBjaGVja0hhbmRsZXIgPSBldmVudCA9PiB7XG4gIHRvZ2dsZVJvd1NlbGVjdGlvbihldmVudC50YXJnZXQpO1xuICBpZiAoIWV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrQWxsJykuY2hlY2tlZCA9IGZhbHNlO1xuICB9XG59XG5cbmNvbnN0IGNoZWNrQWxsSGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29ydGFibGUtZXhhbXBsZScpO1xuXG4gIGlmICh0YWJsZSkge1xuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGNoZWNrYm94ZXMsIGNoZWNrYm94ID0+IHtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgIHRvZ2dsZVJvd1NlbGVjdGlvbihjaGVja2JveCk7XG4gICAgfSk7XG4gIH1cbn1cblxuJChmdW5jdGlvbiAoKSB7XG4gIG5ldyBMaXN0KCdzb3J0YWJsZS1leGFtcGxlJywge1xuICAgIGxpc3RDbGFzczogXCJ0YWJsZS1kYXRhXCIsXG4gICAgc29ydENsYXNzOiBcInNvcnRhYmxlXCIsXG4gICAgdmFsdWVOYW1lczogWydkYXRhLXN0YXR1cycsICdkYXRhLW5hbWUnLCAnZGF0YS11c2VybmFtZScsICdkYXRhLWxvZ2luJ11cbiAgfSk7XG5cbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrQWxsJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0FsbEhhbmRsZXIpO1xuICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNzb3J0YWJsZS1leGFtcGxlIHRib2R5IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLCBjaGVja2JveCA9PiB7XG4gICAgY2hlY2tib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0hhbmRsZXIpO1xuICB9KTtcbn0pO1xuLy8jZW5kcmVnaW9uXG4iXSwiZmlsZSI6ImRlbW8uanMifQ==
