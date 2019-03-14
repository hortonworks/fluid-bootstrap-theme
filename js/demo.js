/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */
'use strict'; //#region Alert tester

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

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
  $('.alert-container .alert').alert('close');
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

var Wizard =
/*#__PURE__*/
function () {
  function Wizard(wizardId) {
    _classCallCheck(this, Wizard);

    this.currentStep = 1;
    this.wizard = document.getElementById(wizardId);
    this.updateDisplayedStep(1);
  }

  _createClass(Wizard, [{
    key: "updateDisplayedStep",
    value: function updateDisplayedStep(targetStep) {
      if (this.wizard) {
        var toHide = this.wizard.querySelectorAll('[class*="step-"]');
        Array.prototype.forEach.call(toHide, function (el) {
          el.style.display = 'none';
        });
        var toShow = this.wizard.getElementsByClassName("step-".concat(targetStep));
        Array.prototype.forEach.call(toShow, function (el) {
          el.style.display = 'block';
        });
        var buttons = this.wizard.getElementsByClassName('wizard-nav-button');
        Array.prototype.forEach.call(buttons, function (el) {
          el.style.display = 'block';
        });
        this.wizard.querySelector('.wizard-finish-button').style.display = 'none';

        if (targetStep === 1) {
          this.wizard.querySelector('.wizard-back-button').style.display = 'none';
        }

        if (targetStep === 3) {
          this.wizard.querySelector('.wizard-next-button').style.display = 'none';
          this.wizard.querySelector('.wizard-finish-button').style.display = 'block';
        }
      }
    }
  }, {
    key: "back",
    value: function back() {
      this.updateDisplayedStep(--this.currentStep);
    }
  }, {
    key: "next",
    value: function next() {
      this.updateDisplayedStep(++this.currentStep);
    }
  }, {
    key: "goToStep",
    value: function goToStep(step) {
      this.currentStep = step;
      this.updateDisplayedStep(step);
    }
  }]);

  return Wizard;
}();

;

var cancelConfirmation = function cancelConfirmation(selector) {
  $(selector).one('hidden.bs.modal', function () {
    return $('body').addClass('modal-open');
  });
  $(selector).modal('hide');
}; //#endregion
//#region Form validation
// Example starter JavaScript for disabling form submissions if there are invalid fields


(function () {
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

var makeSortable = function makeSortable(tableId, columns) {
  var table = document.getElementById(tableId);
  var list;

  if (table) {
    list = new List(tableId, {
      listClass: 'table-data',
      sortClass: 'sortable',
      valueNames: columns
    });
    var checkAll = table.querySelector('thead input[type="checkbox"]');

    if (checkAll) {
      checkAll.addEventListener('click', checkAllHandler);
      Array.prototype.forEach.call(table.querySelectorAll('tbody input[type="checkbox"]'), function (checkbox) {
        checkbox.addEventListener('click', checkHandler);
      });
    }
  }

  return list;
};

var filterable;
$(function () {
  makeSortable('sortable-example', ['data-status', 'data-name', 'data-username', 'data-login']);
  filterable = makeSortable('filterable-example', ['data-company', 'data-name', 'data-department', 'data-gender', 'data-city', 'data-country']);
}); //#endregion
//#region Filter

var facets = [{
  key: 'Name'
}, {
  key: 'Organization',
  header: true
}, {
  key: 'Company',
  values: []
}, {
  key: 'Department',
  values: []
}, {
  key: 'Gender',
  noRepeat: true,
  values: []
}, {
  key: 'Location',
  header: true
}, {
  key: 'City'
}, {
  key: 'Country',
  values: []
}];

var fillFacets = function fillFacets(facets, source) {
  facets.forEach(function (facet) {
    if (!facet.header && facet.values) {
      var className = "data-".concat(facet.key.toLowerCase());
      var data = source.getElementsByClassName(className);
      var values = new Set();
      Array.prototype.forEach.call(data, function (datum) {
        return values.add(datum.textContent);
      });
      facet.values = _toConsumableArray(values).sort();
    }
  });
  return facets;
};

var filterByFacets = function filterByFacets(item, filter) {
  var result = true;
  var values = item.values();

  for (var prop in values) {
    var valFilter = filter[prop.split('-')[1]];

    if (valFilter) {
      var itemVal = values[prop];

      if (typeof valFilter === 'string') {
        result = itemVal === valFilter;
      } else {
        var thisResult = false;

        for (var i = 0, len = valFilter.length; i < len; i++) {
          if (itemVal === valFilter[i]) {
            thisResult = true;
            break;
          }
        }

        if (!thisResult) {
          result = false;
        }
      }
    }

    if (!result) {
      return result;
    }
  }

  return result;
};

var applyFilter = function applyFilter(filterable, filter) {
  if (filterable && filter) {
    filterable.filter(function (item) {
      return filterByFacets(item, filter.result());
    });
  }
};

var showFilter = function showFilter(queryDisplay, filter) {
  if (queryDisplay && filter) {
    queryDisplay.textContent = JSON.stringify(filter.result(), null, 2); // result is a JSON object, so stringify it for display
  }
};

(function () {
  var dataSource = document.querySelector('#filterable-example tbody');
  window.addEventListener('load', function () {
    var filterEl = document.getElementById('filter-input-example');
    var data = fillFacets(facets, dataSource);
    var filter = new Filter(filterEl, data);
    filterEl.addEventListener('changed.fluid.filter', function () {
      return showFilter(document.getElementById('filter-query-example'), filter);
    });
  });
  window.addEventListener('load', function () {
    var filterEl = document.getElementById('filter-input');
    var data = fillFacets(facets, dataSource);
    var filter = new Filter(filterEl, data);
    filterEl.addEventListener('changed.fluid.filter', function () {
      return applyFilter(filterable, filter);
    });
  });
})(); //#endregion
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiYWRkQWxlcnQiLCJtZXNzYWdlIiwib3B0aW9ucyIsIm1ha2VBbGVydCIsImFsZXJ0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidHlwZSIsIndyYXBwZXIiLCJoZWFkaW5nIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiZGlzbWlzc2libGUiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImFsZXJ0Q29sbGFwc2UiLCJ0YXJnZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJkdXJhdGlvbiIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwic2V0VGltZW91dCIsImRpc21pc3NBbGVydCIsIiQiLCJhZGRBbGVydEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXJyYXlUb09iaiIsIm91dHB1dCIsImlucHV0IiwibmFtZSIsInZhbHVlIiwiZGF0YSIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemVBcnJheSIsInJlZHVjZSIsImdldFRhcmdldCIsInRvcEJvdHRvbSIsInJpZ2h0TGVmdCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGVydFRvcEJvdHRvbSIsImFsZXJ0UmlnaHRMZWZ0IiwiYWxlcnRUeXBlIiwiYWxlcnRDb250ZW50IiwiYWxlcnREaXNtaXNzaWJsZSIsIndpbmRvdyIsInBhcnNlSW50IiwiYWxlcnREdXJhdGlvbiIsImFsZXJ0TWVzc2FnZSIsImNsb3Nlc3QiLCJvbmUiLCJjb2xsYXBzZSIsInJlbW92ZSIsImRpc21pc3NBbGVydEhhbmRsZXIiLCJjbG9zZSIsImRpc21pc3NBbGxBbGVydHMiLCJ1cGRhdGVDb250YWluZXJFeGFtcGxlIiwidGV4dCIsImNzcyIsImZuIiwicG9wb3ZlciIsInRvb2x0aXAiLCJib3VuZGFyeSIsInJlc2l6ZSIsIm9uIiwiV2l6YXJkIiwid2l6YXJkSWQiLCJjdXJyZW50U3RlcCIsIndpemFyZCIsInVwZGF0ZURpc3BsYXllZFN0ZXAiLCJ0YXJnZXRTdGVwIiwidG9IaWRlIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImNhbGwiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsInRvU2hvdyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJidXR0b25zIiwicXVlcnlTZWxlY3RvciIsInN0ZXAiLCJjYW5jZWxDb25maXJtYXRpb24iLCJzZWxlY3RvciIsImFkZENsYXNzIiwibW9kYWwiLCJhZGRFdmVudExpc3RlbmVyIiwiZm9ybXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInZhbGlkYXRpb24iLCJmaWx0ZXIiLCJmb3JtIiwiY29udGFpbnMiLCJjaGVja1ZhbGlkaXR5Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2xpY2siLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZVJvd1NlbGVjdGlvbiIsImdldFJvdyIsIm1hdGNoZXMiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwicm93IiwiY2hlY2tib3giLCJjaGVja2VkIiwiY2hlY2tIYW5kbGVyIiwiY2hlY2tBbGxIYW5kbGVyIiwidGFibGUiLCJjaGVja2JveGVzIiwibWFrZVNvcnRhYmxlIiwidGFibGVJZCIsImNvbHVtbnMiLCJsaXN0IiwiTGlzdCIsImxpc3RDbGFzcyIsInNvcnRDbGFzcyIsInZhbHVlTmFtZXMiLCJjaGVja0FsbCIsImZpbHRlcmFibGUiLCJmYWNldHMiLCJrZXkiLCJoZWFkZXIiLCJ2YWx1ZXMiLCJub1JlcGVhdCIsImZpbGxGYWNldHMiLCJzb3VyY2UiLCJmYWNldCIsImNsYXNzTmFtZSIsInRvTG93ZXJDYXNlIiwiU2V0IiwiZGF0dW0iLCJ0ZXh0Q29udGVudCIsInNvcnQiLCJmaWx0ZXJCeUZhY2V0cyIsIml0ZW0iLCJyZXN1bHQiLCJwcm9wIiwidmFsRmlsdGVyIiwic3BsaXQiLCJpdGVtVmFsIiwidGhpc1Jlc3VsdCIsImkiLCJsZW4iLCJsZW5ndGgiLCJhcHBseUZpbHRlciIsInNob3dGaWx0ZXIiLCJxdWVyeURpc3BsYXkiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YVNvdXJjZSIsImZpbHRlckVsIiwiRmlsdGVyIl0sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7OztBQVFBLGEsQ0FFQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLE9BQUQsRUFBMkI7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFDMUMsTUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0YsT0FBRCxFQUFVQyxPQUFWLEVBQXNCO0FBQ3RDLFFBQU1FLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQUYsSUFBQUEsS0FBSyxDQUFDRyxTQUFOLENBQWdCQyxHQUFoQixDQUFvQixPQUFwQixFQUE2QixNQUE3QjtBQUNBSixJQUFBQSxLQUFLLENBQUNLLFlBQU4sQ0FBbUIsTUFBbkIsRUFBMkIsT0FBM0I7O0FBRUEsWUFBUVAsT0FBTyxDQUFDUSxJQUFoQjtBQUNFLFdBQUssTUFBTDtBQUNFTixRQUFBQSxLQUFLLENBQUNHLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLFlBQXBCO0FBQ0E7O0FBQ0YsV0FBSyxTQUFMO0FBQ0VKLFFBQUFBLEtBQUssQ0FBQ0csU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0IsZUFBcEI7QUFDQTs7QUFDRixXQUFLLFNBQUw7QUFDRUosUUFBQUEsS0FBSyxDQUFDRyxTQUFOLENBQWdCQyxHQUFoQixDQUFvQixlQUFwQjtBQUNBOztBQUNGLFdBQUssUUFBTDtBQUNFSixRQUFBQSxLQUFLLENBQUNHLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLGNBQXBCO0FBQ0E7O0FBQ0Y7QUFDRUosUUFBQUEsS0FBSyxDQUFDRyxTQUFOLENBQWdCQyxHQUFoQixDQUFvQixlQUFwQjtBQUNBO0FBZko7O0FBa0JBLFFBQU1HLE9BQU8sR0FBR04sUUFBUSxDQUFDQyxhQUFULENBQXVCLEtB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QVUsQ0FBQ3JKLFFBQVEsQ0FBQ3VDLGNBQVQsQ0FBd0Isc0JBQXhCLENBQUQsRUFBa0RzRCxNQUFsRCxDQUFoQjtBQUFBLEtBQWxEO0FBQ0QsR0FMRDtBQU9BaEQsRUFBQUEsTUFBTSxDQUFDNEMsZ0JBQVAsQ0FBd0IsTUFBeEIsRUFBZ0MsWUFBTTtBQUNwQyxRQUFNaUUsUUFBUSxHQUFHMUosUUFBUSxDQUFDdUMsY0FBVCxDQUF3QixjQUF4QixDQUFqQjtBQUNBLFFBQU1SLElBQUksR0FBR2lHLFVBQVUsQ0FBQ0wsTUFBRCxFQUFTOEIsVUFBVCxDQUF2QjtBQUNBLFFBQU01RCxNQUFNLEdBQUcsSUFBSThELE1BQUosQ0FBV0QsUUFBWCxFQUFxQjNILElBQXJCLENBQWY7QUFDQTJILElBQUFBLFFBQVEsQ0FBQ2pFLGdCQUFULENBQTBCLHNCQUExQixFQUFrRDtBQUFBLGFBQU0yRCxXQUFXLENBQUMxQixVQUFELEVBQWE3QixNQUFiLENBQWpCO0FBQUEsS0FBbEQ7QUFDRCxHQUxEO0FBTUQsQ0FoQkQsSSxDQWlCQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTgsIEhvcnRvbndvcmtzIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBFeGNlcHQgYXMgZXhwcmVzc2x5IHBlcm1pdHRlZCBpbiBhIHdyaXR0ZW4gYWdyZWVtZW50IGJldHdlZW4geW91XG4gKiBvciB5b3VyIGNvbXBhbnkgYW5kIEhvcnRvbndvcmtzLCBJbmMsIGFueSB1c2UsIHJlcHJvZHVjdGlvbixcbiAqIG1vZGlmaWNhdGlvbiwgcmVkaXN0cmlidXRpb24sIHNoYXJpbmcsIGxlbmRpbmcgb3Igb3RoZXIgZXhwbG9pdGF0aW9uXG4gKiBvZiBhbGwgb3IgYW55IHBhcnQgb2YgdGhlIGNvbnRlbnRzIG9mIHRoaXMgZmlsZSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8jcmVnaW9uIEFsZXJ0IHRlc3RlclxuY29uc3QgYWRkQWxlcnQgPSAobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IG1ha2VBbGVydCA9IChtZXNzYWdlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydCcsICdmYWRlJyk7XG4gICAgYWxlcnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG5cbiAgICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWluZm8nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtc3VjY2VzcycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC13YXJuaW5nJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGFuZ2VyJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGVmYXVsdCcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdhbGVydC1oZWFkaW5nJyk7XG4gICAgaGVhZGluZy5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG5cbiAgICBpZiAob3B0aW9ucy5jb250ZW50KSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb250ZW50LmlubmVySFRNTCA9IG9wdGlvbnMuY29udGVudDtcbiAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfVxuXG4gICAgYWxlcnQuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cbiAgICBpZiAob3B0aW9ucy5kaXNtaXNzaWJsZSkge1xuICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGlzbWlzc2libGUnKTtcbiAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRlbXAuaW5uZXJIVE1MID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBvbmNsaWNrPVwiZGlzbWlzc0FsZXJ0SGFuZGxlcih0aGlzKVwiPjwvYnV0dG9uPic7XG4gICAgICBhbGVydC5hcHBlbmRDaGlsZCh0ZW1wLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGNvbnN0IGFsZXJ0Q29sbGFwc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydENvbGxhcHNlLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWNvbGxhcHNlJywgJ2NvbGxhcHNlJywgJ3Nob3cnKTtcbiAgICBhbGVydENvbGxhcHNlLmFwcGVuZENoaWxkKGFsZXJ0KTtcblxuICAgIHJldHVybiBhbGVydENvbGxhcHNlO1xuICB9O1xuXG4gIGlmICghbWVzc2FnZSB8fCB0eXBlb2YgbWVzc2FnZSAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICBjb25zdCB7XG4gICAgdGFyZ2V0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgIHR5cGUgPSAnZGVmYXVsdCcsIC8vIG1heSBiZSAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgb3IgJ2RlZmF1bHQnXG4gICAgY29udGVudCA9IG51bGwsXG4gICAgZGlzbWlzc2libGUgPSB0cnVlLFxuICAgIGR1cmF0aW9uID0gMCwgLy9pbiBzZWNvbmRzXG4gICAgcG9zaXRpb24gPSAnZmlyc3QnIC8vIGlmICdmaXJzdCcgYWxlcnQgd2lsbCBiZSBpbnNlcnRlZCBhYm92ZSBleGlzdGluZyBhbGVydHNcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgYWxlcnQgPSBtYWtlQWxlcnQobWVzc2FnZSwge3RhcmdldCwgdHlwZSwgY29udGVudCwgZGlzbWlzc2libGUsIGR1cmF0aW9uLCBwb3NpdGlvbn0pO1xuXG4gIGlmIChwb3NpdGlvbiA9PT0gJ2ZpcnN0Jykge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoYWxlcnQsIHRhcmdldC5maXJzdENoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoYWxlcnQpO1xuICB9XG5cbiAgc2V0VGltZW91dCgoKSA9PiBhbGVydC5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKSk7XG5cbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBkaXNtaXNzQWxlcnQoJChhbGVydC5maXJzdENoaWxkKSksIGR1cmF0aW9uICogMTAwMCk7XG4gIH1cbn07XG5cbmNvbnN0IGFkZEFsZXJ0SGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBhcnJheVRvT2JqID0gKG91dHB1dCwgaW5wdXQpID0+IHtcbiAgICBvdXRwdXRbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIGNvbnN0IGRhdGEgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZUFycmF5KCkucmVkdWNlKGFycmF5VG9PYmosIHt9KTtcblxuICBjb25zdCBnZXRUYXJnZXQgPSAodG9wQm90dG9tLCByaWdodExlZnQpID0+IHtcbiAgICBsZXQgaWQ7XG5cbiAgICBpZiAodG9wQm90dG9tID09PSAndG9wJykge1xuICAgICAgaWYgKHJpZ2h0TGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBpZCA9ICdhbGVydHNUb3BSaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9ICdhbGVydHNUb3BMZWZ0JztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJpZ2h0TGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBpZCA9ICdhbGVydHNCb3R0b21SaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9ICdhbGVydHNCb3R0b21MZWZ0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdGFyZ2V0OiBnZXRUYXJnZXQoZGF0YS5hbGVydFRvcEJvdHRvbSwgZGF0YS5hbGVydFJpZ2h0TGVmdCksXG4gICAgdHlwZTogZGF0YS5hbGVydFR5cGUsXG4gICAgY29udGVudDogZGF0YS5hbGVydENvbnRlbnQsXG4gICAgZGlzbWlzc2libGU6ICEhZGF0YS5hbGVydERpc21pc3NpYmxlLFxuICAgIGR1cmF0aW9uOiB3aW5kb3cucGFyc2VJbnQoZGF0YS5hbGVydER1cmF0aW9uKSxcbiAgICBwb3NpdGlvbjogZGF0YS5hbGVydFRvcEJvdHRvbSA9PT0gJ2JvdHRvbScgPyAnZmlyc3QnIDogJ2xhc3QnXG4gIH07XG5cbiAgYWRkQWxlcnQoZGF0YS5hbGVydE1lc3NhZ2UsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGRpc21pc3NBbGVydCA9IGFsZXJ0ID0+IHtcbiAgY29uc3QgYWxlcnRDb2xsYXBzZSA9IGFsZXJ0LmNsb3Nlc3QoJy5hbGVydC1jb2xsYXBzZScpO1xuXG4gIGFsZXJ0Lm9uZSgnY2xvc2UuYnMuYWxlcnQnLCAoKSA9PiBhbGVydENvbGxhcHNlLmNvbGxhcHNlKCdoaWRlJykpO1xuICBhbGVydENvbGxhcHNlLm9uZSgnaGlkZGVuLmJzLmNvbGxhcHNlJywgKCkgPT4gYWxlcnRDb2xsYXBzZS5yZW1vdmUoKSk7XG5cbiAgYWxlcnQuYWxlcnQoJ2Nsb3NlJyk7XG59O1xuXG5jb25zdCBkaXNtaXNzQWxlcnRIYW5kbGVyID0gY2xvc2UgPT4ge1xuICBjb25zdCBhbGVydCA9ICQoY2xvc2UpLmNsb3Nlc3QoJy5hbGVydCcpO1xuICBkaXNtaXNzQWxlcnQoYWxlcnQpO1xufTtcblxuY29uc3QgZGlzbWlzc0FsbEFsZXJ0cyA9ICgpID0+IHtcbiAgJCgnLmFsZXJ0LWNvbnRhaW5lciAuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbn07XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIENvbnRhaW5lciBleGFtcGxlXG5jb25zdCB1cGRhdGVDb250YWluZXJFeGFtcGxlID0gKCkgPT4ge1xuICAkKCcjZG9jdW1lbnRXaWR0aCcpLnRleHQoJCgnYm9keScpLmNzcygnd2lkdGgnKSk7XG4gICQoJyNjb250YWluZXJXaWR0aCcpLnRleHQoJCgnI2NvbnRhaW5lckV4YW1wbGUnKS5jc3MoJ3dpZHRoJykpO1xuICAkKCcjY29udGFpbmVyRmx1aWRXaWR0aCcpLnRleHQoJCgnI2NvbnRhaW5lckZsdWlkRXhhbXBsZScpLmNzcygnd2lkdGgnKSk7XG59O1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQuZm4ucG9wb3Zlcikge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XG4gIH1cbiAgaWYgKCQuZm4udG9vbHRpcCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHsgYm91bmRhcnk6ICd3aW5kb3cnIH0pO1xuICB9XG5cbiAgdXBkYXRlQ29udGFpbmVyRXhhbXBsZSgpO1xuICAkKHdpbmRvdykucmVzaXplKHVwZGF0ZUNvbnRhaW5lckV4YW1wbGUpO1xuXG4gICQoJyNhZGRBbGVydCcpLm9uKCdzdWJtaXQnLCBhZGRBbGVydEhhbmRsZXIpO1xuICAkKCcjZGlzbWlzc0FsbEFsZXJ0cycpLm9uKCdjbGljaycsIGRpc21pc3NBbGxBbGVydHMpO1xufSk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIFdpemFyZCBpbiBtb2RhbFxuY2xhc3MgV2l6YXJkIHtcbiAgY29uc3RydWN0b3Iod2l6YXJkSWQpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMTtcbiAgICB0aGlzLndpemFyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHdpemFyZElkKTtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFN0ZXAoMSk7XG4gIH1cblxuICB1cGRhdGVEaXNwbGF5ZWRTdGVwKHRhcmdldFN0ZXApIHtcbiAgICBpZiAodGhpcy53aXphcmQpIHtcbiAgICAgIGNvbnN0IHRvSGlkZSA9IHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjbGFzcyo9XCJzdGVwLVwiXScpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b0hpZGUsIGVsID0+IHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b1Nob3cgPSB0aGlzLndpemFyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBzdGVwLSR7dGFyZ2V0U3RlcH1gKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodG9TaG93LCBlbCA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLndpemFyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3aXphcmQtbmF2LWJ1dHRvbicpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChidXR0b25zLCBlbCA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3IoJy53aXphcmQtZmluaXNoLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBpZiAodGFyZ2V0U3RlcCA9PT0gMSkge1xuICAgICAgICB0aGlzLndpemFyZC5xdWVyeVNlbGVjdG9yKCcud2l6YXJkLWJhY2stYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRTdGVwID09PSAzKSB7XG4gICAgICAgIHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3IoJy53aXphcmQtbmV4dC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLndpemFyZC5xdWVyeVNlbGVjdG9yKCcud2l6YXJkLWZpbmlzaC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBiYWNrKCkge1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkU3RlcCgtLXRoaXMuY3VycmVudFN0ZXApO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFN0ZXAoKyt0aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuXG4gIGdvVG9TdGVwKHN0ZXApIHtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gc3RlcDtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFN0ZXAoc3RlcCk7XG4gIH1cbn07XG5cbmNvbnN0IGNhbmNlbENvbmZpcm1hdGlvbiA9IHNlbGVjdG9yID0+IHtcbiAgJChzZWxlY3Rvcikub25lKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiAkKCdib2R5JykuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKSk7XG4gICQoc2VsZWN0b3IpLm1vZGFsKCdoaWRlJyk7XG59O1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBGb3JtIHZhbGlkYXRpb25cbi8vIEV4YW1wbGUgc3RhcnRlciBKYXZhU2NyaXB0IGZvciBkaXNhYmxpbmcgZm9ybSBzdWJtaXNzaW9ucyBpZiB0aGVyZSBhcmUgaW52YWxpZCBmaWVsZHNcbihmdW5jdGlvbiAoKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgIC8vIEZldGNoIGFsbCB0aGUgZm9ybXMgd2Ugd2FudCB0byBhcHBseSBjdXN0b20gQm9vdHN0cmFwIHZhbGlkYXRpb24gc3R5bGVzIHRvXG4gICAgdmFyIGZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvcm0nKTtcbiAgICAvLyBMb29wIG92ZXIgdGhlbSBhbmQgcHJldmVudCBzdWJtaXNzaW9uXG4gICAgdmFyIHZhbGlkYXRpb24gPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZm9ybXMsIGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgICBpZiAoZm9ybS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlJykpIHtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZm9ybS5jaGVja1ZhbGlkaXR5KCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnd2FzLXZhbGlkYXRlZCcpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIGZhbHNlKTtcbn0pKCk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIERhc2hyb3dzXG4kKGZ1bmN0aW9uICgpIHtcbiAgJCgnLmpzLWJ0bi1hJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5qcy10YXJnZXQtYScpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpO1xuICB9KTtcblxuICAkKCcuanMtYnRuLWInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmpzLXRhcmdldC1iJykudG9nZ2xlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gIH0pO1xufSk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIFNvcnRhYmxlIHRhYmxlIGV4YW1wbGVcbi8vIFVzZXMgTGlzdC5qcyBvbmx5IGZvciBkZW1vIHB1cnBvc2VzIHRvIHNob3cgaG93IGEgRmx1aWQgc29ydGFibGUgdGFibGUgc2hvdWxkIGJlaGF2ZVxuY29uc3QgdG9nZ2xlUm93U2VsZWN0aW9uID0gdGFyZ2V0ID0+IHtcbiAgY29uc3QgZ2V0Um93ID0gZWwgPT4ge1xuICAgIGRvIHtcbiAgICAgIGlmIChlbC5tYXRjaGVzKCd0cicpKSB7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcbiAgfVxuXG4gIGNvbnN0IHJvdyA9IGdldFJvdyh0YXJnZXQpO1xuICBpZiAocm93KSB7XG4gICAgY29uc3QgY2hlY2tib3ggPSByb3cucXVlcnlTZWxlY3RvcigndHIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgaWYgKGNoZWNrYm94KSB7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGFyZ2V0LmNoZWNrZWQ7XG4gICAgICB0YXJnZXQuY2hlY2tlZCA/IHJvdy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpIDogcm93LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBjaGVja0hhbmRsZXIgPSBldmVudCA9PiB7XG4gIHRvZ2dsZVJvd1NlbGVjdGlvbihldmVudC50YXJnZXQpO1xuICBpZiAoIWV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrQWxsJykuY2hlY2tlZCA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBjaGVja0FsbEhhbmRsZXIgPSBldmVudCA9PiB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnRhYmxlLWV4YW1wbGUnKTtcblxuICBpZiAodGFibGUpIHtcbiAgICBjb25zdCBjaGVja2JveGVzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChjaGVja2JveGVzLCBjaGVja2JveCA9PiB7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICB0b2dnbGVSb3dTZWxlY3Rpb24oY2hlY2tib3gpO1xuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBtYWtlU29ydGFibGUgPSAodGFibGVJZCwgY29sdW1ucykgPT4ge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmxlSWQpO1xuICBsZXQgbGlzdDtcbiAgaWYgKHRhYmxlKSB7XG4gICAgbGlzdCA9IG5ldyBMaXN0KHRhYmxlSWQsIHtcbiAgICAgIGxpc3RDbGFzczogJ3RhYmxlLWRhdGEnLFxuICAgICAgc29ydENsYXNzOiAnc29ydGFibGUnLFxuICAgICAgdmFsdWVOYW1lczogY29sdW1uc1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2hlY2tBbGwgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgIGlmIChjaGVja0FsbCkge1xuICAgICAgY2hlY2tBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0FsbEhhbmRsZXIpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSwgY2hlY2tib3ggPT4ge1xuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrSGFuZGxlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmxldCBmaWx0ZXJhYmxlO1xuJCgoKSA9PiB7XG4gIG1ha2VTb3J0YWJsZSgnc29ydGFibGUtZXhhbXBsZScsIFsnZGF0YS1zdGF0dXMnLCAnZGF0YS1uYW1lJywgJ2RhdGEtdXNlcm5hbWUnLCAnZGF0YS1sb2dpbiddKTtcbiAgZmlsdGVyYWJsZSA9IG1ha2VTb3J0YWJsZSgnZmlsdGVyYWJsZS1leGFtcGxlJywgWydkYXRhLWNvbXBhbnknLCAnZGF0YS1uYW1lJywgJ2RhdGEtZGVwYXJ0bWVudCcsICdkYXRhLWdlbmRlcicsICdkYXRhLWNpdHknLCAnZGF0YS1jb3VudHJ5J10pO1xufSk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIEZpbHRlclxuY29uc3QgZmFjZXRzID0gW1xuICB7XG4gICAga2V5OiAnTmFtZScsXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdPcmdhbml6YXRpb24nLFxuICAgIGhlYWRlcjogdHJ1ZVxuICB9LFxuICB7XG4gICAga2V5OiAnQ29tcGFueScsXG4gICAgdmFsdWVzOiBbXVxuICB9LFxuICB7XG4gICAga2V5OiAnRGVwYXJ0bWVudCcsXG4gICAgdmFsdWVzOiBbXVxuICB9LFxuICB7XG4gICAga2V5OiAnR2VuZGVyJyxcbiAgICBub1JlcGVhdDogdHJ1ZSxcbiAgICB2YWx1ZXM6IFtdXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdMb2NhdGlvbicsXG4gICAgaGVhZGVyOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdDaXR5J1xuICB9LFxuICB7XG4gICAga2V5OiAnQ291bnRyeScsXG4gICAgdmFsdWVzOiBbXVxuICB9XG5dO1xuXG5jb25zdCBmaWxsRmFjZXRzID0gKGZhY2V0cywgc291cmNlKSA9PiB7XG4gIGZhY2V0cy5mb3JFYWNoKGZhY2V0ID0+IHtcbiAgICBpZiAoIWZhY2V0LmhlYWRlciAmJiBmYWNldC52YWx1ZXMpIHtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGBkYXRhLSR7ZmFjZXQua2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgIGNvbnN0IGRhdGEgPSBzb3VyY2UuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICAgICAgY29uc3QgdmFsdWVzID0gbmV3IFNldCgpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkYXRhLCBkYXR1bSA9PiB2YWx1ZXMuYWRkKGRhdHVtLnRleHRDb250ZW50KSk7XG4gICAgICBmYWNldC52YWx1ZXMgPSBbLi4udmFsdWVzXS5zb3J0KCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZmFjZXRzO1xufTtcblxuY29uc3QgZmlsdGVyQnlGYWNldHMgPSAoaXRlbSwgZmlsdGVyKSA9PiB7XG4gIGxldCByZXN1bHQgPSB0cnVlO1xuICBjb25zdCB2YWx1ZXMgPSBpdGVtLnZhbHVlcygpO1xuXG4gIGZvciAobGV0IHByb3AgaW4gdmFsdWVzKSB7XG4gICAgY29uc3QgdmFsRmlsdGVyID0gZmlsdGVyW3Byb3Auc3BsaXQoJy0nKVsxXV07XG5cbiAgICBpZiAodmFsRmlsdGVyKSB7XG4gICAgICBjb25zdCBpdGVtVmFsID0gdmFsdWVzW3Byb3BdO1xuXG4gICAgICBpZiAodHlwZW9mICh2YWxGaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXN1bHQgPSBpdGVtVmFsID09PSB2YWxGaWx0ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGhpc1Jlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2YWxGaWx0ZXIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoaXRlbVZhbCA9PT0gdmFsRmlsdGVyW2ldKSB7XG4gICAgICAgICAgICB0aGlzUmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpc1Jlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGFwcGx5RmlsdGVyID0gKGZpbHRlcmFibGUsIGZpbHRlcikgPT4ge1xuICBpZiAoZmlsdGVyYWJsZSAmJiBmaWx0ZXIpIHtcbiAgICBmaWx0ZXJhYmxlLmZpbHRlcihpdGVtID0+IGZpbHRlckJ5RmFjZXRzKGl0ZW0sIGZpbHRlci5yZXN1bHQoKSkpO1xuICB9XG59O1xuXG5jb25zdCBzaG93RmlsdGVyID0gKHF1ZXJ5RGlzcGxheSwgZmlsdGVyKSA9PiB7XG4gIGlmIChxdWVyeURpc3BsYXkgJiYgZmlsdGVyKSB7XG4gICAgcXVlcnlEaXNwbGF5LnRleHRDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyLnJlc3VsdCgpLCBudWxsLCAyKTsgLy8gcmVzdWx0IGlzIGEgSlNPTiBvYmplY3QsIHNvIHN0cmluZ2lmeSBpdCBmb3IgZGlzcGxheVxuICB9XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRhdGFTb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyYWJsZS1leGFtcGxlIHRib2R5Jyk7XG5cbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgY29uc3QgZmlsdGVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWlucHV0LWV4YW1wbGUnKTtcbiAgICBjb25zdCBkYXRhID0gZmlsbEZhY2V0cyhmYWNldHMsIGRhdGFTb3VyY2UpO1xuICAgIGNvbnN0IGZpbHRlciA9IG5ldyBGaWx0ZXIoZmlsdGVyRWwsIGRhdGEpO1xuICAgIGZpbHRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZWQuZmx1aWQuZmlsdGVyJywgKCkgPT4gc2hvd0ZpbHRlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLXF1ZXJ5LWV4YW1wbGUnKSwgZmlsdGVyKSk7XG4gIH0pO1xuXG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgIGNvbnN0IGZpbHRlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1pbnB1dCcpO1xuICAgIGNvbnN0IGRhdGEgPSBmaWxsRmFjZXRzKGZhY2V0cywgZGF0YVNvdXJjZSk7XG4gICAgY29uc3QgZmlsdGVyID0gbmV3IEZpbHRlcihmaWx0ZXJFbCwgZGF0YSk7XG4gICAgZmlsdGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlZC5mbHVpZC5maWx0ZXInLCAoKSA9PiBhcHBseUZpbHRlcihmaWx0ZXJhYmxlLCBmaWx0ZXIpKTtcbiAgfSk7XG59KSgpO1xuLy8jZW5kcmVnaW9uXG4iXSwiZmlsZSI6ImRlbW8uanMifQ==
