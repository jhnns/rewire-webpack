"use strict";

var ModuleDependency = require("webpack/lib/dependencies/ModuleDependency.js");

function RewiredDependency(request, range) {
    ModuleDependency.call(this, request);
    this.Class = RewiredDependency;
    this.range = range;
}

RewiredDependency.prototype = Object.create(ModuleDependency.prototype);
RewiredDependency.prototype.type = "rewire";

RewiredDependency.Template = require("webpack/lib/dependencies/ModuleDependencyTemplateAsId.js");

module.exports = RewiredDependency;