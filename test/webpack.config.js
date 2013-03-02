var RewirePlugin = require("../");

module.exports = {
    entry: "mocha!./webpack.test.js",
    devtool: "eval",
    module: {
        loaders: [{
            test: /\.css$/,
            loader: "style-loader!css-loader"
        }]
    },
    plugins: [
        new RewirePlugin()
    ]
};