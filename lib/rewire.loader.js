"use strict";

var detectStrictMode = require("rewire/lib/detectStrictMode.js"),
    getDefinePropertySrc = require("rewire/lib/getDefinePropertySrc.js"),
    path = require("path"),
    pathToGetImportGlobalsSrc = require.resolve("rewire/lib/getImportGlobalsSrc.js").split(path.sep).join("/");

function rewireLoader(src) {
    src =
            // Trying to hide the injected line in the debug view with extra whitespaces.
            '                                                                                                                                                ' +
            '/* this line was injected by rewire() */ ' + // Comment for the curious developer

            // Now all global variables are declared with a var statement so they can be changed via __set__()
            // without influencing global objects.
            'var global = window; ' + // window is our new global object
            'eval(require("' + pathToGetImportGlobalsSrc + '")()); ' +

            // The module src is wrapped inside a self-executing function.
            // This is necessary to separate the module src from the preceding eval(importGlobalsSrc),
            // because the module src can be in strict mode.
            // In strict mode eval() can only declare vars in the current scope. In this case our setters
            // and getters won't work.
            // @see https://developer.mozilla.org/en/JavaScript/Strict_mode#Making_eval_and_arguments_simpler
            "(function () { " +

            // If the module uses strict mode we must ensure that "use strict" stays at the beginning of the function.
            (detectStrictMode(src) ? ' "use strict"; ' : ' ') +

            src +

            // append at least a newline, the source may end with a line comment
            "\n" + getDefinePropertySrc() + " })();";

    return src;
}

module.exports = rewireLoader;