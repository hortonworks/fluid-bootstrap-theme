'use strict';

//#region Alert tester
const addAlert = (message, options = {}) => {
  const makeAlert = (message, options) => {
    const alert = document.createElement('div');
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
      temp.innerHTML = '<button type="button" class="close" aria-label="Close" onclick="dismissAlertHandler(this)"></button>';
      alert.appendChild(temp.firstChild);
    }

    const alertCollapse = document.createElement('div');
    alertCollapse.classList.add('alert-collapse', 'collapse', 'show');
    alertCollapse.appendChild(alert);

    return alertCollapse;
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

  setTimeout(() => alert.firstChild.classList.add('show'));

  if (duration) {
    setTimeout(() => dismissAlert($(alert.firstChild)), duration * 1000);
  }
};

const addAlertHandler = event => {
  event.preventDefault();

  const arrayToObj = (output, input) => {
    output[input.name] = input.value;
    return output;
  };

  const data = $(event.currentTarget).serializeArray().reduce(arrayToObj, {});

  const getTarget = (inline, topBottom, rightLeft) => {
    let id;

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
  }

  const options = {
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

const dismissAlert = alert => {
  const alertCollapse = alert.closest('.alert-collapse');

  alert.one('close.bs.alert', () => alertCollapse.collapse('hide'));
  alertCollapse.one('hidden.bs.collapse', () => alertCollapse.remove());

  alert.alert('close');
};

const dismissAlertHandler = close => {
  const alert = $(close).closest('.alert');
  dismissAlert(alert);
};

const dismissAllAlerts = () => {
  $('.alert-container .alert').alert('close');
  $('.alert-container-inline .alert').alert('close');
};

const toggleInline = event => {
  $('#alertTop')[0].disabled = event.target.checked;
  $('#alertBottom')[0].disabled = event.target.checked;
  $('#alertRight')[0].disabled = event.target.checked;
  $('#alertLeft')[0].disabled = event.target.checked;
}

$(function () {
  $('#alertInline').on('click', toggleInline);
  $('#addAlert').on('submit', addAlertHandler);
  $('#dismissAllAlerts').on('click', dismissAllAlerts);
});
//#endregion

//#region Container example
const updateContainerExample = () => {
  $('#documentWidth').text($('body').css('width'));
  $('#containerWidth').text($('#containerExample').css('width'));
  $('#containerFluidWidth').text($('#containerFluidExample').css('width'));
};

$(function () {
  if ($.fn.popover) {
    $('[data-toggle="popover"]').popover();
  }
  if ($.fn.tooltip) {
    $('[data-toggle="tooltip"]').tooltip({ boundary: 'window' });
  }

  updateContainerExample();
  $(window).resize(updateContainerExample);
});
//#endregion

//#region Wizard in modal
class Wizard {
  constructor(wizardId) {
    this.currentStep = 1;
    this.wizard = document.getElementById(wizardId);
    this.updateDisplayedStep(1);
  }

  updateDisplayedStep(targetStep) {
    if (this.wizard) {
      const toHide = this.wizard.querySelectorAll('[class*="step-"]');
      Array.prototype.forEach.call(toHide, el => {
        el.style.display = 'none';
      });

      const toShow = this.wizard.getElementsByClassName(`step-${targetStep}`);
      Array.prototype.forEach.call(toShow, el => {
        el.style.display = 'block';
      });

      const buttons = this.wizard.getElementsByClassName('wizard-nav-button');
      Array.prototype.forEach.call(buttons, el => {
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

  back() {
    this.updateDisplayedStep(--this.currentStep);
  }

  next() {
    this.updateDisplayedStep(++this.currentStep);
  }

  goToStep(step) {
    this.currentStep = step;
    this.updateDisplayedStep(step);
  }
};

const cancelConfirmation = selector => {
  $(selector).one('hidden.bs.modal', () => $('body').addClass('modal-open'));
  $(selector).modal('hide');
};
//#endregion

//#region Form validation
// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
  window.addEventListener('load', function () {
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.getElementsByTagName('form');
    // Loop over them and prevent submission
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
})();
//#endregion

//#region Dashrows
$(function () {
  $('.js-btn-a').click(function () {
    $('.js-target-a').toggleClass('expanded');
  });

  $('.js-btn-b').click(function () {
    $('.js-target-b').toggleClass('expanded');
  });
});
//#endregion

//#region Sortable table example
// Uses List.js only for demo purposes to show how a Fluid sortable table should behave
const toggleRowSelection = target => {
  const getRow = el => {
    do {
      if (el.matches('tr')) {
        return el;
      }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
  }

  const row = getRow(target);
  if (row) {
    const checkbox = row.querySelector('tr input[type="checkbox"]');
    if (checkbox) {
      checkbox.checked = target.checked;
      target.checked ? row.classList.add('selected') : row.classList.remove('selected');
    }
  }
};

const checkHandler = event => {
  toggleRowSelection(event.target);
  if (!event.target.checked) {
    document.getElementById('checkAll').checked = false;
  }
};

const checkAllHandler = event => {
  const table = document.getElementById('sortable-example');

  if (table) {
    const checkboxes = table.querySelectorAll('tbody input[type="checkbox"]');
    Array.prototype.forEach.call(checkboxes, checkbox => {
      checkbox.checked = event.target.checked;
      toggleRowSelection(checkbox);
    });
  }
};

const onSort = event => {
  const table = event.list.parentElement;
  const sortableCols = table.querySelectorAll('th.sortable');
  const sortedCols = table.querySelectorAll('th.sortable.asc, th.sortable.desc');

  sortableCols.forEach(col => {
    col.classList.remove('sorted');
    const target = col.getAttribute('data-sort');
    const tds = table.querySelectorAll(`.${target}`);
    tds.forEach(td => td.classList.remove('sorted'));
  });

  sortedCols.forEach(col => {
    col.classList.add('sorted');
    const target = col.getAttribute('data-sort');
    const tds = table.querySelectorAll(`.${target}`);
    tds.forEach(td => td.classList.add('sorted'));
  });
};

const makeSortable = (tableId, columns) => {
  const table = document.getElementById(tableId);
  let list;
  if (table) {
    list = new List(tableId, {
      listClass: 'table-data',
      sortClass: 'sortable',
      valueNames: columns
    });

    const checkAll = table.querySelector('thead input[type="checkbox"]')
    if (checkAll) {
      checkAll.addEventListener('click', checkAllHandler);
      Array.prototype.forEach.call(table.querySelectorAll('tbody input[type="checkbox"]'), checkbox => {
        checkbox.addEventListener('click', checkHandler);
      });
    }
  }

  list.on('sortComplete', onSort);

  return list;
};

let filterable;
$(() => {
  makeSortable('sortable-example', ['data-status', 'data-name', 'data-username', 'data-login']);
  filterable = makeSortable('filterable-example', ['data-company', 'data-name', 'data-department', 'data-gender', 'data-city', 'data-country']);
});
//#endregion

//#region Filter
const facets = [
  {
    key: 'Name',
  },
  {
    key: 'Organization',
    header: true
  },
  {
    key: 'Company',
    values: []
  },
  {
    key: 'Department',
    values: []
  },
  {
    key: 'Gender',
    noRepeat: true,
    values: []
  },
  {
    key: 'Location',
    header: true
  },
  {
    key: 'City'
  },
  {
    key: 'Country',
    values: []
  }
];

const fillFacets = (facets, source) => {
  facets.forEach(facet => {
    if (!facet.header && facet.values) {
      const className = `data-${facet.key.toLowerCase()}`;
      const data = source.getElementsByClassName(className);
      const values = new Set();
      Array.prototype.forEach.call(data, datum => values.add(datum.textContent));
      facet.values = [...values].sort();
    }
  });

  return facets;
};

const filterByFacets = (item, filter) => {
  let result = true;
  const values = item.values();

  for (let prop in values) {
    const valFilter = filter[prop.split('-')[1]];

    if (valFilter) {
      const itemVal = values[prop];

      if (typeof (valFilter) === 'string') {
        result = itemVal === valFilter;
      } else {
        let thisResult = false;

        for (let i = 0, len = valFilter.length; i < len; i++) {
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

const applyFilter = (filterable, filter) => {
  if (filterable && filter) {
    filterable.filter(item => filterByFacets(item, filter.result()));
  }
};

const showFilter = (queryDisplay, filter) => {
  if (queryDisplay && filter) {
    queryDisplay.textContent = JSON.stringify(filter.result(), null, 2); // result is a JSON object, so stringify it for display
  }
}

(function () {
  const dataSource = document.querySelector('#filterable-example tbody');

  if (dataSource) {
    window.addEventListener('load', () => {
      const filterEl = document.getElementById('filter-input-example');
      const data = fillFacets(facets, dataSource);
      const filter = new Filter(filterEl, data);
      filterEl.addEventListener('changed.fluid.filter', () => showFilter(document.getElementById('filter-query-example'), filter));
    });

    window.addEventListener('load', () => {
      const filterEl = document.getElementById('filter-input');
      const data = fillFacets(facets, dataSource);
      const filter = new Filter(filterEl, data);
      filterEl.addEventListener('changed.fluid.filter', () => applyFilter(filterable, filter));
    });
  }
})();
//#endregion

//#region Palette Selector
const getQueryParams = query => {
  let params = {};

  const queryString = query.substring(1).split('&');

  if (queryString.length > 0 && queryString[0]) {
    const pairs = queryString.map(component => component.split('='));
    pairs.reduce((acc, pair) => acc[pair[0]] = decodeURIComponent(pair[1]), params);
  }

  return params;
};

const makeQueryString = params => {
  let queryString = '';

  for (let prop in params) {
    queryString += `&${prop}=${params[prop]}`;
  }

  queryString = queryString.substring(1);

  if (queryString) {
    queryString = `?${queryString}`;
  }

  return queryString;
};

const setQueryParam = (key, value) => {
  let newURL = `${location.protocol}//${location.host}${location.pathname}`;

  const params = getQueryParams(location.search);
  params[key] = value;

  const queryString = makeQueryString(params);
  if (queryString) {
    newURL += queryString;
  }

  if (location.hash) {
    newURL += location.hash;
  }

  history.pushState(null, '', newURL);
};

const setPalette = palette => {
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

const paletteChangeHandler = event => {
  setPalette(event.target.value);
  setQueryParam('theme', event.target.value);
};

const pageChangeHandler = link => {
  link.search = location.search;
};

(function () {
  const params = getQueryParams(location.search);
  setPalette(params.theme);

  const radios = document.querySelectorAll('[name="paletteRadios"]');
  radios.forEach(radio => {
    radio.addEventListener('click', paletteChangeHandler);

    if (params.theme) {
      if (params.theme === radio.value) {
        radio.checked = true;
      } else {
        radio.checked = false;
      }
    }
  });
})();
//#endregion
