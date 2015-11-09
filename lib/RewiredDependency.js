"use strict";

var Dependency = require("webpack/lib/Dependency.js");

function RewiredDependency(request, range) {
    Dependency.call(this);
    this.request = request;
    this.userRequest = request;
    this.Class = RewiredDependency;
    this.range = range;
}

RewiredDependency.prototype = Object.create(Dependency.prototype);
RewiredDependency.prototype.type = "rewire";
RewiredDependency.prototype.constructor = RewiredDependency;
RewiredDependency.prototype.isEqualResource = function (other) {
    return other instanceof RewiredDependency?
            this.request === other.request:
            false;
};

RewiredDependency.Template = require("webpack/lib/dependencies/ModuleDependencyTemplateAsId.js");

module.exports = RewiredDependency;
