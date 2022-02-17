'use strict';

const MiniExtractPlugin = require('mini-css-extract-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

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

const filename = ext => `[name].${ext}`

module.exports = {
  mode: 'development',
  entry: {
	index: './src/js/index.js', 
	catalog: './src/js/catalogIndex.js',
	details: './src/js/detailsIndex.js',
	admin: './src/admin'
  },
  resolve: {
	  extensions: ['.js', '.jsx', '.ts', 'tsx']
  },
  output: {
    filename: '[name].[contenthash].js',
    chunkFilename: '[name].[contenthash].js',
    path: __dirname + '/adminPublic',
  },
  watch: true,

  devtool: "source-map",
  plugins: [
	new CleanWebpackPlugin({
		dry: true,
	}),
	new MiniExtractPlugin({
		filename: filename('css'),
	})
  ],

    module: {
        rules: [
			{
                test: /\.(sass|scss)$/,
                use: cssLoaders('sass-loader')
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
							'@babel/preset-react'
                        ],
                        plugins: [
                            '@babel/plugin-syntax-dynamic-import'
                        ]
                    }
                }
            }
        ]
    }
};