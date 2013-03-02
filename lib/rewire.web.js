"use strict";

function rewire(module) {
    var rewiredModule = {
        id: module,
        loaded: false,
        exports: {}
    };

    __webpack_modules__[module](rewiredModule, rewiredModule.exports, __webpack_require__);
    rewiredModule.loaded = true;

    return rewiredModule.exports;
}

module.exports = rewire;