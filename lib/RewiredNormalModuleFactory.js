"use strict";

var path = require("path");

function RewiredNormalModuleFactory(factory) {
    this.factory = factory;
}

RewiredNormalModuleFactory.prototype.create = function (data, callback) {
    this.factory.create(data, function onModuleCreate(err, module) {
        if (err) {
            return callback(err);
        }

        module.request += " rewired";
        module.userRequest += " (rewired)";
        module.loaders.unshift(path.join(__dirname, "rewire.loader.js"));

        return callback(null, module);
    });
};

module.exports = RewiredNormalModuleFactory;
