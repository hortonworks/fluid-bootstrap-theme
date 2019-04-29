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

  if (dataSource) {
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
  }
})(); //#endregion
//#region Palette Selector


var getQueryParams = function getQueryParams(query) {
  var params = {};
  var queryString = query.substring(1).split('&');

  if (queryString.length > 0 && queryString[0]) {
    var pairs = queryString.map(function (component) {
      return component.split('=');
    });
    pairs.reduce(function (acc, pair) {
      return acc[pair[0]] = decodeURIComponent(pair[1]);
    }, params);
  }

  return params;
};

var makeQueryString = function makeQueryString(params) {
  var queryString = '';

  for (var prop in params) {
    queryString += "&".concat(prop, "=").concat(params[prop]);
  }

  queryString = queryString.substring(1);

  if (queryString) {
    queryString = "?".concat(queryString);
  }

  return queryString;
};

var setQueryParam = function setQueryParam(key, value) {
  var newURL = "".concat(location.protocol, "//").concat(location.host).concat(location.pathname);
  var params = getQueryParams(location.search);
  params[key] = value;
  var queryString = makeQueryString(params);

  if (queryString) {
    newURL += queryString;
  }

  if (location.hash) {
    newURL += location.hash;
  }

  history.pushState(null, '', newURL);
};

var setPalette = function setPalette(palette) {
  switch (palette) {
    case 'dark':
      document.body.classList.add('palette-dark');
      document.body.classList.remove('palette-accessible');
      break;

    case 'accessible':
      document.body.classList.remove('palette-dark');
      document.body.classList.add('palette-accessible');
      break;

    default:
      //default "hybrid" palette selected
      document.body.classList.remove('palette-dark');
      document.body.classList.remove('palette-accessible');
      break;
  }
};

var paletteChangeHandler = function paletteChangeHandler(event) {
  setPalette(event.target.value);
  setQueryParam('theme', event.target.value);
};

var pageChangeHandler = function pageChangeHandler(link) {
  link.search = location.search;
};

(function () {
  var params = getQueryParams(location.search);
  setPalette(params.theme);
  var radios = document.querySelectorAll('[name="paletteRadios"]');
  radios.forEach(function (radio) {
    radio.addEventListener('click', paletteChangeHandler);

    if (params.theme) {
      if (params.theme === radio.value) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    }
  });
})(); //#endregion
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiYWRkQWxlcnQiLCJtZXNzYWdlIiwib3B0aW9ucyIsIm1ha2VBbGVydCIsImFsZXJ0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidHlwZSIsIndyYXBwZXIiLCJoZWFkaW5nIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiZGlzbWlzc2libGUiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImFsZXJ0Q29sbGFwc2UiLCJ0YXJnZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJkdXJhdGlvbiIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwic2V0VGltZW91dCIsImRpc21pc3NBbGVydCIsIiQiLCJhZGRBbGVydEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXJyYXlUb09iaiIsIm91dHB1dCIsImlucHV0IiwibmFtZSIsInZhbHVlIiwiZGF0YSIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemVBcnJheSIsInJlZHVjZSIsImdldFRhcmdldCIsInRvcEJvdHRvbSIsInJpZ2h0TGVmdCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGVydFRvcEJvdHRvbSIsImFsZXJ0UmlnaHRMZWZ0IiwiYWxlcnRUeXBlIiwiYWxlcnRDb250ZW50IiwiYWxlcnREaXNtaXNzaWJsZSIsIndpbmRvdyIsInBhcnNlSW50IiwiYWxlcnREdXJhdGlvbiIsImFsZXJ0TWVzc2FnZSIsImNsb3Nlc3QiLCJvbmUiLCJjb2xsYXBzZSIsInJlbW92ZSIsImRpc21pc3NBbGVydEhhbmRsZXIiLCJjbG9zZSIsImRpc21pc3NBbGxBbGVydHMiLCJ1cGRhdGVDb250YWluZXJFeGFtcGxlIiwidGV4dCIsImNzcyIsImZuIiwicG9wb3ZlciIsInRvb2x0aXAiLCJib3VuZGFyeSIsInJlc2l6ZSIsIm9uIiwiV2l6YXJkIiwid2l6YXJkSWQiLCJjdXJyZW50U3RlcCIsIndpemFyZCIsInVwZGF0ZURpc3BsYXllZFN0ZXAiLCJ0YXJnZXRTdGVwIiwidG9IaWRlIiwicXVlcnlTZWxlY3RvckFsbCIsIkFycmF5IiwicHJvdG90eXBlIiwiZm9yRWFjaCIsImNhbGwiLCJlbCIsInN0eWxlIiwiZGlzcGxheSIsInRvU2hvdyIsImdldEVsZW1lbnRzQnlDbGFzc05hbWUiLCJidXR0b25zIiwicXVlcnlTZWxlY3RvciIsInN0ZXAiLCJjYW5jZWxDb25maXJtYXRpb24iLCJzZWxlY3RvciIsImFkZENsYXNzIiwibW9kYWwiLCJhZGRFdmVudExpc3RlbmVyIiwiZm9ybXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsInZhbGlkYXRpb24iLCJmaWx0ZXIiLCJmb3JtIiwiY29udGFpbnMiLCJjaGVja1ZhbGlkaXR5Iiwic3RvcFByb3BhZ2F0aW9uIiwiY2xpY2siLCJ0b2dnbGVDbGFzcyIsInRvZ2dsZVJvd1NlbGVjdGlvbiIsImdldFJvdyIsIm1hdGNoZXMiLCJwYXJlbnRFbGVtZW50IiwicGFyZW50Tm9kZSIsIm5vZGVUeXBlIiwicm93IiwiY2hlY2tib3giLCJjaGVja2VkIiwiY2hlY2tIYW5kbGVyIiwiY2hlY2tBbGxIYW5kbGVyIiwidGFibGUiLCJjaGVja2JveGVzIiwibWFrZVNvcnRhYmxlIiwidGFibGVJZCIsImNvbHVtbnMiLCJsaXN0IiwiTGlzdCIsImxpc3RDbGFzcyIsInNvcnRDbGFzcyIsInZhbHVlTmFtZXMiLCJjaGVja0FsbCIsImZpbHRlcmFibGUiLCJmYWNldHMiLCJrZXkiLCJoZWFkZXIiLCJ2YWx1ZXMiLCJub1JlcGVhdCIsImZpbGxGYWNldHMiLCJzb3VyY2UiLCJmYWNldCIsImNsYXNzTmFtZSIsInRvTG93ZXJDYXNlIiwiU2V0IiwiZGF0dW0iLCJ0ZXh0Q29udGVudCIsInNvcnQiLCJmaWx0ZXJCeUZhY2V0cyIsIml0ZW0iLCJyZXN1bHQiLCJwcm9wIiwidmFsRmlsdGVyIiwic3BsaXQiLCJpdGVtVmFsIiwidGhpc1Jlc3VsdCIsImkiLCJsZW4iLCJsZW5ndGgiLCJhcHBseUZpbHRlciIsInNob3dGaWx0ZXIiLCJxdWVyeURpc3BsYXkiLCJKU09OIiwic3RyaW5naWZ5IiwiZGF0YVNvdXJjZSIsImZpbHRlckVsIiwiRmlsdGVyIiwiZ2V0UXVlcnlQYXJhbXMiLCJxdWVyeSIsInBhcmFtcyIsInF1ZXJ5U3RyaW5nIiwic3Vic3RyaW5nIiwicGFpcnMiLCJtYXAiLCJjb21wb25lbnQiLCJhY2MiLCJwYWlyIiwiZGVjb2RlVVJJQ29tcG9uZW50IiwibWFrZVF1ZXJ5U3RyaW5nIiwic2V0UXVlcnlQYXJhbSIsIm5ld1VSTCIsImxvY2F0aW9uIiwicHJvdG9jb2wiLCJob3N0IiwicGF0aG5hbWUiLCJzZWFyY2giLCJoYXNoIiwiaGlzdG9yeSIsInB1c2hTdGF0ZSIsInNldFBhbGV0dGUiLCJwYWxldHRlIiwiYm9keSIsInBhbGV0dGVDaGFuZ2VIYW5kbGVyIiwicGFnZUNoYW5nZUhhbmRsZXIiLCJsaW5rIiwidGhlbWUiLCJyYWRpb3MiLCJyYWRpbyJdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7QUFRQSxhLENBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7QUFDQSxJQUFNQSxRQUFRLEdBQUcsU0FBWEEsUUFBVyxDQUFDQyxPQUFELEVBQTJCO0FBQUEsTUFBakJDLE9BQWlCLHVFQUFQLEVBQU87O0FBQzFDLE1BQU1DLFNBQVMsR0FBRyxTQUFaQSxTQUFZLENBQUNGLE9BQUQsRUFBVUMsT0FBVixFQUFzQjtBQUN0QyxRQUFNRSxLQUFLLEdBQUdDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixLQUF2QixDQUFkO0FBQ0FGLElBQUFBLEtBQUssQ0FBQ0csU0FBTixDQUFnQkMsR0FBaEIsQ0FBb0IsT0FBcEIsRUFBNkIsTUFBN0I7QUFDQUosSUFBQUEsS0FBSyxDQUFDSyxZQUFOLENBQW1CLE1BQW5CLEVBQTJCLE9BQTNCOztBQUVBLFlBQVFQLE9BQU8sQ0FBQ1EsSUFBaEI7QUFDRSxXQUFLLE1BQUw7QUFDRU4sUUFBQUEsS0FBSyxDQUFDRyxTQUFOLENBQWdCQyxHQUFoQixDQUFvQixZQUFw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O0FBQ0Y7QUFDRixHQVZEO0FBV0QsQ0FoQkQsSSxDQWlCQSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQ29weXJpZ2h0IChjKSAyMDExLTIwMTgsIEhvcnRvbndvcmtzIEluYy4gIEFsbCByaWdodHMgcmVzZXJ2ZWQuXG4gKiBFeGNlcHQgYXMgZXhwcmVzc2x5IHBlcm1pdHRlZCBpbiBhIHdyaXR0ZW4gYWdyZWVtZW50IGJldHdlZW4geW91XG4gKiBvciB5b3VyIGNvbXBhbnkgYW5kIEhvcnRvbndvcmtzLCBJbmMsIGFueSB1c2UsIHJlcHJvZHVjdGlvbixcbiAqIG1vZGlmaWNhdGlvbiwgcmVkaXN0cmlidXRpb24sIHNoYXJpbmcsIGxlbmRpbmcgb3Igb3RoZXIgZXhwbG9pdGF0aW9uXG4gKiBvZiBhbGwgb3IgYW55IHBhcnQgb2YgdGhlIGNvbnRlbnRzIG9mIHRoaXMgZmlsZSBpcyBzdHJpY3RseSBwcm9oaWJpdGVkLlxuICovXG5cbid1c2Ugc3RyaWN0JztcblxuLy8jcmVnaW9uIEFsZXJ0IHRlc3RlclxuY29uc3QgYWRkQWxlcnQgPSAobWVzc2FnZSwgb3B0aW9ucyA9IHt9KSA9PiB7XG4gIGNvbnN0IG1ha2VBbGVydCA9IChtZXNzYWdlLCBvcHRpb25zKSA9PiB7XG4gICAgY29uc3QgYWxlcnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydCcsICdmYWRlJyk7XG4gICAgYWxlcnQuc2V0QXR0cmlidXRlKCdyb2xlJywgJ2FsZXJ0Jyk7XG5cbiAgICBzd2l0Y2ggKG9wdGlvbnMudHlwZSkge1xuICAgICAgY2FzZSAnaW5mbyc6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWluZm8nKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdzdWNjZXNzJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtc3VjY2VzcycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3dhcm5pbmcnOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC13YXJuaW5nJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnZGFuZ2VyJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGFuZ2VyJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGVmYXVsdCcpO1xuICAgICAgICBicmVhaztcbiAgICB9XG5cbiAgICBjb25zdCB3cmFwcGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG5cbiAgICBjb25zdCBoZWFkaW5nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgaGVhZGluZy5jbGFzc0xpc3QuYWRkKCdhbGVydC1oZWFkaW5nJyk7XG4gICAgaGVhZGluZy5pbm5lckhUTUwgPSBtZXNzYWdlO1xuICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoaGVhZGluZyk7XG5cbiAgICBpZiAob3B0aW9ucy5jb250ZW50KSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBjb250ZW50LmlubmVySFRNTCA9IG9wdGlvbnMuY29udGVudDtcbiAgICAgIHdyYXBwZXIuYXBwZW5kQ2hpbGQoY29udGVudCk7XG4gICAgfVxuXG4gICAgYWxlcnQuYXBwZW5kQ2hpbGQod3JhcHBlcik7XG5cbiAgICBpZiAob3B0aW9ucy5kaXNtaXNzaWJsZSkge1xuICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtZGlzbWlzc2libGUnKTtcbiAgICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIHRlbXAuaW5uZXJIVE1MID0gJzxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiY2xvc2VcIiBhcmlhLWxhYmVsPVwiQ2xvc2VcIiBvbmNsaWNrPVwiZGlzbWlzc0FsZXJ0SGFuZGxlcih0aGlzKVwiPjwvYnV0dG9uPic7XG4gICAgICBhbGVydC5hcHBlbmRDaGlsZCh0ZW1wLmZpcnN0Q2hpbGQpO1xuICAgIH1cblxuICAgIGNvbnN0IGFsZXJ0Q29sbGFwc2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBhbGVydENvbGxhcHNlLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWNvbGxhcHNlJywgJ2NvbGxhcHNlJywgJ3Nob3cnKTtcbiAgICBhbGVydENvbGxhcHNlLmFwcGVuZENoaWxkKGFsZXJ0KTtcblxuICAgIHJldHVybiBhbGVydENvbGxhcHNlO1xuICB9O1xuXG4gIGlmICghbWVzc2FnZSB8fCB0eXBlb2YgbWVzc2FnZSAhPT0gJ3N0cmluZycpIHJldHVybjtcblxuICBjb25zdCB7XG4gICAgdGFyZ2V0ID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LFxuICAgIHR5cGUgPSAnZGVmYXVsdCcsIC8vIG1heSBiZSAnaW5mbycsICdzdWNjZXNzJywgJ3dhcm5pbmcnLCAnZGFuZ2VyJywgb3IgJ2RlZmF1bHQnXG4gICAgY29udGVudCA9IG51bGwsXG4gICAgZGlzbWlzc2libGUgPSB0cnVlLFxuICAgIGR1cmF0aW9uID0gMCwgLy9pbiBzZWNvbmRzXG4gICAgcG9zaXRpb24gPSAnZmlyc3QnIC8vIGlmICdmaXJzdCcgYWxlcnQgd2lsbCBiZSBpbnNlcnRlZCBhYm92ZSBleGlzdGluZyBhbGVydHNcbiAgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgYWxlcnQgPSBtYWtlQWxlcnQobWVzc2FnZSwge3RhcmdldCwgdHlwZSwgY29udGVudCwgZGlzbWlzc2libGUsIGR1cmF0aW9uLCBwb3NpdGlvbn0pO1xuXG4gIGlmIChwb3NpdGlvbiA9PT0gJ2ZpcnN0Jykge1xuICAgIHRhcmdldC5pbnNlcnRCZWZvcmUoYWxlcnQsIHRhcmdldC5maXJzdENoaWxkKTtcbiAgfSBlbHNlIHtcbiAgICB0YXJnZXQuYXBwZW5kQ2hpbGQoYWxlcnQpO1xuICB9XG5cbiAgc2V0VGltZW91dCgoKSA9PiBhbGVydC5maXJzdENoaWxkLmNsYXNzTGlzdC5hZGQoJ3Nob3cnKSk7XG5cbiAgaWYgKGR1cmF0aW9uKSB7XG4gICAgc2V0VGltZW91dCgoKSA9PiBkaXNtaXNzQWxlcnQoJChhbGVydC5maXJzdENoaWxkKSksIGR1cmF0aW9uICogMTAwMCk7XG4gIH1cbn07XG5cbmNvbnN0IGFkZEFsZXJ0SGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICBjb25zdCBhcnJheVRvT2JqID0gKG91dHB1dCwgaW5wdXQpID0+IHtcbiAgICBvdXRwdXRbaW5wdXQubmFtZV0gPSBpbnB1dC52YWx1ZTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9O1xuXG4gIGNvbnN0IGRhdGEgPSAkKGV2ZW50LmN1cnJlbnRUYXJnZXQpLnNlcmlhbGl6ZUFycmF5KCkucmVkdWNlKGFycmF5VG9PYmosIHt9KTtcblxuICBjb25zdCBnZXRUYXJnZXQgPSAodG9wQm90dG9tLCByaWdodExlZnQpID0+IHtcbiAgICBsZXQgaWQ7XG5cbiAgICBpZiAodG9wQm90dG9tID09PSAndG9wJykge1xuICAgICAgaWYgKHJpZ2h0TGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBpZCA9ICdhbGVydHNUb3BSaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9ICdhbGVydHNUb3BMZWZ0JztcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHJpZ2h0TGVmdCA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICBpZCA9ICdhbGVydHNCb3R0b21SaWdodCc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZCA9ICdhbGVydHNCb3R0b21MZWZ0JztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdGFyZ2V0OiBnZXRUYXJnZXQoZGF0YS5hbGVydFRvcEJvdHRvbSwgZGF0YS5hbGVydFJpZ2h0TGVmdCksXG4gICAgdHlwZTogZGF0YS5hbGVydFR5cGUsXG4gICAgY29udGVudDogZGF0YS5hbGVydENvbnRlbnQsXG4gICAgZGlzbWlzc2libGU6ICEhZGF0YS5hbGVydERpc21pc3NpYmxlLFxuICAgIGR1cmF0aW9uOiB3aW5kb3cucGFyc2VJbnQoZGF0YS5hbGVydER1cmF0aW9uKSxcbiAgICBwb3NpdGlvbjogZGF0YS5hbGVydFRvcEJvdHRvbSA9PT0gJ2JvdHRvbScgPyAnZmlyc3QnIDogJ2xhc3QnXG4gIH07XG5cbiAgYWRkQWxlcnQoZGF0YS5hbGVydE1lc3NhZ2UsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGRpc21pc3NBbGVydCA9IGFsZXJ0ID0+IHtcbiAgY29uc3QgYWxlcnRDb2xsYXBzZSA9IGFsZXJ0LmNsb3Nlc3QoJy5hbGVydC1jb2xsYXBzZScpO1xuXG4gIGFsZXJ0Lm9uZSgnY2xvc2UuYnMuYWxlcnQnLCAoKSA9PiBhbGVydENvbGxhcHNlLmNvbGxhcHNlKCdoaWRlJykpO1xuICBhbGVydENvbGxhcHNlLm9uZSgnaGlkZGVuLmJzLmNvbGxhcHNlJywgKCkgPT4gYWxlcnRDb2xsYXBzZS5yZW1vdmUoKSk7XG5cbiAgYWxlcnQuYWxlcnQoJ2Nsb3NlJyk7XG59O1xuXG5jb25zdCBkaXNtaXNzQWxlcnRIYW5kbGVyID0gY2xvc2UgPT4ge1xuICBjb25zdCBhbGVydCA9ICQoY2xvc2UpLmNsb3Nlc3QoJy5hbGVydCcpO1xuICBkaXNtaXNzQWxlcnQoYWxlcnQpO1xufTtcblxuY29uc3QgZGlzbWlzc0FsbEFsZXJ0cyA9ICgpID0+IHtcbiAgJCgnLmFsZXJ0LWNvbnRhaW5lciAuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbn07XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIENvbnRhaW5lciBleGFtcGxlXG5jb25zdCB1cGRhdGVDb250YWluZXJFeGFtcGxlID0gKCkgPT4ge1xuICAkKCcjZG9jdW1lbnRXaWR0aCcpLnRleHQoJCgnYm9keScpLmNzcygnd2lkdGgnKSk7XG4gICQoJyNjb250YWluZXJXaWR0aCcpLnRleHQoJCgnI2NvbnRhaW5lckV4YW1wbGUnKS5jc3MoJ3dpZHRoJykpO1xuICAkKCcjY29udGFpbmVyRmx1aWRXaWR0aCcpLnRleHQoJCgnI2NvbnRhaW5lckZsdWlkRXhhbXBsZScpLmNzcygnd2lkdGgnKSk7XG59O1xuXG4kKGZ1bmN0aW9uICgpIHtcbiAgaWYgKCQuZm4ucG9wb3Zlcikge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInBvcG92ZXJcIl0nKS5wb3BvdmVyKCk7XG4gIH1cbiAgaWYgKCQuZm4udG9vbHRpcCkge1xuICAgICQoJ1tkYXRhLXRvZ2dsZT1cInRvb2x0aXBcIl0nKS50b29sdGlwKHsgYm91bmRhcnk6ICd3aW5kb3cnIH0pO1xuICB9XG5cbiAgdXBkYXRlQ29udGFpbmVyRXhhbXBsZSgpO1xuICAkKHdpbmRvdykucmVzaXplKHVwZGF0ZUNvbnRhaW5lckV4YW1wbGUpO1xuXG4gICQoJyNhZGRBbGVydCcpLm9uKCdzdWJtaXQnLCBhZGRBbGVydEhhbmRsZXIpO1xuICAkKCcjZGlzbWlzc0FsbEFsZXJ0cycpLm9uKCdjbGljaycsIGRpc21pc3NBbGxBbGVydHMpO1xufSk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIFdpemFyZCBpbiBtb2RhbFxuY2xhc3MgV2l6YXJkIHtcbiAgY29uc3RydWN0b3Iod2l6YXJkSWQpIHtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gMTtcbiAgICB0aGlzLndpemFyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHdpemFyZElkKTtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFN0ZXAoMSk7XG4gIH1cblxuICB1cGRhdGVEaXNwbGF5ZWRTdGVwKHRhcmdldFN0ZXApIHtcbiAgICBpZiAodGhpcy53aXphcmQpIHtcbiAgICAgIGNvbnN0IHRvSGlkZSA9IHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tjbGFzcyo9XCJzdGVwLVwiXScpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b0hpZGUsIGVsID0+IHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB0b1Nob3cgPSB0aGlzLndpemFyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGBzdGVwLSR7dGFyZ2V0U3RlcH1gKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodG9TaG93LCBlbCA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGJ1dHRvbnMgPSB0aGlzLndpemFyZC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKCd3aXphcmQtbmF2LWJ1dHRvbicpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChidXR0b25zLCBlbCA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfSk7XG5cbiAgICAgIHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3IoJy53aXphcmQtZmluaXNoLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICBpZiAodGFyZ2V0U3RlcCA9PT0gMSkge1xuICAgICAgICB0aGlzLndpemFyZC5xdWVyeVNlbGVjdG9yKCcud2l6YXJkLWJhY2stYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIH1cbiAgICAgIGlmICh0YXJnZXRTdGVwID09PSAzKSB7XG4gICAgICAgIHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3IoJy53aXphcmQtbmV4dC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICB0aGlzLndpemFyZC5xdWVyeVNlbGVjdG9yKCcud2l6YXJkLWZpbmlzaC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBiYWNrKCkge1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkU3RlcCgtLXRoaXMuY3VycmVudFN0ZXApO1xuICB9XG5cbiAgbmV4dCgpIHtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFN0ZXAoKyt0aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuXG4gIGdvVG9TdGVwKHN0ZXApIHtcbiAgICB0aGlzLmN1cnJlbnRTdGVwID0gc3RlcDtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFN0ZXAoc3RlcCk7XG4gIH1cbn07XG5cbmNvbnN0IGNhbmNlbENvbmZpcm1hdGlvbiA9IHNlbGVjdG9yID0+IHtcbiAgJChzZWxlY3Rvcikub25lKCdoaWRkZW4uYnMubW9kYWwnLCAoKSA9PiAkKCdib2R5JykuYWRkQ2xhc3MoJ21vZGFsLW9wZW4nKSk7XG4gICQoc2VsZWN0b3IpLm1vZGFsKCdoaWRlJyk7XG59O1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBGb3JtIHZhbGlkYXRpb25cbi8vIEV4YW1wbGUgc3RhcnRlciBKYXZhU2NyaXB0IGZvciBkaXNhYmxpbmcgZm9ybSBzdWJtaXNzaW9ucyBpZiB0aGVyZSBhcmUgaW52YWxpZCBmaWVsZHNcbihmdW5jdGlvbiAoKSB7XG4gIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgZnVuY3Rpb24gKCkge1xuICAgIC8vIEZldGNoIGFsbCB0aGUgZm9ybXMgd2Ugd2FudCB0byBhcHBseSBjdXN0b20gQm9vdHN0cmFwIHZhbGlkYXRpb24gc3R5bGVzIHRvXG4gICAgdmFyIGZvcm1zID0gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2Zvcm0nKTtcbiAgICAvLyBMb29wIG92ZXIgdGhlbSBhbmQgcHJldmVudCBzdWJtaXNzaW9uXG4gICAgdmFyIHZhbGlkYXRpb24gPSBBcnJheS5wcm90b3R5cGUuZmlsdGVyLmNhbGwoZm9ybXMsIGZ1bmN0aW9uIChmb3JtKSB7XG4gICAgICBpZiAoZm9ybS5jbGFzc0xpc3QuY29udGFpbnMoJ3ZhbGlkYXRlJykpIHtcbiAgICAgICAgZm9ybS5hZGRFdmVudExpc3RlbmVyKCdzdWJtaXQnLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICBpZiAoZm9ybS5jaGVja1ZhbGlkaXR5KCkgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnd2FzLXZhbGlkYXRlZCcpO1xuICAgICAgICB9LCBmYWxzZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0sIGZhbHNlKTtcbn0pKCk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIERhc2hyb3dzXG4kKGZ1bmN0aW9uICgpIHtcbiAgJCgnLmpzLWJ0bi1hJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5qcy10YXJnZXQtYScpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpO1xuICB9KTtcblxuICAkKCcuanMtYnRuLWInKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmpzLXRhcmdldC1iJykudG9nZ2xlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gIH0pO1xufSk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIFNvcnRhYmxlIHRhYmxlIGV4YW1wbGVcbi8vIFVzZXMgTGlzdC5qcyBvbmx5IGZvciBkZW1vIHB1cnBvc2VzIHRvIHNob3cgaG93IGEgRmx1aWQgc29ydGFibGUgdGFibGUgc2hvdWxkIGJlaGF2ZVxuY29uc3QgdG9nZ2xlUm93U2VsZWN0aW9uID0gdGFyZ2V0ID0+IHtcbiAgY29uc3QgZ2V0Um93ID0gZWwgPT4ge1xuICAgIGRvIHtcbiAgICAgIGlmIChlbC5tYXRjaGVzKCd0cicpKSB7XG4gICAgICAgIHJldHVybiBlbDtcbiAgICAgIH1cbiAgICAgIGVsID0gZWwucGFyZW50RWxlbWVudCB8fCBlbC5wYXJlbnROb2RlO1xuICAgIH0gd2hpbGUgKGVsICE9PSBudWxsICYmIGVsLm5vZGVUeXBlID09PSAxKTtcbiAgfVxuXG4gIGNvbnN0IHJvdyA9IGdldFJvdyh0YXJnZXQpO1xuICBpZiAocm93KSB7XG4gICAgY29uc3QgY2hlY2tib3ggPSByb3cucXVlcnlTZWxlY3RvcigndHIgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgaWYgKGNoZWNrYm94KSB7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gdGFyZ2V0LmNoZWNrZWQ7XG4gICAgICB0YXJnZXQuY2hlY2tlZCA/IHJvdy5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpIDogcm93LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCBjaGVja0hhbmRsZXIgPSBldmVudCA9PiB7XG4gIHRvZ2dsZVJvd1NlbGVjdGlvbihldmVudC50YXJnZXQpO1xuICBpZiAoIWV2ZW50LnRhcmdldC5jaGVja2VkKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NoZWNrQWxsJykuY2hlY2tlZCA9IGZhbHNlO1xuICB9XG59O1xuXG5jb25zdCBjaGVja0FsbEhhbmRsZXIgPSBldmVudCA9PiB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NvcnRhYmxlLWV4YW1wbGUnKTtcblxuICBpZiAodGFibGUpIHtcbiAgICBjb25zdCBjaGVja2JveGVzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGJvZHkgaW5wdXRbdHlwZT1cImNoZWNrYm94XCJdJyk7XG4gICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChjaGVja2JveGVzLCBjaGVja2JveCA9PiB7XG4gICAgICBjaGVja2JveC5jaGVja2VkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICAgICB0b2dnbGVSb3dTZWxlY3Rpb24oY2hlY2tib3gpO1xuICAgIH0pO1xuICB9XG59O1xuXG5jb25zdCBtYWtlU29ydGFibGUgPSAodGFibGVJZCwgY29sdW1ucykgPT4ge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmxlSWQpO1xuICBsZXQgbGlzdDtcbiAgaWYgKHRhYmxlKSB7XG4gICAgbGlzdCA9IG5ldyBMaXN0KHRhYmxlSWQsIHtcbiAgICAgIGxpc3RDbGFzczogJ3RhYmxlLWRhdGEnLFxuICAgICAgc29ydENsYXNzOiAnc29ydGFibGUnLFxuICAgICAgdmFsdWVOYW1lczogY29sdW1uc1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2hlY2tBbGwgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgIGlmIChjaGVja0FsbCkge1xuICAgICAgY2hlY2tBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0FsbEhhbmRsZXIpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSwgY2hlY2tib3ggPT4ge1xuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrSGFuZGxlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gbGlzdDtcbn07XG5cbmxldCBmaWx0ZXJhYmxlO1xuJCgoKSA9PiB7XG4gIG1ha2VTb3J0YWJsZSgnc29ydGFibGUtZXhhbXBsZScsIFsnZGF0YS1zdGF0dXMnLCAnZGF0YS1uYW1lJywgJ2RhdGEtdXNlcm5hbWUnLCAnZGF0YS1sb2dpbiddKTtcbiAgZmlsdGVyYWJsZSA9IG1ha2VTb3J0YWJsZSgnZmlsdGVyYWJsZS1leGFtcGxlJywgWydkYXRhLWNvbXBhbnknLCAnZGF0YS1uYW1lJywgJ2RhdGEtZGVwYXJ0bWVudCcsICdkYXRhLWdlbmRlcicsICdkYXRhLWNpdHknLCAnZGF0YS1jb3VudHJ5J10pO1xufSk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIEZpbHRlclxuY29uc3QgZmFjZXRzID0gW1xuICB7XG4gICAga2V5OiAnTmFtZScsXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdPcmdhbml6YXRpb24nLFxuICAgIGhlYWRlcjogdHJ1ZVxuICB9LFxuICB7XG4gICAga2V5OiAnQ29tcGFueScsXG4gICAgdmFsdWVzOiBbXVxuICB9LFxuICB7XG4gICAga2V5OiAnRGVwYXJ0bWVudCcsXG4gICAgdmFsdWVzOiBbXVxuICB9LFxuICB7XG4gICAga2V5OiAnR2VuZGVyJyxcbiAgICBub1JlcGVhdDogdHJ1ZSxcbiAgICB2YWx1ZXM6IFtdXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdMb2NhdGlvbicsXG4gICAgaGVhZGVyOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdDaXR5J1xuICB9LFxuICB7XG4gICAga2V5OiAnQ291bnRyeScsXG4gICAgdmFsdWVzOiBbXVxuICB9XG5dO1xuXG5jb25zdCBmaWxsRmFjZXRzID0gKGZhY2V0cywgc291cmNlKSA9PiB7XG4gIGZhY2V0cy5mb3JFYWNoKGZhY2V0ID0+IHtcbiAgICBpZiAoIWZhY2V0LmhlYWRlciAmJiBmYWNldC52YWx1ZXMpIHtcbiAgICAgIGNvbnN0IGNsYXNzTmFtZSA9IGBkYXRhLSR7ZmFjZXQua2V5LnRvTG93ZXJDYXNlKCl9YDtcbiAgICAgIGNvbnN0IGRhdGEgPSBzb3VyY2UuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjbGFzc05hbWUpO1xuICAgICAgY29uc3QgdmFsdWVzID0gbmV3IFNldCgpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChkYXRhLCBkYXR1bSA9PiB2YWx1ZXMuYWRkKGRhdHVtLnRleHRDb250ZW50KSk7XG4gICAgICBmYWNldC52YWx1ZXMgPSBbLi4udmFsdWVzXS5zb3J0KCk7XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gZmFjZXRzO1xufTtcblxuY29uc3QgZmlsdGVyQnlGYWNldHMgPSAoaXRlbSwgZmlsdGVyKSA9PiB7XG4gIGxldCByZXN1bHQgPSB0cnVlO1xuICBjb25zdCB2YWx1ZXMgPSBpdGVtLnZhbHVlcygpO1xuXG4gIGZvciAobGV0IHByb3AgaW4gdmFsdWVzKSB7XG4gICAgY29uc3QgdmFsRmlsdGVyID0gZmlsdGVyW3Byb3Auc3BsaXQoJy0nKVsxXV07XG5cbiAgICBpZiAodmFsRmlsdGVyKSB7XG4gICAgICBjb25zdCBpdGVtVmFsID0gdmFsdWVzW3Byb3BdO1xuXG4gICAgICBpZiAodHlwZW9mICh2YWxGaWx0ZXIpID09PSAnc3RyaW5nJykge1xuICAgICAgICByZXN1bHQgPSBpdGVtVmFsID09PSB2YWxGaWx0ZXI7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgdGhpc1Jlc3VsdCA9IGZhbHNlO1xuXG4gICAgICAgIGZvciAobGV0IGkgPSAwLCBsZW4gPSB2YWxGaWx0ZXIubGVuZ3RoOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICBpZiAoaXRlbVZhbCA9PT0gdmFsRmlsdGVyW2ldKSB7XG4gICAgICAgICAgICB0aGlzUmVzdWx0ID0gdHJ1ZTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghdGhpc1Jlc3VsdCkge1xuICAgICAgICAgIHJlc3VsdCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFyZXN1bHQpIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn07XG5cbmNvbnN0IGFwcGx5RmlsdGVyID0gKGZpbHRlcmFibGUsIGZpbHRlcikgPT4ge1xuICBpZiAoZmlsdGVyYWJsZSAmJiBmaWx0ZXIpIHtcbiAgICBmaWx0ZXJhYmxlLmZpbHRlcihpdGVtID0+IGZpbHRlckJ5RmFjZXRzKGl0ZW0sIGZpbHRlci5yZXN1bHQoKSkpO1xuICB9XG59O1xuXG5jb25zdCBzaG93RmlsdGVyID0gKHF1ZXJ5RGlzcGxheSwgZmlsdGVyKSA9PiB7XG4gIGlmIChxdWVyeURpc3BsYXkgJiYgZmlsdGVyKSB7XG4gICAgcXVlcnlEaXNwbGF5LnRleHRDb250ZW50ID0gSlNPTi5zdHJpbmdpZnkoZmlsdGVyLnJlc3VsdCgpLCBudWxsLCAyKTsgLy8gcmVzdWx0IGlzIGEgSlNPTiBvYmplY3QsIHNvIHN0cmluZ2lmeSBpdCBmb3IgZGlzcGxheVxuICB9XG59XG5cbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGRhdGFTb3VyY2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZmlsdGVyYWJsZS1leGFtcGxlIHRib2R5Jyk7XG5cbiAgaWYgKGRhdGFTb3VyY2UpIHtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGZpbHRlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1pbnB1dC1leGFtcGxlJyk7XG4gICAgICBjb25zdCBkYXRhID0gZmlsbEZhY2V0cyhmYWNldHMsIGRhdGFTb3VyY2UpO1xuICAgICAgY29uc3QgZmlsdGVyID0gbmV3IEZpbHRlcihmaWx0ZXJFbCwgZGF0YSk7XG4gICAgICBmaWx0ZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2VkLmZsdWlkLmZpbHRlcicsICgpID0+IHNob3dGaWx0ZXIoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1xdWVyeS1leGFtcGxlJyksIGZpbHRlcikpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmaWx0ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItaW5wdXQnKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBmaWxsRmFjZXRzKGZhY2V0cywgZGF0YVNvdXJjZSk7XG4gICAgICBjb25zdCBmaWx0ZXIgPSBuZXcgRmlsdGVyKGZpbHRlckVsLCBkYXRhKTtcbiAgICAgIGZpbHRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZWQuZmx1aWQuZmlsdGVyJywgKCkgPT4gYXBwbHlGaWx0ZXIoZmlsdGVyYWJsZSwgZmlsdGVyKSk7XG4gICAgfSk7XG4gIH1cbn0pKCk7XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIFBhbGV0dGUgU2VsZWN0b3JcbmNvbnN0IGdldFF1ZXJ5UGFyYW1zID0gcXVlcnkgPT4ge1xuICBsZXQgcGFyYW1zID0ge307XG5cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBxdWVyeS5zdWJzdHJpbmcoMSkuc3BsaXQoJyYnKTtcblxuICBpZiAocXVlcnlTdHJpbmcubGVuZ3RoID4gMCAmJiBxdWVyeVN0cmluZ1swXSkge1xuICAgIGNvbnN0IHBhaXJzID0gcXVlcnlTdHJpbmcubWFwKGNvbXBvbmVudCA9PiBjb21wb25lbnQuc3BsaXQoJz0nKSk7XG4gICAgcGFpcnMucmVkdWNlKChhY2MsIHBhaXIpID0+IGFjY1twYWlyWzBdXSA9IGRlY29kZVVSSUNvbXBvbmVudChwYWlyWzFdKSwgcGFyYW1zKTtcbiAgfVxuXG4gIHJldHVybiBwYXJhbXM7XG59O1xuXG5jb25zdCBtYWtlUXVlcnlTdHJpbmcgPSBwYXJhbXMgPT4ge1xuICBsZXQgcXVlcnlTdHJpbmcgPSAnJztcblxuICBmb3IgKGxldCBwcm9wIGluIHBhcmFtcykge1xuICAgIHF1ZXJ5U3RyaW5nICs9IGAmJHtwcm9wfT0ke3BhcmFtc1twcm9wXX1gO1xuICB9XG5cbiAgcXVlcnlTdHJpbmcgPSBxdWVyeVN0cmluZy5zdWJzdHJpbmcoMSk7XG5cbiAgaWYgKHF1ZXJ5U3RyaW5nKSB7XG4gICAgcXVlcnlTdHJpbmcgPSBgPyR7cXVlcnlTdHJpbmd9YDtcbiAgfVxuXG4gIHJldHVybiBxdWVyeVN0cmluZztcbn07XG5cbmNvbnN0IHNldFF1ZXJ5UGFyYW0gPSAoa2V5LCB2YWx1ZSkgPT4ge1xuICBsZXQgbmV3VVJMID0gYCR7bG9jYXRpb24ucHJvdG9jb2x9Ly8ke2xvY2F0aW9uLmhvc3R9JHtsb2NhdGlvbi5wYXRobmFtZX1gO1xuXG4gIGNvbnN0IHBhcmFtcyA9IGdldFF1ZXJ5UGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XG4gIHBhcmFtc1trZXldID0gdmFsdWU7XG5cbiAgY29uc3QgcXVlcnlTdHJpbmcgPSBtYWtlUXVlcnlTdHJpbmcocGFyYW1zKTtcbiAgaWYgKHF1ZXJ5U3RyaW5nKSB7XG4gICAgbmV3VVJMICs9IHF1ZXJ5U3RyaW5nO1xuICB9XG5cbiAgaWYgKGxvY2F0aW9uLmhhc2gpIHtcbiAgICBuZXdVUkwgKz0gbG9jYXRpb24uaGFzaDtcbiAgfVxuXG4gIGhpc3RvcnkucHVzaFN0YXRlKG51bGwsICcnLCBuZXdVUkwpO1xufTtcblxuY29uc3Qgc2V0UGFsZXR0ZSA9IHBhbGV0dGUgPT4ge1xuICBzd2l0Y2ggKHBhbGV0dGUpIHtcbiAgICBjYXNlICdkYXJrJzpcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGFsZXR0ZS1kYXJrJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbGV0dGUtYWNjZXNzaWJsZScpO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnYWNjZXNzaWJsZSc6XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbGV0dGUtZGFyaycpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwYWxldHRlLWFjY2Vzc2libGUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICAvL2RlZmF1bHQgXCJoeWJyaWRcIiBwYWxldHRlIHNlbGVjdGVkXG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbGV0dGUtZGFyaycpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwYWxldHRlLWFjY2Vzc2libGUnKTtcbiAgICAgIGJyZWFrO1xuICB9XG59O1xuXG5jb25zdCBwYWxldHRlQ2hhbmdlSGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgc2V0UGFsZXR0ZShldmVudC50YXJnZXQudmFsdWUpO1xuICBzZXRRdWVyeVBhcmFtKCd0aGVtZScsIGV2ZW50LnRhcmdldC52YWx1ZSk7XG59O1xuXG5jb25zdCBwYWdlQ2hhbmdlSGFuZGxlciA9IGxpbmsgPT4ge1xuICBsaW5rLnNlYXJjaCA9IGxvY2F0aW9uLnNlYXJjaDtcbn07XG5cbihmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IHBhcmFtcyA9IGdldFF1ZXJ5UGFyYW1zKGxvY2F0aW9uLnNlYXJjaCk7XG4gIHNldFBhbGV0dGUocGFyYW1zLnRoZW1lKTtcblxuICBjb25zdCByYWRpb3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbbmFtZT1cInBhbGV0dGVSYWRpb3NcIl0nKTtcbiAgcmFkaW9zLmZvckVhY2gocmFkaW8gPT4ge1xuICAgIHJhZGlvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgcGFsZXR0ZUNoYW5nZUhhbmRsZXIpO1xuXG4gICAgaWYgKHBhcmFtcy50aGVtZSkge1xuICAgICAgaWYgKHBhcmFtcy50aGVtZSA9PT0gcmFkaW8udmFsdWUpIHtcbiAgICAgICAgcmFkaW8uY2hlY2tlZCA9IHRydWU7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByYWRpby5jaGVja2VkID0gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn0pKCk7XG4vLyNlbmRyZWdpb25cbiJdLCJmaWxlIjoiZGVtby5qcyJ9
