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
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRlbW8uanMiXSwibmFtZXMiOlsiYWRkQWxlcnQiLCJtZXNzYWdlIiwib3B0aW9ucyIsIm1ha2VBbGVydCIsImFsZXJ0IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiY2xhc3NMaXN0IiwiYWRkIiwic2V0QXR0cmlidXRlIiwidHlwZSIsIndyYXBwZXIiLCJoZWFkaW5nIiwiaW5uZXJIVE1MIiwiYXBwZW5kQ2hpbGQiLCJjb250ZW50IiwiZGlzbWlzc2libGUiLCJ0ZW1wIiwiZmlyc3RDaGlsZCIsImFsZXJ0Q29sbGFwc2UiLCJ0YXJnZXQiLCJkb2N1bWVudEVsZW1lbnQiLCJkdXJhdGlvbiIsInBvc2l0aW9uIiwiaW5zZXJ0QmVmb3JlIiwic2V0VGltZW91dCIsImRpc21pc3NBbGVydCIsIiQiLCJhZGRBbGVydEhhbmRsZXIiLCJldmVudCIsInByZXZlbnREZWZhdWx0IiwiYXJyYXlUb09iaiIsIm91dHB1dCIsImlucHV0IiwibmFtZSIsInZhbHVlIiwiZGF0YSIsImN1cnJlbnRUYXJnZXQiLCJzZXJpYWxpemVBcnJheSIsInJlZHVjZSIsImdldFRhcmdldCIsImlubGluZSIsInRvcEJvdHRvbSIsInJpZ2h0TGVmdCIsImlkIiwiZ2V0RWxlbWVudEJ5SWQiLCJhbGVydElubGluZSIsImFsZXJ0VG9wQm90dG9tIiwiYWxlcnRSaWdodExlZnQiLCJhbGVydFR5cGUiLCJhbGVydENvbnRlbnQiLCJhbGVydERpc21pc3NpYmxlIiwid2luZG93IiwicGFyc2VJbnQiLCJhbGVydER1cmF0aW9uIiwiYWxlcnRNZXNzYWdlIiwiY2xvc2VzdCIsIm9uZSIsImNvbGxhcHNlIiwicmVtb3ZlIiwiZGlzbWlzc0FsZXJ0SGFuZGxlciIsImNsb3NlIiwiZGlzbWlzc0FsbEFsZXJ0cyIsInRvZ2dsZUlubGluZSIsImRpc2FibGVkIiwiY2hlY2tlZCIsIm9uIiwidXBkYXRlQ29udGFpbmVyRXhhbXBsZSIsInRleHQiLCJjc3MiLCJmbiIsInBvcG92ZXIiLCJ0b29sdGlwIiwiYm91bmRhcnkiLCJyZXNpemUiLCJXaXphcmQiLCJ3aXphcmRJZCIsImN1cnJlbnRTdGVwIiwid2l6YXJkIiwidXBkYXRlRGlzcGxheWVkU3RlcCIsInRhcmdldFN0ZXAiLCJ0b0hpZGUiLCJxdWVyeVNlbGVjdG9yQWxsIiwiQXJyYXkiLCJwcm90b3R5cGUiLCJmb3JFYWNoIiwiY2FsbCIsImVsIiwic3R5bGUiLCJkaXNwbGF5IiwidG9TaG93IiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImJ1dHRvbnMiLCJxdWVyeVNlbGVjdG9yIiwic3RlcCIsImNhbmNlbENvbmZpcm1hdGlvbiIsInNlbGVjdG9yIiwiYWRkQ2xhc3MiLCJtb2RhbCIsImFkZEV2ZW50TGlzdGVuZXIiLCJmb3JtcyIsImdldEVsZW1lbnRzQnlUYWdOYW1lIiwidmFsaWRhdGlvbiIsImZpbHRlciIsImZvcm0iLCJjb250YWlucyIsImNoZWNrVmFsaWRpdHkiLCJzdG9wUHJvcGFnYXRpb24iLCJjbGljayIsInRvZ2dsZUNsYXNzIiwidG9nZ2xlUm93U2VsZWN0aW9uIiwiZ2V0Um93IiwibWF0Y2hlcyIsInBhcmVudEVsZW1lbnQiLCJwYXJlbnROb2RlIiwibm9kZVR5cGUiLCJyb3ciLCJjaGVja2JveCIsImNoZWNrSGFuZGxlciIsImNoZWNrQWxsSGFuZGxlciIsInRhYmxlIiwiY2hlY2tib3hlcyIsIm9uU29ydCIsImxpc3QiLCJzb3J0YWJsZUNvbHMiLCJzb3J0ZWRDb2xzIiwiY29sIiwiZ2V0QXR0cmlidXRlIiwidGRzIiwidGQiLCJtYWtlU29ydGFibGUiLCJ0YWJsZUlkIiwiY29sdW1ucyIsIkxpc3QiLCJsaXN0Q2xhc3MiLCJzb3J0Q2xhc3MiLCJ2YWx1ZU5hbWVzIiwiY2hlY2tBbGwiLCJmaWx0ZXJhYmxlIiwiZmFjZXRzIiwia2V5IiwiaGVhZGVyIiwidmFsdWVzIiwibm9SZXBlYXQiLCJmaWxsRmFjZXRzIiwic291cmNlIiwiZmFjZXQiLCJjbGFzc05hbWUiLCJ0b0xvd2VyQ2FzZSIsIlNldCIsImRhdHVtIiwidGV4dENvbnRlbnQiLCJzb3J0IiwiZmlsdGVyQnlGYWNldHMiLCJpdGVtIiwicmVzdWx0IiwicHJvcCIsInZhbEZpbHRlciIsInNwbGl0IiwiaXRlbVZhbCIsInRoaXNSZXN1bHQiLCJpIiwibGVuIiwibGVuZ3RoIiwiYXBwbHlGaWx0ZXIiLCJzaG93RmlsdGVyIiwicXVlcnlEaXNwbGF5IiwiSlNPTiIsInN0cmluZ2lmeSIsImRhdGFTb3VyY2UiLCJmaWx0ZXJFbCIsIkZpbHRlciIsImdldFF1ZXJ5UGFyYW1zIiwicXVlcnkiLCJwYXJhbXMiLCJxdWVyeVN0cmluZyIsInN1YnN0cmluZyIsInBhaXJzIiwibWFwIiwiY29tcG9uZW50IiwiYWNjIiwicGFpciIsImRlY29kZVVSSUNvbXBvbmVudCIsIm1ha2VRdWVyeVN0cmluZyIsInNldFF1ZXJ5UGFyYW0iLCJuZXdVUkwiLCJsb2NhdGlvbiIsInByb3RvY29sIiwiaG9zdCIsInBhdGhuYW1lIiwic2VhcmNoIiwiaGFzaCIsImhpc3RvcnkiLCJwdXNoU3RhdGUiLCJzZXRQYWxldHRlIiwicGFsZXR0ZSIsImJvZHkiLCJwYWxldHRlQ2hhbmdlSGFuZGxlciIsInBhZ2VDaGFuZ2VIYW5kbGVyIiwibGluayIsInRoZW1lIiwicmFkaW9zIiwicmFkaW8iXSwibWFwcGluZ3MiOiJBQUFBLGEsQ0FFQTs7Ozs7Ozs7Ozs7Ozs7OztBQUNBLElBQU1BLFFBQVEsR0FBRyxTQUFYQSxRQUFXLENBQUNDLE9BQUQsRUFBMkI7QUFBQSxNQUFqQkMsT0FBaUIsdUVBQVAsRUFBTzs7QUFDMUMsTUFBTUMsU0FBUyxHQUFHLFNBQVpBLFNBQVksQ0FBQ0YsT0FBRCxFQUFVQyxPQUFWLEVBQXNCO0FBQ3RDLFFBQU1FLEtBQUssR0FBR0MsUUFBUSxDQUFDQyxhQUFULENBQXVCLEtBQXZCLENBQWQ7QUFDQUYsSUFBQUEsS0FBSyxDQUFDRyxTQUFOLENBQWdCQyxHQUFoQixDQUFvQixPQUFwQixFQUE2QixNQUE3QjtBQUNBSixJQUFBQSxLQUFLLENBQUNLLFlBQU4sQ0FBbUIsTUFBbkIs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QUFOLEdBQWdCLEtBQWhCO0FBQ0Q7QUFDRjtBQUNGLEdBVkQ7QUFXRCxDQWhCRCxJLENBaUJBIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG4vLyNyZWdpb24gQWxlcnQgdGVzdGVyXG5jb25zdCBhZGRBbGVydCA9IChtZXNzYWdlLCBvcHRpb25zID0ge30pID0+IHtcbiAgY29uc3QgbWFrZUFsZXJ0ID0gKG1lc3NhZ2UsIG9wdGlvbnMpID0+IHtcbiAgICBjb25zdCBhbGVydCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0JywgJ2ZhZGUnKTtcbiAgICBhbGVydC5zZXRBdHRyaWJ1dGUoJ3JvbGUnLCAnYWxlcnQnKTtcblxuICAgIHN3aXRjaCAob3B0aW9ucy50eXBlKSB7XG4gICAgICBjYXNlICdpbmZvJzpcbiAgICAgICAgYWxlcnQuY2xhc3NMaXN0LmFkZCgnYWxlcnQtaW5mbycpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgJ3N1Y2Nlc3MnOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1zdWNjZXNzJyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAnd2FybmluZyc6XG4gICAgICAgIGFsZXJ0LmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LXdhcm5pbmcnKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdkYW5nZXInOlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1kYW5nZXInKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1kZWZhdWx0Jyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIGNvbnN0IHdyYXBwZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcblxuICAgIGNvbnN0IGhlYWRpbmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBoZWFkaW5nLmNsYXNzTGlzdC5hZGQoJ2FsZXJ0LWhlYWRpbmcnKTtcbiAgICBoZWFkaW5nLmlubmVySFRNTCA9IG1lc3NhZ2U7XG4gICAgd3JhcHBlci5hcHBlbmRDaGlsZChoZWFkaW5nKTtcblxuICAgIGlmIChvcHRpb25zLmNvbnRlbnQpIHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gb3B0aW9ucy5jb250ZW50O1xuICAgICAgd3JhcHBlci5hcHBlbmRDaGlsZChjb250ZW50KTtcbiAgICB9XG5cbiAgICBhbGVydC5hcHBlbmRDaGlsZCh3cmFwcGVyKTtcblxuICAgIGlmIChvcHRpb25zLmRpc21pc3NpYmxlKSB7XG4gICAgICBhbGVydC5jbGFzc0xpc3QuYWRkKCdhbGVydC1kaXNtaXNzaWJsZScpO1xuICAgICAgY29uc3QgdGVtcCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgdGVtcC5pbm5lckhUTUwgPSAnPGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjbG9zZVwiIGFyaWEtbGFiZWw9XCJDbG9zZVwiIG9uY2xpY2s9XCJkaXNtaXNzQWxlcnRIYW5kbGVyKHRoaXMpXCI+PC9idXR0b24+JztcbiAgICAgIGFsZXJ0LmFwcGVuZENoaWxkKHRlbXAuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgY29uc3QgYWxlcnRDb2xsYXBzZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIGFsZXJ0Q29sbGFwc2UuY2xhc3NMaXN0LmFkZCgnYWxlcnQtY29sbGFwc2UnLCAnY29sbGFwc2UnLCAnc2hvdycpO1xuICAgIGFsZXJ0Q29sbGFwc2UuYXBwZW5kQ2hpbGQoYWxlcnQpO1xuXG4gICAgcmV0dXJuIGFsZXJ0Q29sbGFwc2U7XG4gIH07XG5cbiAgaWYgKCFtZXNzYWdlIHx8IHR5cGVvZiBtZXNzYWdlICE9PSAnc3RyaW5nJykgcmV0dXJuO1xuXG4gIGNvbnN0IHtcbiAgICB0YXJnZXQgPSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQsXG4gICAgdHlwZSA9ICdkZWZhdWx0JywgLy8gbWF5IGJlICdpbmZvJywgJ3N1Y2Nlc3MnLCAnd2FybmluZycsICdkYW5nZXInLCBvciAnZGVmYXVsdCdcbiAgICBjb250ZW50ID0gbnVsbCxcbiAgICBkaXNtaXNzaWJsZSA9IHRydWUsXG4gICAgZHVyYXRpb24gPSAwLCAvL2luIHNlY29uZHNcbiAgICBwb3NpdGlvbiA9ICdmaXJzdCcgLy8gaWYgJ2ZpcnN0JyBhbGVydCB3aWxsIGJlIGluc2VydGVkIGFib3ZlIGV4aXN0aW5nIGFsZXJ0c1xuICB9ID0gb3B0aW9ucztcblxuICBjb25zdCBhbGVydCA9IG1ha2VBbGVydChtZXNzYWdlLCB7dGFyZ2V0LCB0eXBlLCBjb250ZW50LCBkaXNtaXNzaWJsZSwgZHVyYXRpb24sIHBvc2l0aW9ufSk7XG5cbiAgaWYgKHBvc2l0aW9uID09PSAnZmlyc3QnKSB7XG4gICAgdGFyZ2V0Lmluc2VydEJlZm9yZShhbGVydCwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuICB9IGVsc2Uge1xuICAgIHRhcmdldC5hcHBlbmRDaGlsZChhbGVydCk7XG4gIH1cblxuICBzZXRUaW1lb3V0KCgpID0+IGFsZXJ0LmZpcnN0Q2hpbGQuY2xhc3NMaXN0LmFkZCgnc2hvdycpKTtcblxuICBpZiAoZHVyYXRpb24pIHtcbiAgICBzZXRUaW1lb3V0KCgpID0+IGRpc21pc3NBbGVydCgkKGFsZXJ0LmZpcnN0Q2hpbGQpKSwgZHVyYXRpb24gKiAxMDAwKTtcbiAgfVxufTtcblxuY29uc3QgYWRkQWxlcnRIYW5kbGVyID0gZXZlbnQgPT4ge1xuICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gIGNvbnN0IGFycmF5VG9PYmogPSAob3V0cHV0LCBpbnB1dCkgPT4ge1xuICAgIG91dHB1dFtpbnB1dC5uYW1lXSA9IGlucHV0LnZhbHVlO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH07XG5cbiAgY29uc3QgZGF0YSA9ICQoZXZlbnQuY3VycmVudFRhcmdldCkuc2VyaWFsaXplQXJyYXkoKS5yZWR1Y2UoYXJyYXlUb09iaiwge30pO1xuXG4gIGNvbnN0IGdldFRhcmdldCA9IChpbmxpbmUsIHRvcEJvdHRvbSwgcmlnaHRMZWZ0KSA9PiB7XG4gICAgbGV0IGlkO1xuXG4gICAgaWYgKGlubGluZSA9PT0gXCJvblwiKSB7XG4gICAgICBpZCA9ICdhbGVydHNJbmxpbmUnO1xuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodG9wQm90dG9tID09PSAndG9wJykge1xuICAgICAgICBpZiAocmlnaHRMZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgaWQgPSAnYWxlcnRzVG9wUmlnaHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlkID0gJ2FsZXJ0c1RvcExlZnQnO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpZiAocmlnaHRMZWZ0ID09PSAncmlnaHQnKSB7XG4gICAgICAgICAgaWQgPSAnYWxlcnRzQm90dG9tUmlnaHQnO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlkID0gJ2FsZXJ0c0JvdHRvbUxlZnQnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKSB8fCBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQ7XG4gIH1cblxuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHRhcmdldDogZ2V0VGFyZ2V0KGRhdGEuYWxlcnRJbmxpbmUsIGRhdGEuYWxlcnRUb3BCb3R0b20sIGRhdGEuYWxlcnRSaWdodExlZnQpLFxuICAgIHR5cGU6IGRhdGEuYWxlcnRUeXBlLFxuICAgIGNvbnRlbnQ6IGRhdGEuYWxlcnRDb250ZW50LFxuICAgIGRpc21pc3NpYmxlOiAhIWRhdGEuYWxlcnREaXNtaXNzaWJsZSxcbiAgICBkdXJhdGlvbjogd2luZG93LnBhcnNlSW50KGRhdGEuYWxlcnREdXJhdGlvbiksXG4gICAgcG9zaXRpb246IGRhdGEuYWxlcnRUb3BCb3R0b20gPT09ICdib3R0b20nID8gJ2ZpcnN0JyA6ICdsYXN0J1xuICB9O1xuXG4gIGFkZEFsZXJ0KGRhdGEuYWxlcnRNZXNzYWdlLCBvcHRpb25zKTtcblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBkaXNtaXNzQWxlcnQgPSBhbGVydCA9PiB7XG4gIGNvbnN0IGFsZXJ0Q29sbGFwc2UgPSBhbGVydC5jbG9zZXN0KCcuYWxlcnQtY29sbGFwc2UnKTtcblxuICBhbGVydC5vbmUoJ2Nsb3NlLmJzLmFsZXJ0JywgKCkgPT4gYWxlcnRDb2xsYXBzZS5jb2xsYXBzZSgnaGlkZScpKTtcbiAgYWxlcnRDb2xsYXBzZS5vbmUoJ2hpZGRlbi5icy5jb2xsYXBzZScsICgpID0+IGFsZXJ0Q29sbGFwc2UucmVtb3ZlKCkpO1xuXG4gIGFsZXJ0LmFsZXJ0KCdjbG9zZScpO1xufTtcblxuY29uc3QgZGlzbWlzc0FsZXJ0SGFuZGxlciA9IGNsb3NlID0+IHtcbiAgY29uc3QgYWxlcnQgPSAkKGNsb3NlKS5jbG9zZXN0KCcuYWxlcnQnKTtcbiAgZGlzbWlzc0FsZXJ0KGFsZXJ0KTtcbn07XG5cbmNvbnN0IGRpc21pc3NBbGxBbGVydHMgPSAoKSA9PiB7XG4gICQoJy5hbGVydC1jb250YWluZXIgLmFsZXJ0JykuYWxlcnQoJ2Nsb3NlJyk7XG4gICQoJy5hbGVydC1jb250YWluZXItaW5saW5lIC5hbGVydCcpLmFsZXJ0KCdjbG9zZScpO1xufTtcblxuY29uc3QgdG9nZ2xlSW5saW5lID0gZXZlbnQgPT4ge1xuICAkKCcjYWxlcnRUb3AnKVswXS5kaXNhYmxlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAkKCcjYWxlcnRCb3R0b20nKVswXS5kaXNhYmxlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xuICAkKCcjYWxlcnRSaWdodCcpWzBdLmRpc2FibGVkID0gZXZlbnQudGFyZ2V0LmNoZWNrZWQ7XG4gICQoJyNhbGVydExlZnQnKVswXS5kaXNhYmxlZCA9IGV2ZW50LnRhcmdldC5jaGVja2VkO1xufVxuXG4kKGZ1bmN0aW9uICgpIHtcbiAgJCgnI2FsZXJ0SW5saW5lJykub24oJ2NsaWNrJywgdG9nZ2xlSW5saW5lKTtcbiAgJCgnI2FkZEFsZXJ0Jykub24oJ3N1Ym1pdCcsIGFkZEFsZXJ0SGFuZGxlcik7XG4gICQoJyNkaXNtaXNzQWxsQWxlcnRzJykub24oJ2NsaWNrJywgZGlzbWlzc0FsbEFsZXJ0cyk7XG59KTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gQ29udGFpbmVyIGV4YW1wbGVcbmNvbnN0IHVwZGF0ZUNvbnRhaW5lckV4YW1wbGUgPSAoKSA9PiB7XG4gICQoJyNkb2N1bWVudFdpZHRoJykudGV4dCgkKCdib2R5JykuY3NzKCd3aWR0aCcpKTtcbiAgJCgnI2NvbnRhaW5lcldpZHRoJykudGV4dCgkKCcjY29udGFpbmVyRXhhbXBsZScpLmNzcygnd2lkdGgnKSk7XG4gICQoJyNjb250YWluZXJGbHVpZFdpZHRoJykudGV4dCgkKCcjY29udGFpbmVyRmx1aWRFeGFtcGxlJykuY3NzKCd3aWR0aCcpKTtcbn07XG5cbiQoZnVuY3Rpb24gKCkge1xuICBpZiAoJC5mbi5wb3BvdmVyKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwicG9wb3ZlclwiXScpLnBvcG92ZXIoKTtcbiAgfVxuICBpZiAoJC5mbi50b29sdGlwKSB7XG4gICAgJCgnW2RhdGEtdG9nZ2xlPVwidG9vbHRpcFwiXScpLnRvb2x0aXAoeyBib3VuZGFyeTogJ3dpbmRvdycgfSk7XG4gIH1cblxuICB1cGRhdGVDb250YWluZXJFeGFtcGxlKCk7XG4gICQod2luZG93KS5yZXNpemUodXBkYXRlQ29udGFpbmVyRXhhbXBsZSk7XG59KTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gV2l6YXJkIGluIG1vZGFsXG5jbGFzcyBXaXphcmQge1xuICBjb25zdHJ1Y3Rvcih3aXphcmRJZCkge1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSAxO1xuICAgIHRoaXMud2l6YXJkID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQod2l6YXJkSWQpO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkU3RlcCgxKTtcbiAgfVxuXG4gIHVwZGF0ZURpc3BsYXllZFN0ZXAodGFyZ2V0U3RlcCkge1xuICAgIGlmICh0aGlzLndpemFyZCkge1xuICAgICAgY29uc3QgdG9IaWRlID0gdGhpcy53aXphcmQucXVlcnlTZWxlY3RvckFsbCgnW2NsYXNzKj1cInN0ZXAtXCJdJyk7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKHRvSGlkZSwgZWwgPT4ge1xuICAgICAgICBlbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHRvU2hvdyA9IHRoaXMud2l6YXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoYHN0ZXAtJHt0YXJnZXRTdGVwfWApO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0b1Nob3csIGVsID0+IHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYnV0dG9ucyA9IHRoaXMud2l6YXJkLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoJ3dpemFyZC1uYXYtYnV0dG9uJyk7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGJ1dHRvbnMsIGVsID0+IHtcbiAgICAgICAgZWwuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICB9KTtcblxuICAgICAgdGhpcy53aXphcmQucXVlcnlTZWxlY3RvcignLndpemFyZC1maW5pc2gtYnV0dG9uJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgICAgIGlmICh0YXJnZXRTdGVwID09PSAxKSB7XG4gICAgICAgIHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3IoJy53aXphcmQtYmFjay1idXR0b24nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgaWYgKHRhcmdldFN0ZXAgPT09IDMpIHtcbiAgICAgICAgdGhpcy53aXphcmQucXVlcnlTZWxlY3RvcignLndpemFyZC1uZXh0LWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgIHRoaXMud2l6YXJkLnF1ZXJ5U2VsZWN0b3IoJy53aXphcmQtZmluaXNoLWJ1dHRvbicpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGJhY2soKSB7XG4gICAgdGhpcy51cGRhdGVEaXNwbGF5ZWRTdGVwKC0tdGhpcy5jdXJyZW50U3RlcCk7XG4gIH1cblxuICBuZXh0KCkge1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkU3RlcCgrK3RoaXMuY3VycmVudFN0ZXApO1xuICB9XG5cbiAgZ29Ub1N0ZXAoc3RlcCkge1xuICAgIHRoaXMuY3VycmVudFN0ZXAgPSBzdGVwO1xuICAgIHRoaXMudXBkYXRlRGlzcGxheWVkU3RlcChzdGVwKTtcbiAgfVxufTtcblxuY29uc3QgY2FuY2VsQ29uZmlybWF0aW9uID0gc2VsZWN0b3IgPT4ge1xuICAkKHNlbGVjdG9yKS5vbmUoJ2hpZGRlbi5icy5tb2RhbCcsICgpID0+ICQoJ2JvZHknKS5hZGRDbGFzcygnbW9kYWwtb3BlbicpKTtcbiAgJChzZWxlY3RvcikubW9kYWwoJ2hpZGUnKTtcbn07XG4vLyNlbmRyZWdpb25cblxuLy8jcmVnaW9uIEZvcm0gdmFsaWRhdGlvblxuLy8gRXhhbXBsZSBzdGFydGVyIEphdmFTY3JpcHQgZm9yIGRpc2FibGluZyBmb3JtIHN1Ym1pc3Npb25zIGlmIHRoZXJlIGFyZSBpbnZhbGlkIGZpZWxkc1xuKGZ1bmN0aW9uICgpIHtcbiAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCBmdW5jdGlvbiAoKSB7XG4gICAgLy8gRmV0Y2ggYWxsIHRoZSBmb3JtcyB3ZSB3YW50IHRvIGFwcGx5IGN1c3RvbSBCb290c3RyYXAgdmFsaWRhdGlvbiBzdHlsZXMgdG9cbiAgICB2YXIgZm9ybXMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnZm9ybScpO1xuICAgIC8vIExvb3Agb3ZlciB0aGVtIGFuZCBwcmV2ZW50IHN1Ym1pc3Npb25cbiAgICB2YXIgdmFsaWRhdGlvbiA9IEFycmF5LnByb3RvdHlwZS5maWx0ZXIuY2FsbChmb3JtcywgZnVuY3Rpb24gKGZvcm0pIHtcbiAgICAgIGlmIChmb3JtLmNsYXNzTGlzdC5jb250YWlucygndmFsaWRhdGUnKSkge1xuICAgICAgICBmb3JtLmFkZEV2ZW50TGlzdGVuZXIoJ3N1Ym1pdCcsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgIGlmIChmb3JtLmNoZWNrVmFsaWRpdHkoKSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCd3YXMtdmFsaWRhdGVkJyk7XG4gICAgICAgIH0sIGZhbHNlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSwgZmFsc2UpO1xufSkoKTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gRGFzaHJvd3NcbiQoZnVuY3Rpb24gKCkge1xuICAkKCcuanMtYnRuLWEnKS5jbGljayhmdW5jdGlvbiAoKSB7XG4gICAgJCgnLmpzLXRhcmdldC1hJykudG9nZ2xlQ2xhc3MoJ2V4cGFuZGVkJyk7XG4gIH0pO1xuXG4gICQoJy5qcy1idG4tYicpLmNsaWNrKGZ1bmN0aW9uICgpIHtcbiAgICAkKCcuanMtdGFyZ2V0LWInKS50b2dnbGVDbGFzcygnZXhwYW5kZWQnKTtcbiAgfSk7XG59KTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gU29ydGFibGUgdGFibGUgZXhhbXBsZVxuLy8gVXNlcyBMaXN0LmpzIG9ubHkgZm9yIGRlbW8gcHVycG9zZXMgdG8gc2hvdyBob3cgYSBGbHVpZCBzb3J0YWJsZSB0YWJsZSBzaG91bGQgYmVoYXZlXG5jb25zdCB0b2dnbGVSb3dTZWxlY3Rpb24gPSB0YXJnZXQgPT4ge1xuICBjb25zdCBnZXRSb3cgPSBlbCA9PiB7XG4gICAgZG8ge1xuICAgICAgaWYgKGVsLm1hdGNoZXMoJ3RyJykpIHtcbiAgICAgICAgcmV0dXJuIGVsO1xuICAgICAgfVxuICAgICAgZWwgPSBlbC5wYXJlbnRFbGVtZW50IHx8IGVsLnBhcmVudE5vZGU7XG4gICAgfSB3aGlsZSAoZWwgIT09IG51bGwgJiYgZWwubm9kZVR5cGUgPT09IDEpO1xuICB9XG5cbiAgY29uc3Qgcm93ID0gZ2V0Um93KHRhcmdldCk7XG4gIGlmIChyb3cpIHtcbiAgICBjb25zdCBjaGVja2JveCA9IHJvdy5xdWVyeVNlbGVjdG9yKCd0ciBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcbiAgICBpZiAoY2hlY2tib3gpIHtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSB0YXJnZXQuY2hlY2tlZDtcbiAgICAgIHRhcmdldC5jaGVja2VkID8gcm93LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJykgOiByb3cuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IGNoZWNrSGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgdG9nZ2xlUm93U2VsZWN0aW9uKGV2ZW50LnRhcmdldCk7XG4gIGlmICghZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnY2hlY2tBbGwnKS5jaGVja2VkID0gZmFsc2U7XG4gIH1cbn07XG5cbmNvbnN0IGNoZWNrQWxsSGFuZGxlciA9IGV2ZW50ID0+IHtcbiAgY29uc3QgdGFibGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc29ydGFibGUtZXhhbXBsZScpO1xuXG4gIGlmICh0YWJsZSkge1xuICAgIGNvbnN0IGNoZWNrYm94ZXMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKTtcbiAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGNoZWNrYm94ZXMsIGNoZWNrYm94ID0+IHtcbiAgICAgIGNoZWNrYm94LmNoZWNrZWQgPSBldmVudC50YXJnZXQuY2hlY2tlZDtcbiAgICAgIHRvZ2dsZVJvd1NlbGVjdGlvbihjaGVja2JveCk7XG4gICAgfSk7XG4gIH1cbn07XG5cbmNvbnN0IG9uU29ydCA9IGV2ZW50ID0+IHtcbiAgY29uc3QgdGFibGUgPSBldmVudC5saXN0LnBhcmVudEVsZW1lbnQ7XG4gIGNvbnN0IHNvcnRhYmxlQ29scyA9IHRhYmxlLnF1ZXJ5U2VsZWN0b3JBbGwoJ3RoLnNvcnRhYmxlJyk7XG4gIGNvbnN0IHNvcnRlZENvbHMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0aC5zb3J0YWJsZS5hc2MsIHRoLnNvcnRhYmxlLmRlc2MnKTtcblxuICBzb3J0YWJsZUNvbHMuZm9yRWFjaChjb2wgPT4ge1xuICAgIGNvbC5jbGFzc0xpc3QucmVtb3ZlKCdzb3J0ZWQnKTtcbiAgICBjb25zdCB0YXJnZXQgPSBjb2wuZ2V0QXR0cmlidXRlKCdkYXRhLXNvcnQnKTtcbiAgICBjb25zdCB0ZHMgPSB0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKGAuJHt0YXJnZXR9YCk7XG4gICAgdGRzLmZvckVhY2godGQgPT4gdGQuY2xhc3NMaXN0LnJlbW92ZSgnc29ydGVkJykpO1xuICB9KTtcblxuICBzb3J0ZWRDb2xzLmZvckVhY2goY29sID0+IHtcbiAgICBjb2wuY2xhc3NMaXN0LmFkZCgnc29ydGVkJyk7XG4gICAgY29uc3QgdGFyZ2V0ID0gY29sLmdldEF0dHJpYnV0ZSgnZGF0YS1zb3J0Jyk7XG4gICAgY29uc3QgdGRzID0gdGFibGUucXVlcnlTZWxlY3RvckFsbChgLiR7dGFyZ2V0fWApO1xuICAgIHRkcy5mb3JFYWNoKHRkID0+IHRkLmNsYXNzTGlzdC5hZGQoJ3NvcnRlZCcpKTtcbiAgfSk7XG59O1xuXG5jb25zdCBtYWtlU29ydGFibGUgPSAodGFibGVJZCwgY29sdW1ucykgPT4ge1xuICBjb25zdCB0YWJsZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRhYmxlSWQpO1xuICBsZXQgbGlzdDtcbiAgaWYgKHRhYmxlKSB7XG4gICAgbGlzdCA9IG5ldyBMaXN0KHRhYmxlSWQsIHtcbiAgICAgIGxpc3RDbGFzczogJ3RhYmxlLWRhdGEnLFxuICAgICAgc29ydENsYXNzOiAnc29ydGFibGUnLFxuICAgICAgdmFsdWVOYW1lczogY29sdW1uc1xuICAgIH0pO1xuXG4gICAgY29uc3QgY2hlY2tBbGwgPSB0YWJsZS5xdWVyeVNlbGVjdG9yKCd0aGVhZCBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKVxuICAgIGlmIChjaGVja0FsbCkge1xuICAgICAgY2hlY2tBbGwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjaGVja0FsbEhhbmRsZXIpO1xuICAgICAgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbCh0YWJsZS5xdWVyeVNlbGVjdG9yQWxsKCd0Ym9keSBpbnB1dFt0eXBlPVwiY2hlY2tib3hcIl0nKSwgY2hlY2tib3ggPT4ge1xuICAgICAgICBjaGVja2JveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNoZWNrSGFuZGxlcik7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBsaXN0Lm9uKCdzb3J0Q29tcGxldGUnLCBvblNvcnQpO1xuXG4gIHJldHVybiBsaXN0O1xufTtcblxubGV0IGZpbHRlcmFibGU7XG4kKCgpID0+IHtcbiAgbWFrZVNvcnRhYmxlKCdzb3J0YWJsZS1leGFtcGxlJywgWydkYXRhLXN0YXR1cycsICdkYXRhLW5hbWUnLCAnZGF0YS11c2VybmFtZScsICdkYXRhLWxvZ2luJ10pO1xuICBmaWx0ZXJhYmxlID0gbWFrZVNvcnRhYmxlKCdmaWx0ZXJhYmxlLWV4YW1wbGUnLCBbJ2RhdGEtY29tcGFueScsICdkYXRhLW5hbWUnLCAnZGF0YS1kZXBhcnRtZW50JywgJ2RhdGEtZ2VuZGVyJywgJ2RhdGEtY2l0eScsICdkYXRhLWNvdW50cnknXSk7XG59KTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gRmlsdGVyXG5jb25zdCBmYWNldHMgPSBbXG4gIHtcbiAgICBrZXk6ICdOYW1lJyxcbiAgfSxcbiAge1xuICAgIGtleTogJ09yZ2FuaXphdGlvbicsXG4gICAgaGVhZGVyOiB0cnVlXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdDb21wYW55JyxcbiAgICB2YWx1ZXM6IFtdXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdEZXBhcnRtZW50JyxcbiAgICB2YWx1ZXM6IFtdXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdHZW5kZXInLFxuICAgIG5vUmVwZWF0OiB0cnVlLFxuICAgIHZhbHVlczogW11cbiAgfSxcbiAge1xuICAgIGtleTogJ0xvY2F0aW9uJyxcbiAgICBoZWFkZXI6IHRydWVcbiAgfSxcbiAge1xuICAgIGtleTogJ0NpdHknXG4gIH0sXG4gIHtcbiAgICBrZXk6ICdDb3VudHJ5JyxcbiAgICB2YWx1ZXM6IFtdXG4gIH1cbl07XG5cbmNvbnN0IGZpbGxGYWNldHMgPSAoZmFjZXRzLCBzb3VyY2UpID0+IHtcbiAgZmFjZXRzLmZvckVhY2goZmFjZXQgPT4ge1xuICAgIGlmICghZmFjZXQuaGVhZGVyICYmIGZhY2V0LnZhbHVlcykge1xuICAgICAgY29uc3QgY2xhc3NOYW1lID0gYGRhdGEtJHtmYWNldC5rZXkudG9Mb3dlckNhc2UoKX1gO1xuICAgICAgY29uc3QgZGF0YSA9IHNvdXJjZS5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKGNsYXNzTmFtZSk7XG4gICAgICBjb25zdCB2YWx1ZXMgPSBuZXcgU2V0KCk7XG4gICAgICBBcnJheS5wcm90b3R5cGUuZm9yRWFjaC5jYWxsKGRhdGEsIGRhdHVtID0+IHZhbHVlcy5hZGQoZGF0dW0udGV4dENvbnRlbnQpKTtcbiAgICAgIGZhY2V0LnZhbHVlcyA9IFsuLi52YWx1ZXNdLnNvcnQoKTtcbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBmYWNldHM7XG59O1xuXG5jb25zdCBmaWx0ZXJCeUZhY2V0cyA9IChpdGVtLCBmaWx0ZXIpID0+IHtcbiAgbGV0IHJlc3VsdCA9IHRydWU7XG4gIGNvbnN0IHZhbHVlcyA9IGl0ZW0udmFsdWVzKCk7XG5cbiAgZm9yIChsZXQgcHJvcCBpbiB2YWx1ZXMpIHtcbiAgICBjb25zdCB2YWxGaWx0ZXIgPSBmaWx0ZXJbcHJvcC5zcGxpdCgnLScpWzFdXTtcblxuICAgIGlmICh2YWxGaWx0ZXIpIHtcbiAgICAgIGNvbnN0IGl0ZW1WYWwgPSB2YWx1ZXNbcHJvcF07XG5cbiAgICAgIGlmICh0eXBlb2YgKHZhbEZpbHRlcikgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJlc3VsdCA9IGl0ZW1WYWwgPT09IHZhbEZpbHRlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0aGlzUmVzdWx0ID0gZmFsc2U7XG5cbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGxlbiA9IHZhbEZpbHRlci5sZW5ndGg7IGkgPCBsZW47IGkrKykge1xuICAgICAgICAgIGlmIChpdGVtVmFsID09PSB2YWxGaWx0ZXJbaV0pIHtcbiAgICAgICAgICAgIHRoaXNSZXN1bHQgPSB0cnVlO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF0aGlzUmVzdWx0KSB7XG4gICAgICAgICAgcmVzdWx0ID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIXJlc3VsdCkge1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufTtcblxuY29uc3QgYXBwbHlGaWx0ZXIgPSAoZmlsdGVyYWJsZSwgZmlsdGVyKSA9PiB7XG4gIGlmIChmaWx0ZXJhYmxlICYmIGZpbHRlcikge1xuICAgIGZpbHRlcmFibGUuZmlsdGVyKGl0ZW0gPT4gZmlsdGVyQnlGYWNldHMoaXRlbSwgZmlsdGVyLnJlc3VsdCgpKSk7XG4gIH1cbn07XG5cbmNvbnN0IHNob3dGaWx0ZXIgPSAocXVlcnlEaXNwbGF5LCBmaWx0ZXIpID0+IHtcbiAgaWYgKHF1ZXJ5RGlzcGxheSAmJiBmaWx0ZXIpIHtcbiAgICBxdWVyeURpc3BsYXkudGV4dENvbnRlbnQgPSBKU09OLnN0cmluZ2lmeShmaWx0ZXIucmVzdWx0KCksIG51bGwsIDIpOyAvLyByZXN1bHQgaXMgYSBKU09OIG9iamVjdCwgc28gc3RyaW5naWZ5IGl0IGZvciBkaXNwbGF5XG4gIH1cbn1cblxuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgZGF0YVNvdXJjZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNmaWx0ZXJhYmxlLWV4YW1wbGUgdGJvZHknKTtcblxuICBpZiAoZGF0YVNvdXJjZSkge1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdsb2FkJywgKCkgPT4ge1xuICAgICAgY29uc3QgZmlsdGVyRWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLWlucHV0LWV4YW1wbGUnKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBmaWxsRmFjZXRzKGZhY2V0cywgZGF0YVNvdXJjZSk7XG4gICAgICBjb25zdCBmaWx0ZXIgPSBuZXcgRmlsdGVyKGZpbHRlckVsLCBkYXRhKTtcbiAgICAgIGZpbHRlckVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZWQuZmx1aWQuZmlsdGVyJywgKCkgPT4gc2hvd0ZpbHRlcihkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZmlsdGVyLXF1ZXJ5LWV4YW1wbGUnKSwgZmlsdGVyKSk7XG4gICAgfSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGZpbHRlckVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2ZpbHRlci1pbnB1dCcpO1xuICAgICAgY29uc3QgZGF0YSA9IGZpbGxGYWNldHMoZmFjZXRzLCBkYXRhU291cmNlKTtcbiAgICAgIGNvbnN0IGZpbHRlciA9IG5ldyBGaWx0ZXIoZmlsdGVyRWwsIGRhdGEpO1xuICAgICAgZmlsdGVyRWwuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlZC5mbHVpZC5maWx0ZXInLCAoKSA9PiBhcHBseUZpbHRlcihmaWx0ZXJhYmxlLCBmaWx0ZXIpKTtcbiAgICB9KTtcbiAgfVxufSkoKTtcbi8vI2VuZHJlZ2lvblxuXG4vLyNyZWdpb24gUGFsZXR0ZSBTZWxlY3RvclxuY29uc3QgZ2V0UXVlcnlQYXJhbXMgPSBxdWVyeSA9PiB7XG4gIGxldCBwYXJhbXMgPSB7fTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IHF1ZXJ5LnN1YnN0cmluZygxKS5zcGxpdCgnJicpO1xuXG4gIGlmIChxdWVyeVN0cmluZy5sZW5ndGggPiAwICYmIHF1ZXJ5U3RyaW5nWzBdKSB7XG4gICAgY29uc3QgcGFpcnMgPSBxdWVyeVN0cmluZy5tYXAoY29tcG9uZW50ID0+IGNvbXBvbmVudC5zcGxpdCgnPScpKTtcbiAgICBwYWlycy5yZWR1Y2UoKGFjYywgcGFpcikgPT4gYWNjW3BhaXJbMF1dID0gZGVjb2RlVVJJQ29tcG9uZW50KHBhaXJbMV0pLCBwYXJhbXMpO1xuICB9XG5cbiAgcmV0dXJuIHBhcmFtcztcbn07XG5cbmNvbnN0IG1ha2VRdWVyeVN0cmluZyA9IHBhcmFtcyA9PiB7XG4gIGxldCBxdWVyeVN0cmluZyA9ICcnO1xuXG4gIGZvciAobGV0IHByb3AgaW4gcGFyYW1zKSB7XG4gICAgcXVlcnlTdHJpbmcgKz0gYCYke3Byb3B9PSR7cGFyYW1zW3Byb3BdfWA7XG4gIH1cblxuICBxdWVyeVN0cmluZyA9IHF1ZXJ5U3RyaW5nLnN1YnN0cmluZygxKTtcblxuICBpZiAocXVlcnlTdHJpbmcpIHtcbiAgICBxdWVyeVN0cmluZyA9IGA/JHtxdWVyeVN0cmluZ31gO1xuICB9XG5cbiAgcmV0dXJuIHF1ZXJ5U3RyaW5nO1xufTtcblxuY29uc3Qgc2V0UXVlcnlQYXJhbSA9IChrZXksIHZhbHVlKSA9PiB7XG4gIGxldCBuZXdVUkwgPSBgJHtsb2NhdGlvbi5wcm90b2NvbH0vLyR7bG9jYXRpb24uaG9zdH0ke2xvY2F0aW9uLnBhdGhuYW1lfWA7XG5cbiAgY29uc3QgcGFyYW1zID0gZ2V0UXVlcnlQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcbiAgcGFyYW1zW2tleV0gPSB2YWx1ZTtcblxuICBjb25zdCBxdWVyeVN0cmluZyA9IG1ha2VRdWVyeVN0cmluZyhwYXJhbXMpO1xuICBpZiAocXVlcnlTdHJpbmcpIHtcbiAgICBuZXdVUkwgKz0gcXVlcnlTdHJpbmc7XG4gIH1cblxuICBpZiAobG9jYXRpb24uaGFzaCkge1xuICAgIG5ld1VSTCArPSBsb2NhdGlvbi5oYXNoO1xuICB9XG5cbiAgaGlzdG9yeS5wdXNoU3RhdGUobnVsbCwgJycsIG5ld1VSTCk7XG59O1xuXG5jb25zdCBzZXRQYWxldHRlID0gcGFsZXR0ZSA9PiB7XG4gIHN3aXRjaCAocGFsZXR0ZSkge1xuICAgIGNhc2UgJ2RhcmsnOlxuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdwYWxldHRlLWRhcmsnKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFsZXR0ZS1hY2Nlc3NpYmxlJyk7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdhY2Nlc3NpYmxlJzpcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFsZXR0ZS1kYXJrJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ3BhbGV0dGUtYWNjZXNzaWJsZScpO1xuICAgICAgYnJlYWs7XG4gICAgZGVmYXVsdDpcbiAgICAgIC8vZGVmYXVsdCBcImh5YnJpZFwiIHBhbGV0dGUgc2VsZWN0ZWRcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgncGFsZXR0ZS1kYXJrJyk7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ3BhbGV0dGUtYWNjZXNzaWJsZScpO1xuICAgICAgYnJlYWs7XG4gIH1cbn07XG5cbmNvbnN0IHBhbGV0dGVDaGFuZ2VIYW5kbGVyID0gZXZlbnQgPT4ge1xuICBzZXRQYWxldHRlKGV2ZW50LnRhcmdldC52YWx1ZSk7XG4gIHNldFF1ZXJ5UGFyYW0oJ3RoZW1lJywgZXZlbnQudGFyZ2V0LnZhbHVlKTtcbn07XG5cbmNvbnN0IHBhZ2VDaGFuZ2VIYW5kbGVyID0gbGluayA9PiB7XG4gIGxpbmsuc2VhcmNoID0gbG9jYXRpb24uc2VhcmNoO1xufTtcblxuKGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgcGFyYW1zID0gZ2V0UXVlcnlQYXJhbXMobG9jYXRpb24uc2VhcmNoKTtcbiAgc2V0UGFsZXR0ZShwYXJhbXMudGhlbWUpO1xuXG4gIGNvbnN0IHJhZGlvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuYW1lPVwicGFsZXR0ZVJhZGlvc1wiXScpO1xuICByYWRpb3MuZm9yRWFjaChyYWRpbyA9PiB7XG4gICAgcmFkaW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBwYWxldHRlQ2hhbmdlSGFuZGxlcik7XG5cbiAgICBpZiAocGFyYW1zLnRoZW1lKSB7XG4gICAgICBpZiAocGFyYW1zLnRoZW1lID09PSByYWRpby52YWx1ZSkge1xuICAgICAgICByYWRpby5jaGVja2VkID0gdHJ1ZTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJhZGlvLmNoZWNrZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufSkoKTtcbi8vI2VuZHJlZ2lvblxuIl0sImZpbGUiOiJkZW1vLmpzIn0=
