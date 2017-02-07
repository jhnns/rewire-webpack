var RewirePlugin = require("../");

module.exports = {
    entry: "mocha-loader!" + __dirname + "/webpack.test.js",
    devtool: "eval",
    plugins: [
        new RewirePlugin()
    ]
};
