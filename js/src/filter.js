/*
  Based on "JavaScript fancySearch" created by P Kishor
  GitHub: https://github.com/punkish/fancysearch
*/

'use strict';

const Filter = function (container, data, options) {
  const facets = data.map(facet => ({
    ...facet,
    used: false,
    values: facet.values ? facet.values.map(value => ({ value, used: false })) : []
  }));

  const opts = {
    tooltips: true,
    autoFocus: true,
    ...options
  };

  let containerClicked = false; // Keeps track of when the container was clicked on, which affects how we handle blur events for the filters.
  let triggerCount = 0; // Keeps track of how many times to re-trigger the keyDown even in handleUpDown().

  const ENTER = 13;
  const TAB = 9;
  const ESC = 27;
  const DOWN = 40;
  const UP = 38;

  // Creates the following HTML. This is the structure of a single filter inside the container.
  // <div class="filter filter-key-empty">
  //   <div class="filter-key hide"></div>
  //   <div class="separator">:</div>
  //   <input class="filter-key-input" readonly="true"></input>
  //   <div class="filter-val hide"></div>
  //   <input class="filter-val-input hide"></input>
  //   <button class="close hide" type="button" aria-label="Remove Filter"></button>
  // </div>
  const makeFilter = focus => {
    const filter = document.createElement('div');
    filter.className = 'filter filter-key-empty';

    const filterKey = document.createElement('div');
    filterKey.className = 'filter-key hide';

    const separator = document.createElement('div');
    separator.className = 'separator';
    separator.textContent = ':';

    const filterKeyInput = document.createElement('input');
    filterKeyInput.className = 'filter-key-input';
    filterKeyInput.setAttribute('readonly', 'true');
    filterKeyInput.addEventListener('focus', handleKeyFocus);
    filterKeyInput.addEventListener('blur', handleKeyBlur);
    filterKeyInput.addEventListener('keydown', handleKeyboard);

    const filterVal = document.createElement('div');
    filterVal.className = 'filter-val hide';

    const filterValInput = document.createElement('input');
    filterValInput.className = 'filter-val-input hide';
    filterValInput.addEventListener('keydown', handleKeyboard);
    filterValInput.addEventListener('blur', handleValBlur);

    const closeBtn = document.createElement('button');
    closeBtn.className = 'close hide';
    closeBtn.setAttribute('type', 'button');
    closeBtn.setAttribute('aria-label', 'Remove Filter');
    closeBtn.addEventListener('click', event => removeFilter(event.target));

    filter.appendChild(filterKey);
    filter.appendChild(separator);
    filter.appendChild(filterKeyInput);
    filter.appendChild(filterVal);
    filter.appendChild(filterValInput);
    filter.appendChild(closeBtn);
    container.appendChild(filter);

    const keys = facets.filter(facet => !facet.used).map(facet => ({ key: facet.key, header: facet.header }));
    makeAutoComplete('key', filterKeyInput, keys);

    if (focus) {
      filterKeyInput.focus();
    }
  };

  const getKeyDiv      = filter => filter.querySelector('.filter-key');
  const getKeyInput    = filter => filter.querySelector('.filter-key-input');
  const getValueDiv    = filter => filter.querySelector('.filter-val');
  const getValueInput  = filter => filter.querySelector('.filter-val-input');
  const getCloseButton = filter => filter.querySelector('.close');

  const removeFilter = (target, suppressEvent) => {
    if (target) {
      const getFilterEl = target => {
        if ([...target.classList].includes('filter')) {
          return target;
        } else {
          return getFilterEl(target.parentElement);
        }
      }

      // Return filter key and value to unused state.
      const filterEl = getFilterEl(target);
      if (filterEl) {
        const key = getKeyInput(filterEl).value;
        if (key) {
          const facet = facets.find(facet => facet.key === key);
          if (facet) {
            facet.used = false;

            const val = getValueInput(filterEl).value;
            if (val) {
              const value = facet.values.find(value => value.value === val);
              if (value) {
                value.used = false;
              }
            }
          }
        }

        // Remove filter element from UI.
        // Check if it is still in the DOM (has a parent) first.
        if (filterEl.parentElement) {
          filterEl.parentElement.removeChild(filterEl);
        }
      }

      // Remove uncommitted filters because the used items state may have changed
      getAllFilters(':not(.filter-committed)').forEach(filter => filter.parentElement.removeChild(filter));

      // Hide Clear All button if there are no more filters
      if (getAllFilters().length === 0) {
        clearButton.className = 'close hide';
      }

      // Emit event.
      if (!suppressEvent) {
        container.dispatchEvent(new Event('changed.fluid.filter'));
      }

      makeFilter();
    }
  };

  const commitValue = filter => {
    const valueEl = getValueDiv(filter);
    const valInput = getValueInput(filter);
    const closeButton = getCloseButton(filter);

    if (valInput.value !== ''
      && !Array.prototype.includes.call(filter.classList, 'filter-committed')) {
      // 1. Commit the selected value in the UI.
      filter.classList.replace('filter-val-empty', 'filter-committed');
      valueEl.textContent = valInput.value;
      valueEl.classList.remove('hide');
      valInput.classList.add('hide');
      closeButton.classList.remove('hide');
      clearButton.classList.remove('hide'); // Show Clear All button

      // 2. Mark the selected value as used.
      const key = getKeyInput(filter).value;
      const facet = facets.find(facet => facet.key === key);
      if (facet) {
        const value = facet.values.find(value => value.value === valInput.value);
        if (value) {
          value.used = true;
        }
      }

      // 3. Add tooltip if needed.
      if (opts.tooltips && isTruncatedX(valueEl)) {
        $(valueEl).tooltip({
          title: valInput.value
        });
      }

      // 4. Emit event.
      container.dispatchEvent(new Event('changed.fluid.filter'));

      // 5. Make the next new filter.
      makeFilter(opts.autoFocus);

      return true;
    }
  };

  const preventKeyScroll = event => {
    switch (event.keyCode) {
      case UP:
      case DOWN:
        event.preventDefault();
        break;
    }
  };

  const handleMouseDown = event => containerClicked = true;

  const handleMouseUp = event => containerClicked = false;

  const handleClick = event => {
    const filter = event.target;
    uncommitted = Array.prototype.find.call(filter.children, child => Array.prototype.includes.call(child.classList, 'filter') && !Array.prototype.includes.call(child.classList, 'filter-committed'));
    if (uncommitted) {
      getKeyInput(uncommitted).focus();
    }
  };

  const handleKeyFocus = () => window.addEventListener('keydown', preventKeyScroll);

  const handleKeyBlur = event => {
    window.removeEventListener('keydown', preventKeyScroll);

    // If the element is blurred because the container was clicked on
    // and it is still in the uncommitted state, it will be immediately refocused.
    // In that case, we do not allow the blur event to propagate
    // because we want to keep the autocomplete menu visible.
    // However, if a close button within the container was clicked, then
    // event.relatedTarget will be populated, so we allow normal blurring behavior.
    if (containerClicked && !event.relatedTarget && !Array.prototype.includes.call(event.target.classList, 'filter-committed')) {
      event.stopImmediatePropagation();
    }
  };

  const handleValBlur = event => commitValue(event.target.parentElement);

  const handleUpDown = (code, target, isOriginalEvent) => {
    let next;

    const selected = target.sc.querySelector('.autocomplete-suggestion.selected');
    if (!selected) {
      next = (code === DOWN) ? target.sc.querySelector('.autocomplete-suggestion') : target.sc.childNodes[target.sc.childNodes.length - 1]; // first : last
    } else {
      next = (code === DOWN) ? selected.nextSibling : selected.previousSibling;
    }

    if (next && Array.prototype.includes.call(next.classList, 'autocomplete-header')) {
      if (triggerCount === 0 && isOriginalEvent) {
        while (next) {
          if (Array.prototype.includes.call(next.classList, 'autocomplete-header')) {
            triggerCount++;
          } else {
            break;
          }

          next = (code === DOWN) ? next.nextSibling : next.previousSibling;
        }
      }

      if (triggerCount > 0) {
        triggerCount--;
        const newEvent = new KeyboardEvent('keydown', { keyCode: code, detail: true });
        target.dispatchEvent(newEvent);
      }
    }
  }

  const handleKeyboard = event => {
    switch (event.keyCode) {
      case UP:
      case DOWN:
        handleUpDown(event.keyCode, event.target, !event.detail); // event.detail will be true if this is a re-triggered event from handleUpDown
        break;
      case ENTER:
        commitValue(event.target.parentElement)
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

  const activateTooltips = (mutationsList, observer) => {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList' && mutation.addedNodes) {
        mutation.addedNodes.forEach(child => {
          if (isTruncatedX(child)) {
            $(child).tooltip({
              title: child.textContent
            });
          }
        });
      }
    }
  }

  const makeAutoComplete = (type, selector, choices) => {
    new autoComplete({
      selector: selector,
      menuClass: 'dropdown-menu',
      minChars: Array.isArray(choices) ? 0 : 3,
      source: function (term, response) {
        // The very first time this is called,
        // when the control is constructed,
        // choices will contain all keys.
        term = term.toLowerCase();

        let matches;
        if (type === 'key') {
          matches = choices.filter(choice => choice.key.toLowerCase().includes(term));
        } else {
          matches = choices.filter(choice => choice.toLowerCase().includes(term));
        }

        response(matches);
      },
      renderItem: function (item, search) {
        search = search.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
        const re = new RegExp("(" + search.split(' ').join('|') + ")", "gi");

        let itemEl = document.createElement('div');
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
          const displayItem = item.replace(re, '<b>$1</b>');
          itemEl.innerHTML = displayItem;
        }

        // Add tooltip if needed.
        // if (opts.tooltips) {
        //   itemEl.setAttribute('data-toggle', 'tooltip');
        //   itemEl.setAttribute('data-placement', 'right');
        //   itemEl.setAttribute('data-condition', 'truncated');
        //   itemEl.setAttribute('title', itemEl.textContent);
        // }

        return itemEl.outerHTML;
      },
      onSelect: function (event, term, item) {
        if (Array.prototype.includes.call(item.classList, 'autocomplete-header')) {
          event.stopImmediatePropagation();
        } else {
          term = item.textContent;
          const keyInput = this.selector;
          const filterEl = keyInput.parentElement;

          if (type === 'key') {
            // A key was just selected:
            // 1. Commit the selected key in the UI.
            const keyEl = getKeyDiv(filterEl);
            keyInput.classList.add('hide');
            keyInput.value = term;
            keyEl.textContent = term;
            keyEl.classList.remove('hide');
            filterEl.classList.replace('filter-key-empty', 'filter-val-empty');

            // 2. Add tooltip if needed.
            if (opts.tooltips && isTruncatedX(keyEl)) {
              $(keyEl).tooltip({
                title: keyEl.textContent
              });
            }

            // 3. Determine choices for next autocomplete, which should
            //    contain the available values for the selected key.
            let valChoices = [];

            const facet = facets.find(facet => facet.key === term);
            if (facet) {
              // We found the selected key, so filter its values to get the ones not yet used.
              valChoices = facet.values.filter(val => !val.used).map(val => val.value);

              // If the key is not reusable, mark it as used.
              if (facet.noRepeat) {
                facet.used = true;
              }
            }

            // 4. Create the autocomplete for the key's values using the available choices.
            const valInput = getValueInput(filterEl);
            makeAutoComplete('val', valInput, valChoices);

            // 5. Activate the value input for the filter.
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
      const observer = new MutationObserver(activateTooltips);
      observer.observe(selector.sc, { childList: true });
    }
  };

  const getAllFilters = selector => [...container.querySelectorAll(`.filter${selector || ''}`)];

  const makeClearButton = () => {
    const clearButton = document.createElement('button');
    clearButton.className = 'close hide clearAllFilters';
    clearButton.setAttribute('type', 'button');
    clearButton.setAttribute('aria-label', 'Clear All Filters');
    clearButton.addEventListener('click', () => getAllFilters().forEach(filter => removeFilter(filter, false)));
    container.dispatchEvent(new Event('changed.fluid.filter'));
    return clearButton;
  };

  const clearButton = makeClearButton();
  container.appendChild(clearButton);
  container.addEventListener('mousedown', handleMouseDown);
  container.addEventListener('click', handleClick);
  container.addEventListener('mouseup', handleMouseUp);

  makeFilter();

  this.result = () => {
    const filters = getAllFilters();
    const query = {};

    filters.forEach(filter => {
      const key = getKeyInput(filter).value.toLowerCase();
      const val = getValueInput(filter).value;

      if (key && val) {
        if (key in query) {
          if (typeof (query[key]) === 'string') {
            // This is the second entry of a multi-valued filter,
            // so turn the single string into an array.
            const str = query[key];
            query[key] = [str, val]
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
