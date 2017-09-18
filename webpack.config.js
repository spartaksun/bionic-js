'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
	entry: './src/index.js',
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist'),
	},
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader'
			},
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'html-loader'
            },
            {
                test: /\.css$/,
                exclude: /node_modules/,
                loader: 'style-loader!css-loader'
            },
		]
	},
	plugins: [
		new CopyWebpackPlugin([
			{ from: './src/index.html' },
			{ from: './src/style.css' }
		])
	],
	devServer: {
		contentBase: path.join(__dirname, 'dist')
	},
    resolve: {
        alias: {
            'handlebars': 'handlebars/dist/handlebars.min.js',
			'components': path.resolve(__dirname, 'src/components/'),
			'services': path.resolve(__dirname, 'src/services/'),
			'data': path.resolve(__dirname, 'src/data/'),
        }
    }
};













