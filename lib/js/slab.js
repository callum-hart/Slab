(function() {
  var Keyboarding, Slab, Utils, noop,
    bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    slice = [].slice;

  noop = function() {};

  Slab = (function() {
    Slab.prototype.defaultOptions = {
      tabToSearchContent: "Hit <span class=\"cm-key\">tab</span> to search",
      onSubmit: noop,
      withButton: false,
      buttonClass: "ss-search",
      firstComplete: {
        placeholder: "",
        noResultsText: "Can't search by",
        defaultKey: false,
        onFocussed: noop,
        onBlurred: noop,
        onAdd: noop,
        onSelect: noop,
        onNoResults: noop,
        onKeyedUp: noop,
        onKeyedDown: noop,
        onShowSuggestion: noop,
        onClearSuggestion: noop,
        onSuggestionSelected: noop
      },
      secondComplete: {
        placeholder: "",
        noResultsText: "No results match",
        canAddNewRecordsText: "(Hit enter to search)",
        onFocussed: noop,
        onBlurred: noop,
        onAdd: noop,
        onSelect: noop,
        onNoResults: noop,
        onKeyedUp: noop,
        onKeyedDown: noop,
        onShowSuggestion: noop,
        onClearSuggestion: noop,
        onSuggestionSelected: noop
      }
    };

    Slab.prototype.version = "0.1.0";

    function Slab(selector, options) {
      this.onButtonClick = bind(this.onButtonClick, this);
      if (typeof CompleteMe !== "undefined" && CompleteMe !== null) {
        this.handleElm(selector);
        if (this.elm) {
          this.options = Utils.extend({}, this.defaultOptions, options);
          this.options = Utils.extend({}, this.options, this);
          this.options.firstComplete = Utils.extend({}, this.defaultOptions.firstComplete, this.options.firstComplete);
          this.options.secondComplete = Utils.extend({}, this.defaultOptions.secondComplete, this.options.secondComplete);
          this.handleTemplate();
          this.handleCompleteMe();
          if (this.options.firstComplete.defaultKey) {
            this.handleDefaultKey();
          }
          if (this.options.firstComplete.selectedKey) {
            this.setFirstComplete(this.options.firstComplete.selectedKey);
          }
          if (this.options.firstComplete.selectedValue) {
            this.setFirstComplete(this.options.firstComplete.selectedValue);
          }
          if (this.options.secondComplete.value) {
            this.setSecondComplete(this.options.secondComplete.value);
          }
          this.bindPersistentEvents();
          this.handleHooks();
        } else {
          console.warn("Slab couldn't initialize " + selector + " as it's not in the DOM");
        }
      } else {
        console.error("Slab couldn't initialize because the dependency CompleteMe is missing. See https://github.com/callum-hart/Slab for more info.");
      }
    }

    Slab.prototype.handleElm = function(selector) {
      if (typeof selector === "string") {
        return this.elm = document.querySelector(selector);
      } else if (typeof selector === "object") {
        if (selector.nodeName) {
          return this.elm = selector;
        }
      }
    };

    Slab.prototype.bindPersistentEvents = function() {
      if (this.options.withButton) {
        return this.buttonElm.addEventListener("click", this.onButtonClick);
      }
    };

    Slab.prototype.onButtonClick = function(e) {
      var key, ref, secondComplete;
      key = (ref = Utils.where("value", this.firstComplete.input.value, this.options.firstComplete.data)) != null ? ref[0].key : void 0;
      secondComplete = this.secondComplete.input.value;
      if (Utils.present(key) && Utils.present(secondComplete)) {
        return this.handleSubmit(key, secondComplete);
      } else if (this.options.firstComplete.defaultKey) {
        if (!key) {
          return this.handleSubmit(this.options.firstComplete.defaultKey, this.firstComplete.input.value);
        }
      }
    };

    Slab.prototype.handleHooks = function() {
      this.firstComplete.options.onFocussed = (function(_this) {
        return function() {
          Utils.addClass("focussed", _this.elm);
          return _this.options.firstComplete.onFocussed();
        };
      })(this);
      this.firstComplete.options.onBlurred = (function(_this) {
        return function() {
          Utils.removeClass("focussed", _this.elm);
          return _this.options.firstComplete.onBlurred();
        };
      })(this);
      this.firstComplete.options.onAdd = (function(_this) {
        return function(value) {
          _this.handleSubmit(_this.firstComplete.options.defaultKey, value);
          return _this.options.firstComplete.onAdd(value);
        };
      })(this);
      this.firstComplete.options.onSelect = (function(_this) {
        return function(value, key) {
          _this.focusSecondComplete();
          return _this.options.firstComplete.onSelect(value, key);
        };
      })(this);
      this.firstComplete.options.onNoResults = (function(_this) {
        return function(value) {
          return _this.options.firstComplete.onNoResults(value);
        };
      })(this);
      this.firstComplete.options.onKeyedUp = (function(_this) {
        return function(value) {
          return _this.options.firstComplete.onKeyedUp(value);
        };
      })(this);
      this.firstComplete.options.onKeyedDown = (function(_this) {
        return function(e) {
          if (Keyboarding.isTab(e.keyCode)) {

            /*
              If tab is pressed and the input value matches the suggestion set the value of the input
              to the 'data-result' of the suggestion element. Needed because suggestion is case
              insensitve so typing in 'name' matches 'Name' -> so convert inputs value 'name' to 'Name'.
             */
            if (Utils.present(_this.firstComplete.input.value)) {
              if (_this.firstComplete.input.value === _this.firstComplete.suggestionElm.value) {
                _this.firstComplete.input.value = _this.firstComplete.suggestionElm.dataset.result;
                _this.firstComplete.selectedResult = _this.firstComplete.resultsElm.querySelector("a.index-0");
              }
            }
          }
          if (Keyboarding.isTab(e.keyCode) && _this.firstComplete.selectedResult) {
            e.preventDefault();
            _this.firstComplete.input.value = _this.firstComplete.selectedResult.dataset.result;
            _this.focusSecondComplete();
          }
          return _this.options.firstComplete.onKeyedDown(e);
        };
      })(this);
      this.firstComplete.options.onShowSuggestion = (function(_this) {
        return function(suggestion) {
          _this.showTabToSearch();
          return _this.options.firstComplete.onShowSuggestion(suggestion);
        };
      })(this);
      this.firstComplete.options.onClearSuggestion = (function(_this) {
        return function() {
          _this.hideTabToSearch();
          return _this.options.firstComplete.onClearSuggestion();
        };
      })(this);
      this.firstComplete.options.onSuggestionSelected = (function(_this) {
        return function(value, key) {
          if (key === "TAB") {
            _this.focusSecondComplete();
          }
          return _this.options.firstComplete.onSuggestionSelected(value, key);
        };
      })(this);
      this.secondComplete.options.onFocussed = (function(_this) {
        return function() {
          _this.onSecondCompleteFocussed();
          Utils.addClass("focussed", _this.elm);
          return _this.options.secondComplete.onFocussed();
        };
      })(this);
      this.secondComplete.options.onBlurred = (function(_this) {
        return function() {
          Utils.removeClass("focussed", _this.elm);
          return _this.options.secondComplete.onBlurred();
        };
      })(this);
      this.secondComplete.options.onAdd = (function(_this) {
        return function(value) {
          var key;
          key = Utils.where("value", _this.firstComplete.input.value, _this.options.firstComplete.data)[0].key;
          _this.handleSubmit(key, value);
          _this.secondComplete.hideResults();
          return _this.options.secondComplete.onAdd(value);
        };
      })(this);
      this.secondComplete.options.onSelect = (function(_this) {
        return function(value) {
          var key;
          key = Utils.where("value", _this.firstComplete.input.value, _this.options.firstComplete.data)[0].key;
          _this.handleSubmit(key, value);
          _this.secondComplete.hideResults();
          return _this.options.secondComplete.onSelect(value);
        };
      })(this);
      this.secondComplete.options.onNoResults = (function(_this) {
        return function(value) {
          return _this.options.secondComplete.onNoResults(value);
        };
      })(this);
      this.secondComplete.options.onKeyedUp = (function(_this) {
        return function(value) {
          return _this.options.secondComplete.onKeyedUp(value);
        };
      })(this);
      this.secondComplete.options.onKeyedDown = (function(_this) {
        return function(e) {
          if (Keyboarding.isBackspace(e.keyCode) && _this.secondComplete.input.value.length === 0) {
            _this.hideSelectedLabel();
            _this.focusFirstComplete();
          }
          return _this.options.secondComplete.onKeyedDown(e);
        };
      })(this);
      this.secondComplete.options.onShowSuggestion = (function(_this) {
        return function(suggestion) {
          return _this.options.secondComplete.onShowSuggestion(suggestion);
        };
      })(this);
      this.secondComplete.options.onClearSuggestion = (function(_this) {
        return function() {
          return _this.options.secondComplete.onClearSuggestion();
        };
      })(this);
      return this.secondComplete.options.onSuggestionSelected = (function(_this) {
        return function(value, key) {
          return _this.options.secondComplete.onSuggestionSelected(value, key);
        };
      })(this);
    };

    Slab.prototype.handleCompleteMe = function() {
      this.firstComplete = new CompleteMe(this.firstCompleteMeElm, this.options.firstComplete);
      return this.secondComplete = new CompleteMe(this.secondCompleteMeElm, this.options.secondComplete);
    };

    Slab.prototype.focusFirstComplete = function() {
      return this.firstComplete.input.focus();
    };

    Slab.prototype.focusSecondComplete = function() {
      return window.requestAnimationFrame((function(_this) {
        return function() {
          _this.showSelectedLabel(_this.firstComplete.input.value);
          return _this.secondComplete.input.focus();
        };
      })(this));
    };

    Slab.prototype.onSecondCompleteFocussed = function() {
      if (this.firstComplete.input.value.length === 0 || this.selectedLabelElm.innerText.length > -1) {
        return this.focusFirstComplete();
      }
    };

    Slab.prototype.setFirstComplete = function(key) {
      debugger;
      var value;
      if (Utils.present(key)) {
        value = Utils.where("key", key, this.options.firstComplete.data)[0].value;
        this.firstComplete.setValue(value);
        return this.showSelectedLabel(value);
      }
    };

    Slab.prototype.setSecondComplete = function(value) {
      if (Utils.present(value)) {
        return this.secondComplete.setValue(value);
      }
    };

    Slab.prototype.handleDefaultKey = function() {
      return this.firstComplete.options.canAddNewRecords = true;
    };

    Slab.prototype.handleSubmit = function(key, value) {
      this.secondComplete.hideResults();
      return this.options.onSubmit(key, value);
    };

    Slab.prototype.reset = function() {
      this.hideSelectedLabel();
      this.firstComplete.setValue("");
      this.secondComplete.setValue("");
      return this.secondComplete.input.blur();
    };

    Slab.prototype.render = function(elm, template) {
      return elm.innerHTML = template;
    };

    Slab.prototype.handleTemplate = function() {
      this.containerClass = "sb-container";
      this.autoCompleteClass = "sb-complete";
      this.selectedLabelClass = "sb-label";
      this.tabToSearchClass = "sb-tab";
      this.template = "<span class=\"" + this.selectedLabelClass + "\"></span>\n<div class=\"" + this.autoCompleteClass + " first-complete-me\"></div>\n<div class=\"" + this.autoCompleteClass + " second-complete-me\"></div>\n<span class=\"" + this.tabToSearchClass + "\"></span>";
      if (this.options.withButton) {
        this.buttonClass = "sb-button";
        this.buttonSnippet = "<button type=\"button\" class=\"" + this.buttonClass + " " + this.options.buttonClass + "\"></button>";
        this.template += this.buttonSnippet;
      }
      this.render(this.elm, this.template);
      Utils.addClass(this.containerClass, this.elm);
      this.selectedLabelElm = this.elm.querySelector("." + this.selectedLabelClass);
      this.tabToSearchElm = this.elm.querySelector("." + this.tabToSearchClass);
      this.buttonElm = this.elm.querySelector("." + this.buttonClass);
      this.firstCompleteMeElm = this.elm.querySelector(".first-complete-me");
      return this.secondCompleteMeElm = this.elm.querySelector(".second-complete-me");
    };

    Slab.prototype.showTabToSearch = function() {
      Utils.addClass("tab-showing", this.tabToSearchElm);
      return this.render(this.tabToSearchElm, this.options.tabToSearchContent);
    };

    Slab.prototype.hideTabToSearch = function() {
      Utils.removeClass("tab-showing", this.tabToSearchElm);
      return this.render(this.tabToSearchElm, "");
    };

    Slab.prototype.showSelectedLabel = function(value) {
      this.render(this.selectedLabelElm, value + ":");
      return Utils.addClass("label-showing", this.elm);
    };

    Slab.prototype.hideSelectedLabel = function() {
      this.render(this.selectedLabelElm, "");
      return Utils.removeClass("label-showing", this.elm);
    };

    return Slab;

  })();

  window.Slab = Slab;

  Utils = {
    extend: function() {
      var i, key, len, object, objects, target, val;
      target = arguments[0], objects = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      for (i = 0, len = objects.length; i < len; i++) {
        object = objects[i];
        for (key in object) {
          val = object[key];
          target[key] = val;
        }
      }
      return target;
    },
    where: function(key, value, array) {
      var results;
      results = [];
      array.filter(function(object) {
        if (typeof object === "object") {
          if (object[key] === value) {
            return results.push(object);
          }
        } else {
          if (object === value) {
            return results.push(object);
          }
        }
      });
      if (results.length > 0) {
        return results;
      }
    },
    addClass: function(className, elm) {
      return elm.classList.add(className);
    },
    removeClass: function(className, elm) {
      return elm.classList.remove(className);
    },
    present: function(thing) {
      var result;
      if (typeof thing === "string") {
        result = thing.length > 0;
      }
      if (typeof thing === "number") {
        result = true;
      }
      return result;
    }
  };

  Keyboarding = {
    isTab: function(keyCode) {
      if (keyCode === 9) {
        return true;
      } else {
        return false;
      }
    },
    isBackspace: function(keyCode) {
      if (keyCode === 8) {
        return true;
      } else {
        return false;
      }
    }
  };

}).call(this);
