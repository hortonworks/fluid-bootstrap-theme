/**
 * Copyright (c) 2011-2018, Hortonworks Inc.  All rights reserved.
 * Except as expressly permitted in a written agreement between you
 * or your company and Hortonworks, Inc, any use, reproduction,
 * modification, redistribution, sharing, lending or other exploitation
 * of all or any part of the contents of this file is strictly prohibited.
 */

/*
  Based on "JavaScript fancySearch" created by P Kishor
  GitHub: https://github.com/punkish/fancysearch
*/
'use strict';

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Filter = function Filter(container, data, options) {
  var facets = data.map(function (facet) {
    return _objectSpread({}, facet, {
      used: false,
      values: facet.values ? facet.values.map(function (value) {
        return {
          value: value,
          used: false
        };
      }) : []
    });
  });

  var opts = _objectSpread({
    tooltips: true,
    autoFocus: true
  }, options);

  var containerClicked = false; // Keeps track of when the container was clicked on, which affects how we handle blur events for the filters.

  var triggerCount = 0; // Keeps track of how many times to re-trigger the keyDown even in handleUpDown().

  var ENTER = 13;
  var TAB = 9;
  var ESC = 27;
  var DOWN = 40;
  var UP = 38; // Creates the following HTML. This is the structure of a single filter inside the container.
  // <div class="filter filter-key-empty">
  //   <div class="filter-key hide"></div>
  //   <div class="separator">:</div>
  //   <input class="filter-key-input" readonly="true"></input>
  //   <div class="filter-val hide"></div>
  //   <input class="filter-val-input hide"></input>
  //   <button class="close hide" type="button" aria-label="Remove Filter"></button>
  // </div>

  var makeFilter = function makeFilter(focus) {
    var filter = document.createElement('div');
    filter.className = 'filter filter-key-empty';
    var filterKey = document.createElement('div');
    filterKey.className = 'filter-key hide';
    var separator = document.createElement('div');
    separator.className = 'separator';
    separator.textContent = ':';
    var filterKeyInput = document.createElement('input');
    filterKeyInput.className = 'filter-key-input';
    filterKeyInput.setAttribute('readonly', 'true');
    filterKeyInput.addEventListener('focus', handleKeyFocus);
    filterKeyInput.addEventListener('blur', handleKeyBlur);
    filterKeyInput.addEventListener('keydown', handleKeyboard);
    var filterVal = document.createElement('div');
    filterVal.className = 'filter-val hide';
    var filterValInput = document.createElement('input');
    filterValInput.className = 'filter-val-input hide';
    filterValInput.addEventListener('keydown', handleKeyboard);
    filterValInput.addEventListener('blur', handleValBlur);
    var closeBtn = document.createElement('button');
    closeBtn.className = 'close hide';
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Remove Filter');
    closeBtn.addEventListener('click', function (event) {
      return removeFilter(event.target);
    });
    filter.appendChild(filterKey);
    filter.appendChild(separator);
    filter.appendChild(filterKeyInput);
    filter.appendChild(filterVal);
    filter.appendChild(filterValInput);
    filter.appendChild(closeBtn);
    container.appendChild(filter);
    var keys = facets.filter(function (facet) {
      return !facet.used;
    }).map(function (facet) {
      return {
        key: facet.key,
        header: facet.header
      };
    });
    makeAutoComplete('key', filterKeyInput, keys);

    if (focus) {
      filterKeyInput.focus();
    }
  };

  var getKeyDiv = function getKeyDiv(filter) {
    return filter.querySelector('.filter-key');
  };

  var getKeyInput = function getKeyInput(filter) {
    return filter.querySelector('.filter-key-input');
  };

  var getValueDiv = function getValueDiv(filter) {
    return filter.querySelector('.filter-val');
  };

  var getValueInput = function getValueInput(filter) {
    return filter.querySelector('.filter-val-input');
  };

  var getCloseButton = function getCloseButton(filter) {
    return filter.querySelector('.close');
  };

  var removeFilter = function removeFilter(target, suppressEvent) {
    if (target) {
      var getFilterEl = function getFilterEl(target) {
        if (_toConsumableArray(target.classList).includes('filter')) {
          return target;
        } else {
          return getFilterEl(target.parentElement);
        }
      }; // Return filter key and value to unused state.


      var filterEl = getFilterEl(target);

      if (filterEl) {
        var key = getKeyInput(filterEl).value;

        if (key) {
          var facet = facets.find(function (facet) {
            return facet.key === key;
          });

          if (facet) {
            facet.used = false;
            var val = getValueInput(filterEl).value;

            if (val) {
              var value = facet.values.find(function (value) {
                return value.value === val;
              });

              if (value) {
                value.used = false;
              }
            }
          }
        } // Remove filter element from UI.
        // Check if it is still in the DOM (has a parent) first.


        if (filterEl.parentElement) {
          filterEl.parentElement.removeChild(filterEl);
        }
      } // Remove uncommitted filters because the used items state may have changed


      getAllFilters(':not(.filter-committed)').forEach(function (filter) {
        return filter.parentElement.removeChild(filter);
      }); // Hide Clear All button if there are no more filters

      if (getAllFilters().length === 0) {
        clearButton.className = 'close hide';
      } // Emit event.


      if (!suppressEvent) {
        container.dispatchEvent(new Event('changed.fluid.filter'));
      }

      makeFilter();
    }
  };

  var commitValue = function commitValue(filter) {
    var valueEl = getValueDiv(filter);
    var valInput = getValueInput(filter);
    var closeButton = getCloseButton(filter);

    if (valInput.value !== '' && !Array.prototype.includes.call(filter.classList, 'filter-committed')) {
      // 1. Commit the selected value in the UI.
      filter.classList.replace('filter-val-empty', 'filter-committed');
      valueEl.textContent = valInput.value;
      valueEl.classList.remove('hide');
      valInput.classList.add('hide');
      closeButton.classList.remove('hide');
      clearButton.classList.remove('hide'); // Show Clear All button
      // 2. Mark the selected value as used.

      var key = getKeyInput(filter).value;
      var facet = facets.find(function (facet) {
        return facet.key === key;
      });

      if (facet) {
        var value = facet.values.find(function (value) {
          return value.value === valInput.value;
        });

        if (value) {
          value.used = true;
        }
      } // 3. Add tooltip if needed.


      if (opts.tooltips && isTruncatedX(valueEl)) {
        $(valueEl).tooltip({
          title: valInput.value
        });
      } // 4. Emit event.


      container.dispatchEvent(new Event('changed.fluid.filter')); // 5. Make the next new filter.

      makeFilter(opts.autoFocus);
      return true;
    }
  };

  var preventKeyScroll = function preventKeyScroll(event) {
    switch (event.keyCode) {
      case UP:
      case DOWN:
        event.preventDefault();
        break;
    }
  };

  var handleMouseDown = function handleMouseDown(event) {
    return containerClicked = true;
  };

  var handleMouseUp = function handleMouseUp(event) {
    return containerClicked = false;
  };

  var handleClick = function handleClick(event) {
    var filter = event.target;
    uncommitted = Array.prototype.find.call(filter.children, function (child) {
      return Array.prototype.includes.call(child.classList, 'filter') && !Array.prototype.includes.call(child.classList, 'filter-committed');
    });

    if (uncommitted) {
      getKeyInput(uncommitted).focus();
    }
  };

  var handleKeyFocus = function handleKeyFocus() {
    return window.addEventListener('keydown', preventKeyScroll);
  };

  var handleKeyBlur = function handleKeyBlur(event) {
    window.removeEventListener('keydown', preventKeyScroll); // If the element is blurred because the container was clicked on
    // and it is still in the uncommitted state, it will be immediately refocused.
    // In that case, we do not allow the blur event to propagate
    // because we want to keep the autocomplete menu visible.
    // However, if a close button within the container was clicked, then
    // event.relatedTarget will be populated, so we allow normal blurring behavior.

    if (containerClicked && !event.relatedTarget && !Array.prototype.includes.call(event.target.classList, 'filter-committed')) {
      event.stopImmediatePropagation();
    }
  };

  var handleValBlur = function handleValBlur(event) {
    return commitValue(event.target.parentElement);
  };

  var handleUpDown = function handleUpDown(code, target, isOriginalEvent) {
    var next;
    var selected = target.sc.querySelector('.autocomplete-suggestion.selected');

    if (!selected) {
      next = code === DOWN ? target.sc.querySelector('.autocomplete-suggestion') : target.sc.childNodes[target.sc.childNodes.length - 1]; // first : last
    } else {
      next = code === DOWN ? selected.nextSibling : selected.previousSibling;
    }

    if (next && Array.prototype.includes.call(next.classList, 'autocomplete-header')) {
      if (triggerCount === 0 && isOriginalEvent) {
        while (next) {
          if (Array.prototype.includes.call(next.classList, 'autocomplete-header')) {
            triggerCount++;
          } else {
            break;
          }

          next = code === DOWN ? next.nextSibling : next.previousSibling;
        }
      }

      if (triggerCount > 0) {
        triggerCount--;
        var newEvent = new KeyboardEvent('keydown', {
          keyCode: code,
          detail: true
        });
        target.dispatchEvent(newEvent);
      }
    }
  };

  var handleKeyboard = function handleKeyboard(event) {
    switch (event.keyCode) {
      case UP:
      case DOWN:
        handleUpDown(event.keyCode, event.target, !event.detail); // event.detail will be true if this is a re-triggered event from handleUpDown

        break;

      case ENTER:
        commitValue(event.target.parentElement);
        break;

      case TAB:
        if (!commitValue(event.target.parentElement)) {
          clearButton.focus();
        }

        event.preventDefault();
        break;

      case ESC:
        if (event.target.value === '') {
          removeFilter(event.target);
        }

        break;
    }
  };

  var activateTooltips = function activateTooltips(mutationsList, observer) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = mutationsList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var mutation = _step.value;

        if (mutation.type === 'childList' && mutation.addedNodes) {
          mutation.addedNodes.forEach(function (child) {
            if (isTruncatedX(child)) {
              $(child).tooltip({
                title: child.textContent
              });
            }
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return != null) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  };

  var makeAutoComplete = function makeAutoComplete(type, selector, choices) {
    new autoComplete({
      selector: selector,
      menuClass: 'dropdown-menu',
      minChars: Array.isArray(choices) ? 0 : 3,
      source: function source(term, response) {
        // The very first time this is called,
        // when the control is constructed,
        // choices will contain all keys.
        term = term.toLowerCase();
        var matches;

        if (type === 'key') {
          matches = choices.filter(function (choice) {
            return choice.key.toLowerCase().includes(term);
          });
        } else {
          matches = choices.filter(function (choice) {
            return choice.toLowerCase().includes(term);
          });
        }

        response(matches);
      },
      renderItem: function renderItem(item, search) {
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        var re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");
        var itemEl = document.createElement('div');
        itemEl.className = 'autocomplete-suggestion dropdown-item';

        if (type === 'key') {
          // The items to render for keys do not include the data-val property.
          // This prevents the control from being in an undefined state if the user
          // traverses the values in the dropdown using the arrow keys.
          if (item.header) {
            itemEl.classList.add('autocomplete-header');
          }

          itemEl.textContent = item.key;
        } else {
          itemEl.setAttribute('data-val', item);
          var displayItem = item.replace(re, '<b>$1</b>');
          itemEl.innerHTML = displayItem;
        } // Add tooltip if needed.
        // if (opts.tooltips) {
        //   itemEl.setAttribute('data-toggle', 'tooltip');
        //   itemEl.setAttribute('data-placement', 'right');
        //   itemEl.setAttribute('data-condition', 'truncated');
        //   itemEl.setAttribute('title', itemEl.textContent);
        // }


        return itemEl.outerHTML;
      },
      onSelect: function onSelect(event, term, item) {
        if (Array.prototype.includes.call(item.classList, 'autocomplete-header')) {
          event.stopImmediatePropagation();
        } else {
          term = item.textContent;
          var keyInput = this.selector;
          var filterEl = keyInput.parentElement;

          if (type === 'key') {
            // A key was just selected:
            // 1. Commit the selected key in the UI.
            var keyEl = getKeyDiv(filterEl);
            keyInput.classList.add('hide');
            keyInput.value = term;
            keyEl.textContent = term;
            keyEl.classList.remove('hide');
            filterEl.classList.replace('filter-key-empty', 'filter-val-empty'); // 2. Add tooltip if needed.

            if (opts.tooltips && isTruncatedX(keyEl)) {
              $(keyEl).tooltip({
                title: keyEl.textContent
              });
            } // 3. Determine choices for next autocomplete, which should
            //    contain the available values for the selected key.


            var valChoices = [];
            var facet = facets.find(function (facet) {
              return facet.key === term;
            });

            if (facet) {
              // We found the selected key, so filter its values to get the ones not yet used.
              valChoices = facet.values.filter(function (val) {
                return !val.used;
              }).map(function (val) {
                return val.value;
              }); // If the key is not reusable, mark it as used.

              if (facet.noRepeat) {
                facet.used = true;
              }
            } // 4. Create the autocomplete for the key's values using the available choices.


            var valInput = getValueInput(filterEl);
            makeAutoComplete('val', valInput, valChoices); // 5. Activate the value input for the filter.

            valInput.classList.remove('hide');
            valInput.focus();
          } else {
            // A value was just selected
            commitValue(filterEl);
          }
        }
      }
    });

    if (opts.tooltips && selector.sc) {
      var observer = new MutationObserver(activateTooltips);
      observer.observe(selector.sc, {
        childList: true
      });
    }
  };

  var getAllFilters = function getAllFilters(selector) {
    return _toConsumableArray(container.querySelectorAll(".filter".concat(selector || '')));
  };

  var makeClearButton = function makeClearButton() {
    var clearButton = document.createElement('button');
    clearButton.className = 'close hide clearAllFilters';
    clearButton.setAttribute('type', 'button');
    clearButton.setAttribute('aria-label', 'Clear All Filters');
    clearButton.addEventListener('click', function () {
      return getAllFilters().forEach(function (filter) {
        return removeFilter(filter, false);
      });
    });
    container.dispatchEvent(new Event('changed.fluid.filter'));
    return clearButton;
  };

  var clearButton = makeClearButton();
  container.appendChild(clearButton);
  container.addEventListener('mousedown', handleMouseDown);
  container.addEventListener('click', handleClick);
  container.addEventListener('mouseup', handleMouseUp);
  makeFilter();

  this.result = function () {
    var filters = getAllFilters();
    var query = {};
    filters.forEach(function (filter) {
      var key = getKeyInput(filter).value.toLowerCase();
      var val = getValueInput(filter).value;

      if (key && val) {
        if (key in query) {
          if (typeof query[key] === 'string') {
            // This is the second entry of a multi-valued filter,
            // so turn the single string into an array.
            var str = query[key];
            query[key] = [str, val];
          } else {
            query[key].push(val);
          }
        } else {
          query[key] = val;
        }
      }
    });
    return query;
  };
};
//# sourceMappingURL=filter.js.map
