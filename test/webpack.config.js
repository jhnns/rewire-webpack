var RewirePlugin = require("../");

module.exports = {
    entry: "mocha!./webpack.test.js",
    devtool: "eval",
    plugins: [
        new RewirePlugin()
    ]
};