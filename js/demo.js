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

  var getTarget = function getTarget(inline, topBottom, rightLeft) {
    var id;

    if (inline === "on") {
      id = 'alertsInline';
    } else {
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
    }

    return document.getElementById(id) || document.documentElement;
  };

  var options = {
    target: getTarget(data.alertInline, data.alertTopBottom, data.alertRightLeft),
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
  $('.alert-container-inline .alert').alert('close');
};

var toggleInline = function toggleInline(event) {
  $('#alertTop')[0].disabled = event.target.checked;
  $('#alertBottom')[0].disabled = event.target.checked;
  $('#alertRight')[0].disabled = event.target.checked;
  $('#alertLeft')[0].disabled = event.target.checked;
};

$(function () {
  $('#alertInline').on('click', toggleInline);
  $('#addAlert').on('submit', addAlertHandler);
  $('#dismissAllAlerts').on('click', dismissAllAlerts);
}); //#endregion
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

var onSort = function onSort(event) {
  var table = event.list.parentElement;
  var sortableCols = table.querySelectorAll('th.sortable');
  var sortedCols = table.querySelectorAll('th.sortable.asc, th.sortable.desc');
  sortableCols.forEach(function (col) {
    col.classList.remove('sorted');
    var target = col.getAttribute('data-sort');
    var tds = table.querySelectorAll(".".concat(target));
    tds.forEach(function (td) {
      return td.classList.remove('sorted');
    });
  });
  sortedCols.forEach(function (col) {
    col.classList.add('sorted');
    var target = col.getAttribute('data-sort');
    var tds = table.querySelectorAll(".".concat(target));
    tds.forEach(function (td) {
      return td.classList.add('sorted');
    });
  });
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

  list.on('sortComplete', onSort);
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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiYWRkQWxlcnQiLCJtZXNzYWdlIiwib3B0aW9ucyIsIm1ha2VBbGVydCIsImFsZXJ0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidHlwZSIsIndyYXBwZXIiLCJoZWFkaW5nIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiZGlzbWlzc2libGUiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImFsZXJ0Q29sbGFwc2UiLCJ0YXJnZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJkdXJhdGlvbiIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwic2V0VGltZW91dCIsImRpc21pc3NBbGVydCIsIiQiLCJhZGRBbGVydEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXJyYXlUb09iaiIsIm91dHB1dCIsImlucHV0IiwibmFtZSIsInZhbHVlIiwiZGF0YSIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemVBcnJheSIsInJlZHVjZSIsImdldFRhcmdldCIsImlubGluZSIsInRvcEJvdHRvbSIsInJpZ2h0TGVmdCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGVydElubGluZSIsImFsZXJ0VG9wQm90dG9tIiwiYWxlcnRSaWdodExlZnQiLCJhbGVydFR5cGUiLCJhbGVydENvbnRlbnQiLCJhbGVydERpc21pc3NpYmxlIiwid2luZG93IiwicGFyc2VJbnQiLCJhbGVydER1cmF0aW9uIiwiYWxlcnRNZXNzYWdlIiwiY2xvc2VzdCIsIm9uZSIsImNvbGxhcHNlIiwicmVtb3ZlIiwiZGlzbWlzc0FsZXJ0SGFuZGxlciIsImNsb3NlIiwiZGlzbWlzc0FsbEFsZXJ0cyIsInRvZ2dsZUlubGluZSIsImRpc2FibGVkIiwiY2hlY2tlZCIsIm9uIiwidXBkYXRlQ29udGFpbmVyRXhhbXBsZSIsInRleHQiLCJjc3MiLCJmbiIsInBvcG92ZXIiLCJ0b29sdGlwIiwiYm91bmRhcnkiLCJyZXNpemUiLCJXaXphcmQiLCJ3aXphcmRJZCIsImN1cnJlbnRTdGVwIiwid2l6YXJkIiwidXBkYXRlRGlzcGxheWVkU3RlcCIsInRhcmdldFN0ZXAiLCJ0b0hpZGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbCIsImVsIiwic3R5bGUiLCJkaXNwbGF5IiwidG9TaG93IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yIiwic3RlcCIsImNhbmNlbENvbmZpcm1hdGlvbiIsInNlbGVjdG9yIiwiYWRkQ2xhc3MiLCJtb2RhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb3JtcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidmFsaWRhdGlvbiIsImZpbHRlciIsImZvcm0iLCJjb250YWlucyIsImNoZWNrVmFsaWRpdHkiLCJzdG9wUHJvcGFnYXRpb24iLCJjbGljayIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlUm93U2VsZWN0aW9uIiwiZ2V0Um93IiwibWF0Y2hlcyIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnROb2RlIiwibm9kZVR5cGUiLCJyb3ciLCJjaGVja2JveCIsImNoZWNrSGFuZGxlciIsImNoZWNrQWxsSGFuZGxlciIsInRhYmxlIiwiY2hlY2tib3hlcyIsIm9uU29ydCIsImxpc3QiLCJzb3J0YWJsZUNvbHMiLCJzb3J0ZWRDb2xzIiwiY29sIiwiZ2V0QXR0cmlidXRlIiwidGRzIiwidGQiLCJtYWtlU29ydGFibGUiLCJ0YWJsZUlkIiwiY29sdW1ucyIsIkxpc3QiLCJsaXN0Q2xhc3MiLCJzb3J0Q2xhc3MiLCJ2YWx1ZU5hbWVzIiwiY2hlY2tBbGwiLCJmaWx0ZXJhYmxlIiwiZmFjZXRzIiwia2V5IiwiaGVhZGVyIiwidmFsdWVzIiwibm9SZXBlYXQiLCJmaWxsRmFjZXRzIiwic291cmNlIiwiZmFjZXQiLCJjbGFzc05hbWUiLCJ0b0xvd2VyQ2FzZSIsIlNldCIsImRhdHVtIiwidGV4dENvbnRlbnQiLCJzb3J0IiwiZmlsdGVyQnlGYWNldHMiLCJpdGVtIiwicmVzdWx0IiwicHJvcCIsInZhbEZpbHRlciIsInNwbGl0IiwiaXRlbVZhbCIsInRoaXNSZXN1bHQiLCJpIiwibGVuIiwibGVuZ3RoIiwiYXBwbHlGaWx0ZXIiLCJzaG93RmlsdGVyIiwicXVlcnlEaXNwbGF5IiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGFTb3VyY2UiLCJmaWx0ZXJFbCIsIkZpbHRlciIsImdldFF1ZXJ5UGFyYW1zIiwicXVlcnkiLCJwYXJhbXMiLCJxdWVyeVN0cmluZyIsInN1YnN0cmluZyIsInBhaXJzIiwibWFwIiwiY29tcG9uZW50IiwiYWNjIiwicGFpciIsImRlY29kZVVSSUNvbXBvbmVudCIsIm1ha2VRdWVyeVN0cmluZyIsInNldFF1ZXJ5UGFyYW0iLCJuZXdVUkwiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInBhdGhuYW1lIiwic2VhcmNoIiwiaGFzaCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJzZXRQYWxldHRlIiwicGFsZXR0ZSIsImJvZHkiLCJwYWxldHRlQ2hhbmdlSGFuZGxlciIsInBhZ2VDaGFuZ2VIYW5kbGVyIiwibGluayIsInRoZW1lIiwicmFkaW9zIiwicmFkaW8iXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7O0FBUUEsYSxDQUVBOzs7Ozs7Ozs7Ozs7Ozs7O0FBQ0EsSUFBTUEsUUFBUSxHQUFHLFNBQVhBLFFBQVcsQ0FBQ0MsT0FBRCxFQUEyQjtBQUFBLE1BQWpCQyxPQUFpQix1RUFBUCxFQUFPOztBQUMxQyxNQUFNQyxTQUFTLEdBQUcsU0FBWkEsU0FBWSxDQUFDRixPQUFELEVBQVVDLE9BQVYsRUFBc0I7QUFDdEMsUUFBTUUsS0FBSyxHQUFHQyxRQUFRLENBQUNDLGFBQVQsQ0FBdUIsS0FBdkIsQ0FBZDtBQUNBRixJQUFBQSxLQUFLLENBQUNHLFNBQU4sQ0FBZ0JDLEdBQWhCLENBQW9CLE9BQXBCLEVBQTZCLE1BQTdCO0FBQ0FKLElBQUFBLEtBQUssQ0FBQ0ssWUFBTixD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QUssQ0FBQ3pJLE9BQU4sR0FBZ0IsS0FBaEI7QUFDRDtBQUNGO0FBQ0YsR0FWRDtBQVdELENBaEJELEksQ0FpQkEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIENvcHlyaWdodCAoYykgMjAxMS0yMDE4LCBIb3J0b253b3JrcyBJbmMuICBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICogRXhjZXB0IGFzIGV4cHJlc3NseSBwZXJtaXR0ZWQgaW4gYSB3cml0dGVuIGFncmVlbWVudCBiZXR3ZWVuIHlvdVxuICogb3IgeW91ciBjb21wYW55IGFuZCBIb3J0b253b3JrcywgSW5jLCBhbnkgdXNlLCByZXByb2R1Y3Rpb24sXG4gKiBtb2RpZmljYXRpb24sIHJlZGlzdHJpYnV0aW9uLCBzaGFyaW5nLCBsZW5kaW5nIG9yIG90aGVyIGV4cGxvaXRhdGlvblxuICogb2YgYWxsIG9yIGFueSBwYXJ0IG9mIHRoZSBjb250ZW50cyBvZiB0aGlzIGZpbGUgaXMgc3RyaWN0bHkgcHJvaGliaXRlZC5cbiAqL1xuXG4ndXNlIHN0cmljdCc7XG5cbi8vI3JlZ2lvbiBBbGVydCB0ZXN0ZXJcbmNvbnN0IGFkZEFsZXJ0ID0gKG1lc3NhZ2UsIG9wdGlvbnMgPSB7fSkgPT4ge1xuICBjb25zdCBtYWtlQWxlcnQgPSAobWVzc2FnZSwgb3B0aW9ucykgPT4ge1xuICAgIGNvbnN0IGFsZXJ0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQnLCAnZmFkZScpO1xuICAgIGFsZXJ0LnNldEF0dHJpYnV0ZSgncm9sZScsICdhbGVydCcpO1xuXG4gICAgc3dpdGNoIChvcHRpb25zLnR5cGUpIHtcbiAgICAgIGNhc2UgJ2luZm8nOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1pbmZvJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnc3VjY2Vzcyc6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LXN1Y2Nlc3MnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICd3YXJuaW5nJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtd2FybmluZycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ2Rhbmdlcic6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWRhbmdlcicpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWRlZmF1bHQnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3Qgd3JhcHBlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuXG4gICAgY29uc3QgaGVhZGluZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGhlYWRpbmcuY2xhc3NMaXN0LmFkZCgnYWxlcnQtaGVhZGluZycpO1xuICAgIGhlYWRpbmcuaW5uZXJIVE1MID0gbWVzc2FnZTtcbiAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGhlYWRpbmcpO1xuXG4gICAgaWYgKG9wdGlvbnMuY29udGVudCkge1xuICAgICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29udGVudC5pbm5lckhUTUwgPSBvcHRpb25zLmNvbnRlbnQ7XG4gICAgICB3cmFwcGVyLmFwcGVuZENoaWxkKGNvbnRlbnQpO1xuICAgIH1cblxuICAgIGFsZXJ0LmFwcGVuZENoaWxkKHdyYXBwZXIpO1xuXG4gICAgaWYgKG9wdGlvbnMuZGlzbWlzc2libGUpIHtcbiAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWRpc21pc3NpYmxlJyk7XG4gICAgICBjb25zdCB0ZW1wID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICB0ZW1wLmlubmVySFRNTCA9ICc8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNsb3NlXCIgYXJpYS1sYWJlbD1cIkNsb3NlXCIgb25jbGljaz1cImRpc21pc3NBbGVydEhhbmRsZXIodGhpcylcIj48L2J1dHRvbj4nO1xuICAgICAgYWxlcnQuYXBwZW5kQ2hpbGQodGVtcC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBjb25zdCBhbGVydENvbGxhcHNlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgYWxlcnRDb2xsYXBzZS5jbGFzc0xpc3QuYWRkKCdhbGVydC1jb2xsYXBzZScsICdjb2xsYXBzZScsICdzaG93Jyk7XG4gICAgYWxlcnRDb2xsYXBzZS5hcHBlbmRDaGlsZChhbGVydCk7XG5cbiAgICByZXR1cm4gYWxlcnRDb2xsYXBzZTtcbiAgfTtcblxuICBpZiAoIW1lc3NhZ2UgfHwgdHlwZW9mIG1lc3NhZ2UgIT09ICdzdHJpbmcnKSByZXR1cm47XG5cbiAgY29uc3Qge1xuICAgIHRhcmdldCA9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCxcbiAgICB0eXBlID0gJ2RlZmF1bHQnLCAvLyBtYXkgYmUgJ2luZm8nLCAnc3VjY2VzcycsICd3YXJuaW5nJywgJ2RhbmdlcicsIG9yICdkZWZhdWx0J1xuICAgIGNvbnRlbnQgPSBudWxsLFxuICAgIGRpc21pc3NpYmxlID0gdHJ1ZSxcbiAgICBkdXJhdGlvbiA9IDAsIC8vaW4gc2Vjb25kc1xuICAgIHBvc2l0aW9uID0gJ2ZpcnN0JyAvLyBpZiAnZmlyc3QnIGFsZXJ0IHdpbGwgYmUgaW5zZXJ0ZWQgYWJvdmUgZXhpc3RpbmcgYWxlcnRzXG4gIH0gPSBvcHRpb25zO1xuXG4gIGNvbnN0IGFsZXJ0ID0gbWFrZUFsZXJ0KG1lc3NhZ2UsIHt0YXJnZXQsIHR5cGUsIGNvbnRlbnQsIGRpc21pc3NpYmxlLCBkdXJhdGlvbiwgcG9zaXRpb259KTtcblxuICBpZiAocG9zaXRpb24gPT09ICdmaXJzdCcpIHtcbiAgICB0YXJnZXQuaW5zZXJ0QmVmb3JlKGFsZXJ0LCB0YXJnZXQuZmlyc3RDaGlsZCk7XG4gIH0gZWxzZSB7XG4gICAgdGFyZ2V0LmFwcGVuZENoaWxkKGFsZXJ0KTtcbiAgfVxuXG4gIHNldFRpbWVvdXQoKCkgPT4gYWxlcnQuZmlyc3RDaGlsZC5jbGFzc0xpc3QuYWRkKCdzaG93JykpO1xuXG4gIGlmIChkdXJhdGlvbikge1xuICAgIHNldFRpbWVvdXQoKCkgPT4gZGlzbWlzc0FsZXJ0KCQoYWxlcnQuZmlyc3RDaGlsZCkpLCBkdXJhdGlvbiAqIDEwMDApO1xuICB9XG59O1xuXG5jb25zdCBhZGRBbGVydEhhbmRsZXIgPSBldmVudCA9PiB7XG4gIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgY29uc3QgYXJyYXlUb09iaiA9IChvdXRwdXQsIGlucHV0KSA9PiB7XG4gICAgb3V0cHV0W2lucHV0Lm5hbWVdID0gaW5wdXQudmFsdWU7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfTtcblxuICBjb25zdCBkYXRhID0gJChldmVudC5jdXJyZW50VGFyZ2V0KS5zZXJpYWxpemVBcnJheSgpLnJlZHVjZShhcnJheVRvT2JqLCB7fSk7XG5cbiAgY29uc3QgZ2V0VGFyZ2V0ID0gKGlubGluZSwgdG9wQm90dG9tLCByaWdodExlZnQpID0+IHtcbiAgICBsZXQgaWQ7XG5cbiAgICBpZiAoaW5saW5lID09PSBcIm9uXCIpIHtcbiAgICAgIGlkID0gJ2FsZXJ0c0lubGluZSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0b3BCb3R0b20gPT09ICd0b3AnKSB7XG4gICAgICAgIGlmIChyaWdodExlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBpZCA9ICdhbGVydHNUb3BSaWdodCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWQgPSAnYWxlcnRzVG9wTGVmdCc7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChyaWdodExlZnQgPT09ICdyaWdodCcpIHtcbiAgICAgICAgICBpZCA9ICdhbGVydHNCb3R0b21SaWdodCc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWQgPSAnYWxlcnRzQm90dG9tTGVmdCc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdGFyZ2V0OiBnZXRUYXJnZXQoZGF0YS5hbGVydElubGluZSwgZGF0YS5hbGVydFRvcEJvdHRvbSwgZGF0YS5hbGVydFJpZ2h0TGVmdCksXG4gICAgdHlwZTogZGF0YS5hbGVydFR5cGUsXG4gICAgY29udGVudDogZGF0YS5hbGVydENvbnRlbnQsXG4gICAgZGlzbWlzc2libGU6ICEhZGF0YS5hbGVydERpc21pc3NpYmxlLFxuICAgIGR1cmF0aW9uOiB3aW5kb3cucGFyc2VJbnQoZGF0YS5hbGVydER1cmF0aW9uKSxcbiAgICBwb3NpdGlvbjogZGF0YS5hbGVydFRvcEJvdHRvbSA9PT0gJ2JvdHRvbScgPyAnZmlyc3QnIDogJ2xhc3QnXG4gIH07XG5cbiAgYWRkQWxlcnQoZGF0YS5hbGVydE1lc3NhZ2UsIG9wdGlvbnMpO1xuXG4gIHJldHVybiBmYWxzZTtcbn07XG5cbmNvbnN0IGRpc21pc3NBbGVydCA9IGFsZXJ0ID0+IHtcbiAgY29uc3QgYWxlcnRDb2xsYXBzZSA9IGFsZXJ0LmNsb3Nlc3QoJy5hbGVydC1jb2xsYXBzZScpO1xuXG4gIGFsZXJ0Lm9uZSgnY2xvc2UuYnMuYWxlcnQnLCAoKSA9PiBhbGVydENvbGxhcHNlLmNvbGxhcHNlKCdoaWRlJykpO1xuICBhbGVydENvbGxhcHNlLm9uZSgnaGlkZGVuLmJzLmNvbGxhcHNlJywgKCkgPT4gYWxlcnRDb2xsYXBzZS5yZW1vdmUoKSk7XG5cbiAgYWxlcnQuYWxlcnQoJ2Nsb3NlJyk7XG59O1xuXG5jb25zdCBkaXNtaXNzQWxlcnRIYW5kbGVyID0gY2xvc2UgPT4ge1xuICBjb25zdCBhbGVydCA9ICQoY2xvc2UpLmNsb3Nlc3QoJy5hbGVydCcpO1xuICBkaXNtaXNzQWxlcnQoYWxlcnQpO1xufTtcblxuY29uc3QgZGlzbWlzc0FsbEFsZXJ0cyA9ICgpID0+IHtcbiAgJCgnLmFsZXJ0LWNvbnRhaW5lciAuYWxlcnQnKS5hbGVydCgnY2xvc2UnKTtcbiAgJCgnLmFsZXJ0LWNvbnRhaW5lci1pbmxpbmUgLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG59O1xuXG5jb25zdCB0b2dnbGVJbmxpbmUgPSBldmVudCA9PiB7XG4gICQoJyNhbGVydFRvcCcpWzBdLmRpc2FibGVkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICQoJyNhbGVydEJvdHRvbScpWzBdLmRpc2FibGVkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICQoJyNhbGVydFJpZ2h0JylbMF0uZGlzYWJsZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgJCgnI2FsZXJ0TGVmdCcpWzBdLmRpc2FibGVkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG59XG5cbiQoZnVuY3Rpb24gKCkge1xuICAkKCcjYWxlcnRJbmxpbmUnKS5vbignY2xpY2snLCB0b2dnbGVJbmxpbmUpO1xuICAkKCcjYWRkQWxlcnQnKS5vbignc3VibWl0JywgYWRkQWxlcnRIYW5kbGVyKTtcbiAgJCgnI2Rpc21pc3NBbGxBbGVydHMnKS5vbignY2xpY2snLCBkaXNtaXNzQWxsQWxlcnRzKTtcbn0pO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBDb250YWluZXIgZXhhbXBsZVxuY29uc3QgdXBkYXRlQ29udGFpbmVyRXhhbXBsZSA9ICgpID0+IHtcbiAgJCgnI2RvY3VtZW50V2lkdGgnKS50ZXh0KCQoJ2JvZHknKS5jc3MoJ3dpZHRoJykpO1xuICAkKCcjY29udGFpbmVyV2lkdGgnKS50ZXh0KCQoJyNjb250YWluZXJFeGFtcGxlJykuY3NzKCd3aWR0aCcpKTtcbiAgJCgnI2NvbnRhaW5lckZsdWlkV2lkdGgnKS50ZXh0KCQoJyNjb250YWluZXJGbHVpZEV4YW1wbGUnKS5jc3MoJ3dpZHRoJykpO1xufTtcblxuJChmdW5jdGlvbiAoKSB7XG4gIGlmICgkLmZuLnBvcG92ZXIpIHtcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJwb3BvdmVyXCJdJykucG9wb3ZlcigpO1xuICB9XG4gIGlmICgkLmZuLnRvb2x0aXApIHtcbiAgICAkKCdbZGF0YS10b2dnbGU9XCJ0b29sdGlwXCJdJykudG9vbHRpcCh7IGJvdW5kYXJ5OiAnd2luZG93JyB9KTtcbiAgfVxuXG4gIHVwZGF0ZUNvbnRhaW5lckV4YW1wbGUoKTtcbiAgJCh3aW5kb3cpLnJlc2l6ZSh1cGRhdGVDb250YWluZXJFeGFtcGxlKTtcbn0pO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBXaXphcmQgaW4gbW9kYWxcbmNsYXNzIFdpemFyZCB7XG4gIGNvbnN0cnVjdG9yKHdpemFyZElkKSB7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IDE7XG4gICAgdGhpcy53aXphcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh3aXphcmRJZCk7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRTdGVwKDEpO1xuICB9XG5cbiAgdXBkYXRlRGlzcGxheWVkU3RlcCh0YXJnZXRTdGVwKSB7XG4gICAgaWYgKHRoaXMud2l6YXJkKSB7XG4gICAgICBjb25zdCB0b0hpZGUgPSB0aGlzLndpemFyZC5xdWVyeVNlbGVjdG9yQWxsKCdbY2xhc3MqPVwic3RlcC1cIl0nKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwodG9IaWRlLCBlbCA9PiB7XG4gICAgICAgIGVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdG9TaG93ID0gdGhpcy53aXphcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShgc3RlcC0ke3RhcmdldFN0ZXB9YCk7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRvU2hvdywgZWwgPT4ge1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBidXR0b25zID0gdGhpcy53aXphcmQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSgnd2l6YXJkLW5hdi1idXR0b24nKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoYnV0dG9ucywgZWwgPT4ge1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLndpemFyZC5xdWVyeVNlbGVjdG9yKCcud2l6YXJkLWZpbmlzaC1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgaWYgKHRhcmdldFN0ZXAgPT09IDEpIHtcbiAgICAgICAgdGhpcy53aXphcmQucXVlcnlTZWxlY3RvcignLndpemFyZC1iYWNrLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICB9XG4gICAgICBpZiAodGFyZ2V0U3RlcCA9PT0gMykge1xuICAgICAgICB0aGlzLndpemFyZC5xdWVyeVNlbGVjdG9yKCcud2l6YXJkLW5leHQtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgICAgdGhpcy53aXphcmQucXVlcnlTZWxlY3RvcignLndpemFyZC1maW5pc2gtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYmFjaygpIHtcbiAgICB0aGlzLnVwZGF0ZURpc3BsYXllZFN0ZXAoLS10aGlzLmN1cnJlbnRTdGVwKTtcbiAgfVxuXG4gIG5leHQoKSB7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRTdGVwKCsrdGhpcy5jdXJyZW50U3RlcCk7XG4gIH1cblxuICBnb1RvU3RlcChzdGVwKSB7XG4gICAgdGhpcy5jdXJyZW50U3RlcCA9IHN0ZXA7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRTdGVwKHN0ZXApO1xuICB9XG59O1xuXG5jb25zdCBjYW5jZWxDb25maXJtYXRpb24gPSBzZWxlY3RvciA9PiB7XG4gICQoc2VsZWN0b3IpLm9uZSgnaGlkZGVuLmJzLm1vZGFsJywgKCkgPT4gJCgnYm9keScpLmFkZENsYXNzKCdtb2RhbC1vcGVuJykpO1xuICAkKHNlbGVjdG9yKS5tb2RhbCgnaGlkZScpO1xufTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gRm9ybSB2YWxpZGF0aW9uXG4vLyBFeGFtcGxlIHN0YXJ0ZXIgSmF2YVNjcmlwdCBmb3IgZGlzYWJsaW5nIGZvcm0gc3VibWlzc2lvbnMgaWYgdGhlcmUgYXJlIGludmFsaWQgZmllbGRzXG4oZnVuY3Rpb24gKCkge1xuICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyBGZXRjaCBhbGwgdGhlIGZvcm1zIHdlIHdhbnQgdG8gYXBwbHkgY3VzdG9tIEJvb3RzdHJhcCB2YWxpZGF0aW9uIHN0eWxlcyB0b1xuICAgIHZhciBmb3JtcyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdmb3JtJyk7XG4gICAgLy8gTG9vcCBvdmVyIHRoZW0gYW5kIHByZXZlbnQgc3VibWlzc2lvblxuICAgIHZhciB2YWxpZGF0aW9uID0gQXJyYXkucHJvdG90eXBlLmZpbHRlci5jYWxsKGZvcm1zLCBmdW5jdGlvbiAoZm9ybSkge1xuICAgICAgaWYgKGZvcm0uY2xhc3NMaXN0LmNvbnRhaW5zKCd2YWxpZGF0ZScpKSB7XG4gICAgICAgIGZvcm0uYWRkRXZlbnRMaXN0ZW5lcignc3VibWl0JywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgaWYgKGZvcm0uY2hlY2tWYWxpZGl0eSgpID09PSBmYWxzZSkge1xuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBmb3JtLmNsYXNzTGlzdC5hZGQoJ3dhcy12YWxpZGF0ZWQnKTtcbiAgICAgICAgfSwgZmFsc2UpO1xuICAgICAgfVxuICAgIH0pO1xuICB9LCBmYWxzZSk7XG59KSgpO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBEYXNocm93c1xuJChmdW5jdGlvbiAoKSB7XG4gICQoJy5qcy1idG4tYScpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuanMtdGFyZ2V0LWEnKS50b2dnbGVDbGFzcygnZXhwYW5kZWQnKTtcbiAgfSk7XG5cbiAgJCgnLmpzLWJ0bi1iJykuY2xpY2soZnVuY3Rpb24gKCkge1xuICAgICQoJy5qcy10YXJnZXQtYicpLnRvZ2dsZUNsYXNzKCdleHBhbmRlZCcpO1xuICB9KTtcbn0pO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBTb3J0YWJsZSB0YWJsZSBleGFtcGxlXG4vLyBVc2VzIExpc3QuanMgb25seSBmb3IgZGVtbyBwdXJwb3NlcyB0byBzaG93IGhvdyBhIEZsdWlkIHNvcnRhYmxlIHRhYmxlIHNob3VsZCBiZWhhdmVcbmNvbnN0IHRvZ2dsZVJvd1NlbGVjdGlvbiA9IHRhcmdldCA9PiB7XG4gIGNvbnN0IGdldFJvdyA9IGVsID0+IHtcbiAgICBkbyB7XG4gICAgICBpZiAoZWwubWF0Y2hlcygndHInKSkge1xuICAgICAgICByZXR1cm4gZWw7XG4gICAgICB9XG4gICAgICBlbCA9IGVsLnBhcmVudEVsZW1lbnQgfHwgZWwucGFyZW50Tm9kZTtcbiAgICB9IHdoaWxlIChlbCAhPT0gbnVsbCAmJiBlbC5ub2RlVHlwZSA9PT0gMSk7XG4gIH1cblxuICBjb25zdCByb3cgPSBnZXRSb3codGFyZ2V0KTtcbiAgaWYgKHJvdykge1xuICAgIGNvbnN0IGNoZWNrYm94ID0gcm93LnF1ZXJ5U2VsZWN0b3IoJ3RyIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgIGlmIChjaGVja2JveCkge1xuICAgICAgY2hlY2tib3guY2hlY2tlZCA9IHRhcmdldC5jaGVja2VkO1xuICAgICAgdGFyZ2V0LmNoZWNrZWQgPyByb3cuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKSA6IHJvdy5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgY2hlY2tIYW5kbGVyID0gZXZlbnQgPT4ge1xuICB0b2dnbGVSb3dTZWxlY3Rpb24oZXZlbnQudGFyZ2V0KTtcbiAgaWYgKCFldmVudC50YXJnZXQuY2hlY2tlZCkge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjaGVja0FsbCcpLmNoZWNrZWQgPSBmYWxzZTtcbiAgfVxufTtcblxuY29uc3QgY2hlY2tBbGxIYW5kbGVyID0gZXZlbnQgPT4ge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzb3J0YWJsZS1leGFtcGxlJyk7XG5cbiAgaWYgKHRhYmxlKSB7XG4gICAgY29uc3QgY2hlY2tib3hlcyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpO1xuICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoY2hlY2tib3hlcywgY2hlY2tib3ggPT4ge1xuICAgICAgY2hlY2tib3guY2hlY2tlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAgICAgdG9nZ2xlUm93U2VsZWN0aW9uKGNoZWNrYm94KTtcbiAgICB9KTtcbiAgfVxufTtcblxuY29uc3Qgb25Tb3J0ID0gZXZlbnQgPT4ge1xuICBjb25zdCB0YWJsZSA9IGV2ZW50Lmxpc3QucGFyZW50RWxlbWVudDtcbiAgY29uc3Qgc29ydGFibGVDb2xzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbCgndGguc29ydGFibGUnKTtcbiAgY29uc3Qgc29ydGVkQ29scyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoLnNvcnRhYmxlLmFzYywgdGguc29ydGFibGUuZGVzYycpO1xuXG4gIHNvcnRhYmxlQ29scy5mb3JFYWNoKGNvbCA9PiB7XG4gICAgY29sLmNsYXNzTGlzdC5yZW1vdmUoJ3NvcnRlZCcpO1xuICAgIGNvbnN0IHRhcmdldCA9IGNvbC5nZXRBdHRyaWJ1dGUoJ2RhdGEtc29ydCcpO1xuICAgIGNvbnN0IHRkcyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoYC4ke3RhcmdldH1gKTtcbiAgICB0ZHMuZm9yRWFjaCh0ZCA9PiB0ZC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0ZWQnKSk7XG4gIH0pO1xuXG4gIHNvcnRlZENvbHMuZm9yRWFjaChjb2wgPT4ge1xuICAgIGNvbC5jbGFzc0xpc3QuYWRkKCdzb3J0ZWQnKTtcbiAgICBjb25zdCB0YXJnZXQgPSBjb2wuZ2V0QXR0cmlidXRlKCdkYXRhLXNvcnQnKTtcbiAgICBjb25zdCB0ZHMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0YXJnZXR9YCk7XG4gICAgdGRzLmZvckVhY2godGQgPT4gdGQuY2xhc3NMaXN0LmFkZCgnc29ydGVkJykpO1xuICB9KTtcbn07XG5cbmNvbnN0IG1ha2VTb3J0YWJsZSA9ICh0YWJsZUlkLCBjb2x1bW5zKSA9PiB7XG4gIGNvbnN0IHRhYmxlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQodGFibGVJZCk7XG4gIGxldCBsaXN0O1xuICBpZiAodGFibGUpIHtcbiAgICBsaXN0ID0gbmV3IExpc3QodGFibGVJZCwge1xuICAgICAgbGlzdENsYXNzOiAndGFibGUtZGF0YScsXG4gICAgICBzb3J0Q2xhc3M6ICdzb3J0YWJsZScsXG4gICAgICB2YWx1ZU5hbWVzOiBjb2x1bW5zXG4gICAgfSk7XG5cbiAgICBjb25zdCBjaGVja0FsbCA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkIGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpXG4gICAgaWYgKGNoZWNrQWxsKSB7XG4gICAgICBjaGVja0FsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrQWxsSGFuZGxlcik7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3Rib2R5IGlucHV0W3R5cGU9XCJjaGVja2JveFwiXScpLCBjaGVja2JveCA9PiB7XG4gICAgICAgIGNoZWNrYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2hlY2tIYW5kbGVyKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxpc3Qub24oJ3NvcnRDb21wbGV0ZScsIG9uU29ydCk7XG5cbiAgcmV0dXJuIGxpc3Q7XG59O1xuXG5sZXQgZmlsdGVyYWJsZTtcbiQoKCkgPT4ge1xuICBtYWtlU29ydGFibGUoJ3NvcnRhYmxlLWV4YW1wbGUnLCBbJ2RhdGEtc3RhdHVzJywgJ2RhdGEtbmFtZScsICdkYXRhLXVzZXJuYW1lJywgJ2RhdGEtbG9naW4nXSk7XG4gIGZpbHRlcmFibGUgPSBtYWtlU29ydGFibGUoJ2ZpbHRlcmFibGUtZXhhbXBsZScsIFsnZGF0YS1jb21wYW55JywgJ2RhdGEtbmFtZScsICdkYXRhLWRlcGFydG1lbnQnLCAnZGF0YS1nZW5kZXInLCAnZGF0YS1jaXR5JywgJ2RhdGEtY291bnRyeSddKTtcbn0pO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBGaWx0ZXJcbmNvbnN0IGZhY2V0cyA9IFtcbiAge1xuICAgIGtleTogJ05hbWUnLFxuICB9LFxuICB7XG4gICAga2V5OiAnT3JnYW5pemF0aW9uJyxcbiAgICBoZWFkZXI6IHRydWVcbiAgfSxcbiAge1xuICAgIGtleTogJ0NvbXBhbnknLFxuICAgIHZhbHVlczogW11cbiAgfSxcbiAge1xuICAgIGtleTogJ0RlcGFydG1lbnQnLFxuICAgIHZhbHVlczogW11cbiAgfSxcbiAge1xuICAgIGtleTogJ0dlbmRlcicsXG4gICAgbm9SZXBlYXQ6IHRydWUsXG4gICAgdmFsdWVzOiBbXVxuICB9LFxuICB7XG4gICAga2V5OiAnTG9jYXRpb24nLFxuICAgIGhlYWRlcjogdHJ1ZVxuICB9LFxuICB7XG4gICAga2V5OiAnQ2l0eSdcbiAgfSxcbiAge1xuICAgIGtleTogJ0NvdW50cnknLFxuICAgIHZhbHVlczogW11cbiAgfVxuXTtcblxuY29uc3QgZmlsbEZhY2V0cyA9IChmYWNldHMsIHNvdXJjZSkgPT4ge1xuICBmYWNldHMuZm9yRWFjaChmYWNldCA9PiB7XG4gICAgaWYgKCFmYWNldC5oZWFkZXIgJiYgZmFjZXQudmFsdWVzKSB7XG4gICAgICBjb25zdCBjbGFzc05hbWUgPSBgZGF0YS0ke2ZhY2V0LmtleS50b0xvd2VyQ2FzZSgpfWA7XG4gICAgICBjb25zdCBkYXRhID0gc291cmNlLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgICAgIGNvbnN0IHZhbHVlcyA9IG5ldyBTZXQoKTtcbiAgICAgIEFycmF5LnByb3RvdHlwZS5mb3JFYWNoLmNhbGwoZGF0YSwgZGF0dW0gPT4gdmFsdWVzLmFkZChkYXR1bS50ZXh0Q29udGVudCkpO1xuICAgICAgZmFjZXQudmFsdWVzID0gWy4uLnZhbHVlc10uc29ydCgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZhY2V0cztcbn07XG5cbmNvbnN0IGZpbHRlckJ5RmFjZXRzID0gKGl0ZW0sIGZpbHRlcikgPT4ge1xuICBsZXQgcmVzdWx0ID0gdHJ1ZTtcbiAgY29uc3QgdmFsdWVzID0gaXRlbS52YWx1ZXMoKTtcblxuICBmb3IgKGxldCBwcm9wIGluIHZhbHVlcykge1xuICAgIGNvbnN0IHZhbEZpbHRlciA9IGZpbHRlcltwcm9wLnNwbGl0KCctJylbMV1dO1xuXG4gICAgaWYgKHZhbEZpbHRlcikge1xuICAgICAgY29uc3QgaXRlbVZhbCA9IHZhbHVlc1twcm9wXTtcblxuICAgICAgaWYgKHR5cGVvZiAodmFsRmlsdGVyKSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmVzdWx0ID0gaXRlbVZhbCA9PT0gdmFsRmlsdGVyO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IHRoaXNSZXN1bHQgPSBmYWxzZTtcblxuICAgICAgICBmb3IgKGxldCBpID0gMCwgbGVuID0gdmFsRmlsdGVyLmxlbmd0aDsgaSA8IGxlbjsgaSsrKSB7XG4gICAgICAgICAgaWYgKGl0ZW1WYWwgPT09IHZhbEZpbHRlcltpXSkge1xuICAgICAgICAgICAgdGhpc1Jlc3VsdCA9IHRydWU7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIXRoaXNSZXN1bHQpIHtcbiAgICAgICAgICByZXN1bHQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghcmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBhcHBseUZpbHRlciA9IChmaWx0ZXJhYmxlLCBmaWx0ZXIpID0+IHtcbiAgaWYgKGZpbHRlcmFibGUgJiYgZmlsdGVyKSB7XG4gICAgZmlsdGVyYWJsZS5maWx0ZXIoaXRlbSA9PiBmaWx0ZXJCeUZhY2V0cyhpdGVtLCBmaWx0ZXIucmVzdWx0KCkpKTtcbiAgfVxufTtcblxuY29uc3Qgc2hvd0ZpbHRlciA9IChxdWVyeURpc3BsYXksIGZpbHRlcikgPT4ge1xuICBpZiAocXVlcnlEaXNwbGF5ICYmIGZpbHRlcikge1xuICAgIHF1ZXJ5RGlzcGxheS50ZXh0Q29udGVudCA9IEpTT04uc3RyaW5naWZ5KGZpbHRlci5yZXN1bHQoKSwgbnVsbCwgMik7IC8vIHJlc3VsdCBpcyBhIEpTT04gb2JqZWN0LCBzbyBzdHJpbmdpZnkgaXQgZm9yIGRpc3BsYXlcbiAgfVxufVxuXG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBkYXRhU291cmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2ZpbHRlcmFibGUtZXhhbXBsZSB0Ym9keScpO1xuXG4gIGlmIChkYXRhU291cmNlKSB7XG4gICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBmaWx0ZXJFbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItaW5wdXQtZXhhbXBsZScpO1xuICAgICAgY29uc3QgZGF0YSA9IGZpbGxGYWNldHMoZmFjZXRzLCBkYXRhU291cmNlKTtcbiAgICAgIGNvbnN0IGZpbHRlciA9IG5ldyBGaWx0ZXIoZmlsdGVyRWwsIGRhdGEpO1xuICAgICAgZmlsdGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlZC5mbHVpZC5maWx0ZXInLCAoKSA9PiBzaG93RmlsdGVyKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdmaWx0ZXItcXVlcnktZXhhbXBsZScpLCBmaWx0ZXIpKTtcbiAgICB9KTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsdGVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWlucHV0Jyk7XG4gICAgICBjb25zdCBkYXRhID0gZmlsbEZhY2V0cyhmYWNldHMsIGRhdGFTb3VyY2UpO1xuICAgICAgY29uc3QgZmlsdGVyID0gbmV3IEZpbHRlcihmaWx0ZXJFbCwgZGF0YSk7XG4gICAgICBmaWx0ZXJFbC5hZGRFdmVudExpc3RlbmVyKCdjaGFuZ2VkLmZsdWlkLmZpbHRlcicsICgpID0+IGFwcGx5RmlsdGVyKGZpbHRlcmFibGUsIGZpbHRlcikpO1xuICAgIH0pO1xuICB9XG59KSgpO1xuLy8jZW5kcmVnaW9uXG5cbi8vI3JlZ2lvbiBQYWxldHRlIFNlbGVjdG9yXG5jb25zdCBnZXRRdWVyeVBhcmFtcyA9IHF1ZXJ5ID0+IHtcbiAgbGV0IHBhcmFtcyA9IHt9O1xuXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gcXVlcnkuc3Vic3RyaW5nKDEpLnNwbGl0KCcmJyk7XG5cbiAgaWYgKHF1ZXJ5U3RyaW5nLmxlbmd0aCA+IDAgJiYgcXVlcnlTdHJpbmdbMF0pIHtcbiAgICBjb25zdCBwYWlycyA9IHF1ZXJ5U3RyaW5nLm1hcChjb21wb25lbnQgPT4gY29tcG9uZW50LnNwbGl0KCc9JykpO1xuICAgIHBhaXJzLnJlZHVjZSgoYWNjLCBwYWlyKSA9PiBhY2NbcGFpclswXV0gPSBkZWNvZGVVUklDb21wb25lbnQocGFpclsxXSksIHBhcmFtcyk7XG4gIH1cblxuICByZXR1cm4gcGFyYW1zO1xufTtcblxuY29uc3QgbWFrZVF1ZXJ5U3RyaW5nID0gcGFyYW1zID0+IHtcbiAgbGV0IHF1ZXJ5U3RyaW5nID0gJyc7XG5cbiAgZm9yIChsZXQgcHJvcCBpbiBwYXJhbXMpIHtcbiAgICBxdWVyeVN0cmluZyArPSBgJiR7cHJvcH09JHtwYXJhbXNbcHJvcF19YDtcbiAgfVxuXG4gIHF1ZXJ5U3RyaW5nID0gcXVlcnlTdHJpbmcuc3Vic3RyaW5nKDEpO1xuXG4gIGlmIChxdWVyeVN0cmluZykge1xuICAgIHF1ZXJ5U3RyaW5nID0gYD8ke3F1ZXJ5U3RyaW5nfWA7XG4gIH1cblxuICByZXR1cm4gcXVlcnlTdHJpbmc7XG59O1xuXG5jb25zdCBzZXRRdWVyeVBhcmFtID0gKGtleSwgdmFsdWUpID0+IHtcbiAgbGV0IG5ld1VSTCA9IGAke2xvY2F0aW9uLnByb3RvY29sfS8vJHtsb2NhdGlvbi5ob3N0fSR7bG9jYXRpb24ucGF0aG5hbWV9YDtcblxuICBjb25zdCBwYXJhbXMgPSBnZXRRdWVyeVBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xuICBwYXJhbXNba2V5XSA9IHZhbHVlO1xuXG4gIGNvbnN0IHF1ZXJ5U3RyaW5nID0gbWFrZVF1ZXJ5U3RyaW5nKHBhcmFtcyk7XG4gIGlmIChxdWVyeVN0cmluZykge1xuICAgIG5ld1VSTCArPSBxdWVyeVN0cmluZztcbiAgfVxuXG4gIGlmIChsb2NhdGlvbi5oYXNoKSB7XG4gICAgbmV3VVJMICs9IGxvY2F0aW9uLmhhc2g7XG4gIH1cblxuICBoaXN0b3J5LnB1c2hTdGF0ZShudWxsLCAnJywgbmV3VVJMKTtcbn07XG5cbmNvbnN0IHNldFBhbGV0dGUgPSBwYWxldHRlID0+IHtcbiAgc3dpdGNoIChwYWxldHRlKSB7XG4gICAgY2FzZSAnZGFyayc6XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BhbGV0dGUtZGFyaycpO1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwYWxldHRlLWFjY2Vzc2libGUnKTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgJ2FjY2Vzc2libGUnOlxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwYWxldHRlLWRhcmsnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgncGFsZXR0ZS1hY2Nlc3NpYmxlJyk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgLy9kZWZhdWx0IFwiaHlicmlkXCIgcGFsZXR0ZSBzZWxlY3RlZFxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdwYWxldHRlLWRhcmsnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFsZXR0ZS1hY2Nlc3NpYmxlJyk7XG4gICAgICBicmVhaztcbiAgfVxufTtcblxuY29uc3QgcGFsZXR0ZUNoYW5nZUhhbmRsZXIgPSBldmVudCA9PiB7XG4gIHNldFBhbGV0dGUoZXZlbnQudGFyZ2V0LnZhbHVlKTtcbiAgc2V0UXVlcnlQYXJhbSgndGhlbWUnLCBldmVudC50YXJnZXQudmFsdWUpO1xufTtcblxuY29uc3QgcGFnZUNoYW5nZUhhbmRsZXIgPSBsaW5rID0+IHtcbiAgbGluay5zZWFyY2ggPSBsb2NhdGlvbi5zZWFyY2g7XG59O1xuXG4oZnVuY3Rpb24gKCkge1xuICBjb25zdCBwYXJhbXMgPSBnZXRRdWVyeVBhcmFtcyhsb2NhdGlvbi5zZWFyY2gpO1xuICBzZXRQYWxldHRlKHBhcmFtcy50aGVtZSk7XG5cbiAgY29uc3QgcmFkaW9zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW25hbWU9XCJwYWxldHRlUmFkaW9zXCJdJyk7XG4gIHJhZGlvcy5mb3JFYWNoKHJhZGlvID0+IHtcbiAgICByYWRpby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHBhbGV0dGVDaGFuZ2VIYW5kbGVyKTtcblxuICAgIGlmIChwYXJhbXMudGhlbWUpIHtcbiAgICAgIGlmIChwYXJhbXMudGhlbWUgPT09IHJhZGlvLnZhbHVlKSB7XG4gICAgICAgIHJhZGlvLmNoZWNrZWQgPSB0cnVlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmFkaW8uY2hlY2tlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59KSgpO1xuLy8jZW5kcmVnaW9uXG4iXSwiZmlsZSI6ImRlbW8uanMifQ==
