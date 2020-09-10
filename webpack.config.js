const webpack = require("webpack");
const dotenv = require("dotenv");

const isDev = process.env.NODE_ENV === "development";

const env = dotenv.config().parsed;

// reduce it to a nice object
const envKeys = Object.keys(env).reduce((prev, next) => {
	prev[`process.env.${next}`] = JSON.stringify(env[next]);
	return prev;
}, {});
console.log(envKeys);

module.exports = {
	mode: isDev ? "development" : "production",
	entry: [
		"@babel/polyfill", // enables async-await
		"./client/index.js"
	],
	output: {
		path: __dirname,
		filename: "./public/bundle.js"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	},
	devtool: "source-map",
	watchOptions: {
		ignored: /node_modules/
	},
	module: {
		rules: [
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [new webpack.DefinePlugin(envKeys)]
};
