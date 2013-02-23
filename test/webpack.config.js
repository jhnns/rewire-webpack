var RewirePlugin = require("../lib/RewirePlugin.js");
module.exports = {
	entry: "mocha!./webpackTests.js",
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