'use strict';

const path = require('path');

const MiniExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

const cssLoaders = param => {
	const loader = [
		{
			loader: MiniExtractPlugin.loader,
		},
		'css-loader'
	]

	if (param) {
		loader.push(param)
	}

	return loader
}

const filename = ext => `[contenthash].${ext}`

module.exports = {
	context: path.resolve(__dirname),
	mode: 'development',
	entry: {
		index: './src/js/index.js',
		catalog: './src/js/catalogIndex.js',
		details: './src/js/detailsIndex.js',
		admin: './src/admin'
	},
	resolve: {
		extensions: ['.js', '.jsx', '.ts', '.tsx']
	},
	output: {
		filename: '[name].[contenthash].js',
		chunkFilename: '[name].[contenthash].js',
		path: __dirname + '/public',
	},
	watch: true,
	watchOptions: {
		aggregateTimeout: 300,
		poll: 1000,
		ignored: '**/node_modules/',
	},

	devtool: "source-map",
	plugins: [
		new CleanWebpackPlugin(),
		new MiniExtractPlugin({
			filename: filename('css'),
		}),
		new HTMLWebpackPlugin({
			template: './src/admin/index.html',
			filename: 'admin.html',
			chunks: ['admin']
		}),
	],

	module: {
		rules: [
			{
				test: /\.(sass|scss)$/,
				use: cssLoaders('sass-loader')
			},
			{
				test: /\.(svg|png|jpg|gif)$/,
				loader: 'file-loader',
				options: {
					name: 'img/[name].[contenthash].[ext]'
				}
			},
			{
				test: /\.(ts|tsx)$/,
				loader: 'ts-loader',
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: [
							['@babel/preset-env', {
								debug: true,
								corejs: 3,
								useBuiltIns: 'usage'
							}],
							'@babel/react'
						],
					}
				}
			}
		]
	}
};