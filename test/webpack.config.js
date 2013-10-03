var RewirePlugin = require("../");

module.exports = {
    entry: "mocha!" + __dirname + "/webpack.test.js",
    devtool: "eval",
    plugins: [
        new RewirePlugin()
    ]
};