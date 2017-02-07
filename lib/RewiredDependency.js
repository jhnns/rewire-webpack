"use strict";

const Dependency = require("webpack/lib/Dependency.js");

class RewiredDependency extends Dependency {
  constructor(request, range) {
      super();
      this.request = request;
      this.userRequest = request;
      this.range = range;
  }

  isEqualResource(other) {
      return other instanceof RewiredDependency?
            this.request === other.request:
            false;
  }
}

RewiredDependency.Template = require("webpack/lib/dependencies/ModuleDependencyTemplateAsId.js");

module.exports = RewiredDependency;
