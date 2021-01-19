// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var utils_1 = require("./utils/utils");

var mechanics_1 = require("./mechanics");

var property_1 = require("./property");

var event_1 = require("./event");

var sync_1 = require("./sync");

var constants_1 = require("./constants/constants");

utils_1.utils.log("Gamemode init");

if (!Array.isArray(global.knownEvents)) {
  global.knownEvents = [];
}

for (var _i = 0, _a = global.knownEvents; _i < _a.length; _i++) {
  var eventName = _a[_i];
  delete mp[eventName];
}

utils_1.utils.hook("onInit", function (pcFormId) {
  mp.onReinit(pcFormId);
});
property_1.isDeadPropInit();
property_1.consoleOutputPropInit();
property_1.spawnPointPropInit();
property_1.playerLevelPropInit();
property_1.playerRacePropInit();
property_1.scalePropInit();
property_1.activeProfessionInit();

event_1._Init();

event_1._onBashInit();

event_1._onHitInit();

event_1._onPowerAttackInit();

event_1._onRegenFinishInit();

event_1._onSprintStateChangeInit();

event_1._onConsoleCommandInit();

event_1._onLocalDeathInit();

event_1._onCurrentCellChangeInit();

event_1._onActivateInit();

sync_1.ActorValuesInit();
mechanics_1.spawnSystemInit();
mechanics_1.devCommandsInit();
mechanics_1.minesInit();
utils_1.utils.hook("onReinit", function (pcFormId, options) {
  if (sync_1.actorValues.setDefaults) {
    sync_1.actorValues.setDefaults(pcFormId, options);
  }

  if (!mp.get(pcFormId, "spawnPoint") || options && options.force) {
    mp.set(pcFormId, "spawnPoint", constants_1.defaultSpawnPoint);
  }

  mp.set(pcFormId, "scale", 1);
  mp.set(pcFormId, "activeProfession", null);
});
},{}]},{},["index.ts"], null)