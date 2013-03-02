"use strict";

var path = require("path"),
    ModuleAliasPlugin = require("enhanced-resolve/lib/ModuleAliasPlugin.js"),
    RewiredNormalModuleFactory = require("./RewiredNormalModuleFactory.js"),
    RewiredDependency = require("./RewiredDependency.js");

function RewirePlugin() {}

RewirePlugin.prototype.apply = function (compiler) {
    // wire our RewiredDependency to our RewiredNormalModuleFactory
    // by decorating the original factory
    compiler.plugin("compilation", function(compilation, params) {
        var normalModuleFactory = params.normalModuleFactory,
            rewiredNormalModuleFactory = new RewiredNormalModuleFactory(normalModuleFactory);

        compilation.dependencyFactories.set(RewiredDependency, rewiredNormalModuleFactory);
        compilation.dependencyTemplates.set(RewiredDependency, new RewiredDependency.Template());
    });

    // accept "var rewire", elsewise it would not be parsed (as overwritten)
    compiler.parser.plugin("var rewire", function () {
        return true;
    });

    // find rewire(request: String) calls and bind our RewiredDependency
    compiler.parser.plugin("call rewire", function (expr) {
        var param,
            dep;

        if (expr.arguments.length !== 1) {
            return false;
        }

        param = this.evaluateExpression(expr.arguments[0]);
        if (!param.isString()) {
            return false;
        }

        dep = new RewiredDependency(param.string, param.range);
        dep.loc = expr.loc;
        this.state.current.addDependency(dep);

        return true;
    });

    // alias the require("rewire") to a webpack rewire
    compiler.resolvers.normal.apply(new ModuleAliasPlugin({
        rewire: path.join(__dirname, "rewire.web.js")
    }));
};

module.exports = RewirePlugin;