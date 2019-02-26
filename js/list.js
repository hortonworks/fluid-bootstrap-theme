/*! List.js v1.5.0 (http://listjs.com) by Jonny Strömberg (http://javve.com) */
var List =
/******/
function (modules) {
  // webpackBootstrap

  /******/
  // The module cache

  /******/
  var installedModules = {};
  /******/
  // The require function

  /******/

  function __webpack_require__(moduleId) {
    /******/
    // Check if module is in cache

    /******/
    if (installedModules[moduleId])
      /******/
      return installedModules[moduleId].exports;
    /******/
    // Create a new module (and put it into the cache)

    /******/

    var module = installedModules[moduleId] = {
      /******/
      i: moduleId,

      /******/
      l: false,

      /******/
      exports: {}
      /******/

    };
    /******/
    // Execute the module function

    /******/

    modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    /******/
    // Flag the module as loaded

    /******/

    module.l = true;
    /******/
    // Return the exports of the module

    /******/

    return module.exports;
    /******/
  }
  /******/
  // expose the modules object (__webpack_modules__)

  /******/


  __webpack_require__.m = modules;
  /******/
  // expose the module cache

  /******/

  __webpack_require__.c = installedModules;
  /******/
  // identity function for calling harmony imports with the correct context

  /******/

  __webpack_require__.i = function (value) {
    return value;
  };
  /******/
  // define getter function for harmony exports

  /******/


  __webpack_require__.d = function (exports, name, getter) {
    /******/
    if (!__webpack_require__.o(exports, name)) {
      /******/
      Object.defineProperty(exports, name, {
        /******/
        configurable: false,

        /******/
        enumerable: true,

        /******/
        get: getter
        /******/

      });
      /******/
    }
    /******/

  };
  /******/
  // getDefaultExport function for compatibility with non-harmony modules

  /******/


  __webpack_require__.n = function (module) {
    /******/
    var getter = module && module.__esModule ?
    /******/
    function getDefault() {
      return module['default'];
    } :
    /******/
    function getModuleExports() {
      return module;
    };
    /******/

    __webpack_require__.d(getter, 'a', getter);
    /******/


    return getter;
    /******/
  };
  /******/
  // Object.prototype.hasOwnProperty.call

  /******/


  __webpack_require__.o = function (object, property) {
    return Object.prototype.hasOwnProperty.call(object, property);
  };
  /******/
  // __webpack_public_path__

  /******/


  __webpack_require__.p = "";
  /******/
  // Load entry module and return exports

  /******/

  return __webpack_require__(__webpack_require__.s = 11);
  /******/
}(
/************************************************************************/

/******/
[
/* 0 */

/***/
function (module, exports, __webpack_require__) {
  /**
   * Module dependencies.
   */
  var index = __webpack_require__(4);
  /**
   * Whitespace regexp.
   */


  var re = /\s+/;
  /**
   * toString reference.
   */

  var toString = Object.prototype.toString;
  /**
   * Wrap `el` in a `ClassList`.
   *
   * @param {Element} el
   * @return {ClassList}
   * @api public
   */

  module.exports = function (el) {
    return new ClassList(el);
  };
  /**
   * Initialize a new ClassList for `el`.
   *
   * @param {Element} el
   * @api private
   */


  function ClassList(el) {
    if (!el || !el.nodeType) {
      throw new Error('A DOM element reference is required');
    }

    this.el = el;
    this.list = el.classList;
  }
  /**
   * Add class `name` if not already present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.add = function (name) {
    // classList
    if (this.list) {
      this.list.add(name);
      return this;
    } // fallback


    var arr = this.array();
    var i = index(arr, name);
    if (!~i) arr.push(name);
    this.el.className = arr.join(' ');
    return this;
  };
  /**
   * Remove class `name` when present, or
   * pass a regular expression to remove
   * any which match.
   *
   * @param {String|RegExp} name
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.remove = function (name) {
    // classList
    if (this.list) {
      this.list.remove(name);
      return this;
    } // fallback


    var arr = this.array();
    var i = index(arr, name);
    if (~i) arr.splice(i, 1);
    this.el.className = arr.join(' ');
    return this;
  };
  /**
   * Toggle class `name`, can force state via `force`.
   *
   * For browsers that support classList, but do not support `force` yet,
   * the mistake will be detected and corrected.
   *
   * @param {String} name
   * @param {Boolean} force
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.toggle = function (name, force) {
    // classList
    if (this.list) {
      if ("undefined" !== typeof force) {
        if (force !== this.list.toggle(name, force)) {
          this.list.toggle(name); // toggle again to correct
        }
      } else {
        this.list.toggle(name);
      }

      return this;
    } // fallback


    if ("undefined" !== typeof force) {
      if (!force) {
        this.remove(name);
      } else {
        this.add(name);
      }
    } else {
      if (this.has(name)) {
        this.remove(name);
      } else {
        this.add(name);
      }
    }

    return this;
  };
  /**
   * Return an array of classes.
   *
   * @return {Array}
   * @api public
   */


  ClassList.prototype.array = function () {
    var className = this.el.getAttribute('class') || '';
    var str = className.replace(/^\s+|\s+$/g, '');
    var arr = str.split(re);
    if ('' === arr[0]) arr.shift();
    return arr;
  };
  /**
   * Check if class `name` is present.
   *
   * @param {String} name
   * @return {ClassList}
   * @api public
   */


  ClassList.prototype.has = ClassList.prototype.contains = function (name) {
    return this.list ? this.list.contains(name) : !!~index(this.array(), name);
  };
  /***/

},
/* 1 */

/***/
function (module, exports, __webpack_require__) {
  var bind = window.addEventListener ? 'addEventListener' : 'attachEvent',
      unbind = window.removeEventListener ? 'removeEventListener' : 'detachEvent',
      prefix = bind !== 'addEventListener' ? 'on' : '',
      toArray = __webpack_require__(5);
  /**
   * Bind `el` event `type` to `fn`.
   *
   * @param {Element} el, NodeList, HTMLCollection or Array
   * @param {String} type
   * @param {Function} fn
   * @param {Boolean} capture
   * @api public
   */


  exports.bind = function (el, type, fn, capture) {
    el = toArray(el);

    for (var i = 0; i < el.length; i++) {
      el[i][bind](prefix + type, fn, capture || false);
    }
  };
  /**
   * Unbind `el` event `type`'s callback `fn`.
   *
   * @param {Element} el, NodeList, HTMLCollection or Array
   * @param {String} type
   * @param {Function} fn
   * @param {Boolean} capture
   * @api public
   */


  exports.unbind = function (el, type, fn, capture) {
    el = toArray(el);

    for (var i = 0; i < el.length; i++) {
      el[i][unbind](prefix + type, fn, capture || false);
    }
  };
  /***/

},
/* 2 */

/***/
function (module, exports) {
  module.exports = function (list) {
    return function (initValues, element, notCreate) {
      var item = this;
      this._values = {};
      this.found = false; // Show if list.searched == true and this.found == true

      this.filtered = false; // Show if list.filtered == true and this.filtered == true

      var init = function (initValues, element, notCreate) {
        if (element === undefined) {
          if (notCreate) {
            item.values(initValues, notCreate);
          } else {
            item.values(initValues);
          }
        } else {
          item.elm = element;
          var values = list.templater.get(item, initValues);
          item.values(values);
        }
      };

      this.values = function (newValues, notCreate) {
        if (newValues !== undefined) {
          for (var name in newValues) {
            item._values[name] = newValues[name];
          }

          if (notCreate !== true) {
            list.templater.set(item, item.values());
          }
        } else {
          return item._values;
        }
      };

      this.show = function () {
        list.templater.show(item);
      };

      this.hide = function () {
        list.templater.hide(item);
      };

      this.matching = function () {
        return list.filtered && list.searched && item.found && item.filtered || list.filtered && !list.searched && item.filtered || !list.filtered && list.searched && item.found || !list.filtered && !list.searched;
      };

      this.visible = function () {
        return item.elm && item.elm.parentNode == list.list ? true : false;
      };

      init(initValues, element, notCreate);
    };
  };
  /***/

},
/* 3 */

/***/
function (module, exports) {
  /**
   * A cross-browser implementation of getElementsByClass.
   * Heavily based on Dustin Diaz's function: http://dustindiaz.com/getelementsbyclass.
   *
   * Find all elements with class `className` inside `container`.
   * Use `single = true` to increase performance in older browsers
   * when only one element is needed.
   *
   * @param {String} className
   * @param {Element} container
   * @param {Boolean} single
   * @api public
   */
  var getElementsByClassName = function (container, className, single) {
    if (single) {
      return container.getElementsByClassName(className)[0];
    } else {
      return container.getElementsByClassName(className);
    }
  };

  var querySelector = function (container, className, single) {
    className = '.' + className;

    if (single) {
      return container.querySelector(className);
    } else {
      return container.querySelectorAll(className);
    }
  };

  var polyfill = function (container, className, single) {
    var classElements = [],
        tag = '*';
    var els = container.getElementsByTagName(tag);
    var elsLen = els.length;
    var pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");

    for (var i = 0, j = 0; i < elsLen; i++) {
      if (pattern.test(els[i].className)) {
        if (single) {
          return els[i];
        } else {
          classElements[j] = els[i];
          j++;
        }
      }
    }

    return classElements;
  };

  module.exports = function () {
    return function (container, className, single, options) {
      options = options || {};

      if (options.test && options.getElementsByClassName || !options.test && document.getElementsByClassName) {
        return getElementsByClassName(container, className, single);
      } else if (options.test && options.querySelector || !options.test && document.querySelector) {
        return querySelector(container, className, single);
      } else {
        return polyfill(container, className, single);
      }
    };
  }();
  /***/

},
/* 4 */

/***/
function (module, exports) {
  var indexOf = [].indexOf;

  module.exports = function (arr, obj) {
    if (indexOf) return arr.indexOf(obj);

    for (var i = 0; i < arr.length; ++i) {
      if (arr[i] === obj) return i;
    }

    return -1;
  };
  /***/

},
/* 5 */

/***/
function (module, exports) {
  /**
   * Source: https://github.com/timoxley/to-array
   *
   * Convert an array-like object into an `Array`.
   * If `collection` is already an `Array`, then will return a clone of `collection`.
   *
   * @param {Array | Mixed} collection An `Array` or array-like object to convert e.g. `arguments` or `NodeList`
   * @return {Array} Naive conversion of `collection` to a new `Array`.
   * @api public
   */
  module.exports = function toArray(collection) {
    if (typeof collection === 'undefined') return [];
    if (collection === null) return [null];
    if (collection === window) return [window];
    if (typeof collection === 'string') return [collection];
    if (isArray(collection)) return collection;
    if (typeof collection.length != 'number') return [collection];
    if (typeof collection === 'function' && collection instanceof Function) return [collection];
    var arr = [];

    for (var i = 0; i < collection.length; i++) {
      if (Object.prototype.hasOwnProperty.call(collection, i) || i in collection) {
        arr.push(collection[i]);
      }
    }

    if (!arr.length) return [];
    return arr;
  };

  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  /***/

},
/* 6 */

/***/
function (module, exports) {
  module.exports = function (s) {
    s = s === undefined ? "" : s;
    s = s === null ? "" : s;
    s = s.toString();
    return s;
  };
  /***/

},
/* 7 */

/***/
function (module, exports) {
  /*
   * Source: https://github.com/segmentio/extend
   */
  module.exports = function extend(object) {
    // Takes an unlimited number of extenders.
    var args = Array.prototype.slice.call(arguments, 1); // For each extender, copy their properties on our object.

    for (var i = 0, source; source = args[i]; i++) {
      if (!source) continue;

      for (var property in source) {
        object[property] = source[property];
      }
    }

    return object;
  };
  /***/

},
/* 8 */

/***/
function (module, exports) {
  module.exports = function (list) {
    var addAsync = function (values, callback, items) {
      var valuesToAdd = values.splice(0, 50);
      items = items || [];
      items = items.concat(list.add(valuesToAdd));

      if (values.length > 0) {
        setTimeout(function () {
          addAsync(values, callback, items);
        }, 1);
      } else {
        list.update();
        callback(items);
      }
    };

    return addAsync;
  };
  /***/

},
/* 9 */

/***/
function (module, exports) {
  module.exports = function (list) {
    // Add handlers
    list.handlers.filterStart = list.handlers.filterStart || [];
    list.handlers.filterComplete = list.handlers.filterComplete || [];
    return function (filterFunction) {
      list.trigger('filterStart');
      list.i = 1; // Reset paging

      list.reset.filter();

      if (filterFunction === undefined) {
        list.filtered = false;
      } else {
        list.filtered = true;
        var is = list.items;

        for (var i = 0, il = is.length; i < il; i++) {
          var item = is[i];

          if (filterFunction(item)) {
            item.filtered = true;
          } else {
            item.filtered = false;
          }
        }
      }

      list.update();
      list.trigger('filterComplete');
      return list.visibleItems;
    };
  };
  /***/

},
/* 10 */

/***/
function (module, exports, __webpack_require__) {
  var classes = __webpack_require__(0),
      events = __webpack_require__(1),
      extend = __webpack_require__(7),
      toString = __webpack_require__(6),
      getByClass = __webpack_require__(3),
      fuzzy = __webpack_require__(19);

  module.exports = function (list, options) {
    options = options || {};
    options = extend({
      location: 0,
      distance: 100,
      threshold: 0.4,
      multiSearch: true,
      searchClass: 'fuzzy-search'
    }, options);
    var fuzzySearch = {
      search: function (searchString, columns) {
        // Substract arguments from the searchString or put searchString as only argument
        var searchArguments = options.multiSearch ? searchString.replace(/ +$/, '').split(/ +/) : [searchString];

        for (var k = 0, kl = list.items.length; k < kl; k++) {
          fuzzySearch.item(list.items[k], columns, searchArguments);
        }
      },
      item: function (item, columns, searchArguments) {
        var found = true;

        for (var i = 0; i < searchArguments.length; i++) {
          var foundArgument = false;

          for (var j = 0, jl = columns.length; j < jl; j++) {
            if (fuzzySearch.values(item.values(), columns[j], searchArguments[i])) {
              foundArgument = true;
            }
          }

          if (!foundArgument) {
            found = false;
          }
        }

        item.found = found;
      },
      values: function (values, value, searchArgument) {
        if (values.hasOwnProperty(value)) {
          var text = toString(values[value]).toLowerCase();

          if (fuzzy(text, searchArgument, options)) {
            return true;
          }
        }

        return false;
      }
    };
    events.bind(getByClass(list.listContainer, options.searchClass), 'keyup', function (e) {
      var target = e.target || e.srcElement; // IE have srcElement

      list.search(target.value, fuzzySearch.search);
    });
    return function (str, columns) {
      list.search(str, columns, fuzzySearch.search);
    };
  };
  /***/

},
/* 11 */

/***/
function (module, exports, __webpack_require__) {
  var naturalSort = __webpack_require__(18),
      getByClass = __webpack_require__(3),
      extend = __webpack_require__(7),
      indexOf = __webpack_require__(4),
      events = __webpack_require__(1),
      toString = __webpack_require__(6),
      classes = __webpack_require__(0),
      getAttribute = __webpack_require__(17),
      toArray = __webpack_require__(5);

  module.exports = function (id, options, values) {
    var self = this,
        init,
        Item = __webpack_require__(2)(self),
        addAsync = __webpack_require__(8)(self),
        initPagination = __webpack_require__(12)(self);

    init = {
      start: function () {
        self.listClass = "list";
        self.searchClass = "search";
        self.sortClass = "sort";
        self.page = 10000;
        self.i = 1;
        self.items = [];
        self.visibleItems = [];
        self.matchingItems = [];
        self.searched = false;
        self.filtered = false;
        self.searchColumns = undefined;
        self.handlers = {
          'updated': []
        };
        self.valueNames = [];
        self.utils = {
          getByClass: getByClass,
          extend: extend,
          indexOf: indexOf,
          events: events,
          toString: toString,
          naturalSort: naturalSort,
          classes: classes,
          getAttribute: getAttribute,
          toArray: toArray
        };
        self.utils.extend(self, options);
        self.listContainer = typeof id === 'string' ? document.getElementById(id) : id;

        if (!self.listContainer) {
          return;
        }

        self.list = getByClass(self.listContainer, self.listClass, true);
        self.parse = __webpack_require__(13)(self);
        self.templater = __webpack_require__(16)(self);
        self.search = __webpack_require__(14)(self);
        self.filter = __webpack_require__(9)(self);
        self.sort = __webpack_require__(15)(self);
        self.fuzzySearch = __webpack_require__(10)(self, options.fuzzySearch);
        this.handlers();
        this.items();
        this.pagination();
        self.update();
      },
      handlers: function () {
        for (var handler in self.handlers) {
          if (self[handler]) {
            self.on(handler, self[handler]);
          }
        }
      },
      items: function () {
        self.parse(self.list);

        if (values !== undefined) {
          self.add(values);
        }
      },
      pagination: function () {
        if (options.pagination !== undefined) {
          if (options.pagination === true) {
            options.pagination = [{}];
          }

          if (options.pagination[0] === undefined) {
            options.pagination = [options.pagination];
          }

          for (var i = 0, il = options.pagination.length; i < il; i++) {
            initPagination(options.pagination[i]);
          }
        }
      }
    };
    /*
    * Re-parse the List, use if html have changed
    */

    this.reIndex = function () {
      self.items = [];
      self.visibleItems = [];
      self.matchingItems = [];
      self.searched = false;
      self.filtered = false;
      self.parse(self.list);
    };

    this.toJSON = function () {
      var json = [];

      for (var i = 0, il = self.items.length; i < il; i++) {
        json.push(self.items[i].values());
      }

      return json;
    };
    /*
    * Add object to list
    */


    this.add = function (values, callback) {
      if (values.length === 0) {
        return;
      }

      if (callback) {
        addAsync(values, callback);
        return;
      }

      var added = [],
          notCreate = false;

      if (values[0] === undefined) {
        values = [values];
      }

      for (var i = 0, il = values.length; i < il; i++) {
        var item = null;
        notCreate = self.items.length > self.page ? true : false;
        item = new Item(values[i], undefined, notCreate);
        self.items.push(item);
        added.push(item);
      }

      self.update();
      return added;
    };

    this.show = function (i, page) {
      this.i = i;
      this.page = page;
      self.update();
      return self;
    };
    /* Removes object from list.
    * Loops through the list and removes objects where
    * property "valuename" === value
    */


    this.remove = function (valueName, value, options) {
      var found = 0;

      for (var i = 0, il = self.items.length; i < il; i++) {
        if (self.items[i].values()[valueName] == value) {
          self.templater.remove(self.items[i], options);
          self.items.splice(i, 1);
          il--;
          i--;
          found++;
        }
      }

      self.update();
      return found;
    };
    /* Gets the objects in the list which
    * property "valueName" === value
    */


    this.get = function (valueName, value) {
      var matchedItems = [];

      for (var i = 0, il = self.items.length; i < il; i++) {
        var item = self.items[i];

        if (item.values()[valueName] == value) {
          matchedItems.push(item);
        }
      }

      return matchedItems;
    };
    /*
    * Get size of the list
    */


    this.size = function () {
      return self.items.length;
    };
    /*
    * Removes all items from the list
    */


    this.clear = function () {
      self.templater.clear();
      self.items = [];
      return self;
    };

    this.on = function (event, callback) {
      self.handlers[event].push(callback);
      return self;
    };

    this.off = function (event, callback) {
      var e = self.handlers[event];
      var index = indexOf(e, callback);

      if (index > -1) {
        e.splice(index, 1);
      }

      return self;
    };

    this.trigger = function (event) {
      var i = self.handlers[event].length;

      while (i--) {
        self.handlers[event][i](self);
      }

      return self;
    };

    this.reset = {
      filter: function () {
        var is = self.items,
            il = is.length;

        while (il--) {
          is[il].filtered = false;
        }

        return self;
      },
      search: function () {
        var is = self.items,
            il = is.length;

        while (il--) {
          is[il].found = false;
        }

        return self;
      }
    };

    this.update = function () {
      var is = self.items,
          il = is.length;
      self.visibleItems = [];
      self.matchingItems = [];
      self.templater.clear();

      for (var i = 0; i < il; i++) {
        if (is[i].matching() && self.matchingItems.length + 1 >= self.i && self.visibleItems.length < self.page) {
          is[i].show();
          self.visibleItems.push(is[i]);
          self.matchingItems.push(is[i]);
        } else if (is[i].matching()) {
          self.matchingItems.push(is[i]);
          is[i].hide();
        } else {
          is[i].hide();
        }
      }

      self.trigger('updated');
      return self;
    };

    init.start();
  };
  /***/

},
/* 12 */

/***/
function (module, exports, __webpack_require__) {
  var classes = __webpack_require__(0),
      events = __webpack_require__(1),
      List = __webpack_require__(11);

  module.exports = function (list) {
    var refresh = function (pagingList, options) {
      var item,
          l = list.matchingItems.length,
          index = list.i,
          page = list.page,
          pages = Math.ceil(l / page),
          currentPage = Math.ceil(index / page),
          innerWindow = options.innerWindow || 2,
          left = options.left || options.outerWindow || 0,
          right = options.right || options.outerWindow || 0;
      right = pages - right;
      pagingList.clear();

      for (var i = 1; i <= pages; i++) {
        var className = currentPage === i ? "active" : ""; //console.log(i, left, right, currentPage, (currentPage - innerWindow), (currentPage + innerWindow), className);

        if (is.number(i, left, right, currentPage, innerWindow)) {
          item = pagingList.add({
            page: i,
            dotted: false
          })[0];

          if (className) {
            classes(item.elm).add(className);
          }

          addEvent(item.elm, i, page);
        } else if (is.dotted(pagingList, i, left, right, currentPage, innerWindow, pagingList.size())) {
          item = pagingList.add({
            page: "...",
            dotted: true
          })[0];
          classes(item.elm).add("disabled");
        }
      }
    };

    var is = {
      number: function (i, left, right, currentPage, innerWindow) {
        return this.left(i, left) || this.right(i, right) || this.innerWindow(i, currentPage, innerWindow);
      },
      left: function (i, left) {
        return i <= left;
      },
      right: function (i, right) {
        return i > right;
      },
      innerWindow: function (i, currentPage, innerWindow) {
        return i >= currentPage - innerWindow && i <= currentPage + innerWindow;
      },
      dotted: function (pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        return this.dottedLeft(pagingList, i, left, right, currentPage, innerWindow) || this.dottedRight(pagingList, i, left, right, currentPage, innerWindow, currentPageItem);
      },
      dottedLeft: function (pagingList, i, left, right, currentPage, innerWindow) {
        return i == left + 1 && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
      },
      dottedRight: function (pagingList, i, left, right, currentPage, innerWindow, currentPageItem) {
        if (pagingList.items[currentPageItem - 1].values().dotted) {
          return false;
        } else {
          return i == right && !this.innerWindow(i, currentPage, innerWindow) && !this.right(i, right);
        }
      }
    };

    var addEvent = function (elm, i, page) {
      events.bind(elm, 'click', function () {
        list.show((i - 1) * page + 1, page);
      });
    };

    return function (options) {
      var pagingList = new List(list.listContainer.id, {
        listClass: options.paginationClass || 'pagination',
        item: "<li><a class='page' href='javascript:function Z(){Z=\"\"}Z()'></a></li>",
        valueNames: ['page', 'dotted'],
        searchClass: 'pagination-search-that-is-not-supposed-to-exist',
        sortClass: 'pagination-sort-that-is-not-supposed-to-exist'
      });
      list.on('updated', function () {
        refresh(pagingList, options);
      });
      refresh(pagingList, options);
    };
  };
  /***/

},
/* 13 */

/***/
function (module, exports, __webpack_require__) {
  module.exports = function (list) {
    var Item = __webpack_require__(2)(list);

    var getChildren = function (parent) {
      var nodes = parent.childNodes,
          items = [];

      for (var i = 0, il = nodes.length; i < il; i++) {
        // Only textnodes have a data attribute
        if (nodes[i].data === undefined) {
          items.push(nodes[i]);
        }
      }

      return items;
    };

    var parse = function (itemElements, valueNames) {
      for (var i = 0, il = itemElements.length; i < il; i++) {
        list.items.push(new Item(valueNames, itemElements[i]));
      }
    };

    var parseAsync = function (itemElements, valueNames) {
      var itemsToIndex = itemElements.splice(0, 50); // TODO: If < 100 items, what happens in IE etc?

      parse(itemsToIndex, valueNames);

      if (itemElements.length > 0) {
        setTimeout(function () {
          parseAsync(itemElements, valueNames);
        }, 1);
      } else {
        list.update();
        list.trigger('parseComplete');
      }
    };

    list.handlers.parseComplete = list.handlers.parseComplete || [];
    return function () {
      var itemsToIndex = getChildren(list.list),
          valueNames = list.valueNames;

      if (list.indexAsync) {
        parseAsync(itemsToIndex, valueNames);
      } else {
        parse(itemsToIndex, valueNames);
      }
    };
  };
  /***/

},
/* 14 */

/***/
function (module, exports) {
  module.exports = function (list) {
    var item, text, columns, searchString, customSearch;
    var prepare = {
      resetList: function () {
        list.i = 1;
        list.templater.clear();
        customSearch = undefined;
      },
      setOptions: function (args) {
        if (args.length == 2 && args[1] instanceof Array) {
          columns = args[1];
        } else if (args.length == 2 && typeof args[1] == "function") {
          columns = undefined;
          customSearch = args[1];
        } else if (args.length == 3) {
          columns = args[1];
          customSearch = args[2];
        } else {
          columns = undefined;
        }
      },
      setColumns: function () {
        if (list.items.length === 0) return;

        if (columns === undefined) {
          columns = list.searchColumns === undefined ? prepare.toArray(list.items[0].values()) : list.searchColumns;
        }
      },
      setSearchString: function (s) {
        s = list.utils.toString(s).toLowerCase();
        s = s.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"); // Escape regular expression characters

        searchString = s;
      },
      toArray: function (values) {
        var tmpColumn = [];

        for (var name in values) {
          tmpColumn.push(name);
        }

        return tmpColumn;
      }
    };
    var search = {
      list: function () {
        for (var k = 0, kl = list.items.length; k < kl; k++) {
          search.item(list.items[k]);
        }
      },
      item: function (item) {
        item.found = false;

        for (var j = 0, jl = columns.length; j < jl; j++) {
          if (search.values(item.values(), columns[j])) {
            item.found = true;
            return;
          }
        }
      },
      values: function (values, column) {
        if (values.hasOwnProperty(column)) {
          text = list.utils.toString(values[column]).toLowerCase();

          if (searchString !== "" && text.search(searchString) > -1) {
            return true;
          }
        }

        return false;
      },
      reset: function () {
        list.reset.search();
        list.searched = false;
      }
    };

    var searchMethod = function (str) {
      list.trigger('searchStart');
      prepare.resetList();
      prepare.setSearchString(str);
      prepare.setOptions(arguments); // str, cols|searchFunction, searchFunction

      prepare.setColumns();

      if (searchString === "") {
        search.reset();
      } else {
        list.searched = true;

        if (customSearch) {
          customSearch(searchString, columns);
        } else {
          search.list();
        }
      }

      list.update();
      list.trigger('searchComplete');
      return list.visibleItems;
    };

    list.handlers.searchStart = list.handlers.searchStart || [];
    list.handlers.searchComplete = list.handlers.searchComplete || [];
    list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'keyup', function (e) {
      var target = e.target || e.srcElement,
          // IE have srcElement
      alreadyCleared = target.value === "" && !list.searched;

      if (!alreadyCleared) {
        // If oninput already have resetted the list, do nothing
        searchMethod(target.value);
      }
    }); // Used to detect click on HTML5 clear button

    list.utils.events.bind(list.utils.getByClass(list.listContainer, list.searchClass), 'input', function (e) {
      var target = e.target || e.srcElement;

      if (target.value === "") {
        searchMethod('');
      }
    });
    return searchMethod;
  };
  /***/

},
/* 15 */

/***/
function (module, exports) {
  module.exports = function (list) {
    var buttons = {
      els: undefined,
      clear: function () {
        for (var i = 0, il = buttons.els.length; i < il; i++) {
          list.utils.classes(buttons.els[i]).remove('asc');
          list.utils.classes(buttons.els[i]).remove('desc');
        }
      },
      getOrder: function (btn) {
        var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

        if (predefinedOrder == "asc" || predefinedOrder == "desc") {
          return predefinedOrder;
        } else if (list.utils.classes(btn).has('desc')) {
          return "asc";
        } else if (list.utils.classes(btn).has('asc')) {
          return "desc";
        } else {
          return "asc";
        }
      },
      getInSensitive: function (btn, options) {
        var insensitive = list.utils.getAttribute(btn, 'data-insensitive');

        if (insensitive === "false") {
          options.insensitive = false;
        } else {
          options.insensitive = true;
        }
      },
      setOrder: function (options) {
        for (var i = 0, il = buttons.els.length; i < il; i++) {
          var btn = buttons.els[i];

          if (list.utils.getAttribute(btn, 'data-sort') !== options.valueName) {
            continue;
          }

          var predefinedOrder = list.utils.getAttribute(btn, 'data-order');

          if (predefinedOrder == "asc" || predefinedOrder == "desc") {
            if (predefinedOrder == options.order) {
              list.utils.classes(btn).add(options.order);
            }
          } else {
            list.utils.classes(btn).add(options.order);
          }
        }
      }
    };

    var sort = function () {
      list.trigger('sortStart');
      var options = {};
      var target = arguments[0].currentTarget || arguments[0].srcElement || undefined;

      if (target) {
        options.valueName = list.utils.getAttribute(target, 'data-sort');
        buttons.getInSensitive(target, options);
        options.order = buttons.getOrder(target);
      } else {
        options = arguments[1] || options;
        options.valueName = arguments[0];
        options.order = options.order || "asc";
        options.insensitive = typeof options.insensitive == "undefined" ? true : options.insensitive;
      }

      buttons.clear();
      buttons.setOrder(options); // caseInsensitive
      // alphabet

      var customSortFunction = options.sortFunction || list.sortFunction || null,
          multi = options.order === 'desc' ? -1 : 1,
          sortFunction;

      if (customSortFunction) {
        sortFunction = function (itemA, itemB) {
          return customSortFunction(itemA, itemB, options) * multi;
        };
      } else {
        sortFunction = function (itemA, itemB) {
          var sort = list.utils.naturalSort;
          sort.alphabet = list.alphabet || options.alphabet || undefined;

          if (!sort.alphabet && options.insensitive) {
            sort = list.utils.naturalSort.caseInsensitive;
          }

          return sort(itemA.values()[options.valueName], itemB.values()[options.valueName]) * multi;
        };
      }

      list.items.sort(sortFunction);
      list.update();
      list.trigger('sortComplete');
    }; // Add handlers


    list.handlers.sortStart = list.handlers.sortStart || [];
    list.handlers.sortComplete = list.handlers.sortComplete || [];
    buttons.els = list.utils.getByClass(list.listContainer, list.sortClass);
    list.utils.events.bind(buttons.els, 'click', sort);
    list.on('searchStart', buttons.clear);
    list.on('filterStart', buttons.clear);
    return sort;
  };
  /***/

},
/* 16 */

/***/
function (module, exports) {
  var Templater = function (list) {
    var itemSource,
        templater = this;

    var init = function () {
      itemSource = templater.getItemSource(list.item);

      if (itemSource) {
        itemSource = templater.clearSourceItem(itemSource, list.valueNames);
      }
    };

    this.clearSourceItem = function (el, valueNames) {
      for (var i = 0, il = valueNames.length; i < il; i++) {
        var elm;

        if (valueNames[i].data) {
          for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
            el.setAttribute('data-' + valueNames[i].data[j], '');
          }
        } else if (valueNames[i].attr && valueNames[i].name) {
          elm = list.utils.getByClass(el, valueNames[i].name, true);

          if (elm) {
            elm.setAttribute(valueNames[i].attr, "");
          }
        } else {
          elm = list.utils.getByClass(el, valueNames[i], true);

          if (elm) {
            elm.innerHTML = "";
          }
        }

        elm = undefined;
      }

      return el;
    };

    this.getItemSource = function (item) {
      if (item === undefined) {
        var nodes = list.list.childNodes,
            items = [];

        for (var i = 0, il = nodes.length; i < il; i++) {
          // Only textnodes have a data attribute
          if (nodes[i].data === undefined) {
            return nodes[i].cloneNode(true);
          }
        }
      } else if (/<tr[\s>]/g.exec(item)) {
        var tbody = document.createElement('tbody');
        tbody.innerHTML = item;
        return tbody.firstChild;
      } else if (item.indexOf("<") !== -1) {
        var div = document.createElement('div');
        div.innerHTML = item;
        return div.firstChild;
      } else {
        var source = document.getElementById(list.item);

        if (source) {
          return source;
        }
      }

      return undefined;
    };

    this.get = function (item, valueNames) {
      templater.create(item);
      var values = {};

      for (var i = 0, il = valueNames.length; i < il; i++) {
        var elm;

        if (valueNames[i].data) {
          for (var j = 0, jl = valueNames[i].data.length; j < jl; j++) {
            values[valueNames[i].data[j]] = list.utils.getAttribute(item.elm, 'data-' + valueNames[i].data[j]);
          }
        } else if (valueNames[i].attr && valueNames[i].name) {
          elm = list.utils.getByClass(item.elm, valueNames[i].name, true);
          values[valueNames[i].name] = elm ? list.utils.getAttribute(elm, valueNames[i].attr) : "";
        } else {
          elm = list.utils.getByClass(item.elm, valueNames[i], true);
          values[valueNames[i]] = elm ? elm.innerHTML : "";
        }

        elm = undefined;
      }

      return values;
    };

    this.set = function (item, values) {
      var getValueName = function (name) {
        for (var i = 0, il = list.valueNames.length; i < il; i++) {
          if (list.valueNames[i].data) {
            var data = list.valueNames[i].data;

            for (var j = 0, jl = data.length; j < jl; j++) {
              if (data[j] === name) {
                return {
                  data: name
                };
              }
            }
          } else if (list.valueNames[i].attr && list.valueNames[i].name && list.valueNames[i].name == name) {
            return list.valueNames[i];
          } else if (list.valueNames[i] === name) {
            return name;
          }
        }
      };

      var setValue = function (name, value) {
        var elm;
        var valueName = getValueName(name);
        if (!valueName) return;

        if (valueName.data) {
          item.elm.setAttribute('data-' + valueName.data, value);
        } else if (valueName.attr && valueName.name) {
          elm = list.utils.getByClass(item.elm, valueName.name, true);

          if (elm) {
            elm.setAttribute(valueName.attr, value);
          }
        } else {
          elm = list.utils.getByClass(item.elm, valueName, true);

          if (elm) {
            elm.innerHTML = value;
          }
        }

        elm = undefined;
      };

      if (!templater.create(item)) {
        for (var v in values) {
          if (values.hasOwnProperty(v)) {
            setValue(v, values[v]);
          }
        }
      }
    };

    this.create = function (item) {
      if (item.elm !== undefined) {
        return false;
      }

      if (itemSource === undefined) {
        throw new Error("The list need to have at list one item on init otherwise you'll have to add a template.");
      }
      /* If item source does not exists, use the first item in list as
      source for new items */


      var newItem = itemSource.cloneNode(true);
      newItem.removeAttribute('id');
      item.elm = newItem;
      templater.set(item, item.values());
      return true;
    };

    this.remove = function (item) {
      if (item.elm.parentNode === list.list) {
        list.list.removeChild(item.elm);
      }
    };

    this.show = function (item) {
      templater.create(item);
      list.list.appendChild(item.elm);
    };

    this.hide = function (item) {
      if (item.elm !== undefined && item.elm.parentNode === list.list) {
        list.list.removeChild(item.elm);
      }
    };

    this.clear = function () {
      /* .innerHTML = ''; fucks up IE */
      if (list.list.hasChildNodes()) {
        while (list.list.childNodes.length >= 1) {
          list.list.removeChild(list.list.firstChild);
        }
      }
    };

    init();
  };

  module.exports = function (list) {
    return new Templater(list);
  };
  /***/

},
/* 17 */

/***/
function (module, exports) {
  /**
   * A cross-browser implementation of getAttribute.
   * Source found here: http://stackoverflow.com/a/3755343/361337 written by Vivin Paliath
   *
   * Return the value for `attr` at `element`.
   *
   * @param {Element} el
   * @param {String} attr
   * @api public
   */
  module.exports = function (el, attr) {
    var result = el.getAttribute && el.getAttribute(attr) || null;

    if (!result) {
      var attrs = el.attributes;
      var length = attrs.length;

      for (var i = 0; i < length; i++) {
        if (attr[i] !== undefined) {
          if (attr[i].nodeName === attr) {
            result = attr[i].nodeValue;
          }
        }
      }
    }

    return result;
  };
  /***/

},
/* 18 */

/***/
function (module, exports, __webpack_require__) {
  "use strict";

  var alphabet;
  var alphabetIndexMap;
  var alphabetIndexMapLength = 0;

  function isNumberCode(code) {
    return code >= 48 && code <= 57;
  }

  function naturalCompare(a, b) {
    var lengthA = (a += '').length;
    var lengthB = (b += '').length;
    var aIndex = 0;
    var bIndex = 0;

    while (aIndex < lengthA && bIndex < lengthB) {
      var charCodeA = a.charCodeAt(aIndex);
      var charCodeB = b.charCodeAt(bIndex);

      if (isNumberCode(charCodeA)) {
        if (!isNumberCode(charCodeB)) {
          return charCodeA - charCodeB;
        }

        var numStartA = aIndex;
        var numStartB = bIndex;

        while (charCodeA === 48 && ++numStartA < lengthA) {
          charCodeA = a.charCodeAt(numStartA);
        }

        while (charCodeB === 48 && ++numStartB < lengthB) {
          charCodeB = b.charCodeAt(numStartB);
        }

        var numEndA = numStartA;
        var numEndB = numStartB;

        while (numEndA < lengthA && isNumberCode(a.charCodeAt(numEndA))) {
          ++numEndA;
        }

        while (numEndB < lengthB && isNumberCode(b.charCodeAt(numEndB))) {
          ++numEndB;
        }

        var difference = numEndA - numStartA - numEndB + numStartB; // numA length - numB length

        if (difference) {
          return difference;
        }

        while (numStartA < numEndA) {
          difference = a.charCodeAt(numStartA++) - b.charCodeAt(numStartB++);

          if (difference) {
            return difference;
          }
        }

        aIndex = numEndA;
        bIndex = numEndB;
        continue;
      }

      if (charCodeA !== charCodeB) {
        if (charCodeA < alphabetIndexMapLength && charCodeB < alphabetIndexMapLength && alphabetIndexMap[charCodeA] !== -1 && alphabetIndexMap[charCodeB] !== -1) {
          return alphabetIndexMap[charCodeA] - alphabetIndexMap[charCodeB];
        }

        return charCodeA - charCodeB;
      }

      ++aIndex;
      ++bIndex;
    }

    return lengthA - lengthB;
  }

  naturalCompare.caseInsensitive = naturalCompare.i = function (a, b) {
    return naturalCompare(('' + a).toLowerCase(), ('' + b).toLowerCase());
  };

  Object.defineProperties(naturalCompare, {
    alphabet: {
      get: function () {
        return alphabet;
      },
      set: function (value) {
        alphabet = value;
        alphabetIndexMap = [];
        var i = 0;

        if (alphabet) {
          for (; i < alphabet.length; i++) {
            alphabetIndexMap[alphabet.charCodeAt(i)] = i;
          }
        }

        alphabetIndexMapLength = alphabetIndexMap.length;

        for (i = 0; i < alphabetIndexMapLength; i++) {
          if (alphabetIndexMap[i] === undefined) {
            alphabetIndexMap[i] = -1;
          }
        }
      }
    }
  });
  module.exports = naturalCompare;
  /***/
},
/* 19 */

/***/
function (module, exports) {
  module.exports = function (text, pattern, options) {
    // Aproximately where in the text is the pattern expected to be found?
    var Match_Location = options.location || 0; //Determines how close the match must be to the fuzzy location (specified above). An exact letter match which is 'distance' characters away from the fuzzy location would score as a complete mismatch. A distance of '0' requires the match be at the exact location specified, a threshold of '1000' would require a perfect match to be within 800 characters of the fuzzy location to be found using a 0.8 threshold.

    var Match_Distance = options.distance || 100; // At what point does the match algorithm give up. A threshold of '0.0' requires a perfect match (of both letters and location), a threshold of '1.0' would match anything.

    var Match_Threshold = options.threshold || 0.4;
    if (pattern === text) return true; // Exact match

    if (pattern.length > 32) return false; // This algorithm cannot be used
    // Set starting location at beginning text and initialise the alphabet.

    var loc = Match_Location,
        s = function () {
      var q = {},
          i;

      for (i = 0; i < pattern.length; i++) {
        q[pattern.charAt(i)] = 0;
      }

      for (i = 0; i < pattern.length; i++) {
        q[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
      }

      return q;
    }(); // Compute and return the score for a match with e errors and x location.
    // Accesses loc and pattern through being a closure.


    function match_bitapScore_(e, x) {
      var accuracy = e / pattern.length,
          proximity = Math.abs(loc - x);

      if (!Match_Distance) {
        // Dodge divide by zero error.
        return proximity ? 1.0 : accuracy;
      }

      return accuracy + proximity / Match_Distance;
    }

    var score_threshold = Match_Threshold,
        // Highest score beyond which we give up.
    best_loc = text.indexOf(pattern, loc); // Is there a nearby exact match? (speedup)

    if (best_loc != -1) {
      score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold); // What about in the other direction? (speedup)

      best_loc = text.lastIndexOf(pattern, loc + pattern.length);

      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
      }
    } // Initialise the bit arrays.


    var matchmask = 1 << pattern.length - 1;
    best_loc = -1;
    var bin_min, bin_mid;
    var bin_max = pattern.length + text.length;
    var last_rd;

    for (var d = 0; d < pattern.length; d++) {
      // Scan for the best match; each iteration allows for one more error.
      // Run a binary search to determine how far from 'loc' we can stray at this
      // error level.
      bin_min = 0;
      bin_mid = bin_max;

      while (bin_min < bin_mid) {
        if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
          bin_min = bin_mid;
        } else {
          bin_max = bin_mid;
        }

        bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
      } // Use the result from this iteration as the maximum for the next.


      bin_max = bin_mid;
      var start = Math.max(1, loc - bin_mid + 1);
      var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
      var rd = Array(finish + 2);
      rd[finish + 1] = (1 << d) - 1;

      for (var j = finish; j >= start; j--) {
        // The alphabet (s) is a sparse hash, so the following line generates
        // warnings.
        var charMatch = s[text.charAt(j - 1)];

        if (d === 0) {
          // First pass: exact match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
        } else {
          // Subsequent passes: fuzzy match.
          rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
        }

        if (rd[j] & matchmask) {
          var score = match_bitapScore_(d, j - 1); // This match will almost certainly be better than any existing match.
          // But check anyway.

          if (score <= score_threshold) {
            // Told you so.
            score_threshold = score;
            best_loc = j - 1;

            if (best_loc > loc) {
              // When passing loc, don't exceed our current distance from loc.
              start = Math.max(1, 2 * loc - best_loc);
            } else {
              // Already passed loc, downhill from here on in.
              break;
            }
          }
        }
      } // No hope for a (better) match at greater error levels.


      if (match_bitapScore_(d + 1, loc) > score_threshold) {
        break;
      }

      last_rd = rd;
    }

    return best_loc < 0 ? false : true;
  };
  /***/

}]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpc3QuanMiXSwibmFtZXMiOlsiTGlzdCIsIm1vZHVsZXMiLCJpbnN0YWxsZWRNb2R1bGVzIiwiX193ZWJwYWNrX3JlcXVpcmVfXyIsIm1vZHVsZUlkIiwiZXhwb3J0cyIsIm1vZHVsZSIsImkiLCJsIiwiY2FsbCIsIm0iLCJjIiwidmFsdWUiLCJkIiwibmFtZSIsImdldHRlciIsIm8iLCJPYmplY3QiLCJkZWZpbmVQcm9wZXJ0eSIsImNvbmZpZ3VyYWJsZSIsImVudW1lcmFibGUiLCJnZXQiLCJuIiwiX19lc01vZHVsZSIsImdldERlZmF1bHQiLCJnZXRNb2R1bGVFeHBvcnRzIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwiaW5kZXgiLCJyZSIsInRvU3RyaW5nIiwiZWwiLCJDbGFzc0xpc3QiLCJub2RlVHlwZSIsIkVycm9yIiwibGlzdCIsImNsYXNzTGlzdCIsImFkZCIsImFyciIsImFycmF5IiwicHVzaCIsImNsYXNzTmFtZSIsImpvaW4iLCJyZW1vdmUiLCJzcGxpY2UiLCJ0b2dnbGUiLCJmb3JjZSIsImhhcyIsImdldEF0dHJpYnV0ZSIsInN0ciIsInJlcGxhY2UiLCJzcGxpdCIsInNoaWZ0IiwiY29udGFpbnMiLCJiaW5kIiwid2luZG93IiwiYWRkRXZlbnRMaXN0ZW5lciIsInVuYmluZCIsInJlbW92ZUV2ZW50TGlzdGVuZXIiLCJwcmVmaXgiLCJ0b0FycmF5IiwidHlwZSIsImZuIiwiY2FwdHVyZSIsImxlbmd0aCIsImluaXRWYWx1ZXMiLCJlbGVtZW50Iiwibm90Q3JlYXRlIiwiaXRlbSIsIl92YWx1ZXMiLCJmb3VuZCIsImZpbHRlcmVkIiwiaW5pdCIsInVuZGVmaW5lZCIsInZhbHVlcyIsImVsbSIsInRlbXBsYXRlciIsIm5ld1ZhbHVlcyIsInNldCIsInNob3ciLCJoaWRlIiwibWF0Y2hpbmciLCJzZWFyY2hlZCIsInZpc2libGUiLCJwYXJlbnROb2RlIiwiZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSIsImNvbnRhaW5lciIsInNpbmdsZSIsInF1ZXJ5U2VsZWN0b3IiLCJxdWVyeVNlbGVjdG9yQWxsIiwicG9seWZpbGwiLCJjbGFzc0VsZW1lbnRzIiwidGFnIiwiZWxzIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJlbHNMZW4iLCJwYXR0ZXJuIiwiUmVnRXhwIiwiaiIsInRlc3QiLCJvcHRpb25zIiwiZG9jdW1lbnQiLCJpbmRleE9mIiwib2JqIiwiY29sbGVjdGlvbiIsImlzQXJyYXkiLCJGdW5jdGlvbiIsImV4dGVuZCIsImFyZ3MiLCJBcnJheSIsInNsaWNlIiwiYXJndW1lbnRzIiwic291cmNlIiwiYWRkQXN5bmMiLCJjYWxsYmFjayIsIml0ZW1zIiwidmFsdWVzVG9BZGQiLCJjb25jYXQiLCJzZXRUaW1lb3V0IiwidXBkYXRlIiwiaGFuZGxlcnMiLCJmaWx0ZXJTdGFydCIsImZpbHRlckNvbXBsZXRlIiwiZmlsdGVyRnVuY3Rpb24iLCJ0cmlnZ2VyIiwicmVzZXQiLCJmaWx0ZXIiLCJpcyIsImlsIiwidmlzaWJsZUl0ZW1zIiwiY2xhc3NlcyIsImV2ZW50cyIsImdldEJ5Q2xhc3MiLCJmdXp6eSIsImxvY2F0aW9uIiwiZGlzdGFuY2UiLCJ0aHJlc2hvbGQiLCJtdWx0aVNlYXJjaCIsInNlYXJjaENsYXNzIiwiZnV6enlTZWFyY2giLCJzZWFyY2giLCJzZWFyY2hTdHJpbmciLCJjb2x1bW5zIiwic2VhcmNoQXJndW1lbnRzIiwiayIsImtsIiwiZm91bmRBcmd1bWVudCIsImpsIiwic2VhcmNoQXJndW1lbnQiLCJ0ZXh0IiwidG9Mb3dlckNhc2UiLCJsaXN0Q29udGFpbmVyIiwiZSIsInRhcmdldCIsInNyY0VsZW1lbnQiLCJuYXR1cmFsU29ydCIsImlkIiwic2VsZiIsIkl0ZW0iLCJpbml0UGFnaW5hdGlvbiIsInN0YXJ0IiwibGlzdENsYXNzIiwic29ydENsYXNzIiwicGFnZSIsIm1hdGNoaW5nSXRlbXMiLCJzZWFyY2hDb2x1bW5zIiwidmFsdWVOYW1lcyIsInV0aWxzIiwiZ2V0RWxlbWVudEJ5SWQiLCJwYXJzZSIsInNvcnQiLCJwYWdpbmF0aW9uIiwiaGFuZGxlciIsIm9uIiwicmVJbmRleCIsInRvSlNPTiIsImpzb24iLCJhZGRlZCIsInZhbHVlTmFtZSIsIm1hdGNoZWRJdGVtcyIsInNpemUiLCJjbGVhciIsImV2ZW50Iiwib2ZmIiwicmVmcmVzaCIsInBhZ2luZ0xpc3QiLCJwYWdlcyIsIk1hdGgiLCJjZWlsIiwiY3VycmVudFBhZ2UiLCJpbm5lcldpbmRvdyIsImxlZnQiLCJvdXRlcldpbmRvdyIsInJpZ2h0IiwibnVtYmVyIiwiZG90dGVkIiwiYWRkRXZlbnQiLCJjdXJyZW50UGFnZUl0ZW0iLCJkb3R0ZWRMZWZ0IiwiZG90dGVkUmlnaHQiLCJwYWdpbmF0aW9uQ2xhc3MiLCJnZXRDaGlsZHJlbiIsInBhcmVudCIsIm5vZGVzIiwiY2hpbGROb2RlcyIsImRhdGEiLCJpdGVtRWxlbWVudHMiLCJwYXJzZUFzeW5jIiwiaXRlbXNUb0luZGV4IiwicGFyc2VDb21wbGV0ZSIsImluZGV4QXN5bmMiLCJjdXN0b21TZWFyY2giLCJwcmVwYXJlIiwicmVzZXRMaXN0Iiwic2V0T3B0aW9ucyIsInNldENvbHVtbnMiLCJzZXRTZWFyY2hTdHJpbmciLCJ0bXBDb2x1bW4iLCJjb2x1bW4iLCJzZWFyY2hNZXRob2QiLCJzZWFyY2hTdGFydCIsInNlYXJjaENvbXBsZXRlIiwiYWxyZWFkeUNsZWFyZWQiLCJidXR0b25zIiwiZ2V0T3JkZXIiLCJidG4iLCJwcmVkZWZpbmVkT3JkZXIiLCJnZXRJblNlbnNpdGl2ZSIsImluc2Vuc2l0aXZlIiwic2V0T3JkZXIiLCJvcmRlciIsImN1cnJlbnRUYXJnZXQiLCJjdXN0b21Tb3J0RnVuY3Rpb24iLCJzb3J0RnVuY3Rpb24iLCJtdWx0aSIsIml0ZW1BIiwiaXRlbUIiLCJhbHBoYWJldCIsImNhc2VJbnNlbnNpdGl2ZSIsInNvcnRTdGFydCIsInNvcnRDb21wbGV0ZSIsIlRlbXBsYXRlciIsIml0ZW1Tb3VyY2UiLCJnZXRJdGVtU291cmNlIiwiY2xlYXJTb3VyY2VJdGVtIiwic2V0QXR0cmlidXRlIiwiYXR0ciIsImlubmVySFRNTCIsImNsb25lTm9kZSIsImV4ZWMiLCJ0Ym9keSIsImNyZWF0ZUVsZW1lbnQiLCJmaXJzdENoaWxkIiwiZGl2IiwiY3JlYXRlIiwiZ2V0VmFsdWVOYW1lIiwic2V0VmFsdWUiLCJ2IiwibmV3SXRlbSIsInJlbW92ZUF0dHJpYnV0ZSIsInJlbW92ZUNoaWxkIiwiYXBwZW5kQ2hpbGQiLCJoYXNDaGlsZE5vZGVzIiwicmVzdWx0IiwiYXR0cnMiLCJhdHRyaWJ1dGVzIiwibm9kZU5hbWUiLCJub2RlVmFsdWUiLCJhbHBoYWJldEluZGV4TWFwIiwiYWxwaGFiZXRJbmRleE1hcExlbmd0aCIsImlzTnVtYmVyQ29kZSIsImNvZGUiLCJuYXR1cmFsQ29tcGFyZSIsImEiLCJiIiwibGVuZ3RoQSIsImxlbmd0aEIiLCJhSW5kZXgiLCJiSW5kZXgiLCJjaGFyQ29kZUEiLCJjaGFyQ29kZUF0IiwiY2hhckNvZGVCIiwibnVtU3RhcnRBIiwibnVtU3RhcnRCIiwibnVtRW5kQSIsIm51bUVuZEIiLCJkaWZmZXJlbmNlIiwiZGVmaW5lUHJvcGVydGllcyIsIk1hdGNoX0xvY2F0aW9uIiwiTWF0Y2hfRGlzdGFuY2UiLCJNYXRjaF9UaHJlc2hvbGQiLCJsb2MiLCJxIiwiY2hhckF0IiwibWF0Y2hfYml0YXBTY29yZV8iLCJ4IiwiYWNjdXJhY3kiLCJwcm94aW1pdHkiLCJhYnMiLCJzY29yZV90aHJlc2hvbGQiLCJiZXN0X2xvYyIsIm1pbiIsImxhc3RJbmRleE9mIiwibWF0Y2htYXNrIiwiYmluX21pbiIsImJpbl9taWQiLCJiaW5fbWF4IiwibGFzdF9yZCIsImZsb29yIiwibWF4IiwiZmluaXNoIiwicmQiLCJjaGFyTWF0Y2giLCJzY29yZSJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQSxJQUFJQSxJQUFJO0FBQ1I7QUFBVSxVQUFTQyxPQUFULEVBQWtCO0FBQUU7O0FBQzlCO0FBQVU7O0FBQ1Y7QUFBVSxNQUFJQyxnQkFBZ0IsR0FBRyxF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RCxDQURUIiwic291cmNlc0NvbnRlbnQiOlsiLyohIExpc3QuanMgdjEuNS4wIChodHRwOi8vbGlzdGpzLmNvbSkgYnkgSm9ubnkgU3Ryw7ZtYmVyZyAoaHR0cDovL2phdnZlLmNvbSkgKi9cbnZhciBMaXN0ID1cbi8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4vKioqKioqLyBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4vKioqKioqLyBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuLyoqKioqKi8gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuLyoqKioqKi8gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuLyoqKioqKi8gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGk6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bDogZmFsc2UsXG4vKioqKioqLyBcdFx0XHRleHBvcnRzOiB7fVxuLyoqKioqKi8gXHRcdH07XG5cbi8qKioqKiovIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbi8qKioqKiovIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuLyoqKioqKi8gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbi8qKioqKiovIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbi8qKioqKiovIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuLyoqKioqKi8gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbi8qKioqKiovIFx0fVxuXG5cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuLyoqKioqKi8gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4vKioqKioqLyBcdC8vIGlkZW50aXR5IGZ1bmN0aW9uIGZvciBjYWxsaW5nIGhhcm1vbnkgaW1wb3J0cyB3aXRoIHRoZSBjb3JyZWN0IGNvbnRleHRcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5pID0gZnVuY3Rpb24odmFsdWUpIHsgcmV0dXJuIHZhbHVlOyB9O1xuXG4vKioqKioqLyBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbi8qKioqKiovIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4vKioqKioqLyBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwge1xuLyoqKioqKi8gXHRcdFx0XHRjb25maWd1cmFibGU6IGZhbHNlLFxuLyoqKioqKi8gXHRcdFx0XHRlbnVtZXJhYmxlOiB0cnVlLFxuLyoqKioqKi8gXHRcdFx0XHRnZXQ6IGdldHRlclxuLyoqKioqKi8gXHRcdFx0fSk7XG4vKioqKioqLyBcdFx0fVxuLyoqKioqKi8gXHR9O1xuXG4vKioqKioqLyBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuLyoqKioqKi8gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuLyoqKioqKi8gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbi8qKioqKiovIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4vKioqKioqLyBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuLyoqKioqKi8gXHRcdHJldHVybiBnZXR0ZXI7XG4vKioqKioqLyBcdH07XG5cbi8qKioqKiovIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4vKioqKioqLyBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuLyoqKioqKi8gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAxMSk7XG4vKioqKioqLyB9KVxuLyoqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKi9cbi8qKioqKiovIChbXG4vKiAwICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cbi8qKlxuICogTW9kdWxlIGRlcGVuZGVuY2llcy5cbiAqL1xuXG52YXIgaW5kZXggPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDQpO1xuXG4vKipcbiAqIFdoaXRlc3BhY2UgcmVnZXhwLlxuICovXG5cbnZhciByZSA9IC9cXHMrLztcblxuLyoqXG4gKiB0b1N0cmluZyByZWZlcmVuY2UuXG4gKi9cblxudmFyIHRvU3RyaW5nID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZztcblxuLyoqXG4gKiBXcmFwIGBlbGAgaW4gYSBgQ2xhc3NMaXN0YC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsXG4gKiBAcmV0dXJuIHtDbGFzc0xpc3R9XG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oZWwpe1xuICByZXR1cm4gbmV3IENsYXNzTGlzdChlbCk7XG59O1xuXG4vKipcbiAqIEluaXRpYWxpemUgYSBuZXcgQ2xhc3NMaXN0IGZvciBgZWxgLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWxcbiAqIEBhcGkgcHJpdmF0ZVxuICovXG5cbmZ1bmN0aW9uIENsYXNzTGlzdChlbCkge1xuICBpZiAoIWVsIHx8ICFlbC5ub2RlVHlwZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQSBET00gZWxlbWVudCByZWZlcmVuY2UgaXMgcmVxdWlyZWQnKTtcbiAgfVxuICB0aGlzLmVsID0gZWw7XG4gIHRoaXMubGlzdCA9IGVsLmNsYXNzTGlzdDtcbn1cblxuLyoqXG4gKiBBZGQgY2xhc3MgYG5hbWVgIGlmIG5vdCBhbHJlYWR5IHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbihuYW1lKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICB0aGlzLmxpc3QuYWRkKG5hbWUpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgdmFyIGFyciA9IHRoaXMuYXJyYXkoKTtcbiAgdmFyIGkgPSBpbmRleChhcnIsIG5hbWUpO1xuICBpZiAoIX5pKSBhcnIucHVzaChuYW1lKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cbi8qKlxuICogUmVtb3ZlIGNsYXNzIGBuYW1lYCB3aGVuIHByZXNlbnQsIG9yXG4gKiBwYXNzIGEgcmVndWxhciBleHByZXNzaW9uIHRvIHJlbW92ZVxuICogYW55IHdoaWNoIG1hdGNoLlxuICpcbiAqIEBwYXJhbSB7U3RyaW5nfFJlZ0V4cH0gbmFtZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uKG5hbWUpe1xuICAvLyBjbGFzc0xpc3RcbiAgaWYgKHRoaXMubGlzdCkge1xuICAgIHRoaXMubGlzdC5yZW1vdmUobmFtZSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBmYWxsYmFja1xuICB2YXIgYXJyID0gdGhpcy5hcnJheSgpO1xuICB2YXIgaSA9IGluZGV4KGFyciwgbmFtZSk7XG4gIGlmICh+aSkgYXJyLnNwbGljZShpLCAxKTtcbiAgdGhpcy5lbC5jbGFzc05hbWUgPSBhcnIuam9pbignICcpO1xuICByZXR1cm4gdGhpcztcbn07XG5cblxuLyoqXG4gKiBUb2dnbGUgY2xhc3MgYG5hbWVgLCBjYW4gZm9yY2Ugc3RhdGUgdmlhIGBmb3JjZWAuXG4gKlxuICogRm9yIGJyb3dzZXJzIHRoYXQgc3VwcG9ydCBjbGFzc0xpc3QsIGJ1dCBkbyBub3Qgc3VwcG9ydCBgZm9yY2VgIHlldCxcbiAqIHRoZSBtaXN0YWtlIHdpbGwgYmUgZGV0ZWN0ZWQgYW5kIGNvcnJlY3RlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gbmFtZVxuICogQHBhcmFtIHtCb29sZWFufSBmb3JjZVxuICogQHJldHVybiB7Q2xhc3NMaXN0fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLnRvZ2dsZSA9IGZ1bmN0aW9uKG5hbWUsIGZvcmNlKXtcbiAgLy8gY2xhc3NMaXN0XG4gIGlmICh0aGlzLmxpc3QpIHtcbiAgICBpZiAoXCJ1bmRlZmluZWRcIiAhPT0gdHlwZW9mIGZvcmNlKSB7XG4gICAgICBpZiAoZm9yY2UgIT09IHRoaXMubGlzdC50b2dnbGUobmFtZSwgZm9yY2UpKSB7XG4gICAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7IC8vIHRvZ2dsZSBhZ2FpbiB0byBjb3JyZWN0XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubGlzdC50b2dnbGUobmFtZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZmFsbGJhY2tcbiAgaWYgKFwidW5kZWZpbmVkXCIgIT09IHR5cGVvZiBmb3JjZSkge1xuICAgIGlmICghZm9yY2UpIHtcbiAgICAgIHRoaXMucmVtb3ZlKG5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmFkZChuYW1lKTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgaWYgKHRoaXMuaGFzKG5hbWUpKSB7XG4gICAgICB0aGlzLnJlbW92ZShuYW1lKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5hZGQobmFtZSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG4vKipcbiAqIFJldHVybiBhbiBhcnJheSBvZiBjbGFzc2VzLlxuICpcbiAqIEByZXR1cm4ge0FycmF5fVxuICogQGFwaSBwdWJsaWNcbiAqL1xuXG5DbGFzc0xpc3QucHJvdG90eXBlLmFycmF5ID0gZnVuY3Rpb24oKXtcbiAgdmFyIGNsYXNzTmFtZSA9IHRoaXMuZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpIHx8ICcnO1xuICB2YXIgc3RyID0gY2xhc3NOYW1lLnJlcGxhY2UoL15cXHMrfFxccyskL2csICcnKTtcbiAgdmFyIGFyciA9IHN0ci5zcGxpdChyZSk7XG4gIGlmICgnJyA9PT0gYXJyWzBdKSBhcnIuc2hpZnQoKTtcbiAgcmV0dXJuIGFycjtcbn07XG5cbi8qKlxuICogQ2hlY2sgaWYgY2xhc3MgYG5hbWVgIGlzIHByZXNlbnQuXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IG5hbWVcbiAqIEByZXR1cm4ge0NsYXNzTGlzdH1cbiAqIEBhcGkgcHVibGljXG4gKi9cblxuQ2xhc3NMaXN0LnByb3RvdHlwZS5oYXMgPVxuQ2xhc3NMaXN0LnByb3RvdHlwZS5jb250YWlucyA9IGZ1bmN0aW9uKG5hbWUpe1xuICByZXR1cm4gdGhpcy5saXN0ID8gdGhpcy5saXN0LmNvbnRhaW5zKG5hbWUpIDogISEgfmluZGV4KHRoaXMuYXJyYXkoKSwgbmFtZSk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgYmluZCA9IHdpbmRvdy5hZGRFdmVudExpc3RlbmVyID8gJ2FkZEV2ZW50TGlzdGVuZXInIDogJ2F0dGFjaEV2ZW50JyxcbiAgICB1bmJpbmQgPSB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lciA/ICdyZW1vdmVFdmVudExpc3RlbmVyJyA6ICdkZXRhY2hFdmVudCcsXG4gICAgcHJlZml4ID0gYmluZCAhPT0gJ2FkZEV2ZW50TGlzdGVuZXInID8gJ29uJyA6ICcnLFxuICAgIHRvQXJyYXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG4vKipcbiAqIEJpbmQgYGVsYCBldmVudCBgdHlwZWAgdG8gYGZuYC5cbiAqXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGVsLCBOb2RlTGlzdCwgSFRNTENvbGxlY3Rpb24gb3IgQXJyYXlcbiAqIEBwYXJhbSB7U3RyaW5nfSB0eXBlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmblxuICogQHBhcmFtIHtCb29sZWFufSBjYXB0dXJlXG4gKiBAYXBpIHB1YmxpY1xuICovXG5cbmV4cG9ydHMuYmluZCA9IGZ1bmN0aW9uKGVsLCB0eXBlLCBmbiwgY2FwdHVyZSl7XG4gIGVsID0gdG9BcnJheShlbCk7XG4gIGZvciAoIHZhciBpID0gMDsgaSA8IGVsLmxlbmd0aDsgaSsrICkge1xuICAgIGVsW2ldW2JpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcblxuLyoqXG4gKiBVbmJpbmQgYGVsYCBldmVudCBgdHlwZWAncyBjYWxsYmFjayBgZm5gLlxuICpcbiAqIEBwYXJhbSB7RWxlbWVudH0gZWwsIE5vZGVMaXN0LCBIVE1MQ29sbGVjdGlvbiBvciBBcnJheVxuICogQHBhcmFtIHtTdHJpbmd9IHR5cGVcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuXG4gKiBAcGFyYW0ge0Jvb2xlYW59IGNhcHR1cmVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxuZXhwb3J0cy51bmJpbmQgPSBmdW5jdGlvbihlbCwgdHlwZSwgZm4sIGNhcHR1cmUpe1xuICBlbCA9IHRvQXJyYXkoZWwpO1xuICBmb3IgKCB2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKyApIHtcbiAgICBlbFtpXVt1bmJpbmRdKHByZWZpeCArIHR5cGUsIGZuLCBjYXB0dXJlIHx8IGZhbHNlKTtcbiAgfVxufTtcblxuXG4vKioqLyB9KSxcbi8qIDIgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHJldHVybiBmdW5jdGlvbihpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpIHtcbiAgICB2YXIgaXRlbSA9IHRoaXM7XG5cbiAgICB0aGlzLl92YWx1ZXMgPSB7fTtcblxuICAgIHRoaXMuZm91bmQgPSBmYWxzZTsgLy8gU2hvdyBpZiBsaXN0LnNlYXJjaGVkID09IHRydWUgYW5kIHRoaXMuZm91bmQgPT0gdHJ1ZVxuICAgIHRoaXMuZmlsdGVyZWQgPSBmYWxzZTsvLyBTaG93IGlmIGxpc3QuZmlsdGVyZWQgPT0gdHJ1ZSBhbmQgdGhpcy5maWx0ZXJlZCA9PSB0cnVlXG5cbiAgICB2YXIgaW5pdCA9IGZ1bmN0aW9uKGluaXRWYWx1ZXMsIGVsZW1lbnQsIG5vdENyZWF0ZSkge1xuICAgICAgaWYgKGVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBpZiAobm90Q3JlYXRlKSB7XG4gICAgICAgICAgaXRlbS52YWx1ZXMoaW5pdFZhbHVlcywgbm90Q3JlYXRlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtLnZhbHVlcyhpbml0VmFsdWVzKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaXRlbS5lbG0gPSBlbGVtZW50O1xuICAgICAgICB2YXIgdmFsdWVzID0gbGlzdC50ZW1wbGF0ZXIuZ2V0KGl0ZW0sIGluaXRWYWx1ZXMpO1xuICAgICAgICBpdGVtLnZhbHVlcyh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnZhbHVlcyA9IGZ1bmN0aW9uKG5ld1ZhbHVlcywgbm90Q3JlYXRlKSB7XG4gICAgICBpZiAobmV3VmFsdWVzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgZm9yKHZhciBuYW1lIGluIG5ld1ZhbHVlcykge1xuICAgICAgICAgIGl0ZW0uX3ZhbHVlc1tuYW1lXSA9IG5ld1ZhbHVlc1tuYW1lXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAobm90Q3JlYXRlICE9PSB0cnVlKSB7XG4gICAgICAgICAgbGlzdC50ZW1wbGF0ZXIuc2V0KGl0ZW0sIGl0ZW0udmFsdWVzKCkpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gaXRlbS5fdmFsdWVzO1xuICAgICAgfVxuICAgIH07XG5cbiAgICB0aGlzLnNob3cgPSBmdW5jdGlvbigpIHtcbiAgICAgIGxpc3QudGVtcGxhdGVyLnNob3coaXRlbSk7XG4gICAgfTtcblxuICAgIHRoaXMuaGlkZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuaGlkZShpdGVtKTtcbiAgICB9O1xuXG4gICAgdGhpcy5tYXRjaGluZyA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgKGxpc3QuZmlsdGVyZWQgJiYgbGlzdC5zZWFyY2hlZCAmJiBpdGVtLmZvdW5kICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgIChsaXN0LmZpbHRlcmVkICYmICFsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZmlsdGVyZWQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiBsaXN0LnNlYXJjaGVkICYmIGl0ZW0uZm91bmQpIHx8XG4gICAgICAgICghbGlzdC5maWx0ZXJlZCAmJiAhbGlzdC5zZWFyY2hlZClcbiAgICAgICk7XG4gICAgfTtcblxuICAgIHRoaXMudmlzaWJsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIChpdGVtLmVsbSAmJiAoaXRlbS5lbG0ucGFyZW50Tm9kZSA9PSBsaXN0Lmxpc3QpKSA/IHRydWUgOiBmYWxzZTtcbiAgICB9O1xuXG4gICAgaW5pdChpbml0VmFsdWVzLCBlbGVtZW50LCBub3RDcmVhdGUpO1xuICB9O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0RWxlbWVudHNCeUNsYXNzLlxuICogSGVhdmlseSBiYXNlZCBvbiBEdXN0aW4gRGlheidzIGZ1bmN0aW9uOiBodHRwOi8vZHVzdGluZGlhei5jb20vZ2V0ZWxlbWVudHNieWNsYXNzLlxuICpcbiAqIEZpbmQgYWxsIGVsZW1lbnRzIHdpdGggY2xhc3MgYGNsYXNzTmFtZWAgaW5zaWRlIGBjb250YWluZXJgLlxuICogVXNlIGBzaW5nbGUgPSB0cnVlYCB0byBpbmNyZWFzZSBwZXJmb3JtYW5jZSBpbiBvbGRlciBicm93c2Vyc1xuICogd2hlbiBvbmx5IG9uZSBlbGVtZW50IGlzIG5lZWRlZC5cbiAqXG4gKiBAcGFyYW0ge1N0cmluZ30gY2xhc3NOYW1lXG4gKiBAcGFyYW0ge0VsZW1lbnR9IGNvbnRhaW5lclxuICogQHBhcmFtIHtCb29sZWFufSBzaW5nbGVcbiAqIEBhcGkgcHVibGljXG4gKi9cblxudmFyIGdldEVsZW1lbnRzQnlDbGFzc05hbWUgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGlmIChzaW5nbGUpIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKVswXTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY29udGFpbmVyLmdldEVsZW1lbnRzQnlDbGFzc05hbWUoY2xhc3NOYW1lKTtcbiAgfVxufTtcblxudmFyIHF1ZXJ5U2VsZWN0b3IgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIGNsYXNzTmFtZSA9ICcuJyArIGNsYXNzTmFtZTtcbiAgaWYgKHNpbmdsZSkge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvcihjbGFzc05hbWUpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbChjbGFzc05hbWUpO1xuICB9XG59O1xuXG52YXIgcG9seWZpbGwgPSBmdW5jdGlvbihjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKSB7XG4gIHZhciBjbGFzc0VsZW1lbnRzID0gW10sXG4gICAgdGFnID0gJyonO1xuXG4gIHZhciBlbHMgPSBjb250YWluZXIuZ2V0RWxlbWVudHNCeVRhZ05hbWUodGFnKTtcbiAgdmFyIGVsc0xlbiA9IGVscy5sZW5ndGg7XG4gIHZhciBwYXR0ZXJuID0gbmV3IFJlZ0V4cChcIihefFxcXFxzKVwiK2NsYXNzTmFtZStcIihcXFxcc3wkKVwiKTtcbiAgZm9yICh2YXIgaSA9IDAsIGogPSAwOyBpIDwgZWxzTGVuOyBpKyspIHtcbiAgICBpZiAoIHBhdHRlcm4udGVzdChlbHNbaV0uY2xhc3NOYW1lKSApIHtcbiAgICAgIGlmIChzaW5nbGUpIHtcbiAgICAgICAgcmV0dXJuIGVsc1tpXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNsYXNzRWxlbWVudHNbal0gPSBlbHNbaV07XG4gICAgICAgIGorKztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGNsYXNzRWxlbWVudHM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKGNvbnRhaW5lciwgY2xhc3NOYW1lLCBzaW5nbGUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBpZiAoKG9wdGlvbnMudGVzdCAmJiBvcHRpb25zLmdldEVsZW1lbnRzQnlDbGFzc05hbWUpIHx8ICghb3B0aW9ucy50ZXN0ICYmIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUpKSB7XG4gICAgICByZXR1cm4gZ2V0RWxlbWVudHNCeUNsYXNzTmFtZShjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9IGVsc2UgaWYgKChvcHRpb25zLnRlc3QgJiYgb3B0aW9ucy5xdWVyeVNlbGVjdG9yKSB8fCAoIW9wdGlvbnMudGVzdCAmJiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKSkge1xuICAgICAgcmV0dXJuIHF1ZXJ5U2VsZWN0b3IoY29udGFpbmVyLCBjbGFzc05hbWUsIHNpbmdsZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBwb2x5ZmlsbChjb250YWluZXIsIGNsYXNzTmFtZSwgc2luZ2xlKTtcbiAgICB9XG4gIH07XG59KSgpO1xuXG5cbi8qKiovIH0pLFxuLyogNCAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG52YXIgaW5kZXhPZiA9IFtdLmluZGV4T2Y7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYXJyLCBvYmope1xuICBpZiAoaW5kZXhPZikgcmV0dXJuIGFyci5pbmRleE9mKG9iaik7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgYXJyLmxlbmd0aDsgKytpKSB7XG4gICAgaWYgKGFycltpXSA9PT0gb2JqKSByZXR1cm4gaTtcbiAgfVxuICByZXR1cm4gLTE7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG4vKipcbiAqIFNvdXJjZTogaHR0cHM6Ly9naXRodWIuY29tL3RpbW94bGV5L3RvLWFycmF5XG4gKlxuICogQ29udmVydCBhbiBhcnJheS1saWtlIG9iamVjdCBpbnRvIGFuIGBBcnJheWAuXG4gKiBJZiBgY29sbGVjdGlvbmAgaXMgYWxyZWFkeSBhbiBgQXJyYXlgLCB0aGVuIHdpbGwgcmV0dXJuIGEgY2xvbmUgb2YgYGNvbGxlY3Rpb25gLlxuICpcbiAqIEBwYXJhbSB7QXJyYXkgfCBNaXhlZH0gY29sbGVjdGlvbiBBbiBgQXJyYXlgIG9yIGFycmF5LWxpa2Ugb2JqZWN0IHRvIGNvbnZlcnQgZS5nLiBgYXJndW1lbnRzYCBvciBgTm9kZUxpc3RgXG4gKiBAcmV0dXJuIHtBcnJheX0gTmFpdmUgY29udmVyc2lvbiBvZiBgY29sbGVjdGlvbmAgdG8gYSBuZXcgYEFycmF5YC5cbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB0b0FycmF5KGNvbGxlY3Rpb24pIHtcbiAgaWYgKHR5cGVvZiBjb2xsZWN0aW9uID09PSAndW5kZWZpbmVkJykgcmV0dXJuIFtdO1xuICBpZiAoY29sbGVjdGlvbiA9PT0gbnVsbCkgcmV0dXJuIFtudWxsXTtcbiAgaWYgKGNvbGxlY3Rpb24gPT09IHdpbmRvdykgcmV0dXJuIFt3aW5kb3ddO1xuICBpZiAodHlwZW9mIGNvbGxlY3Rpb24gPT09ICdzdHJpbmcnKSByZXR1cm4gW2NvbGxlY3Rpb25dO1xuICBpZiAoaXNBcnJheShjb2xsZWN0aW9uKSkgcmV0dXJuIGNvbGxlY3Rpb247XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbi5sZW5ndGggIT0gJ251bWJlcicpIHJldHVybiBbY29sbGVjdGlvbl07XG4gIGlmICh0eXBlb2YgY29sbGVjdGlvbiA9PT0gJ2Z1bmN0aW9uJyAmJiBjb2xsZWN0aW9uIGluc3RhbmNlb2YgRnVuY3Rpb24pIHJldHVybiBbY29sbGVjdGlvbl07XG5cbiAgdmFyIGFyciA9IFtdO1xuICBmb3IgKHZhciBpID0gMDsgaSA8IGNvbGxlY3Rpb24ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbGxlY3Rpb24sIGkpIHx8IGkgaW4gY29sbGVjdGlvbikge1xuICAgICAgYXJyLnB1c2goY29sbGVjdGlvbltpXSk7XG4gICAgfVxuICB9XG4gIGlmICghYXJyLmxlbmd0aCkgcmV0dXJuIFtdO1xuICByZXR1cm4gYXJyO1xufTtcblxuZnVuY3Rpb24gaXNBcnJheShhcnIpIHtcbiAgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChhcnIpID09PSBcIltvYmplY3QgQXJyYXldXCI7XG59XG5cblxuLyoqKi8gfSksXG4vKiA2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24ocykge1xuICBzID0gKHMgPT09IHVuZGVmaW5lZCkgPyBcIlwiIDogcztcbiAgcyA9IChzID09PSBudWxsKSA/IFwiXCIgOiBzO1xuICBzID0gcy50b1N0cmluZygpO1xuICByZXR1cm4gcztcbn07XG5cblxuLyoqKi8gfSksXG4vKiA3ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbi8qXG4gKiBTb3VyY2U6IGh0dHBzOi8vZ2l0aHViLmNvbS9zZWdtZW50aW8vZXh0ZW5kXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBleHRlbmQgKG9iamVjdCkge1xuICAgIC8vIFRha2VzIGFuIHVubGltaXRlZCBudW1iZXIgb2YgZXh0ZW5kZXJzLlxuICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzLCAxKTtcblxuICAgIC8vIEZvciBlYWNoIGV4dGVuZGVyLCBjb3B5IHRoZWlyIHByb3BlcnRpZXMgb24gb3VyIG9iamVjdC5cbiAgICBmb3IgKHZhciBpID0gMCwgc291cmNlOyBzb3VyY2UgPSBhcmdzW2ldOyBpKyspIHtcbiAgICAgICAgaWYgKCFzb3VyY2UpIGNvbnRpbnVlO1xuICAgICAgICBmb3IgKHZhciBwcm9wZXJ0eSBpbiBzb3VyY2UpIHtcbiAgICAgICAgICAgIG9iamVjdFtwcm9wZXJ0eV0gPSBzb3VyY2VbcHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iamVjdDtcbn07XG5cblxuLyoqKi8gfSksXG4vKiA4ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCkge1xuICB2YXIgYWRkQXN5bmMgPSBmdW5jdGlvbih2YWx1ZXMsIGNhbGxiYWNrLCBpdGVtcykge1xuICAgIHZhciB2YWx1ZXNUb0FkZCA9IHZhbHVlcy5zcGxpY2UoMCwgNTApO1xuICAgIGl0ZW1zID0gaXRlbXMgfHwgW107XG4gICAgaXRlbXMgPSBpdGVtcy5jb25jYXQobGlzdC5hZGQodmFsdWVzVG9BZGQpKTtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA+IDApIHtcbiAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2ssIGl0ZW1zKTtcbiAgICAgIH0sIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnVwZGF0ZSgpO1xuICAgICAgY2FsbGJhY2soaXRlbXMpO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIGFkZEFzeW5jO1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDkgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuZmlsdGVyU3RhcnQgPSBsaXN0LmhhbmRsZXJzLmZpbHRlclN0YXJ0IHx8IFtdO1xuICBsaXN0LmhhbmRsZXJzLmZpbHRlckNvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5maWx0ZXJDb21wbGV0ZSB8fCBbXTtcblxuICByZXR1cm4gZnVuY3Rpb24oZmlsdGVyRnVuY3Rpb24pIHtcbiAgICBsaXN0LnRyaWdnZXIoJ2ZpbHRlclN0YXJ0Jyk7XG4gICAgbGlzdC5pID0gMTsgLy8gUmVzZXQgcGFnaW5nXG4gICAgbGlzdC5yZXNldC5maWx0ZXIoKTtcbiAgICBpZiAoZmlsdGVyRnVuY3Rpb24gPT09IHVuZGVmaW5lZCkge1xuICAgICAgbGlzdC5maWx0ZXJlZCA9IGZhbHNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LmZpbHRlcmVkID0gdHJ1ZTtcbiAgICAgIHZhciBpcyA9IGxpc3QuaXRlbXM7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIHZhciBpdGVtID0gaXNbaV07XG4gICAgICAgIGlmIChmaWx0ZXJGdW5jdGlvbihpdGVtKSkge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSB0cnVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW0uZmlsdGVyZWQgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignZmlsdGVyQ29tcGxldGUnKTtcbiAgICByZXR1cm4gbGlzdC52aXNpYmxlSXRlbXM7XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTAgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXG52YXIgY2xhc3NlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMCksXG4gIGV2ZW50cyA9IF9fd2VicGFja19yZXF1aXJlX18oMSksXG4gIGV4dGVuZCA9IF9fd2VicGFja19yZXF1aXJlX18oNyksXG4gIHRvU3RyaW5nID0gX193ZWJwYWNrX3JlcXVpcmVfXyg2KSxcbiAgZ2V0QnlDbGFzcyA9IF9fd2VicGFja19yZXF1aXJlX18oMyksXG4gIGZ1enp5ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuICBvcHRpb25zID0gZXh0ZW5kKHtcbiAgICBsb2NhdGlvbjogMCxcbiAgICBkaXN0YW5jZTogMTAwLFxuICAgIHRocmVzaG9sZDogMC40LFxuICAgIG11bHRpU2VhcmNoOiB0cnVlLFxuICAgIHNlYXJjaENsYXNzOiAnZnV6enktc2VhcmNoJ1xuICB9LCBvcHRpb25zKTtcblxuXG5cbiAgdmFyIGZ1enp5U2VhcmNoID0ge1xuICAgIHNlYXJjaDogZnVuY3Rpb24oc2VhcmNoU3RyaW5nLCBjb2x1bW5zKSB7XG4gICAgICAvLyBTdWJzdHJhY3QgYXJndW1lbnRzIGZyb20gdGhlIHNlYXJjaFN0cmluZyBvciBwdXQgc2VhcmNoU3RyaW5nIGFzIG9ubHkgYXJndW1lbnRcbiAgICAgIHZhciBzZWFyY2hBcmd1bWVudHMgPSBvcHRpb25zLm11bHRpU2VhcmNoID8gc2VhcmNoU3RyaW5nLnJlcGxhY2UoLyArJC8sICcnKS5zcGxpdCgvICsvKSA6IFtzZWFyY2hTdHJpbmddO1xuXG4gICAgICBmb3IgKHZhciBrID0gMCwga2wgPSBsaXN0Lml0ZW1zLmxlbmd0aDsgayA8IGtsOyBrKyspIHtcbiAgICAgICAgZnV6enlTZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdLCBjb2x1bW5zLCBzZWFyY2hBcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgaXRlbTogZnVuY3Rpb24oaXRlbSwgY29sdW1ucywgc2VhcmNoQXJndW1lbnRzKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlO1xuICAgICAgZm9yKHZhciBpID0gMDsgaSA8IHNlYXJjaEFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICB2YXIgZm91bmRBcmd1bWVudCA9IGZhbHNlO1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSBjb2x1bW5zLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICBpZiAoZnV6enlTZWFyY2gudmFsdWVzKGl0ZW0udmFsdWVzKCksIGNvbHVtbnNbal0sIHNlYXJjaEFyZ3VtZW50c1tpXSkpIHtcbiAgICAgICAgICAgIGZvdW5kQXJndW1lbnQgPSB0cnVlO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBpZighZm91bmRBcmd1bWVudCkge1xuICAgICAgICAgIGZvdW5kID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGl0ZW0uZm91bmQgPSBmb3VuZDtcbiAgICB9LFxuICAgIHZhbHVlczogZnVuY3Rpb24odmFsdWVzLCB2YWx1ZSwgc2VhcmNoQXJndW1lbnQpIHtcbiAgICAgIGlmICh2YWx1ZXMuaGFzT3duUHJvcGVydHkodmFsdWUpKSB7XG4gICAgICAgIHZhciB0ZXh0ID0gdG9TdHJpbmcodmFsdWVzW3ZhbHVlXSkudG9Mb3dlckNhc2UoKTtcblxuICAgICAgICBpZiAoZnV6enkodGV4dCwgc2VhcmNoQXJndW1lbnQsIG9wdGlvbnMpKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH07XG5cblxuICBldmVudHMuYmluZChnZXRCeUNsYXNzKGxpc3QubGlzdENvbnRhaW5lciwgb3B0aW9ucy5zZWFyY2hDbGFzcyksICdrZXl1cCcsIGZ1bmN0aW9uKGUpIHtcbiAgICB2YXIgdGFyZ2V0ID0gZS50YXJnZXQgfHwgZS5zcmNFbGVtZW50OyAvLyBJRSBoYXZlIHNyY0VsZW1lbnRcbiAgICBsaXN0LnNlYXJjaCh0YXJnZXQudmFsdWUsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH0pO1xuXG4gIHJldHVybiBmdW5jdGlvbihzdHIsIGNvbHVtbnMpIHtcbiAgICBsaXN0LnNlYXJjaChzdHIsIGNvbHVtbnMsIGZ1enp5U2VhcmNoLnNlYXJjaCk7XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTEgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxudmFyIG5hdHVyYWxTb3J0ID0gX193ZWJwYWNrX3JlcXVpcmVfXygxOCksXG4gIGdldEJ5Q2xhc3MgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDMpLFxuICBleHRlbmQgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDcpLFxuICBpbmRleE9mID0gX193ZWJwYWNrX3JlcXVpcmVfXyg0KSxcbiAgZXZlbnRzID0gX193ZWJwYWNrX3JlcXVpcmVfXygxKSxcbiAgdG9TdHJpbmcgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDYpLFxuICBjbGFzc2VzID0gX193ZWJwYWNrX3JlcXVpcmVfXygwKSxcbiAgZ2V0QXR0cmlidXRlID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNyksXG4gIHRvQXJyYXkgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGlkLCBvcHRpb25zLCB2YWx1ZXMpIHtcblxuICB2YXIgc2VsZiA9IHRoaXMsXG4gICAgaW5pdCxcbiAgICBJdGVtID0gX193ZWJwYWNrX3JlcXVpcmVfXygyKShzZWxmKSxcbiAgICBhZGRBc3luYyA9IF9fd2VicGFja19yZXF1aXJlX18oOCkoc2VsZiksXG4gICAgaW5pdFBhZ2luYXRpb24gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDEyKShzZWxmKTtcblxuICBpbml0ID0ge1xuICAgIHN0YXJ0OiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYubGlzdENsYXNzICAgICAgPSBcImxpc3RcIjtcbiAgICAgIHNlbGYuc2VhcmNoQ2xhc3MgICAgPSBcInNlYXJjaFwiO1xuICAgICAgc2VsZi5zb3J0Q2xhc3MgICAgICA9IFwic29ydFwiO1xuICAgICAgc2VsZi5wYWdlICAgICAgICAgICA9IDEwMDAwO1xuICAgICAgc2VsZi5pICAgICAgICAgICAgICA9IDE7XG4gICAgICBzZWxmLml0ZW1zICAgICAgICAgID0gW107XG4gICAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgICBzZWxmLm1hdGNoaW5nSXRlbXMgID0gW107XG4gICAgICBzZWxmLnNlYXJjaGVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgICBzZWxmLnNlYXJjaENvbHVtbnMgID0gdW5kZWZpbmVkO1xuICAgICAgc2VsZi5oYW5kbGVycyAgICAgICA9IHsgJ3VwZGF0ZWQnOiBbXSB9O1xuICAgICAgc2VsZi52YWx1ZU5hbWVzICAgICA9IFtdO1xuICAgICAgc2VsZi51dGlscyAgICAgICAgICA9IHtcbiAgICAgICAgZ2V0QnlDbGFzczogZ2V0QnlDbGFzcyxcbiAgICAgICAgZXh0ZW5kOiBleHRlbmQsXG4gICAgICAgIGluZGV4T2Y6IGluZGV4T2YsXG4gICAgICAgIGV2ZW50czogZXZlbnRzLFxuICAgICAgICB0b1N0cmluZzogdG9TdHJpbmcsXG4gICAgICAgIG5hdHVyYWxTb3J0OiBuYXR1cmFsU29ydCxcbiAgICAgICAgY2xhc3NlczogY2xhc3NlcyxcbiAgICAgICAgZ2V0QXR0cmlidXRlOiBnZXRBdHRyaWJ1dGUsXG4gICAgICAgIHRvQXJyYXk6IHRvQXJyYXlcbiAgICAgIH07XG5cbiAgICAgIHNlbGYudXRpbHMuZXh0ZW5kKHNlbGYsIG9wdGlvbnMpO1xuXG4gICAgICBzZWxmLmxpc3RDb250YWluZXIgPSAodHlwZW9mKGlkKSA9PT0gJ3N0cmluZycpID8gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpIDogaWQ7XG4gICAgICBpZiAoIXNlbGYubGlzdENvbnRhaW5lcikgeyByZXR1cm47IH1cbiAgICAgIHNlbGYubGlzdCAgICAgICA9IGdldEJ5Q2xhc3Moc2VsZi5saXN0Q29udGFpbmVyLCBzZWxmLmxpc3RDbGFzcywgdHJ1ZSk7XG5cbiAgICAgIHNlbGYucGFyc2UgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxMykoc2VsZik7XG4gICAgICBzZWxmLnRlbXBsYXRlciAgICA9IF9fd2VicGFja19yZXF1aXJlX18oMTYpKHNlbGYpO1xuICAgICAgc2VsZi5zZWFyY2ggICAgICAgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDE0KShzZWxmKTtcbiAgICAgIHNlbGYuZmlsdGVyICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXyg5KShzZWxmKTtcbiAgICAgIHNlbGYuc29ydCAgICAgICAgID0gX193ZWJwYWNrX3JlcXVpcmVfXygxNSkoc2VsZik7XG4gICAgICBzZWxmLmZ1enp5U2VhcmNoICA9IF9fd2VicGFja19yZXF1aXJlX18oMTApKHNlbGYsIG9wdGlvbnMuZnV6enlTZWFyY2gpO1xuXG4gICAgICB0aGlzLmhhbmRsZXJzKCk7XG4gICAgICB0aGlzLml0ZW1zKCk7XG4gICAgICB0aGlzLnBhZ2luYXRpb24oKTtcblxuICAgICAgc2VsZi51cGRhdGUoKTtcbiAgICB9LFxuICAgIGhhbmRsZXJzOiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGhhbmRsZXIgaW4gc2VsZi5oYW5kbGVycykge1xuICAgICAgICBpZiAoc2VsZltoYW5kbGVyXSkge1xuICAgICAgICAgIHNlbGYub24oaGFuZGxlciwgc2VsZltoYW5kbGVyXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW1zOiBmdW5jdGlvbigpIHtcbiAgICAgIHNlbGYucGFyc2Uoc2VsZi5saXN0KTtcbiAgICAgIGlmICh2YWx1ZXMgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBzZWxmLmFkZCh2YWx1ZXMpO1xuICAgICAgfVxuICAgIH0sXG4gICAgcGFnaW5hdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAob3B0aW9ucy5wYWdpbmF0aW9uICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvbiA9PT0gdHJ1ZSkge1xuICAgICAgICAgIG9wdGlvbnMucGFnaW5hdGlvbiA9IFt7fV07XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG9wdGlvbnMucGFnaW5hdGlvblswXSA9PT0gdW5kZWZpbmVkKXtcbiAgICAgICAgICBvcHRpb25zLnBhZ2luYXRpb24gPSBbb3B0aW9ucy5wYWdpbmF0aW9uXTtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBvcHRpb25zLnBhZ2luYXRpb24ubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAgIGluaXRQYWdpbmF0aW9uKG9wdGlvbnMucGFnaW5hdGlvbltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgLypcbiAgKiBSZS1wYXJzZSB0aGUgTGlzdCwgdXNlIGlmIGh0bWwgaGF2ZSBjaGFuZ2VkXG4gICovXG4gIHRoaXMucmVJbmRleCA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYuaXRlbXMgICAgICAgICAgPSBbXTtcbiAgICBzZWxmLnZpc2libGVJdGVtcyAgID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zICA9IFtdO1xuICAgIHNlbGYuc2VhcmNoZWQgICAgICAgPSBmYWxzZTtcbiAgICBzZWxmLmZpbHRlcmVkICAgICAgID0gZmFsc2U7XG4gICAgc2VsZi5wYXJzZShzZWxmLmxpc3QpO1xuICB9O1xuXG4gIHRoaXMudG9KU09OID0gZnVuY3Rpb24oKSB7XG4gICAgdmFyIGpzb24gPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBzZWxmLml0ZW1zLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGpzb24ucHVzaChzZWxmLml0ZW1zW2ldLnZhbHVlcygpKTtcbiAgICB9XG4gICAgcmV0dXJuIGpzb247XG4gIH07XG5cblxuICAvKlxuICAqIEFkZCBvYmplY3QgdG8gbGlzdFxuICAqL1xuICB0aGlzLmFkZCA9IGZ1bmN0aW9uKHZhbHVlcywgY2FsbGJhY2spIHtcbiAgICBpZiAodmFsdWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY2FsbGJhY2spIHtcbiAgICAgIGFkZEFzeW5jKHZhbHVlcywgY2FsbGJhY2spO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgYWRkZWQgPSBbXSxcbiAgICAgIG5vdENyZWF0ZSA9IGZhbHNlO1xuICAgIGlmICh2YWx1ZXNbMF0gPT09IHVuZGVmaW5lZCl7XG4gICAgICB2YWx1ZXMgPSBbdmFsdWVzXTtcbiAgICB9XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gdmFsdWVzLmxlbmd0aDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIHZhciBpdGVtID0gbnVsbDtcbiAgICAgIG5vdENyZWF0ZSA9IChzZWxmLml0ZW1zLmxlbmd0aCA+IHNlbGYucGFnZSkgPyB0cnVlIDogZmFsc2U7XG4gICAgICBpdGVtID0gbmV3IEl0ZW0odmFsdWVzW2ldLCB1bmRlZmluZWQsIG5vdENyZWF0ZSk7XG4gICAgICBzZWxmLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICBhZGRlZC5wdXNoKGl0ZW0pO1xuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBhZGRlZDtcbiAgfTtcblxuXHR0aGlzLnNob3cgPSBmdW5jdGlvbihpLCBwYWdlKSB7XG5cdFx0dGhpcy5pID0gaTtcblx0XHR0aGlzLnBhZ2UgPSBwYWdlO1xuXHRcdHNlbGYudXBkYXRlKCk7XG4gICAgcmV0dXJuIHNlbGY7XG5cdH07XG5cbiAgLyogUmVtb3ZlcyBvYmplY3QgZnJvbSBsaXN0LlxuICAqIExvb3BzIHRocm91Z2ggdGhlIGxpc3QgYW5kIHJlbW92ZXMgb2JqZWN0cyB3aGVyZVxuICAqIHByb3BlcnR5IFwidmFsdWVuYW1lXCIgPT09IHZhbHVlXG4gICovXG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24odmFsdWVOYW1lLCB2YWx1ZSwgb3B0aW9ucykge1xuICAgIHZhciBmb3VuZCA9IDA7XG4gICAgZm9yICh2YXIgaSA9IDAsIGlsID0gc2VsZi5pdGVtcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICBpZiAoc2VsZi5pdGVtc1tpXS52YWx1ZXMoKVt2YWx1ZU5hbWVdID09IHZhbHVlKSB7XG4gICAgICAgIHNlbGYudGVtcGxhdGVyLnJlbW92ZShzZWxmLml0ZW1zW2ldLCBvcHRpb25zKTtcbiAgICAgICAgc2VsZi5pdGVtcy5zcGxpY2UoaSwxKTtcbiAgICAgICAgaWwtLTtcbiAgICAgICAgaS0tO1xuICAgICAgICBmb3VuZCsrO1xuICAgICAgfVxuICAgIH1cbiAgICBzZWxmLnVwZGF0ZSgpO1xuICAgIHJldHVybiBmb3VuZDtcbiAgfTtcblxuICAvKiBHZXRzIHRoZSBvYmplY3RzIGluIHRoZSBsaXN0IHdoaWNoXG4gICogcHJvcGVydHkgXCJ2YWx1ZU5hbWVcIiA9PT0gdmFsdWVcbiAgKi9cbiAgdGhpcy5nZXQgPSBmdW5jdGlvbih2YWx1ZU5hbWUsIHZhbHVlKSB7XG4gICAgdmFyIG1hdGNoZWRJdGVtcyA9IFtdO1xuICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IHNlbGYuaXRlbXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGl0ZW0gPSBzZWxmLml0ZW1zW2ldO1xuICAgICAgaWYgKGl0ZW0udmFsdWVzKClbdmFsdWVOYW1lXSA9PSB2YWx1ZSkge1xuICAgICAgICBtYXRjaGVkSXRlbXMucHVzaChpdGVtKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG1hdGNoZWRJdGVtcztcbiAgfTtcblxuICAvKlxuICAqIEdldCBzaXplIG9mIHRoZSBsaXN0XG4gICovXG4gIHRoaXMuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiBzZWxmLml0ZW1zLmxlbmd0aDtcbiAgfTtcblxuICAvKlxuICAqIFJlbW92ZXMgYWxsIGl0ZW1zIGZyb20gdGhlIGxpc3RcbiAgKi9cbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIHNlbGYudGVtcGxhdGVyLmNsZWFyKCk7XG4gICAgc2VsZi5pdGVtcyA9IFtdO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIHRoaXMub24gPSBmdW5jdGlvbihldmVudCwgY2FsbGJhY2spIHtcbiAgICBzZWxmLmhhbmRsZXJzW2V2ZW50XS5wdXNoKGNhbGxiYWNrKTtcbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLm9mZiA9IGZ1bmN0aW9uKGV2ZW50LCBjYWxsYmFjaykge1xuICAgIHZhciBlID0gc2VsZi5oYW5kbGVyc1tldmVudF07XG4gICAgdmFyIGluZGV4ID0gaW5kZXhPZihlLCBjYWxsYmFjayk7XG4gICAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICAgIGUuc3BsaWNlKGluZGV4LCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHNlbGY7XG4gIH07XG5cbiAgdGhpcy50cmlnZ2VyID0gZnVuY3Rpb24oZXZlbnQpIHtcbiAgICB2YXIgaSA9IHNlbGYuaGFuZGxlcnNbZXZlbnRdLmxlbmd0aDtcbiAgICB3aGlsZShpLS0pIHtcbiAgICAgIHNlbGYuaGFuZGxlcnNbZXZlbnRdW2ldKHNlbGYpO1xuICAgIH1cbiAgICByZXR1cm4gc2VsZjtcbiAgfTtcblxuICB0aGlzLnJlc2V0ID0ge1xuICAgIGZpbHRlcjogZnVuY3Rpb24oKSB7XG4gICAgICB2YXIgaXMgPSBzZWxmLml0ZW1zLFxuICAgICAgICBpbCA9IGlzLmxlbmd0aDtcbiAgICAgIHdoaWxlIChpbC0tKSB7XG4gICAgICAgIGlzW2lsXS5maWx0ZXJlZCA9IGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHNlbGY7XG4gICAgfSxcbiAgICBzZWFyY2g6IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGlzID0gc2VsZi5pdGVtcyxcbiAgICAgICAgaWwgPSBpcy5sZW5ndGg7XG4gICAgICB3aGlsZSAoaWwtLSkge1xuICAgICAgICBpc1tpbF0uZm91bmQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBzZWxmO1xuICAgIH1cbiAgfTtcblxuICB0aGlzLnVwZGF0ZSA9IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpcyA9IHNlbGYuaXRlbXMsXG5cdFx0XHRpbCA9IGlzLmxlbmd0aDtcblxuICAgIHNlbGYudmlzaWJsZUl0ZW1zID0gW107XG4gICAgc2VsZi5tYXRjaGluZ0l0ZW1zID0gW107XG4gICAgc2VsZi50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGlsOyBpKyspIHtcbiAgICAgIGlmIChpc1tpXS5tYXRjaGluZygpICYmICgoc2VsZi5tYXRjaGluZ0l0ZW1zLmxlbmd0aCsxKSA+PSBzZWxmLmkgJiYgc2VsZi52aXNpYmxlSXRlbXMubGVuZ3RoIDwgc2VsZi5wYWdlKSkge1xuICAgICAgICBpc1tpXS5zaG93KCk7XG4gICAgICAgIHNlbGYudmlzaWJsZUl0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBzZWxmLm1hdGNoaW5nSXRlbXMucHVzaChpc1tpXSk7XG4gICAgICB9IGVsc2UgaWYgKGlzW2ldLm1hdGNoaW5nKCkpIHtcbiAgICAgICAgc2VsZi5tYXRjaGluZ0l0ZW1zLnB1c2goaXNbaV0pO1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBpc1tpXS5oaWRlKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHNlbGYudHJpZ2dlcigndXBkYXRlZCcpO1xuICAgIHJldHVybiBzZWxmO1xuICB9O1xuXG4gIGluaXQuc3RhcnQoKTtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAxMiAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG52YXIgY2xhc3NlcyA9IF9fd2VicGFja19yZXF1aXJlX18oMCksXG4gIGV2ZW50cyA9IF9fd2VicGFja19yZXF1aXJlX18oMSksXG4gIExpc3QgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDExKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIHJlZnJlc2ggPSBmdW5jdGlvbihwYWdpbmdMaXN0LCBvcHRpb25zKSB7XG4gICAgdmFyIGl0ZW0sXG4gICAgICBsID0gbGlzdC5tYXRjaGluZ0l0ZW1zLmxlbmd0aCxcbiAgICAgIGluZGV4ID0gbGlzdC5pLFxuICAgICAgcGFnZSA9IGxpc3QucGFnZSxcbiAgICAgIHBhZ2VzID0gTWF0aC5jZWlsKGwgLyBwYWdlKSxcbiAgICAgIGN1cnJlbnRQYWdlID0gTWF0aC5jZWlsKChpbmRleCAvIHBhZ2UpKSxcbiAgICAgIGlubmVyV2luZG93ID0gb3B0aW9ucy5pbm5lcldpbmRvdyB8fCAyLFxuICAgICAgbGVmdCA9IG9wdGlvbnMubGVmdCB8fCBvcHRpb25zLm91dGVyV2luZG93IHx8IDAsXG4gICAgICByaWdodCA9IG9wdGlvbnMucmlnaHQgfHwgb3B0aW9ucy5vdXRlcldpbmRvdyB8fCAwO1xuXG4gICAgcmlnaHQgPSBwYWdlcyAtIHJpZ2h0O1xuXG4gICAgcGFnaW5nTGlzdC5jbGVhcigpO1xuICAgIGZvciAodmFyIGkgPSAxOyBpIDw9IHBhZ2VzOyBpKyspIHtcbiAgICAgIHZhciBjbGFzc05hbWUgPSAoY3VycmVudFBhZ2UgPT09IGkpID8gXCJhY3RpdmVcIiA6IFwiXCI7XG5cbiAgICAgIC8vY29uc29sZS5sb2coaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCAoY3VycmVudFBhZ2UgLSBpbm5lcldpbmRvdyksIChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSwgY2xhc3NOYW1lKTtcblxuICAgICAgaWYgKGlzLm51bWJlcihpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IGksXG4gICAgICAgICAgZG90dGVkOiBmYWxzZVxuICAgICAgICB9KVswXTtcbiAgICAgICAgaWYgKGNsYXNzTmFtZSkge1xuICAgICAgICAgIGNsYXNzZXMoaXRlbS5lbG0pLmFkZChjbGFzc05hbWUpO1xuICAgICAgICB9XG4gICAgICAgIGFkZEV2ZW50KGl0ZW0uZWxtLCBpLCBwYWdlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXMuZG90dGVkKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIHBhZ2luZ0xpc3Quc2l6ZSgpKSkge1xuICAgICAgICBpdGVtID0gcGFnaW5nTGlzdC5hZGQoe1xuICAgICAgICAgIHBhZ2U6IFwiLi4uXCIsXG4gICAgICAgICAgZG90dGVkOiB0cnVlXG4gICAgICAgIH0pWzBdO1xuICAgICAgICBjbGFzc2VzKGl0ZW0uZWxtKS5hZGQoXCJkaXNhYmxlZFwiKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGlzID0ge1xuICAgIG51bWJlcjogZnVuY3Rpb24oaSwgbGVmdCwgcmlnaHQsIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykge1xuICAgICAgIHJldHVybiB0aGlzLmxlZnQoaSwgbGVmdCkgfHwgdGhpcy5yaWdodChpLCByaWdodCkgfHwgdGhpcy5pbm5lcldpbmRvdyhpLCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpO1xuICAgIH0sXG4gICAgbGVmdDogZnVuY3Rpb24oaSwgbGVmdCkge1xuICAgICAgcmV0dXJuIChpIDw9IGxlZnQpO1xuICAgIH0sXG4gICAgcmlnaHQ6IGZ1bmN0aW9uKGksIHJpZ2h0KSB7XG4gICAgICByZXR1cm4gKGkgPiByaWdodCk7XG4gICAgfSxcbiAgICBpbm5lcldpbmRvdzogZnVuY3Rpb24oaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB7XG4gICAgICByZXR1cm4gKCBpID49IChjdXJyZW50UGFnZSAtIGlubmVyV2luZG93KSAmJiBpIDw9IChjdXJyZW50UGFnZSArIGlubmVyV2luZG93KSk7XG4gICAgfSxcbiAgICBkb3R0ZWQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgcmV0dXJuIHRoaXMuZG90dGVkTGVmdChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSB8fCAodGhpcy5kb3R0ZWRSaWdodChwYWdpbmdMaXN0LCBpLCBsZWZ0LCByaWdodCwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93LCBjdXJyZW50UGFnZUl0ZW0pKTtcbiAgICB9LFxuICAgIGRvdHRlZExlZnQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3cpIHtcbiAgICAgIHJldHVybiAoKGkgPT0gKGxlZnQgKyAxKSkgJiYgIXRoaXMuaW5uZXJXaW5kb3coaSwgY3VycmVudFBhZ2UsIGlubmVyV2luZG93KSAmJiAhdGhpcy5yaWdodChpLCByaWdodCkpO1xuICAgIH0sXG4gICAgZG90dGVkUmlnaHQ6IGZ1bmN0aW9uKHBhZ2luZ0xpc3QsIGksIGxlZnQsIHJpZ2h0LCBjdXJyZW50UGFnZSwgaW5uZXJXaW5kb3csIGN1cnJlbnRQYWdlSXRlbSkge1xuICAgICAgaWYgKHBhZ2luZ0xpc3QuaXRlbXNbY3VycmVudFBhZ2VJdGVtLTFdLnZhbHVlcygpLmRvdHRlZCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gKChpID09IChyaWdodCkpICYmICF0aGlzLmlubmVyV2luZG93KGksIGN1cnJlbnRQYWdlLCBpbm5lcldpbmRvdykgJiYgIXRoaXMucmlnaHQoaSwgcmlnaHQpKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgdmFyIGFkZEV2ZW50ID0gZnVuY3Rpb24oZWxtLCBpLCBwYWdlKSB7XG4gICAgIGV2ZW50cy5iaW5kKGVsbSwgJ2NsaWNrJywgZnVuY3Rpb24oKSB7XG4gICAgICAgbGlzdC5zaG93KChpLTEpKnBhZ2UgKyAxLCBwYWdlKTtcbiAgICAgfSk7XG4gIH07XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICB2YXIgcGFnaW5nTGlzdCA9IG5ldyBMaXN0KGxpc3QubGlzdENvbnRhaW5lci5pZCwge1xuICAgICAgbGlzdENsYXNzOiBvcHRpb25zLnBhZ2luYXRpb25DbGFzcyB8fCAncGFnaW5hdGlvbicsXG4gICAgICBpdGVtOiBcIjxsaT48YSBjbGFzcz0ncGFnZScgaHJlZj0namF2YXNjcmlwdDpmdW5jdGlvbiBaKCl7Wj1cXFwiXFxcIn1aKCknPjwvYT48L2xpPlwiLFxuICAgICAgdmFsdWVOYW1lczogWydwYWdlJywgJ2RvdHRlZCddLFxuICAgICAgc2VhcmNoQ2xhc3M6ICdwYWdpbmF0aW9uLXNlYXJjaC10aGF0LWlzLW5vdC1zdXBwb3NlZC10by1leGlzdCcsXG4gICAgICBzb3J0Q2xhc3M6ICdwYWdpbmF0aW9uLXNvcnQtdGhhdC1pcy1ub3Qtc3VwcG9zZWQtdG8tZXhpc3QnXG4gICAgfSk7XG5cbiAgICBsaXN0Lm9uKCd1cGRhdGVkJywgZnVuY3Rpb24oKSB7XG4gICAgICByZWZyZXNoKHBhZ2luZ0xpc3QsIG9wdGlvbnMpO1xuICAgIH0pO1xuICAgIHJlZnJlc2gocGFnaW5nTGlzdCwgb3B0aW9ucyk7XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTMgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG5cbiAgdmFyIEl0ZW0gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKDIpKGxpc3QpO1xuXG4gIHZhciBnZXRDaGlsZHJlbiA9IGZ1bmN0aW9uKHBhcmVudCkge1xuICAgIHZhciBub2RlcyA9IHBhcmVudC5jaGlsZE5vZGVzLFxuICAgICAgaXRlbXMgPSBbXTtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBub2Rlcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgIGlmIChub2Rlc1tpXS5kYXRhID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaXRlbXMucHVzaChub2Rlc1tpXSk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBpdGVtcztcbiAgfTtcblxuICB2YXIgcGFyc2UgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBpdGVtRWxlbWVudHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgbGlzdC5pdGVtcy5wdXNoKG5ldyBJdGVtKHZhbHVlTmFtZXMsIGl0ZW1FbGVtZW50c1tpXSkpO1xuICAgIH1cbiAgfTtcbiAgdmFyIHBhcnNlQXN5bmMgPSBmdW5jdGlvbihpdGVtRWxlbWVudHMsIHZhbHVlTmFtZXMpIHtcbiAgICB2YXIgaXRlbXNUb0luZGV4ID0gaXRlbUVsZW1lbnRzLnNwbGljZSgwLCA1MCk7IC8vIFRPRE86IElmIDwgMTAwIGl0ZW1zLCB3aGF0IGhhcHBlbnMgaW4gSUUgZXRjP1xuICAgIHBhcnNlKGl0ZW1zVG9JbmRleCwgdmFsdWVOYW1lcyk7XG4gICAgaWYgKGl0ZW1FbGVtZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICBwYXJzZUFzeW5jKGl0ZW1FbGVtZW50cywgdmFsdWVOYW1lcyk7XG4gICAgICB9LCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC51cGRhdGUoKTtcbiAgICAgIGxpc3QudHJpZ2dlcigncGFyc2VDb21wbGV0ZScpO1xuICAgIH1cbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgPSBsaXN0LmhhbmRsZXJzLnBhcnNlQ29tcGxldGUgfHwgW107XG5cbiAgcmV0dXJuIGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtc1RvSW5kZXggPSBnZXRDaGlsZHJlbihsaXN0Lmxpc3QpLFxuICAgICAgdmFsdWVOYW1lcyA9IGxpc3QudmFsdWVOYW1lcztcblxuICAgIGlmIChsaXN0LmluZGV4QXN5bmMpIHtcbiAgICAgIHBhcnNlQXN5bmMoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcGFyc2UoaXRlbXNUb0luZGV4LCB2YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTQgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtLFxuICAgIHRleHQsXG4gICAgY29sdW1ucyxcbiAgICBzZWFyY2hTdHJpbmcsXG4gICAgY3VzdG9tU2VhcmNoO1xuXG4gIHZhciBwcmVwYXJlID0ge1xuICAgIHJlc2V0TGlzdDogZnVuY3Rpb24oKSB7XG4gICAgICBsaXN0LmkgPSAxO1xuICAgICAgbGlzdC50ZW1wbGF0ZXIuY2xlYXIoKTtcbiAgICAgIGN1c3RvbVNlYXJjaCA9IHVuZGVmaW5lZDtcbiAgICB9LFxuICAgIHNldE9wdGlvbnM6IGZ1bmN0aW9uKGFyZ3MpIHtcbiAgICAgIGlmIChhcmdzLmxlbmd0aCA9PSAyICYmIGFyZ3NbMV0gaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICBjb2x1bW5zID0gYXJnc1sxXTtcbiAgICAgIH0gZWxzZSBpZiAoYXJncy5sZW5ndGggPT0gMiAmJiB0eXBlb2YoYXJnc1sxXSkgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgIGNvbHVtbnMgPSB1bmRlZmluZWQ7XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMV07XG4gICAgICB9IGVsc2UgaWYgKGFyZ3MubGVuZ3RoID09IDMpIHtcbiAgICAgICAgY29sdW1ucyA9IGFyZ3NbMV07XG4gICAgICAgIGN1c3RvbVNlYXJjaCA9IGFyZ3NbMl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb2x1bW5zID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0sXG4gICAgc2V0Q29sdW1uczogZnVuY3Rpb24oKSB7XG4gICAgICBpZiAobGlzdC5pdGVtcy5sZW5ndGggPT09IDApIHJldHVybjtcbiAgICAgIGlmIChjb2x1bW5zID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgY29sdW1ucyA9IChsaXN0LnNlYXJjaENvbHVtbnMgPT09IHVuZGVmaW5lZCkgPyBwcmVwYXJlLnRvQXJyYXkobGlzdC5pdGVtc1swXS52YWx1ZXMoKSkgOiBsaXN0LnNlYXJjaENvbHVtbnM7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRTZWFyY2hTdHJpbmc6IGZ1bmN0aW9uKHMpIHtcbiAgICAgIHMgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHMpLnRvTG93ZXJDYXNlKCk7XG4gICAgICBzID0gcy5yZXBsYWNlKC9bLVtcXF17fSgpKis/LixcXFxcXiR8I10vZywgXCJcXFxcJCZcIik7IC8vIEVzY2FwZSByZWd1bGFyIGV4cHJlc3Npb24gY2hhcmFjdGVyc1xuICAgICAgc2VhcmNoU3RyaW5nID0gcztcbiAgICB9LFxuICAgIHRvQXJyYXk6IGZ1bmN0aW9uKHZhbHVlcykge1xuICAgICAgdmFyIHRtcENvbHVtbiA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB2YWx1ZXMpIHtcbiAgICAgICAgdG1wQ29sdW1uLnB1c2gobmFtZSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdG1wQ29sdW1uO1xuICAgIH1cbiAgfTtcbiAgdmFyIHNlYXJjaCA9IHtcbiAgICBsaXN0OiBmdW5jdGlvbigpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwLCBrbCA9IGxpc3QuaXRlbXMubGVuZ3RoOyBrIDwga2w7IGsrKykge1xuICAgICAgICBzZWFyY2guaXRlbShsaXN0Lml0ZW1zW2tdKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGl0ZW06IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICAgIGl0ZW0uZm91bmQgPSBmYWxzZTtcbiAgICAgIGZvciAodmFyIGogPSAwLCBqbCA9IGNvbHVtbnMubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICBpZiAoc2VhcmNoLnZhbHVlcyhpdGVtLnZhbHVlcygpLCBjb2x1bW5zW2pdKSkge1xuICAgICAgICAgIGl0ZW0uZm91bmQgPSB0cnVlO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gICAgdmFsdWVzOiBmdW5jdGlvbih2YWx1ZXMsIGNvbHVtbikge1xuICAgICAgaWYgKHZhbHVlcy5oYXNPd25Qcm9wZXJ0eShjb2x1bW4pKSB7XG4gICAgICAgIHRleHQgPSBsaXN0LnV0aWxzLnRvU3RyaW5nKHZhbHVlc1tjb2x1bW5dKS50b0xvd2VyQ2FzZSgpO1xuICAgICAgICBpZiAoKHNlYXJjaFN0cmluZyAhPT0gXCJcIikgJiYgKHRleHQuc2VhcmNoKHNlYXJjaFN0cmluZykgPiAtMSkpIHtcbiAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH0sXG4gICAgcmVzZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgbGlzdC5yZXNldC5zZWFyY2goKTtcbiAgICAgIGxpc3Quc2VhcmNoZWQgPSBmYWxzZTtcbiAgICB9XG4gIH07XG5cbiAgdmFyIHNlYXJjaE1ldGhvZCA9IGZ1bmN0aW9uKHN0cikge1xuICAgIGxpc3QudHJpZ2dlcignc2VhcmNoU3RhcnQnKTtcblxuICAgIHByZXBhcmUucmVzZXRMaXN0KCk7XG4gICAgcHJlcGFyZS5zZXRTZWFyY2hTdHJpbmcoc3RyKTtcbiAgICBwcmVwYXJlLnNldE9wdGlvbnMoYXJndW1lbnRzKTsgLy8gc3RyLCBjb2xzfHNlYXJjaEZ1bmN0aW9uLCBzZWFyY2hGdW5jdGlvblxuICAgIHByZXBhcmUuc2V0Q29sdW1ucygpO1xuXG4gICAgaWYgKHNlYXJjaFN0cmluZyA9PT0gXCJcIiApIHtcbiAgICAgIHNlYXJjaC5yZXNldCgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsaXN0LnNlYXJjaGVkID0gdHJ1ZTtcbiAgICAgIGlmIChjdXN0b21TZWFyY2gpIHtcbiAgICAgICAgY3VzdG9tU2VhcmNoKHNlYXJjaFN0cmluZywgY29sdW1ucyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzZWFyY2gubGlzdCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxpc3QudXBkYXRlKCk7XG4gICAgbGlzdC50cmlnZ2VyKCdzZWFyY2hDb21wbGV0ZScpO1xuICAgIHJldHVybiBsaXN0LnZpc2libGVJdGVtcztcbiAgfTtcblxuICBsaXN0LmhhbmRsZXJzLnNlYXJjaFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zZWFyY2hTdGFydCB8fCBbXTtcbiAgbGlzdC5oYW5kbGVycy5zZWFyY2hDb21wbGV0ZSA9IGxpc3QuaGFuZGxlcnMuc2VhcmNoQ29tcGxldGUgfHwgW107XG5cbiAgbGlzdC51dGlscy5ldmVudHMuYmluZChsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNlYXJjaENsYXNzKSwgJ2tleXVwJywgZnVuY3Rpb24oZSkge1xuICAgIHZhciB0YXJnZXQgPSBlLnRhcmdldCB8fCBlLnNyY0VsZW1lbnQsIC8vIElFIGhhdmUgc3JjRWxlbWVudFxuICAgICAgYWxyZWFkeUNsZWFyZWQgPSAodGFyZ2V0LnZhbHVlID09PSBcIlwiICYmICFsaXN0LnNlYXJjaGVkKTtcbiAgICBpZiAoIWFscmVhZHlDbGVhcmVkKSB7IC8vIElmIG9uaW5wdXQgYWxyZWFkeSBoYXZlIHJlc2V0dGVkIHRoZSBsaXN0LCBkbyBub3RoaW5nXG4gICAgICBzZWFyY2hNZXRob2QodGFyZ2V0LnZhbHVlKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIFVzZWQgdG8gZGV0ZWN0IGNsaWNrIG9uIEhUTUw1IGNsZWFyIGJ1dHRvblxuICBsaXN0LnV0aWxzLmV2ZW50cy5iaW5kKGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhsaXN0Lmxpc3RDb250YWluZXIsIGxpc3Quc2VhcmNoQ2xhc3MpLCAnaW5wdXQnLCBmdW5jdGlvbihlKSB7XG4gICAgdmFyIHRhcmdldCA9IGUudGFyZ2V0IHx8IGUuc3JjRWxlbWVudDtcbiAgICBpZiAodGFyZ2V0LnZhbHVlID09PSBcIlwiKSB7XG4gICAgICBzZWFyY2hNZXRob2QoJycpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHNlYXJjaE1ldGhvZDtcbn07XG5cblxuLyoqKi8gfSksXG4vKiAxNSAqL1xuLyoqKi8gKGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cykge1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcblxuICB2YXIgYnV0dG9ucyA9IHtcbiAgICBlbHM6IHVuZGVmaW5lZCxcbiAgICBjbGVhcjogZnVuY3Rpb24oKSB7XG4gICAgICBmb3IgKHZhciBpID0gMCwgaWwgPSBidXR0b25zLmVscy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidXR0b25zLmVsc1tpXSkucmVtb3ZlKCdhc2MnKTtcbiAgICAgICAgbGlzdC51dGlscy5jbGFzc2VzKGJ1dHRvbnMuZWxzW2ldKS5yZW1vdmUoJ2Rlc2MnKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIGdldE9yZGVyOiBmdW5jdGlvbihidG4pIHtcbiAgICAgIHZhciBwcmVkZWZpbmVkT3JkZXIgPSBsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLW9yZGVyJyk7XG4gICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgIHJldHVybiBwcmVkZWZpbmVkT3JkZXI7XG4gICAgICB9IGVsc2UgaWYgKGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmhhcygnZGVzYycpKSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfSBlbHNlIGlmIChsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5oYXMoJ2FzYycpKSB7XG4gICAgICAgIHJldHVybiBcImRlc2NcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBcImFzY1wiO1xuICAgICAgfVxuICAgIH0sXG4gICAgZ2V0SW5TZW5zaXRpdmU6IGZ1bmN0aW9uKGJ0biwgb3B0aW9ucykge1xuICAgICAgdmFyIGluc2Vuc2l0aXZlID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1pbnNlbnNpdGl2ZScpO1xuICAgICAgaWYgKGluc2Vuc2l0aXZlID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IGZhbHNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9IHRydWU7XG4gICAgICB9XG4gICAgfSxcbiAgICBzZXRPcmRlcjogZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gYnV0dG9ucy5lbHMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICB2YXIgYnRuID0gYnV0dG9ucy5lbHNbaV07XG4gICAgICAgIGlmIChsaXN0LnV0aWxzLmdldEF0dHJpYnV0ZShidG4sICdkYXRhLXNvcnQnKSAhPT0gb3B0aW9ucy52YWx1ZU5hbWUpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJlZGVmaW5lZE9yZGVyID0gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoYnRuLCAnZGF0YS1vcmRlcicpO1xuICAgICAgICBpZiAocHJlZGVmaW5lZE9yZGVyID09IFwiYXNjXCIgfHwgcHJlZGVmaW5lZE9yZGVyID09IFwiZGVzY1wiKSB7XG4gICAgICAgICAgaWYgKHByZWRlZmluZWRPcmRlciA9PSBvcHRpb25zLm9yZGVyKSB7XG4gICAgICAgICAgICBsaXN0LnV0aWxzLmNsYXNzZXMoYnRuKS5hZGQob3B0aW9ucy5vcmRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGxpc3QudXRpbHMuY2xhc3NlcyhidG4pLmFkZChvcHRpb25zLm9yZGVyKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB2YXIgc29ydCA9IGZ1bmN0aW9uKCkge1xuICAgIGxpc3QudHJpZ2dlcignc29ydFN0YXJ0Jyk7XG4gICAgdmFyIG9wdGlvbnMgPSB7fTtcblxuICAgIHZhciB0YXJnZXQgPSBhcmd1bWVudHNbMF0uY3VycmVudFRhcmdldCB8fCBhcmd1bWVudHNbMF0uc3JjRWxlbWVudCB8fCB1bmRlZmluZWQ7XG5cbiAgICBpZiAodGFyZ2V0KSB7XG4gICAgICBvcHRpb25zLnZhbHVlTmFtZSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKHRhcmdldCwgJ2RhdGEtc29ydCcpO1xuICAgICAgYnV0dG9ucy5nZXRJblNlbnNpdGl2ZSh0YXJnZXQsIG9wdGlvbnMpO1xuICAgICAgb3B0aW9ucy5vcmRlciA9IGJ1dHRvbnMuZ2V0T3JkZXIodGFyZ2V0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucyA9IGFyZ3VtZW50c1sxXSB8fCBvcHRpb25zO1xuICAgICAgb3B0aW9ucy52YWx1ZU5hbWUgPSBhcmd1bWVudHNbMF07XG4gICAgICBvcHRpb25zLm9yZGVyID0gb3B0aW9ucy5vcmRlciB8fCBcImFzY1wiO1xuICAgICAgb3B0aW9ucy5pbnNlbnNpdGl2ZSA9ICh0eXBlb2Ygb3B0aW9ucy5pbnNlbnNpdGl2ZSA9PSBcInVuZGVmaW5lZFwiKSA/IHRydWUgOiBvcHRpb25zLmluc2Vuc2l0aXZlO1xuICAgIH1cblxuICAgIGJ1dHRvbnMuY2xlYXIoKTtcbiAgICBidXR0b25zLnNldE9yZGVyKG9wdGlvbnMpO1xuXG5cbiAgICAvLyBjYXNlSW5zZW5zaXRpdmVcbiAgICAvLyBhbHBoYWJldFxuICAgIHZhciBjdXN0b21Tb3J0RnVuY3Rpb24gPSAob3B0aW9ucy5zb3J0RnVuY3Rpb24gfHwgbGlzdC5zb3J0RnVuY3Rpb24gfHwgbnVsbCksXG4gICAgICAgIG11bHRpID0gKChvcHRpb25zLm9yZGVyID09PSAnZGVzYycpID8gLTEgOiAxKSxcbiAgICAgICAgc29ydEZ1bmN0aW9uO1xuXG4gICAgaWYgKGN1c3RvbVNvcnRGdW5jdGlvbikge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHJldHVybiBjdXN0b21Tb3J0RnVuY3Rpb24oaXRlbUEsIGl0ZW1CLCBvcHRpb25zKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgc29ydEZ1bmN0aW9uID0gZnVuY3Rpb24oaXRlbUEsIGl0ZW1CKSB7XG4gICAgICAgIHZhciBzb3J0ID0gbGlzdC51dGlscy5uYXR1cmFsU29ydDtcbiAgICAgICAgc29ydC5hbHBoYWJldCA9IGxpc3QuYWxwaGFiZXQgfHwgb3B0aW9ucy5hbHBoYWJldCB8fCB1bmRlZmluZWQ7XG4gICAgICAgIGlmICghc29ydC5hbHBoYWJldCAmJiBvcHRpb25zLmluc2Vuc2l0aXZlKSB7XG4gICAgICAgICAgc29ydCA9IGxpc3QudXRpbHMubmF0dXJhbFNvcnQuY2FzZUluc2Vuc2l0aXZlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzb3J0KGl0ZW1BLnZhbHVlcygpW29wdGlvbnMudmFsdWVOYW1lXSwgaXRlbUIudmFsdWVzKClbb3B0aW9ucy52YWx1ZU5hbWVdKSAqIG11bHRpO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBsaXN0Lml0ZW1zLnNvcnQoc29ydEZ1bmN0aW9uKTtcbiAgICBsaXN0LnVwZGF0ZSgpO1xuICAgIGxpc3QudHJpZ2dlcignc29ydENvbXBsZXRlJyk7XG4gIH07XG5cbiAgLy8gQWRkIGhhbmRsZXJzXG4gIGxpc3QuaGFuZGxlcnMuc29ydFN0YXJ0ID0gbGlzdC5oYW5kbGVycy5zb3J0U3RhcnQgfHwgW107XG4gIGxpc3QuaGFuZGxlcnMuc29ydENvbXBsZXRlID0gbGlzdC5oYW5kbGVycy5zb3J0Q29tcGxldGUgfHwgW107XG5cbiAgYnV0dG9ucy5lbHMgPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MobGlzdC5saXN0Q29udGFpbmVyLCBsaXN0LnNvcnRDbGFzcyk7XG4gIGxpc3QudXRpbHMuZXZlbnRzLmJpbmQoYnV0dG9ucy5lbHMsICdjbGljaycsIHNvcnQpO1xuICBsaXN0Lm9uKCdzZWFyY2hTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuICBsaXN0Lm9uKCdmaWx0ZXJTdGFydCcsIGJ1dHRvbnMuY2xlYXIpO1xuXG4gIHJldHVybiBzb3J0O1xufTtcblxuXG4vKioqLyB9KSxcbi8qIDE2ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbnZhciBUZW1wbGF0ZXIgPSBmdW5jdGlvbihsaXN0KSB7XG4gIHZhciBpdGVtU291cmNlLFxuICAgIHRlbXBsYXRlciA9IHRoaXM7XG5cbiAgdmFyIGluaXQgPSBmdW5jdGlvbigpIHtcbiAgICBpdGVtU291cmNlID0gdGVtcGxhdGVyLmdldEl0ZW1Tb3VyY2UobGlzdC5pdGVtKTtcbiAgICBpZiAoaXRlbVNvdXJjZSkge1xuICAgICAgaXRlbVNvdXJjZSA9IHRlbXBsYXRlci5jbGVhclNvdXJjZUl0ZW0oaXRlbVNvdXJjZSwgbGlzdC52YWx1ZU5hbWVzKTtcbiAgICB9XG4gIH07XG5cbiAgdGhpcy5jbGVhclNvdXJjZUl0ZW0gPSBmdW5jdGlvbihlbCwgdmFsdWVOYW1lcykge1xuICAgIGZvcih2YXIgaSA9IDAsIGlsID0gdmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICB2YXIgZWxtO1xuICAgICAgaWYgKHZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICBmb3IgKHZhciBqID0gMCwgamwgPSB2YWx1ZU5hbWVzW2ldLmRhdGEubGVuZ3RoOyBqIDwgamw7IGorKykge1xuICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSwgJycpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZXNbaV0uYXR0ciAmJiB2YWx1ZU5hbWVzW2ldLm5hbWUpIHtcbiAgICAgICAgZWxtID0gbGlzdC51dGlscy5nZXRCeUNsYXNzKGVsLCB2YWx1ZU5hbWVzW2ldLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWVzW2ldLmF0dHIsIFwiXCIpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoZWwsIHZhbHVlTmFtZXNbaV0sIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLmlubmVySFRNTCA9IFwiXCI7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIGVsO1xuICB9O1xuXG4gIHRoaXMuZ2V0SXRlbVNvdXJjZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB2YXIgbm9kZXMgPSBsaXN0Lmxpc3QuY2hpbGROb2RlcyxcbiAgICAgICAgaXRlbXMgPSBbXTtcblxuICAgICAgZm9yICh2YXIgaSA9IDAsIGlsID0gbm9kZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgICAvLyBPbmx5IHRleHRub2RlcyBoYXZlIGEgZGF0YSBhdHRyaWJ1dGVcbiAgICAgICAgaWYgKG5vZGVzW2ldLmRhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiBub2Rlc1tpXS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC88dHJbXFxzPl0vZy5leGVjKGl0ZW0pKSB7XG4gICAgICB2YXIgdGJvZHkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCd0Ym9keScpO1xuICAgICAgdGJvZHkuaW5uZXJIVE1MID0gaXRlbTtcbiAgICAgIHJldHVybiB0Ym9keS5maXJzdENoaWxkO1xuICAgIH0gZWxzZSBpZiAoaXRlbS5pbmRleE9mKFwiPFwiKSAhPT0gLTEpIHtcbiAgICAgIHZhciBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGRpdi5pbm5lckhUTUwgPSBpdGVtO1xuICAgICAgcmV0dXJuIGRpdi5maXJzdENoaWxkO1xuICAgIH0gZWxzZSB7XG4gICAgICB2YXIgc291cmNlID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQobGlzdC5pdGVtKTtcbiAgICAgIGlmIChzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfTtcblxuICB0aGlzLmdldCA9IGZ1bmN0aW9uKGl0ZW0sIHZhbHVlTmFtZXMpIHtcbiAgICB0ZW1wbGF0ZXIuY3JlYXRlKGl0ZW0pO1xuICAgIHZhciB2YWx1ZXMgPSB7fTtcbiAgICBmb3IodmFyIGkgPSAwLCBpbCA9IHZhbHVlTmFtZXMubGVuZ3RoOyBpIDwgaWw7IGkrKykge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIGlmICh2YWx1ZU5hbWVzW2ldLmRhdGEpIHtcbiAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gdmFsdWVOYW1lc1tpXS5kYXRhLmxlbmd0aDsgaiA8IGpsOyBqKyspIHtcbiAgICAgICAgICB2YWx1ZXNbdmFsdWVOYW1lc1tpXS5kYXRhW2pdXSA9IGxpc3QudXRpbHMuZ2V0QXR0cmlidXRlKGl0ZW0uZWxtLCAnZGF0YS0nK3ZhbHVlTmFtZXNbaV0uZGF0YVtqXSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodmFsdWVOYW1lc1tpXS5hdHRyICYmIHZhbHVlTmFtZXNbaV0ubmFtZSkge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZXNbaV0ubmFtZSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldLm5hbWVdID0gZWxtID8gbGlzdC51dGlscy5nZXRBdHRyaWJ1dGUoZWxtLCB2YWx1ZU5hbWVzW2ldLmF0dHIpIDogXCJcIjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lc1tpXSwgdHJ1ZSk7XG4gICAgICAgIHZhbHVlc1t2YWx1ZU5hbWVzW2ldXSA9IGVsbSA/IGVsbS5pbm5lckhUTUwgOiBcIlwiO1xuICAgICAgfVxuICAgICAgZWxtID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWVzO1xuICB9O1xuXG4gIHRoaXMuc2V0ID0gZnVuY3Rpb24oaXRlbSwgdmFsdWVzKSB7XG4gICAgdmFyIGdldFZhbHVlTmFtZSA9IGZ1bmN0aW9uKG5hbWUpIHtcbiAgICAgIGZvciAodmFyIGkgPSAwLCBpbCA9IGxpc3QudmFsdWVOYW1lcy5sZW5ndGg7IGkgPCBpbDsgaSsrKSB7XG4gICAgICAgIGlmIChsaXN0LnZhbHVlTmFtZXNbaV0uZGF0YSkge1xuICAgICAgICAgIHZhciBkYXRhID0gbGlzdC52YWx1ZU5hbWVzW2ldLmRhdGE7XG4gICAgICAgICAgZm9yICh2YXIgaiA9IDAsIGpsID0gZGF0YS5sZW5ndGg7IGogPCBqbDsgaisrKSB7XG4gICAgICAgICAgICBpZiAoZGF0YVtqXSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICByZXR1cm4geyBkYXRhOiBuYW1lIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXS5hdHRyICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lICYmIGxpc3QudmFsdWVOYW1lc1tpXS5uYW1lID09IG5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gbGlzdC52YWx1ZU5hbWVzW2ldO1xuICAgICAgICB9IGVsc2UgaWYgKGxpc3QudmFsdWVOYW1lc1tpXSA9PT0gbmFtZSkge1xuICAgICAgICAgIHJldHVybiBuYW1lO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgICB2YXIgc2V0VmFsdWUgPSBmdW5jdGlvbihuYW1lLCB2YWx1ZSkge1xuICAgICAgdmFyIGVsbTtcbiAgICAgIHZhciB2YWx1ZU5hbWUgPSBnZXRWYWx1ZU5hbWUobmFtZSk7XG4gICAgICBpZiAoIXZhbHVlTmFtZSlcbiAgICAgICAgcmV0dXJuO1xuICAgICAgaWYgKHZhbHVlTmFtZS5kYXRhKSB7XG4gICAgICAgIGl0ZW0uZWxtLnNldEF0dHJpYnV0ZSgnZGF0YS0nK3ZhbHVlTmFtZS5kYXRhLCB2YWx1ZSk7XG4gICAgICB9IGVsc2UgaWYgKHZhbHVlTmFtZS5hdHRyICYmIHZhbHVlTmFtZS5uYW1lKSB7XG4gICAgICAgIGVsbSA9IGxpc3QudXRpbHMuZ2V0QnlDbGFzcyhpdGVtLmVsbSwgdmFsdWVOYW1lLm5hbWUsIHRydWUpO1xuICAgICAgICBpZiAoZWxtKSB7XG4gICAgICAgICAgZWxtLnNldEF0dHJpYnV0ZSh2YWx1ZU5hbWUuYXR0ciwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBlbG0gPSBsaXN0LnV0aWxzLmdldEJ5Q2xhc3MoaXRlbS5lbG0sIHZhbHVlTmFtZSwgdHJ1ZSk7XG4gICAgICAgIGlmIChlbG0pIHtcbiAgICAgICAgICBlbG0uaW5uZXJIVE1MID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGVsbSA9IHVuZGVmaW5lZDtcbiAgICB9O1xuICAgIGlmICghdGVtcGxhdGVyLmNyZWF0ZShpdGVtKSkge1xuICAgICAgZm9yKHZhciB2IGluIHZhbHVlcykge1xuICAgICAgICBpZiAodmFsdWVzLmhhc093blByb3BlcnR5KHYpKSB7XG4gICAgICAgICAgc2V0VmFsdWUodiwgdmFsdWVzW3ZdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICB0aGlzLmNyZWF0ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgICBpZiAoaXRlbS5lbG0gIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoaXRlbVNvdXJjZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgbGlzdCBuZWVkIHRvIGhhdmUgYXQgbGlzdCBvbmUgaXRlbSBvbiBpbml0IG90aGVyd2lzZSB5b3UnbGwgaGF2ZSB0byBhZGQgYSB0ZW1wbGF0ZS5cIik7XG4gICAgfVxuICAgIC8qIElmIGl0ZW0gc291cmNlIGRvZXMgbm90IGV4aXN0cywgdXNlIHRoZSBmaXJzdCBpdGVtIGluIGxpc3QgYXNcbiAgICBzb3VyY2UgZm9yIG5ldyBpdGVtcyAqL1xuICAgIHZhciBuZXdJdGVtID0gaXRlbVNvdXJjZS5jbG9uZU5vZGUodHJ1ZSk7XG4gICAgbmV3SXRlbS5yZW1vdmVBdHRyaWJ1dGUoJ2lkJyk7XG4gICAgaXRlbS5lbG0gPSBuZXdJdGVtO1xuICAgIHRlbXBsYXRlci5zZXQoaXRlbSwgaXRlbS52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG4gIHRoaXMucmVtb3ZlID0gZnVuY3Rpb24oaXRlbSkge1xuICAgIGlmIChpdGVtLmVsbS5wYXJlbnROb2RlID09PSBsaXN0Lmxpc3QpIHtcbiAgICAgIGxpc3QubGlzdC5yZW1vdmVDaGlsZChpdGVtLmVsbSk7XG4gICAgfVxuICB9O1xuICB0aGlzLnNob3cgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgdGVtcGxhdGVyLmNyZWF0ZShpdGVtKTtcbiAgICBsaXN0Lmxpc3QuYXBwZW5kQ2hpbGQoaXRlbS5lbG0pO1xuICB9O1xuICB0aGlzLmhpZGUgPSBmdW5jdGlvbihpdGVtKSB7XG4gICAgaWYgKGl0ZW0uZWxtICE9PSB1bmRlZmluZWQgJiYgaXRlbS5lbG0ucGFyZW50Tm9kZSA9PT0gbGlzdC5saXN0KSB7XG4gICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQoaXRlbS5lbG0pO1xuICAgIH1cbiAgfTtcbiAgdGhpcy5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgIC8qIC5pbm5lckhUTUwgPSAnJzsgZnVja3MgdXAgSUUgKi9cbiAgICBpZiAobGlzdC5saXN0Lmhhc0NoaWxkTm9kZXMoKSkge1xuICAgICAgd2hpbGUgKGxpc3QubGlzdC5jaGlsZE5vZGVzLmxlbmd0aCA+PSAxKVxuICAgICAge1xuICAgICAgICBsaXN0Lmxpc3QucmVtb3ZlQ2hpbGQobGlzdC5saXN0LmZpcnN0Q2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBpbml0KCk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QpIHtcbiAgcmV0dXJuIG5ldyBUZW1wbGF0ZXIobGlzdCk7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTcgKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMpIHtcblxuLyoqXG4gKiBBIGNyb3NzLWJyb3dzZXIgaW1wbGVtZW50YXRpb24gb2YgZ2V0QXR0cmlidXRlLlxuICogU291cmNlIGZvdW5kIGhlcmU6IGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzM3NTUzNDMvMzYxMzM3IHdyaXR0ZW4gYnkgVml2aW4gUGFsaWF0aFxuICpcbiAqIFJldHVybiB0aGUgdmFsdWUgZm9yIGBhdHRyYCBhdCBgZWxlbWVudGAuXG4gKlxuICogQHBhcmFtIHtFbGVtZW50fSBlbFxuICogQHBhcmFtIHtTdHJpbmd9IGF0dHJcbiAqIEBhcGkgcHVibGljXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihlbCwgYXR0cikge1xuICB2YXIgcmVzdWx0ID0gKGVsLmdldEF0dHJpYnV0ZSAmJiBlbC5nZXRBdHRyaWJ1dGUoYXR0cikpIHx8IG51bGw7XG4gIGlmKCAhcmVzdWx0ICkge1xuICAgIHZhciBhdHRycyA9IGVsLmF0dHJpYnV0ZXM7XG4gICAgdmFyIGxlbmd0aCA9IGF0dHJzLmxlbmd0aDtcbiAgICBmb3IodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICAgIGlmIChhdHRyW2ldICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgaWYoYXR0cltpXS5ub2RlTmFtZSA9PT0gYXR0cikge1xuICAgICAgICAgIHJlc3VsdCA9IGF0dHJbaV0ubm9kZVZhbHVlO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5cbi8qKiovIH0pLFxuLyogMTggKi9cbi8qKiovIChmdW5jdGlvbihtb2R1bGUsIGV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pIHtcblxuXCJ1c2Ugc3RyaWN0XCI7XG5cblxudmFyIGFscGhhYmV0O1xudmFyIGFscGhhYmV0SW5kZXhNYXA7XG52YXIgYWxwaGFiZXRJbmRleE1hcExlbmd0aCA9IDA7XG5cbmZ1bmN0aW9uIGlzTnVtYmVyQ29kZShjb2RlKSB7XG4gIHJldHVybiBjb2RlID49IDQ4ICYmIGNvZGUgPD0gNTc7XG59XG5cbmZ1bmN0aW9uIG5hdHVyYWxDb21wYXJlKGEsIGIpIHtcbiAgdmFyIGxlbmd0aEEgPSAoYSArPSAnJykubGVuZ3RoO1xuICB2YXIgbGVuZ3RoQiA9IChiICs9ICcnKS5sZW5ndGg7XG4gIHZhciBhSW5kZXggPSAwO1xuICB2YXIgYkluZGV4ID0gMDtcblxuICB3aGlsZSAoYUluZGV4IDwgbGVuZ3RoQSAmJiBiSW5kZXggPCBsZW5ndGhCKSB7XG4gICAgdmFyIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChhSW5kZXgpO1xuICAgIHZhciBjaGFyQ29kZUIgPSBiLmNoYXJDb2RlQXQoYkluZGV4KTtcblxuICAgIGlmIChpc051bWJlckNvZGUoY2hhckNvZGVBKSkge1xuICAgICAgaWYgKCFpc051bWJlckNvZGUoY2hhckNvZGVCKSkge1xuICAgICAgICByZXR1cm4gY2hhckNvZGVBIC0gY2hhckNvZGVCO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtU3RhcnRBID0gYUluZGV4O1xuICAgICAgdmFyIG51bVN0YXJ0QiA9IGJJbmRleDtcblxuICAgICAgd2hpbGUgKGNoYXJDb2RlQSA9PT0gNDggJiYgKytudW1TdGFydEEgPCBsZW5ndGhBKSB7XG4gICAgICAgIGNoYXJDb2RlQSA9IGEuY2hhckNvZGVBdChudW1TdGFydEEpO1xuICAgICAgfVxuICAgICAgd2hpbGUgKGNoYXJDb2RlQiA9PT0gNDggJiYgKytudW1TdGFydEIgPCBsZW5ndGhCKSB7XG4gICAgICAgIGNoYXJDb2RlQiA9IGIuY2hhckNvZGVBdChudW1TdGFydEIpO1xuICAgICAgfVxuXG4gICAgICB2YXIgbnVtRW5kQSA9IG51bVN0YXJ0QTtcbiAgICAgIHZhciBudW1FbmRCID0gbnVtU3RhcnRCO1xuXG4gICAgICB3aGlsZSAobnVtRW5kQSA8IGxlbmd0aEEgJiYgaXNOdW1iZXJDb2RlKGEuY2hhckNvZGVBdChudW1FbmRBKSkpIHtcbiAgICAgICAgKytudW1FbmRBO1xuICAgICAgfVxuICAgICAgd2hpbGUgKG51bUVuZEIgPCBsZW5ndGhCICYmIGlzTnVtYmVyQ29kZShiLmNoYXJDb2RlQXQobnVtRW5kQikpKSB7XG4gICAgICAgICsrbnVtRW5kQjtcbiAgICAgIH1cblxuICAgICAgdmFyIGRpZmZlcmVuY2UgPSBudW1FbmRBIC0gbnVtU3RhcnRBIC0gbnVtRW5kQiArIG51bVN0YXJ0QjsgLy8gbnVtQSBsZW5ndGggLSBudW1CIGxlbmd0aFxuICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgcmV0dXJuIGRpZmZlcmVuY2U7XG4gICAgICB9XG5cbiAgICAgIHdoaWxlIChudW1TdGFydEEgPCBudW1FbmRBKSB7XG4gICAgICAgIGRpZmZlcmVuY2UgPSBhLmNoYXJDb2RlQXQobnVtU3RhcnRBKyspIC0gYi5jaGFyQ29kZUF0KG51bVN0YXJ0QisrKTtcbiAgICAgICAgaWYgKGRpZmZlcmVuY2UpIHtcbiAgICAgICAgICByZXR1cm4gZGlmZmVyZW5jZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhSW5kZXggPSBudW1FbmRBO1xuICAgICAgYkluZGV4ID0gbnVtRW5kQjtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjaGFyQ29kZUEgIT09IGNoYXJDb2RlQikge1xuICAgICAgaWYgKFxuICAgICAgICBjaGFyQ29kZUEgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoICYmXG4gICAgICAgIGNoYXJDb2RlQiA8IGFscGhhYmV0SW5kZXhNYXBMZW5ndGggJiZcbiAgICAgICAgYWxwaGFiZXRJbmRleE1hcFtjaGFyQ29kZUFdICE9PSAtMSAmJlxuICAgICAgICBhbHBoYWJldEluZGV4TWFwW2NoYXJDb2RlQl0gIT09IC0xXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVBXSAtIGFscGhhYmV0SW5kZXhNYXBbY2hhckNvZGVCXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGNoYXJDb2RlQSAtIGNoYXJDb2RlQjtcbiAgICB9XG5cbiAgICArK2FJbmRleDtcbiAgICArK2JJbmRleDtcbiAgfVxuXG4gIHJldHVybiBsZW5ndGhBIC0gbGVuZ3RoQjtcbn1cblxubmF0dXJhbENvbXBhcmUuY2FzZUluc2Vuc2l0aXZlID0gbmF0dXJhbENvbXBhcmUuaSA9IGZ1bmN0aW9uKGEsIGIpIHtcbiAgcmV0dXJuIG5hdHVyYWxDb21wYXJlKCgnJyArIGEpLnRvTG93ZXJDYXNlKCksICgnJyArIGIpLnRvTG93ZXJDYXNlKCkpO1xufTtcblxuT2JqZWN0LmRlZmluZVByb3BlcnRpZXMobmF0dXJhbENvbXBhcmUsIHtcbiAgYWxwaGFiZXQ6IHtcbiAgICBnZXQ6IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGFscGhhYmV0O1xuICAgIH0sXG4gICAgc2V0OiBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgYWxwaGFiZXQgPSB2YWx1ZTtcbiAgICAgIGFscGhhYmV0SW5kZXhNYXAgPSBbXTtcbiAgICAgIHZhciBpID0gMDtcbiAgICAgIGlmIChhbHBoYWJldCkge1xuICAgICAgICBmb3IgKDsgaSA8IGFscGhhYmV0Lmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgYWxwaGFiZXRJbmRleE1hcFthbHBoYWJldC5jaGFyQ29kZUF0KGkpXSA9IGk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFscGhhYmV0SW5kZXhNYXBMZW5ndGggPSBhbHBoYWJldEluZGV4TWFwLmxlbmd0aDtcbiAgICAgIGZvciAoaSA9IDA7IGkgPCBhbHBoYWJldEluZGV4TWFwTGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKGFscGhhYmV0SW5kZXhNYXBbaV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFscGhhYmV0SW5kZXhNYXBbaV0gPSAtMTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0sXG4gIH0sXG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBuYXR1cmFsQ29tcGFyZTtcblxuXG4vKioqLyB9KSxcbi8qIDE5ICovXG4vKioqLyAoZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzKSB7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24odGV4dCwgcGF0dGVybiwgb3B0aW9ucykge1xuICAgIC8vIEFwcm94aW1hdGVseSB3aGVyZSBpbiB0aGUgdGV4dCBpcyB0aGUgcGF0dGVybiBleHBlY3RlZCB0byBiZSBmb3VuZD9cbiAgICB2YXIgTWF0Y2hfTG9jYXRpb24gPSBvcHRpb25zLmxvY2F0aW9uIHx8IDA7XG5cbiAgICAvL0RldGVybWluZXMgaG93IGNsb3NlIHRoZSBtYXRjaCBtdXN0IGJlIHRvIHRoZSBmdXp6eSBsb2NhdGlvbiAoc3BlY2lmaWVkIGFib3ZlKS4gQW4gZXhhY3QgbGV0dGVyIG1hdGNoIHdoaWNoIGlzICdkaXN0YW5jZScgY2hhcmFjdGVycyBhd2F5IGZyb20gdGhlIGZ1enp5IGxvY2F0aW9uIHdvdWxkIHNjb3JlIGFzIGEgY29tcGxldGUgbWlzbWF0Y2guIEEgZGlzdGFuY2Ugb2YgJzAnIHJlcXVpcmVzIHRoZSBtYXRjaCBiZSBhdCB0aGUgZXhhY3QgbG9jYXRpb24gc3BlY2lmaWVkLCBhIHRocmVzaG9sZCBvZiAnMTAwMCcgd291bGQgcmVxdWlyZSBhIHBlcmZlY3QgbWF0Y2ggdG8gYmUgd2l0aGluIDgwMCBjaGFyYWN0ZXJzIG9mIHRoZSBmdXp6eSBsb2NhdGlvbiB0byBiZSBmb3VuZCB1c2luZyBhIDAuOCB0aHJlc2hvbGQuXG4gICAgdmFyIE1hdGNoX0Rpc3RhbmNlID0gb3B0aW9ucy5kaXN0YW5jZSB8fCAxMDA7XG5cbiAgICAvLyBBdCB3aGF0IHBvaW50IGRvZXMgdGhlIG1hdGNoIGFsZ29yaXRobSBnaXZlIHVwLiBBIHRocmVzaG9sZCBvZiAnMC4wJyByZXF1aXJlcyBhIHBlcmZlY3QgbWF0Y2ggKG9mIGJvdGggbGV0dGVycyBhbmQgbG9jYXRpb24pLCBhIHRocmVzaG9sZCBvZiAnMS4wJyB3b3VsZCBtYXRjaCBhbnl0aGluZy5cbiAgICB2YXIgTWF0Y2hfVGhyZXNob2xkID0gb3B0aW9ucy50aHJlc2hvbGQgfHwgMC40O1xuXG4gICAgaWYgKHBhdHRlcm4gPT09IHRleHQpIHJldHVybiB0cnVlOyAvLyBFeGFjdCBtYXRjaFxuICAgIGlmIChwYXR0ZXJuLmxlbmd0aCA+IDMyKSByZXR1cm4gZmFsc2U7IC8vIFRoaXMgYWxnb3JpdGhtIGNhbm5vdCBiZSB1c2VkXG5cbiAgICAvLyBTZXQgc3RhcnRpbmcgbG9jYXRpb24gYXQgYmVnaW5uaW5nIHRleHQgYW5kIGluaXRpYWxpc2UgdGhlIGFscGhhYmV0LlxuICAgIHZhciBsb2MgPSBNYXRjaF9Mb2NhdGlvbixcbiAgICAgICAgcyA9IChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBxID0ge30sXG4gICAgICAgICAgICAgICAgaTtcblxuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IHBhdHRlcm4ubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgICAgICBxW3BhdHRlcm4uY2hhckF0KGkpXSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBwYXR0ZXJuLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgcVtwYXR0ZXJuLmNoYXJBdChpKV0gfD0gMSA8PCAocGF0dGVybi5sZW5ndGggLSBpIC0gMSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBxO1xuICAgICAgICB9KCkpO1xuXG4gICAgLy8gQ29tcHV0ZSBhbmQgcmV0dXJuIHRoZSBzY29yZSBmb3IgYSBtYXRjaCB3aXRoIGUgZXJyb3JzIGFuZCB4IGxvY2F0aW9uLlxuICAgIC8vIEFjY2Vzc2VzIGxvYyBhbmQgcGF0dGVybiB0aHJvdWdoIGJlaW5nIGEgY2xvc3VyZS5cblxuICAgIGZ1bmN0aW9uIG1hdGNoX2JpdGFwU2NvcmVfKGUsIHgpIHtcbiAgICAgICAgdmFyIGFjY3VyYWN5ID0gZSAvIHBhdHRlcm4ubGVuZ3RoLFxuICAgICAgICAgICAgcHJveGltaXR5ID0gTWF0aC5hYnMobG9jIC0geCk7XG5cbiAgICAgICAgaWYgKCFNYXRjaF9EaXN0YW5jZSkge1xuICAgICAgICAgICAgLy8gRG9kZ2UgZGl2aWRlIGJ5IHplcm8gZXJyb3IuXG4gICAgICAgICAgICByZXR1cm4gcHJveGltaXR5ID8gMS4wIDogYWNjdXJhY3k7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjY3VyYWN5ICsgKHByb3hpbWl0eSAvIE1hdGNoX0Rpc3RhbmNlKTtcbiAgICB9XG5cbiAgICB2YXIgc2NvcmVfdGhyZXNob2xkID0gTWF0Y2hfVGhyZXNob2xkLCAvLyBIaWdoZXN0IHNjb3JlIGJleW9uZCB3aGljaCB3ZSBnaXZlIHVwLlxuICAgICAgICBiZXN0X2xvYyA9IHRleHQuaW5kZXhPZihwYXR0ZXJuLCBsb2MpOyAvLyBJcyB0aGVyZSBhIG5lYXJieSBleGFjdCBtYXRjaD8gKHNwZWVkdXApXG5cbiAgICBpZiAoYmVzdF9sb2MgIT0gLTEpIHtcbiAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICAvLyBXaGF0IGFib3V0IGluIHRoZSBvdGhlciBkaXJlY3Rpb24/IChzcGVlZHVwKVxuICAgICAgICBiZXN0X2xvYyA9IHRleHQubGFzdEluZGV4T2YocGF0dGVybiwgbG9jICsgcGF0dGVybi5sZW5ndGgpO1xuXG4gICAgICAgIGlmIChiZXN0X2xvYyAhPSAtMSkge1xuICAgICAgICAgICAgc2NvcmVfdGhyZXNob2xkID0gTWF0aC5taW4obWF0Y2hfYml0YXBTY29yZV8oMCwgYmVzdF9sb2MpLCBzY29yZV90aHJlc2hvbGQpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLy8gSW5pdGlhbGlzZSB0aGUgYml0IGFycmF5cy5cbiAgICB2YXIgbWF0Y2htYXNrID0gMSA8PCAocGF0dGVybi5sZW5ndGggLSAxKTtcbiAgICBiZXN0X2xvYyA9IC0xO1xuXG4gICAgdmFyIGJpbl9taW4sIGJpbl9taWQ7XG4gICAgdmFyIGJpbl9tYXggPSBwYXR0ZXJuLmxlbmd0aCArIHRleHQubGVuZ3RoO1xuICAgIHZhciBsYXN0X3JkO1xuICAgIGZvciAodmFyIGQgPSAwOyBkIDwgcGF0dGVybi5sZW5ndGg7IGQrKykge1xuICAgICAgICAvLyBTY2FuIGZvciB0aGUgYmVzdCBtYXRjaDsgZWFjaCBpdGVyYXRpb24gYWxsb3dzIGZvciBvbmUgbW9yZSBlcnJvci5cbiAgICAgICAgLy8gUnVuIGEgYmluYXJ5IHNlYXJjaCB0byBkZXRlcm1pbmUgaG93IGZhciBmcm9tICdsb2MnIHdlIGNhbiBzdHJheSBhdCB0aGlzXG4gICAgICAgIC8vIGVycm9yIGxldmVsLlxuICAgICAgICBiaW5fbWluID0gMDtcbiAgICAgICAgYmluX21pZCA9IGJpbl9tYXg7XG4gICAgICAgIHdoaWxlIChiaW5fbWluIDwgYmluX21pZCkge1xuICAgICAgICAgICAgaWYgKG1hdGNoX2JpdGFwU2NvcmVfKGQsIGxvYyArIGJpbl9taWQpIDw9IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgICAgIGJpbl9taW4gPSBiaW5fbWlkO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBiaW5fbWF4ID0gYmluX21pZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGJpbl9taWQgPSBNYXRoLmZsb29yKChiaW5fbWF4IC0gYmluX21pbikgLyAyICsgYmluX21pbik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gVXNlIHRoZSByZXN1bHQgZnJvbSB0aGlzIGl0ZXJhdGlvbiBhcyB0aGUgbWF4aW11bSBmb3IgdGhlIG5leHQuXG4gICAgICAgIGJpbl9tYXggPSBiaW5fbWlkO1xuICAgICAgICB2YXIgc3RhcnQgPSBNYXRoLm1heCgxLCBsb2MgLSBiaW5fbWlkICsgMSk7XG4gICAgICAgIHZhciBmaW5pc2ggPSBNYXRoLm1pbihsb2MgKyBiaW5fbWlkLCB0ZXh0Lmxlbmd0aCkgKyBwYXR0ZXJuLmxlbmd0aDtcblxuICAgICAgICB2YXIgcmQgPSBBcnJheShmaW5pc2ggKyAyKTtcbiAgICAgICAgcmRbZmluaXNoICsgMV0gPSAoMSA8PCBkKSAtIDE7XG4gICAgICAgIGZvciAodmFyIGogPSBmaW5pc2g7IGogPj0gc3RhcnQ7IGotLSkge1xuICAgICAgICAgICAgLy8gVGhlIGFscGhhYmV0IChzKSBpcyBhIHNwYXJzZSBoYXNoLCBzbyB0aGUgZm9sbG93aW5nIGxpbmUgZ2VuZXJhdGVzXG4gICAgICAgICAgICAvLyB3YXJuaW5ncy5cbiAgICAgICAgICAgIHZhciBjaGFyTWF0Y2ggPSBzW3RleHQuY2hhckF0KGogLSAxKV07XG4gICAgICAgICAgICBpZiAoZCA9PT0gMCkgeyAgICAvLyBGaXJzdCBwYXNzOiBleGFjdCBtYXRjaC5cbiAgICAgICAgICAgICAgICByZFtqXSA9ICgocmRbaiArIDFdIDw8IDEpIHwgMSkgJiBjaGFyTWF0Y2g7XG4gICAgICAgICAgICB9IGVsc2UgeyAgICAvLyBTdWJzZXF1ZW50IHBhc3NlczogZnV6enkgbWF0Y2guXG4gICAgICAgICAgICAgICAgcmRbal0gPSAoKChyZFtqICsgMV0gPDwgMSkgfCAxKSAmIGNoYXJNYXRjaCkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAoKChsYXN0X3JkW2ogKyAxXSB8IGxhc3RfcmRbal0pIDw8IDEpIHwgMSkgfFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsYXN0X3JkW2ogKyAxXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmIChyZFtqXSAmIG1hdGNobWFzaykge1xuICAgICAgICAgICAgICAgIHZhciBzY29yZSA9IG1hdGNoX2JpdGFwU2NvcmVfKGQsIGogLSAxKTtcbiAgICAgICAgICAgICAgICAvLyBUaGlzIG1hdGNoIHdpbGwgYWxtb3N0IGNlcnRhaW5seSBiZSBiZXR0ZXIgdGhhbiBhbnkgZXhpc3RpbmcgbWF0Y2guXG4gICAgICAgICAgICAgICAgLy8gQnV0IGNoZWNrIGFueXdheS5cbiAgICAgICAgICAgICAgICBpZiAoc2NvcmUgPD0gc2NvcmVfdGhyZXNob2xkKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIFRvbGQgeW91IHNvLlxuICAgICAgICAgICAgICAgICAgICBzY29yZV90aHJlc2hvbGQgPSBzY29yZTtcbiAgICAgICAgICAgICAgICAgICAgYmVzdF9sb2MgPSBqIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGJlc3RfbG9jID4gbG9jKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBXaGVuIHBhc3NpbmcgbG9jLCBkb24ndCBleGNlZWQgb3VyIGN1cnJlbnQgZGlzdGFuY2UgZnJvbSBsb2MuXG4gICAgICAgICAgICAgICAgICAgICAgICBzdGFydCA9IE1hdGgubWF4KDEsIDIgKiBsb2MgLSBiZXN0X2xvYyk7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBbHJlYWR5IHBhc3NlZCBsb2MsIGRvd25oaWxsIGZyb20gaGVyZSBvbiBpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIE5vIGhvcGUgZm9yIGEgKGJldHRlcikgbWF0Y2ggYXQgZ3JlYXRlciBlcnJvciBsZXZlbHMuXG4gICAgICAgIGlmIChtYXRjaF9iaXRhcFNjb3JlXyhkICsgMSwgbG9jKSA+IHNjb3JlX3RocmVzaG9sZCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgbGFzdF9yZCA9IHJkO1xuICAgIH1cblxuICAgIHJldHVybiAoYmVzdF9sb2MgPCAwKSA/IGZhbHNlIDogdHJ1ZTtcbn07XG5cblxuLyoqKi8gfSlcbi8qKioqKiovIF0pOyJdLCJmaWxlIjoibGlzdC5qcyJ9
